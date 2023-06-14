/*

 * @Description: 登录相关接口
 */
import http from "@/http/request.js";

// 登录
const login = (data = {}) => {
  return http.post("/pet", data, {
    isloading: true,
  });
};

export default {
  login,
};
