// 公共方法
export default {
  // 配置微信的请求
  async wxConfig (wx) {
    const { data } = await this.$ajax.get('wx/getsdk', {
      params: {
        sid: window.localStorage.getItem('token'),
        url: window.location.href.split('#')[0]
      }
    })
    console.log(data)
    if (data) {
      wx.config({
        debug: true,
        appId: data.appid,
        timestamp: data.timestamp,
        nonceStr: data.noncestr,
        signature: data.signature,
        jsApiList: [
          'getLocation', // 获取地理位置    li.jsApiList
          'chooseImage', // 拍照
          'uploadImage', // 上传图片
          'startRecord', // 开始录音
          'stopRecord', // 停止录音
          'uploadVoice', // 上传语音
          'scanQRCode' // 扫一扫
        ]
      })
    }
  },

  // 微信扫二维码请求
  wxScanQRCode (wx, routerPath, handle) {
    wx.ready(() => {
      wx.scanQRCode({
        needResult: 1,
        scanType: ['qrCode', 'barCode'],
        success: (res) => {
          var result = JSON.stringify(res.resultStr.replace('"', ''))
          console.log(result)
          this.$store.commit(handle, result)
          this.$router.push(routerPath)
        }
      })
    })
    wx.error(function (res) {
      console.log('config信息验证失败会执行error函数')
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    })
  },

  // 获取权限
  getRols (rolsArr) {
    const arr = []
    rolsArr.map((item) => {
      arr.push(item.split(':')[0])
    })
    return Array.from(new Set(arr))
  },

  // 添加路由
  $addRoutes (router, routes, rolsarr) {
    var arr = []
    routes.map((item, index) => {
      if (rolsarr.indexOf(item.path.substr(1)) !== -1) {
        arr.push(item)
      }
    })
    router.addRoutes(arr)
  }
}
