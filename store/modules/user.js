import config from "@/config";
import storage from "@/utils/storage";
import constant from "@/utils/constant";
import { getDownloadUrl } from "@/api/file";
import {
  accountlogin,
  phoneLogin,
  getUserById,
  accountlogout,
} from "@/api/user";

import { getToken, setToken, removeToken } from "@/utils/auth";

const baseUrl = config.baseUrl;

const user = {
  state: {
    token: getToken(),
    refresh_token: "",
    permissions: ["*:*:*"],
    userId: null,
    username: null,
    realname: null,
    businessId: "", // 业务ID
    avatar: "",
    phone: "",
    cardType: null,
    idcard: null,
    schoolCode: "",
    schoolName: "",
    roles: {
      IS_ADMIN: false, //管理员
      IS_SCHOOL_LEADER: false, // 校领导
      IS_TEACHER_DEVELOP_CENTER: false, //教师发展中心
      IS_SECOND_COLLEGE: false, // 二级学院
      IS_TEAM: false, //团队
      IS_TEACHER: false, //教师
      IS_EXPERT: false, //评审专家,
    },
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      setToken(token);
    },
    SET_REFRESHTOKEN: (state, refreshToken) => {
      state.setRefreshToken = refreshToken;
      storage.set(constant.refreshToken, refreshToken);
    },

    SET_INFO: (state, info) => {
      const {
        userId,
        username,
        realname,
        businessId,
        avatar,
        phone,
        roles,
        cardType,
        idcard,
        schoolCode,
        schoolName,
      } = info;

      state.userId = userId;
      state.username = username;
      state.realname = realname;
      state.businessId = businessId;
      state.avatar = avatar;
      state.phone = phone;
      state.roles = roles;
      state.cardType = cardType;
      state.idcard = idcard;
      state.schoolCode = schoolCode;
      state.schoolName = schoolName;
      console.log(state);

      storage.set(constant.userState, state);
    },
  },

  actions: {
    userLogin({ commit }, data) {
      return new Promise(async (resolve, reject) => {
        try {
          const res =
            data.loginType === "account"
              ? await accountlogin(data)
              : await phoneLogin(data);
          let {
            userId,
            username,
            realname,
            phone,
            access_token,
            refresh_token,
            authorities,
            businessId,
            schoolCode,
            schoolName,
          } = res;
          let roleKeys = authorities.map((item) => item.authority);
          const roles = {
            IS_ADMIN: roleKeys.includes("ROLE_ADMIN"), //管理员
            IS_EDUCATION: roleKeys.includes("ROLE_EDUCATION"), //教师司
            IS_SECRETARIAT: roleKeys.includes("ROLE_SECRETARIAT"), //秘书处
            IS_SCHOOL: roleKeys.includes("ROLE_SCHOOL"), //学校
            IS_TEAM: roleKeys.includes("ROLE_TEAM"), //团队
            IS_EXPERT:
              roleKeys.includes("ROLE_EXPERT") ||
              roleKeys.includes("ROLE_APPLY_EXPERT_PROVINCE") ||
              roleKeys.includes("ROLE_APPLY_EXPERT_COUNTRY"), //评审专家 - 新加申报类型评审专家
            IS_PROVINCE: roleKeys.includes("ROLE_PROVINCE"), //省级账号
          };
          commit("SET_TOKEN", access_token);

          commit("SET_REFRESHTOKEN", refresh_token);

          const userInfo = await getUserById(userId);

          let { cardType, idcard, headSculptureId } = userInfo;
          console.log({
            userId,
            username,
            realname,
            businessId,
            phone,
            roles,
            cardType,
            idcard,
            schoolCode,
            schoolName,
          });

          const avatar = headSculptureId
            ? getDownloadUrl(headSculptureId)
            : require("@/static/images/profile.jpg");

          commit("SET_INFO", {
            userId,
            username,
            realname,
            businessId,
            avatar,
            phone,
            roles,
            cardType,
            idcard,
            schoolCode,
            schoolName,
          });
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },

    // 退出系统
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        accountlogout()
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_REFRESHTOKEN", "");
            commit("SET_INFO", {});
            removeToken();
            storage.clean();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};

export default user;
