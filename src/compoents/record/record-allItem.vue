<template>
  <div class="errItemFalseSb-box">
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">{{list.wholeTypeName}}</p>
      <p class="errItemFalseSb-box-item-r">类型</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">lat:{{list.lat}};lng:{{list.lng}}</p>
      <p class="errItemFalseSb-box-item-r" @click="toMap" style="padding-right: 12px">桩号位置
        <van-icon name="arrow" class="my-icon-center" />
      </p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">{{list.groupName}}</p>
      <p class="errItemFalseSb-box-item-r">责任单位</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">{{list.checkquestionTime}}</p>
      <p class="errItemFalseSb-box-item-r">巡检时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">{{list.chkName}}</p>
      <p class="errItemFalseSb-box-item-r">巡检人</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">{{list.flag === 1 ? '异常' : '正常'}}</p>
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
      <p class="errItemFalseSb-box-item-l">巡检描述</p>
      <textarea readonly v-model="list.checkquestionInfo" class="thing-miaosu" placeholder="请输入巡检描述"></textarea>
    </div>
    <van-button @click="uploadMessage" v-show="list.flag === 1" class="btm-weixiu" type="danger">维修指派</van-button>
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
    this.list = this.$route.query
    console.log(this.list)
  }
}
</script>
<style scoped>
</style>
