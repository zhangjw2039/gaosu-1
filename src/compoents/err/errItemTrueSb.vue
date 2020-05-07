<template>
  <div class="errItemFalseSb-box">
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-r">{{list.id}}</p>
        <p class="errItemFalseSb-box-item-l">维修单号</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-r">{{list.wholeTypeName}}</p>
        <p class="errItemFalseSb-box-item-l">类型</p>
    </div>
    <div class="errItemFalseSb-box-item" @click="toMap(list.lat, list.lng)">
        <p class="errItemFalseSb-box-item-l" style="padding-right: 13px">桩号
          <van-icon name="arrow" class="my-icon-center" />
        </p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-r">{{list.groupName}}</p>
        <p class="errItemFalseSb-box-item-l">管理单位</p>
    </div>
    <div class="errItemFalseSb-box-item" @click="toDrtail">
        <p class="errItemFalseSb-box-item-l">设备异常详情</p>
        <van-icon name="arrow" class="my-icon-nof-center" />
    </div>
    <div class="errItemFalseSb-box-item">
        <h1 class="errItemFalseSb-box-item-h1">巡检信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-r">{{list.chkName}}</p>
        <p class="errItemFalseSb-box-item-l">巡检人</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">异常描述</p>
        <textarea readonly v-model="list.checkquestionInfo" class="thing-miaosu" placeholder="请输入巡检描述"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
        <h3 class="errItemFalseSb-box-item-t">巡检异常照片</h3>
        <img src="../../assets/image/ad35c8d7ly1fnctsb3hvpj22yo1uou10.jpg" alt="">
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">巡检录音</p>
        <audio class="errItemFalseSb-box-item-audio" src="" controls></audio>
    </div>
    <!-- <div class="errItemFalseSb-box-item">
        <h1 class="errItemFalseSb-box-item-h1">维修信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">000-000-000--00</p>
        <p class="errItemFalseSb-box-item-r">维修指派时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">{{list.groupName}}</p>
        <p class="errItemFalseSb-box-item-r">维修单位</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-r">维修人</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-r">维修描述</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <h3 class="errItemFalseSb-box-item-t">维修之后的图片</h3>
        <img src="../../assets/image/ad35c8d7ly1fnctsb3hvpj22yo1uou10.jpg" alt="">
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">维修录音</p>
        <audio class="errItemFalseSb-box-item-audio" src="" controls></audio>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">teste</p>
        <p class="errItemFalseSb-box-item-r">验收人</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l"></p>
        <p class="errItemFalseSb-box-item-r">验收时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l"></p>
        <p class="errItemFalseSb-box-item-r">验收描述</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <textarea v-model="list.checkquestionInfo" class="thing-miaosu" placeholder="请输入巡检描述"></textarea>
    </div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: {}
    //   pass: true
    }
  },
  methods: {
    showOrHide () {
      this.pass = !this.pass
    },
    toMap (lat, lng) {
      console.log(lat, lng)
      this.$router.push({
        path: '/map',
        name: '/map',
        query: {
          lat: lat,
          lng: lng
        }
      })
    },
    toDrtail () {
      this.$router.push({
        path: '/details',
        name: '/details',
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
