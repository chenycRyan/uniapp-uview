<template>
  <view>
    <view class="cu-custom" :style="`height: ${appStore.customBar}px`">
      <view class="cu-bar fixed" :style="style" :class="[bgImage != '' ? 'none-bg text-black bg-img' : '', bgColor]">
        <view v-if="isBack" class="action" @tap="BackPage">
          <text class="cuIcon-back"></text>
          <slot name="backText"></slot>
        </view>
        <view class="content" :style="{ top: appStore.statusBar + 'px' }">
          <slot name="content"></slot>
        </view>
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    bgColor: string
    isBack: boolean | string
    bgImage?: string
  }>(),
  {
    bgColor: '',
    isBack: false,
    bgImage: ''
  }
)
const appStore = useStore('app')

const style = computed(() => {
  let style = `height:${appStore.customBar}px;padding-top:${appStore.statusBar}px;`
  if (props.bgImage) {
    style = `${style}background-image:url(${props.bgImage});`
  }
  console.log(style)
  return style
})

const BackPage = () => {
  uni.navigateBack({
    delta: 1
  })
}
</script>

<style>
.bg-gradual-purple {
  background-color: white;
  /* background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%); */
}
</style>
