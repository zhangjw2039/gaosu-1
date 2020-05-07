<template>
  <div>
    <div class="errItemFalseSb-box-item">
      <h1 class="errItemFalseSb-box-item-h1">上报信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">管理员1555</p>
      <p class="errItemFalseSb-box-item-r">责任单位</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">2222</p>
      <p class="errItemFalseSb-box-item-r">上报时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">测试提交</p>
      <p class="errItemFalseSb-box-item-r">上报描述</p>
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
      <p class="errItemFalseSb-box-item-l">2019</p>
      <p class="errItemFalseSb-box-item-r">规定维修完成时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">test</p>
      <p class="errItemFalseSb-box-item-r">指派人</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">2019</p>
      <p class="errItemFalseSb-box-item-r">指派时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">维修方案</p>
      <textarea class="thing-miaosu" placeholder="请输入巡检描述"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">测试指派维修单位</p>
      <p class="errItemFalseSb-box-item-r">指派维修单位</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <h1 class="errItemFalseSb-box-item-h1">指派审核信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">test</p>
      <p class="errItemFalseSb-box-item-r">指派审核人</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">2019</p>
      <p class="errItemFalseSb-box-item-r">指派审核时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">指派描述</p>
      <textarea class="thing-miaosu" placeholder="请输入巡检描述"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
      <h1 class="errItemFalseSb-box-item-h1">维修信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">test</p>
      <p class="errItemFalseSb-box-item-r">维修人</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">2019</p>
      <p class="errItemFalseSb-box-item-r">维修开始时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">2019</p>
      <p class="errItemFalseSb-box-item-r">维修结束时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <h3 class="errItemFalseSb-box-item-t">维修照片</h3>
      <img src="../../assets/image/ad35c8d7ly1fnctsb3hvpj22yo1uou10.jpg" alt />
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">维修录音</p>
      <audio class="errItemFalseSb-box-item-audio" src controls></audio>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">维修描述</p>
      <textarea class="thing-miaosu" placeholder="请输入巡检描述"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
      <h3 class="errItemFalseSb-box-item-t">图片/视频</h3>
      <img src="../../assets/image/ad35c8d7ly1fnctsb3hvpj22yo1uou10.jpg" alt />
    </div>
    <div class="errItemFalseSb-box-item" @click="showOrHide">
      <p class="errItemFalseSb-box-item-l">验收通过</p>
      <p class="errItemFalseSb-box-item-r">
        <van-icon v-show="pass" name="success" color="#00CD66" />
      </p>
    </div>
    <div class="errItemFalseSb-box-item" @click="showOrHide">
      <p class="errItemFalseSb-box-item-l">验收未通过</p>
      <p class="errItemFalseSb-box-item-r">
        <van-icon v-show="!pass" name="success" color="#00CD66" />
      </p>
    </div>
    <div class="errItemFalseSb-box-item" v-show="!pass">
      <textarea v-model="info" class="thing-miaosu" placeholder="验收描述"></textarea>
    </div>
    <van-button @click="upload" color="#1089ff" class="btm-weixiu" type="danger">验收完成</van-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      pass: true,
      list: {},
      info: ''
    }
  },
  methods: {
    showOrHide () {
      this.pass = !this.pass
    },
    async upload () {
      const data = await this.$ajax.post(`repairOrder/checkOrder?sid=${window.sessionStorage.getItem('token')}&type=2&status=${this.pass}`, {
        examine: this.info,
        repairorderId: this.list.id
      })
      console.log(data)
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
