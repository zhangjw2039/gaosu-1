<template>
  <div>
    <div class="title">
      <h1>查看设施</h1>
    </div>
    <div>
      <van-search v-model="value" show-action placeholder="设施名称/二维码编号" @search="onSearch">
        <template #action>
          <div @click="onSearch">查找</div>
        </template>
      </van-search>
      <van-button @click="smSearch" type="primary">扫码查询</van-button>
    </div>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    async onSearch () {
      console.log(this.value)
      const { data } = await this.$ajax.get('QRcode/list', {
        params: {
          sid: window.localStorage.getItem('token'),
          checkName: this.value
        }
      })
      console.log(data)
      if (data.code === 200) {
        this.$router.push({
          path: '/details',
          name: '/details',
          query: data.data.rows[0]
        })
      } else {
        this.$toast('无法查询到改信息')
      }
    },
    smSearch () {
      wx.ready(() => {
        wx.scanQRCode({
          needResult: 1,
          scanType: ['qrCode', 'barCode'],
          success: (res) => {
            var result = JSON.stringify(res.resultStr.replace('"', ''))
            this.value = result
            console.log(this.value)
            this.onSearch()
          }
        })
      })
      wx.error(function (res) {
        console.log('config信息验证失败会执行error函数')
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })
    }
  },
  mounted () {
    this.util.wxConfig.call(this, wx)
  }
}
</script>
<style scoped>
.title {
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title h1 {
  margin: 0;
  color: #66cd00;
  font-weight: 400;
}
.van-button {
  margin-top: 50px;
  margin-left: 10%;
  width: 80%;
}
</style>
