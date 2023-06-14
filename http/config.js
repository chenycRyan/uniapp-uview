const IS_DEVELOPMENT = process.env.NODE_ENV === "development" ? true : false; // 判断是否为生成环境

export default {
  isExternalJump: false, // 其他平台跳转
  tabList: [{ name: "账号登录" }, { name: "手机号登录" }], // 登录方式
  baseURL: IS_DEVELOPMENT ? "/" : "", // 请求地址
};
