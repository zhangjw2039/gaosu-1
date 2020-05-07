<template>
  <div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">下行 上行</p>
      <p class="errItemFalseSb-box-item-r" style="padding-right: 13px" @click="toMap">上报位置
        <van-icon name="arrow" class="my-icon-center" />
      </p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">管理员</p>
      <p class="errItemFalseSb-box-item-r">责任单位</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">2019</p>
      <p class="errItemFalseSb-box-item-r">上报时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">test</p>
      <p class="errItemFalseSb-box-item-r">上报人</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">test</p>
      <p class="errItemFalseSb-box-item-r">上报人</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <h3 class="errItemFalseSb-box-item-t">图片/视频</h3>
      <img src="../../assets/image/ad35c8d7ly1fnctsb3hvpj22yo1uou10.jpg" alt />
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">巡检录音</p>
      <audio class="errItemFalseSb-box-item-audio" src controls></audio>
    </div>
    <div class="errItemFalseSb-box-item">
      <h3 class="errItemFalseSb-box-item-t">描述</h3>
      <textarea class="thing-miaosu" placeholder="验收描述"></textarea>
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
  }
}
</script>
<style scoped>

</style>
