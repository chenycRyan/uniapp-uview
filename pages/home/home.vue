<template>
  <view class="home" v-if="false">
    <!-- 用户信息和扫码 -->
    <view class="home-top"></view>

    <!-- 主体内容 -->
    <view class="home-content"></view>
  </view>

  <!-- 未拿到数据显示骨架屏 -->
  <homeSkeleton v-else></homeSkeleton>
</template>

<script>
import homeSkeleton from "./components/homeSkeleton.vue"; // 自定义骨架屏

export default {
  components: { homeSkeleton },
  data() {
    return {
      loading: true,
    };
  },

  onLoad() {},
  onPullDownRefresh() {
    //刷新数据之后停止刷新效果
    uni.stopPullDownRefresh();
  },

  methods: {},
};
</script>
<style lang="scss" scoped>
.home {
}
</style>
