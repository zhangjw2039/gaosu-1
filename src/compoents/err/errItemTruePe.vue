<template>
  <div class="errItemFalseSb-box">
    <div class="errItemFalseSb-box-item">
        <h1 class="errItemFalseSb-box-item-h1">上报信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">上报人</p>
        <p class="errItemFalseSb-box-item-r">{{list.uploadName}}</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">上报时间</p>
        <p class="errItemFalseSb-box-item-r">{{list.convenientlyTime}}</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">上报描述</p>
        <textarea readonly v-model="list.convenientlyInfo" class="thing-miaosu" placeholder="请输入巡检描述"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
        <h3 class="errItemFalseSb-box-item-t">上报照片</h3>
        <img v-for="(item, index) in imageList" :key="index" :src="item" alt="">
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">录音</p>
        <audio class="errItemFalseSb-box-item-audio" :src="recordingURL" controls></audio>
    </div>
    <div class="errItemFalseSb-box-item">
        <h1 class="errItemFalseSb-box-item-h1">指派信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-r">{{list.assignCompletionTime}}</p>
        <p class="errItemFalseSb-box-item-l">规定维修完成时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-r">{{list.zpName}}</p>
        <p class="errItemFalseSb-box-item-l">指派人</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-r">{{list.assignTime}}</p>
        <p class="errItemFalseSb-box-item-l">指派时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">维修单位</p>
        <p class="errItemFalseSb-box-item-r">{{list.groupName}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: {

      },
      pass: true
    }
  },
  methods: {
    showOrHide () {
      this.pass = !this.pass
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
