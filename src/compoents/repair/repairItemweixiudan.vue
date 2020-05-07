<template>
  <div class="errItemFalseSb-box">
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">{{list.wholeTypeName}}</p>
      <p class="errItemFalseSb-box-item-r">类型</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r" @click="toMap" style="padding-right: 13px">桩号位置
        <van-icon name="arrow" class="my-icon-center" />
      </p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">{{list.groupName}}</p>
      <p class="errItemFalseSb-box-item-r">责任单位</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">{{list.examineTime}}</p>
      <p class="errItemFalseSb-box-item-r">巡检时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">{{list.USERNAME}}</p>
      <p class="errItemFalseSb-box-item-r">巡检人</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">未定...</p>
      <p class="errItemFalseSb-box-item-r">巡检状态</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <h3 class="errItemFalseSb-box-item-t">巡检图片/视频</h3>
      <img src="../../assets/image/ad35c8d7ly1fnctsb3hvpj22yo1uou10.jpg" alt />
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">巡检录音</p>
      <audio class="errItemFalseSb-box-item-audio" src controls></audio>
    </div>
    <div class="errItemFalseSb-box-item">
      <h1 class="errItemFalseSb-box-item-h1">巡检描述</h1>
      <textarea readonly v-model="list.checkquestionInfo" class="thing-miaosu" placeholder="验收描述"></textarea>
    </div>
    <!-- <van-button class="btm-msg" plain type="primary">详细设施信息</van-button> -->
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
        path: '/repairweixiusb',
        query: this.list
      })
    }
  },
  mounted () {
    this.list = this.$route.query
    console.log(this.list)
  }
}
</script>
<style scoped>

</style>
