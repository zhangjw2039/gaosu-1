<template>
  <div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">{{list.id}}</p>
      <p class="errItemFalseSb-box-item-r">维修单号</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">{{list.wholeTypeName}}</p>
      <p class="errItemFalseSb-box-item-r">设施名称</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r" style="padding-right: 13px" @click="toMap">桩号
        <van-icon name="arrow" class="my-icon-center" />
      </p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">{{list.groupName}}</p>
      <p class="errItemFalseSb-box-item-r">管理单位</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <h1 class="errItemFalseSb-box-item-h1">巡检信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">{{list.chkUserName}}</p>
      <p class="errItemFalseSb-box-item-r">巡检人</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">异常描述</p>
      <textarea v-model="list.checkquestionInfo" readonly class="thing-miaosu" placeholder="请输入巡检描述"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
      <h3 class="errItemFalseSb-box-item-t">巡检异常照片</h3>
      <img src="../../assets/image/ad35c8d7ly1fnctsb3hvpj22yo1uou10.jpg" alt />
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">巡检录音</p>
      <audio class="errItemFalseSb-box-item-audio" src controls></audio>
    </div>
    <div class="errItemFalseSb-box-item">
      <h1 class="errItemFalseSb-box-item-h1">维修信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">{{list.assignTime}}</p>
      <p class="errItemFalseSb-box-item-r">维修指派时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">{{list.groupName}}</p>
      <p class="errItemFalseSb-box-item-r">维修单位</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">{{list.repairName}}</p>
      <p class="errItemFalseSb-box-item-r">维修人</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">维修描述</p>
      <textarea readonly v-model="list.examineInfo" class="thing-miaosu" placeholder="请输入巡检描述"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
      <h3 class="errItemFalseSb-box-item-t">维修后的图片</h3>
      <img src="../../assets/image/ad35c8d7ly1fnctsb3hvpj22yo1uou10.jpg" alt />
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">维修录音</p>
      <audio class="errItemFalseSb-box-item-audio" src controls></audio>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">{{list.shName}}</p>
      <p class="errItemFalseSb-box-item-r">验收人</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">{{list.examineTime}}</p>
      <p class="errItemFalseSb-box-item-r">验收时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">验收描述</p>
      <textarea v-model="list.examineInfo" readonly class="thing-miaosu" placeholder="请输入巡检描述"></textarea>
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
  }
}
</script>
<style scoped>

</style>
