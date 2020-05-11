<template>
  <div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r" style="padding-right: 13px">{{list.upDown === 1? '上行' : '下行'}}
        <van-icon name="arrow" class="my-icon-nor-center" />
      </p>
      <p class="errItemFalseSb-box-item-l" @click="toMap">上报位置</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.groupName}}</p>
      <p class="errItemFalseSb-box-item-l">责任单位</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.convenientlyTime}}</p>
      <p class="errItemFalseSb-box-item-l">上报时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.sbName}}</p>
      <p class="errItemFalseSb-box-item-l">上报人</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <h3 class="errItemFalseSb-box-item-t">图片/视频</h3>
      <img v-for="(item, index) in imageList" :key="index" :src="item" alt />
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">巡检录音</p>
      <audio class="errItemFalseSb-box-item-audio" :src="recordingURL" controls></audio>
    </div>
    <div class="errItemFalseSb-box-item">
      <h3 class="errItemFalseSb-box-item-t">描述</h3>
      <textarea readonly v-model="list.convenientlyInfo" class="thing-miaosu" placeholder="验收描述"></textarea>
    </div>
    <van-button class="btm-msg" type="primary" @click="fishWeixiu">维修</van-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: {}
    }
  },
  methods: {
    toMap () {
      this.$router.push({
        path: '/map',
        query: {
          lat: this.list.lat,
          lng: this.list.lng
        }
      })
    },
    fishWeixiu () {
      this.$router.push({
        path: '/repairweixiupe',
        query: this.list
      })
    }
  },
  mounted () {
    this.list = this.$route.query
    console.log(this.list)
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
