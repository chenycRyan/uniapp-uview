<template>
  <view class="normal-login-container">
    <view class="logo-content align-center justify-center flex">
      <image style="width: 100rpx; height: 100rpx" :src="globalConfig.appInfo.logo" mode="widthFix"> </image>
      <text class="title">教师管理平台登录</text>
    </view>
    <view class="login-form-content">
      <view class="input-item flex align-center">
        <view class="iconfont icon-user icon"></view>
        <input v-model="logInfo.account" class="input" type="text" placeholder="请输入账号" maxlength="30" />
      </view>
      <view class="input-item flex align-center">
        <view class="iconfont icon-password icon"></view>
        <input v-model="logInfo.password" type="password" class="input" placeholder="请输入密码" maxlength="20" />
      </view>
      <view class="flex align-center">
        <view class="input-item flex align-center" style="width: 60%; margin: 0px">
          <view class="iconfont icon-code icon"></view>
          <input v-model="logInfo.verifyCode" class="input" placeholder="请输入验证码" maxlength="4" />
        </view>

        <verify-canvas
          :code="logInfo.oriCode"
          @get-code="changeVerfiyCode"
          :contentHeight="48"
          :contentWidth="120"
          class="margin-left-xs"
        ></verify-canvas>
      </view>
      <view class="action-btn">
        <button @click="handleLogin" class="login-btn cu-btn block bg-blue lg round">登录</button>
      </view>
      <view class="reg text-center" v-if="register">
        <text class="text-grey1">没有账号？</text>
        <text @click="handleUserRegister" class="text-blue">立即注册</text>
      </view>
      <view class="xieyi text-center">
        <text class="text-grey1">登录即代表同意</text>
        <text @click="handleUserAgrement" class="text-blue">《用户协议》</text>
        <text @click="handlePrivacy" class="text-blue">《隐私协议》</text>
      </view>
    </view>
  </view>
</template>

<script>
import { getCode } from '@/api/user'
import { encrypt, decrypt } from '@/utils/jsencrypt.js'
import verifyCanvas from '@/components/verify-canvas/verify-canvas'

export default {
  components: { verifyCanvas },
  data() {
    return {
      captchaOptions: null,
      codeUrl: '',

      // 用户注册开关
      register: false,
      globalConfig: getApp().globalData.config,

      logInfo: {
        account: 'gly',
        loginType: 'account',
        password: 'cxtd123456',
        verifyCode: '',
        phone: '',
        oriCode: '',
        verifyCodeUuid: ''
      }
    }
  },
  onLoad() {
    this.changeVerfiyCode()
  },
  methods: {
    changeVerfiyCode() {
      getCode().then(res => {
        this.logInfo.oriCode = decrypt(res.encryptVerifyCode)

        this.logInfo.verifyCodeUuid = res.verifyCodeUuid
      })
    },

    // 用户注册
    handleUserRegister() {
      this.$tab.redirectTo(`/pages/register`)
    },
    // 隐私协议
    handlePrivacy() {
      let site = this.globalConfig.appInfo.agreements[0]
      this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
    },
    // 用户协议
    handleUserAgrement() {
      let site = this.globalConfig.appInfo.agreements[1]
      this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
    },

    // 登录方法
    async handleLogin() {
      if (this.logInfo.username === '') {
        this.$modal.msgError('请输入您的账号')
      } else if (this.logInfo.password === '') {
        this.$modal.msgError('请输入您的密码')
      } else if (this.logInfo.verifyCode === '') {
        this.$modal.msgError('请输入验证码')
      } else {
        this.$modal.loading('登录中，请耐心等待...')
        this.pwdLogin()
      }
    },
    // 密码登录
    async pwdLogin() {
      const formData = JSON.parse(JSON.stringify(this.logInfo))
      formData.password = formData.password ? encrypt(formData.password) : ''
      this.$store
        .dispatch('userLogin', formData)
        .then(() => {
          this.$modal.closeLoading()
          this.$tab.reLaunch('/pages/index')
        })
        .catch(() => {
          this.changeVerfiyCode()
        })
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #ffffff;
}

.normal-login-container {
  width: 100%;

  .logo-content {
    width: 100%;
    font-size: 21px;
    text-align: center;
    padding-top: 15%;

    image {
      border-radius: 4px;
    }

    .title {
      margin-left: 10px;
    }
  }

  .login-form-content {
    text-align: center;
    margin: 20px auto;
    margin-top: 15%;
    width: 80%;

    .input-item {
      margin: 20px auto;
      background-color: #f5f6f7;
      height: 45px;
      border-radius: 20px;

      .icon {
        font-size: 38rpx;
        margin-left: 10px;
        color: #999;
      }

      .input {
        width: 100%;
        font-size: 14px;
        line-height: 20px;
        text-align: left;
        padding-left: 15px;
      }
    }

    .login-btn {
      margin-top: 40px;
      height: 45px;
    }

    .reg {
      margin-top: 15px;
    }

    .xieyi {
      color: #333;
      margin-top: 20px;
    }

    .login-code {
      height: 38px;
      float: right;

      .login-code-img {
        height: 38px;
        position: absolute;
        margin-left: 10px;
        width: 200rpx;
      }
    }
  }
}
</style>
