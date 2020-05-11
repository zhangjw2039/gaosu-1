<template>
  <div class="errItemFalseSb-box">
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-r">{{list.wholeTypeName}}</p>
        <p class="errItemFalseSb-box-item-l">类型</p>
    </div>
    <div class="errItemFalseSb-box-item" @click="toMap">
        <p class="errItemFalseSb-box-item-l" style="padding-right: 12px">桩号位置
          <van-icon name="arrow" class="my-icon-center" />
        </p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-r">{{list.groupName}}</p>
        <p class="errItemFalseSb-box-item-l">责任单位</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-r">{{list.checkquestionTime}}</p>
        <p class="errItemFalseSb-box-item-l">巡检时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-r">{{list.chkName}}</p>
        <p class="errItemFalseSb-box-item-l">巡检人</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p :class="'errItemFalseSb-box-item-r '+ (list.flag === 1? 'font-red': 'font-green')" >{{list.flag === 1? '异常': '正常'}}</p>
        <p class="errItemFalseSb-box-item-l">巡检状态</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <h3 class="errItemFalseSb-box-item-t">巡检图片/视频</h3>
        <img v-for="(item, index) in imageList" :key="index" :src="item" alt="">
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">巡检录音</p>
        <audio class="errItemFalseSb-box-item-audio" :src="recordingURL" controls></audio>
    </div>
    <div class="errItemFalseSb-box-item">
        <h3 class="errItemFalseSb-box-item-t">巡检描述</h3>
        <textarea readonly v-model="list.checkquestionInfo" class="thing-miaosu" placeholder="请输入巡检描述"></textarea>
    </div>
    <!-- <van-button class="btm-msg" plain type="primary" @click="toDetails">详细设施信息</van-button> -->
    <van-button @click="uploadMessage" class="btm-weixiu" type="danger">维修指派</van-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: {},
      value: 123
    }
  },
  methods: {
    // toDetails () {
    //   this.$router.push({
    //     path: '/details',
    //     querty: this.list
    //   })
    // },
    toMap () {
      this.$router.push({
        path: '/map',
        name: '/map',
        query: {
          lat: this.list.lat,
          lng: this.list.lng
        }
      })
    },
    uploadMessage () {
      this.list.name = 0
      this.$router.push({
        path: '/weixiuzhipai',
        name: '/weixiuzhipai',
        query: this.list
      })
    }
  },
  mounted () {
    // 模版加载之前获取路由携带过来的信息
    this.list = this.$route.query
    console.log(this.list)
  },
  computed: {
    imageList () {
      if (this.list.checkImagesURL) {
        const arr = [];
        (this.list.checkImagesURL.split(',')).map((item) => {
          arr.push(this.$ajax.defaults.baseURL + 'images' + item)
        })
        return arr
      }
      return []
    },
    recordingURL () {
      if (this.list.checkRecordingURL) {
        return this.$ajax.defaults.baseURL + 'files' + this.list.checkRecordingURL
      }
      return ''
    }
  }
}
</script>
<style scoped>

</style>
