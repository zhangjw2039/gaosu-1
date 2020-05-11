<template>
  <div>
    <div class="login-title">
      用户名登录
    </div>
    <van-form>
      <van-field
        v-model="username"
        label="用户名"
        placeholder="用户名"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="密码"
      />
      <van-field
        v-model="verifyCode"
        type="text"
        label="验证码"
        placeholder="验证码"
      />
      <div class="verifyCode-box">
        <img @click="changeCaptcha" src="https://jxgszlxcx.jxgszl.com/images/captcha" alt="">
      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" @click="onSubmit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import qs from 'qs'
import { mapMutations } from 'vuex'
import adminRoutes from '@/router/adminRoutes'
// location.reload()
export default {
  data () {
    return {
      username: '',
      password: '',
      verifyCode: ''
    }
  },
  methods: {
    ...mapMutations(['saveRols']),
    async onSubmit () {
      const { data } = await this.$ajax.post('wx/loginUser', qs.stringify({
        username: this.username,
        password: this.password,
        verifyCode: this.verifyCode
        // openId: window.localStorage.getItem('OPENID')
      }))
      console.log(data.authorizationInfo)
      if (data.code === 200) {
        this.$toast('登录成功')
        window.localStorage.setItem('token', data.sid)
        this.saveRols(data.authorizationInfo.stringPermissions)
        window.localStorage.setItem('ROLS', JSON.stringify(data.authorizationInfo.stringPermissions))
        this.util.$addRoutes(this.$router, adminRoutes, this.util.getRols(this.$store.state.rols))
        this.$router.push('/home')
      } else {
        this.$toast('请输入正确的信息')
      }
    },
    changeCaptcha () {
      this.$router.go(0)
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
  .login-title {
    height: 100px;
    text-align: center;
    font-size: 20px;
    line-height: 100px;
  }
  .verifyCode-box {
    text-align: center;
  }
</style>
