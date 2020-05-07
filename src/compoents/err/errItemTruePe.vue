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
        <img src="../../assets/image/ad35c8d7ly1fnctsb3hvpj22yo1uou10.jpg" alt="">
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">录音</p>
        <audio class="errItemFalseSb-box-item-audio" src="" controls></audio>
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
    <!-- <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-r">111维修</p>
        <p class="errItemFalseSb-box-item-l">维修方案</p>
    </div> -->
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">维修单位</p>
        <p class="errItemFalseSb-box-item-r">{{list.groupName}}</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <h1 class="errItemFalseSb-box-item-h1">指派审核信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">审核时间</p>
        <p class="errItemFalseSb-box-item-r">{{list.examineTime}}</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">审核描述</p>
        <textarea readonly v-model="list.examineInfo" class="thing-miaosu" placeholder="请输入巡检描述"></textarea>
    </div>
    <!-- <div class="errItemFalseSb-box-item">
        <h1 class="errItemFalseSb-box-item-h1">维修信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">4444</p>
        <p class="errItemFalseSb-box-item-r">维修人</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">2019</p>
        <p class="errItemFalseSb-box-item-r">维修开始时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">2900</p>
        <p class="errItemFalseSb-box-item-r">维修结束时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <h3 class="errItemFalseSb-box-item-t">维修照片</h3>
        <img src="../../assets/image/ad35c8d7ly1fnctsb3hvpj22yo1uou10.jpg" alt="">
    </div>
    <div class="errItemFalseSb-box-item" @click="showOrHide">
        <p class="errItemFalseSb-box-item-l">录音</p>
        <audio class="errItemFalseSb-box-item-audio" src="" controls></audio>
    </div>
    <div class="errItemFalseSb-box-item" @click="showOrHide">
        <p class="errItemFalseSb-box-item-l">维修描述</p>
        <textarea class="thing-miaosu" placeholder="请输入巡检描述"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">pass</p>
        <p class="errItemFalseSb-box-item-r">验收状态</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">111</p>
        <p class="errItemFalseSb-box-item-r">验收人</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">2019</p>
        <p class="errItemFalseSb-box-item-r">验收时间</p>
    </div> -->
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
  }
}
</script>
<style scoped>

</style>
