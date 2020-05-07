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
        <img @click="changeCaptcha" src="http://192.168.0.80:9090/images/captcha" alt="">
      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" @click="onSubmit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import qs from 'qs'
import { mapMutations } from 'vuex'
import adminRoutes from '@/router/adminRoutes'

export default {
  data () {
    return {
      username: 'test',
      password: '1234qwer',
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
      }))
      console.log(data.authorizationInfo)
      if (data.code === 200) {
        this.$toast('登录成功')
        window.sessionStorage.setItem('token', data.sid)
        this.saveRols(data.authorizationInfo.stringPermissions)
        this.util.$addRoutes(this.$router, adminRoutes, this.util.getRols(this.$store.state.rols))
        this.$router.push('/home')
      } else {
        this.$toast('用户名或密码错误')
      }
    },
    changeCaptcha () {
      this.$router.go(0)
    }
  },
  mounted () {
    window.sessionStorage.clear()
    window.localStorage.clear()
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
