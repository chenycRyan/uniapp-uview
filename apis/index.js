/*
 * @Description: 正则匹配api文件夹下的所有js文件后做的一统一暴露
 */
let api = {};
const context = require.context("./api", true, /\.js$/);

context.keys().forEach((e) => {
  api = {
    ...api,
    ...context(e).default,
  };
});

export default {
  ...api,
};
