<template>
    <div>
        <div class="title-msg">
            <p class="title-msg-p1">养护助手</p>
            <p>高速公路病害处治过程透明化管理</p>
        </div>
        <van-grid :column-num="3" icon-size="28">
            <van-grid-item :style="'color:' +item.colr" :icon="'icon iconfont ' + item.icon"  v-for="(item, index) in mune_list" :key="index" :text="item.title" @click="handle(index)" v-show="rolsList.includes(item.rol)" />
        </van-grid>
        <div class="route-go-back"></div>
    </div>

</template>
<script>
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      mune_list: [
        {
          title: '巡检扫码',
          icon: 'icon-saoma',
          colr: '#96CDCD',
          rol: 'scan'
        },
        {
          title: '异常信息',
          icon: 'icon-yichang',
          colr: '#FFA500',
          rol: 'abnormal'
        },
        {
          title: '巡检记录',
          icon: 'icon-jilu',
          colr: '#FF7F24',
          rol: 'patrol'
        },
        {
          title: '维修单',
          icon: 'icon-weixiudan',
          colr: '#FF7F24',
          rol: 'repairOrder'
        },
        {
          title: '电子地图',
          icon: 'icon-ditu',
          colr: '#66CD00',
          rol: 'map'
        },
        {
          title: '查看设施',
          icon: 'icon-chakan',
          colr: '#4F94CD',
          rol: 'facility'
        },
        {
          title: '设施采集',
          icon: 'icon-caiji',
          colr: '#4F94CD',
          rol: 'bind'
        },
        {
          title: '随手报',
          icon: 'icon-liaotiankuang',
          colr: '#4F94CD',
          rol: 'reported'
        },
        {
          title: '登录',
          icon: 'icon-ceshi',
          colr: '#00CED1',
          rol: 'login'
        }
      ],
      routerList: ['/scan', '/abnormal', '/patrol', '/repairOrder', '/map', '/facility', '/bind', '/reported', '/login'],
      rolsList: ['map', 'login']
      // codeId: ''
    }
  },
  methods: {
    handle (index) {
      if (index === 0) {
        this.util.wxScanQRCode.call(this, wx, '/scan', 'changeSaomaCodeID')
        return
      } else if (index === 6) {
        this.util.wxScanQRCode.call(this, wx, '/bind', 'changQrCodeId')
        return
      }
      this.$router.push(this.routerList[index])
    }
  },
  mounted () {
    this.util.wxConfig.call(this, wx)
    this.rolsList = this.rolsList.concat(this.util.getRols(this.$store.state.rols))
    window.localStorage.setItem('OPENID', window.sessionStorage.getItem('openId'))
    console.log(this.rolsList)
    console.log(this.$store.state.rols)
    console.log(this.$router)
    console.log(window.location.href.split('#')[0])
  }
}
</script>
<style scoped>
    .title-msg {
        height: 170px;
        text-align: center;
        overflow: hidden;
    }
    .title-msg-p1 {
        font-size: 25px;
        margin-top: 50px;
        color: green;
    }
</style>
