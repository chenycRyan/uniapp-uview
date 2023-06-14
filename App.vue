<script>
// #ifdef APP-PLUS
const openIM = uni.requireNativePlugin("Tuoyun-OpenIMSDK");
const event = uni.requireNativePlugin("globalEvent");

console.log("openIM: ", openIM, event);
// #endif
export default {
  onLaunch: function () {
    const IS_FIRST = uni.getStorageSync("isFirst"); // 是否第一次进入

    // 1.1 如果是第一次进页面，则去引导页
    if (!IS_FIRST) {
      uni.reLaunch({
        url: "/pages/guidePage/guidePage",
      });
      return;
    }
  },

  onShow: function () {
    console.log(this.$store);

    console.log("App Show");
  },

  onHide: function () {
    console.log("App Hide");
  },
  onPageNotFound: function () {
    // 路由不匹配跳转404
    uni.navigateTo({
      url: "/pages/404/404",
    });
  },
};
</script>

<style lang="scss">
@import "colorui/main.css";
@import "colorui/icon.css";
@import "colorui/animation.css";
/* uview-ui样式 */
@import "@/uni_modules/uview-ui/index.scss";
/* 引入iconfont */
@import "@/static/icon/iconfont.css";
/*每个页面公共css */
@import "@/uni_modules/uni-scss/index.scss";
page {
  // height: 100%;
  background: transparent;
}
</style>
