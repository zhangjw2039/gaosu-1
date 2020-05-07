<template>
  <div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">测试设施</p>
      <p class="errItemFalseSb-box-item-r"></p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">设施异常详情</p>
      <van-icon name="arrow" class="my-icon-nof-center" />
    </div>
    <div class="errItemFalseSb-box-item">
      <h3 class="errItemFalseSb-box-item-h1">维修指派信息</h3>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l"></p>
      <p class="errItemFalseSb-box-item-r">规定维修完成时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">test</p>
      <p class="errItemFalseSb-box-item-r">指派人</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l"></p>
      <p class="errItemFalseSb-box-item-r">指派时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">维修方案</p>
      <textarea v-model="maintenanceinfo" class="thing-miaosu" placeholder="请输入维修方案"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l"></p>
      <p class="errItemFalseSb-box-item-r">指派维修单位</p>
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
    <van-button type="primary" @click="fishShenhe">完成审核</van-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      pass: true,
      list: {},
      info: '',
      maintenanceinfo: ''
    }
  },
  methods: {
    showOrHide () {
      this.pass = !this.pass
      console.log(this.pass)
    },
    // 完成审核提交数据
    async fishShenhe () {
      const { data } = await this.$ajax.post(`repairOrder/assignAudit?sid=${window.sessionStorage.getItem('token')}&status=${this.pass}&type=2`, {
        repairorderId: this.list.id,
        examineInfo: this.info,
        maintenanceinfo: this.maintenanceinfo
      })
      console.log(data)
      if (data.code === 200) {
        this.$toast('完成审核')
        this.$router.go(-1)
      }
    }
  },
  mounted () {
    this.list = this.$route.query
    console.log(this.list)
  }
}
</script>
<style scoped>
.van-button {
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
}
</style>
