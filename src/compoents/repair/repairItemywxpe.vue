<template>
  <div>
    <div class="errItemFalseSb-box-item">
      <h1 class="errItemFalseSb-box-item-h1">上报信息</h1>
    </div>
    <!-- <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">管理员</p>
      <p class="errItemFalseSb-box-item-r">责任单位</p>
    </div> -->
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">上报人</p>
      <p class="errItemFalseSb-box-item-r">{{list.sbName}}</p>
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
      <img src="../../assets/image/ad35c8d7ly1fnctsb3hvpj22yo1uou10.jpg" alt />
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">巡检录音</p>
      <audio class="errItemFalseSb-box-item-audio" src controls></audio>
    </div>
    <div class="errItemFalseSb-box-item">
      <h1 class="errItemFalseSb-box-item-h1">指派信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">规定维修完成时间</p>
      <p class="errItemFalseSb-box-item-r">{{list.assignCompletionTime}}</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">指派人</p>
      <p class="errItemFalseSb-box-item-r">{{list.zpName}}</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">指派时间</p>
      <p class="errItemFalseSb-box-item-r">{{list.assignTime}}</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">维修方案</p>
      <textarea readonly v-model="list.repairorderInfo" class="thing-miaosu" placeholder="请输入巡检描述"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">指派维修单位</p>
      <p class="errItemFalseSb-box-item-r">{{list.groupName}}</p>
    </div>

    <div class="errItemFalseSb-box-item">
      <h1 class="errItemFalseSb-box-item-h1">指派审核信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">审核人</p>
      <p class="errItemFalseSb-box-item-r">{{list.shName}}</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">维修开始时间</p>
      <p class="errItemFalseSb-box-item-r">{{list.startTime}}</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">维修结束时间</p>
      <p class="errItemFalseSb-box-item-r">{{list.endTime}}</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <h3 class="errItemFalseSb-box-item-t">上报照片</h3>
      <img src="../../assets/image/ad35c8d7ly1fnctsb3hvpj22yo1uou10.jpg" alt />
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">录音</p>
      <audio class="errItemFalseSb-box-item-audio" src controls></audio>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">审核描述</p>
      <textarea readonly v-model="list.examineInfo" class="thing-miaosu"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
      <h1 class="errItemFalseSb-box-item-h1">验收信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">验收状态</p>
      <p class="errItemFalseSb-box-item-r"></p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">验收人</p>
      <p class="errItemFalseSb-box-item-r"></p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">验收时间</p>
      <p class="errItemFalseSb-box-item-r"></p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">验收描述</p>
      <textarea class="thing-miaosu"></textarea>
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
  mounted () {
    this.list = this.$route.query
    console.log(this.list)
  }
}
</script>
<style scoped>

</style>
