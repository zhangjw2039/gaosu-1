<template>
  <div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.id}}</p>
      <p class="errItemFalseSb-box-item-l">维修单号</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.wholeTypeName}}</p>
      <p class="errItemFalseSb-box-item-l">类型</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l" @click="toMap">桩号</p>
      <van-icon name="arrow" class="my-icon-center" />
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.groupName}}</p>
      <p class="errItemFalseSb-box-item-l">管理单位</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <h1 class="errItemFalseSb-box-item-h1">巡检信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.chkUserName}}</p>
      <p class="errItemFalseSb-box-item-l">巡检人</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">异常描述</p>
      <textarea v-model="list.checkquestionInfo" readonly class="thing-miaosu"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
      <h3 class="errItemFalseSb-box-item-t">巡检异常照片</h3>
      <img v-for="(item, index) in imageList" :key="index" :src="item" alt />
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">巡检录音</p>
      <audio class="errItemFalseSb-box-item-audio" :src="recordingURL" controls></audio>
    </div>
    <div class="errItemFalseSb-box-item">
      <h1 class="errItemFalseSb-box-item-h1">维修信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.assignTime}}</p>
      <p class="errItemFalseSb-box-item-l">维修指派时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.groupName}}</p>
      <p class="errItemFalseSb-box-item-l">维修单位</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.repairName}}</p>
      <p class="errItemFalseSb-box-item-l">维修人</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">维修描述</p>
      <textarea readonly v-model="list.examineInfo" class="thing-miaosu"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
      <h3 class="errItemFalseSb-box-item-t">维修图片</h3>
      <img v-for="(item, index) in repairorderImagesURL" :key="index" :src="item" alt />
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">维修录音</p>
      <audio class="errItemFalseSb-box-item-audio" :src="repairorderRecordingURL" controls></audio>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.shName}}</p>
      <p class="errItemFalseSb-box-item-l">验收人</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.examineTime}}</p>
      <p class="errItemFalseSb-box-item-l">验收时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">验收描述</p>
      <textarea v-model="list.examineInfo" readonly class="thing-miaosu"></textarea>
    </div>
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
    }
  },
  mounted () {
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
    },
    repairorderImagesURL () {
      if (this.list.repairorderImagesURL) {
        const arr = [];
        (this.list.repairorderImagesURL.split(',')).map((item) => {
          arr.push(this.$ajax.defaults.baseURL + 'images' + item)
        })
        return arr
      }
      return []
    },
    repairorderRecordingURL () {
      if (this.list.repairorderRecordingURL) {
        return this.$ajax.defaults.baseURL + 'files' + this.list.repairorderRecordingURL
      }
      return ''
    }
  }
}
</script>
<style scoped>

</style>
