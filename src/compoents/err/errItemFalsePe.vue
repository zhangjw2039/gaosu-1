<template>
  <div class="errItemFalseSb-box">
    <div class="errItemFalseSb-box-item" @click="toMap()">
        <p class="errItemFalseSb-box-item-r" style="padding-right: 12px">{{list.upDown === 1 ? '上行' : '下行'}}
          <van-icon name="arrow" class="my-icon-nor-center" />
        </p>
        <p class="errItemFalseSb-box-item-l">上报位置
        </p>
    </div>
    <!-- <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-r">待定...</p>
        <p class="errItemFalseSb-box-item-l">责任单位</p>
    </div> -->
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-r">{{list.convenientlyTime}}</p>
        <p class="errItemFalseSb-box-item-l">上报时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-r">{{list.uploadName}}</p>
        <p class="errItemFalseSb-box-item-l">上报人</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <h3 class="errItemFalseSb-box-item-t">图片</h3>
        <img v-for="(item, index) in imageList" :key="index" :src="item" alt="">
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">录音</p>
        <audio class="errItemFalseSb-box-item-audio" :src="recordingURL" controls></audio>
    </div>
    <van-button @click="uploadMessage" class="btm-weixiu" type="danger">维修指派</van-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: {}
    }
  },
  mounted () {
    this.list = this.$route.query
    console.log(this.list)
  },
  methods: {
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
      this.list.name = 1
      this.$router.push({
        path: '/weixiuzhipai',
        name: '/weixiuzhipai',
        query: this.list
      })
    }
  },
  computed: {
    imageList () {
      if (this.list.convenientlyImagesURL) {
        const arr = [];
        (this.list.convenientlyImagesURL.split(',')).map((item) => {
          arr.push(this.$ajax.defaults.baseURL + 'images' + item)
        })
        return arr
      }
      return []
    },
    recordingURL () {
      if (this.list.convenientlyRecordingURL) {
        return this.$ajax.defaults.baseURL + 'files' + this.list.convenientlyRecordingURL
      }
      return ''
    }
  }
}
</script>
<style scoped>

</style>
