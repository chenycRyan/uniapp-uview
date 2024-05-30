import request from "@/utils/request";

// 用户账号登录
export function getCode() {
  return request({
    url: "/auth/random/verifyCode",
    method: "get",
  });
}

// 用户账号登录
export function accountlogin(data) {
  return request({
    url: "/auth/loginWithVerifyCode",
    method: "post",
    data: data,
  });
}
// 用户手机号登录
export function phoneLogin(data) {
  return request({
    url: "/auth/login/verify-code",
    method: "post",
    data: data,
  });
}

// 用户退出登录
export function accountlogout() {
  return request({
    url: "/auth/logout",
    method: "post",
  });
}

//获取用户信息
export function getUserById(id) {
  return request({
    url: `/user/${id}`,
    method: "get",
  });
}

// 根据旧密码更新密码
export function updatePassword(data) {
  return request({
    url: "/auth/logout",
    method: "post",
    data: data,
  });
}
