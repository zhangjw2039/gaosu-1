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
      var arr = this.value.split('/')
      console.log(arr)
      const { data } = await this.$ajax.get('http://192.168.0.80:9090/conveniently', {
        params: {
          sid: window.sessionStorage.getItem('token'),
          wholeName: arr[0],
          codeMessage: arr[1]
        }
      })
      console.log(data)
    },
    smSearch () {
      this.util.wxScanQRCode.call(this, wx)
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
