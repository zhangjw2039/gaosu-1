<template>
  <div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.id}}</p>
      <p class="errItemFalseSb-box-item-l">维修单号</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l" @click="toMap">桩号</p>
      <van-icon name="arrow" class="my-icon-center" />
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.groupName}}</p>
      <p class="errItemFalseSb-box-item-l">管理单位</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">设施异常详情</p>
      <van-icon name="arrow" class="my-icon-nof-center" />
    </div>
    <div class="errItemFalseSb-box-item">
      <h1 class="errItemFalseSb-box-item-h1">巡检信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.chkUserName}}</p>
      <p class="errItemFalseSb-box-item-l">巡检人</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">维修方案</p>
      <textarea readonly v-model="list.repairorderInfo" class="thing-miaosu"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
      <h3 class="errItemFalseSb-box-item-t">图片/视频</h3>
      <img v-for="(item, index) in imageList" :key="index" :src="item" alt />
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">巡检录音</p>
      <audio class="errItemFalseSb-box-item-audio" :src="recordingURL" controls></audio>
    </div>
    <div class="errItemFalseSb-box-item">
      <h1 class="errItemFalseSb-box-item-h1">维修信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.assignTime}}</p>
      <p class="errItemFalseSb-box-item-l">维修指派时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.groupName}}</p>
      <p class="errItemFalseSb-box-item-l">维修单位</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.repairName}}</p>
      <p class="errItemFalseSb-box-item-l">维修人</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">维修描述</p>
      <textarea readonly v-model="list.repairorderInfo" class="thing-miaosu" placeholder="请输入巡检描述"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
      <h3 class="errItemFalseSb-box-item-t">图片/视频</h3>
      <img v-for="(item, index) in repairorderImagesURL" :key="index" :src="item" alt />
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">巡检录音</p>
      <audio class="errItemFalseSb-box-item-audio" :src="repairorderRecordingURL" controls></audio>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">验收描述</p>
      <textarea v-model="successInfo" class="thing-miaosu" placeholder="请输入巡检描述"></textarea>
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
    <van-button :disabled="!rols1" @click="upload" color="#1089ff" class="btm-weixiu" type="danger">验收完成</van-button>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      pass: true,
      list: {},
      info: '',
      successInfo: ''
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
    showOrHide () {
      this.pass = !this.pass
    },
    async upload () {
      const { data } = await this.$ajax.post(`repairOrder/checkOrder?sid=${window.localStorage.getItem('token')}&type=1&status=${this.pass}`, {
        examine: this.successInfo,
        repairorderId: this.list.id
      })
      console.log(data)
      if (data.code === 200) {
        this.$router.go(-1)
      } else {
        this.$toast('验收失败')
      }
    }
  },
  mounted () {
    this.list = this.$route.query
    console.log(this.list)
  },
  computed: {
    ...mapState(['rols']),
    rols1 () {
      return this.rols.includes('repairOrder:checkOrder')
    },
    imageList () {
      if (this.list.checkImagesURL) {
        const arr = [];
        (this.list.checkImagesURL.split(',')).map((item) => {
          arr.push(this.$ajax.defaults.baseURL + 'images' + item)
        })
        return arr
      }
      return []
    },
    recordingURL () {
      if (this.list.checkRecordingURL) {
        return this.$ajax.defaults.baseURL + 'files' + this.list.checkRecordingURL
      }
      return ''
    },
    repairorderImagesURL () {
      if (this.list.repairorderImagesURL) {
        const arr = [];
        (this.list.repairorderImagesURL.split(',')).map((item) => {
          arr.push(this.$ajax.defaults.baseURL + 'images' + item)
        })
        return arr
      }
      return []
    },
    repairorderRecordingURL () {
      if (this.list.repairorderRecordingURL) {
        return this.$ajax.defaults.baseURL + 'files' + this.list.repairorderRecordingURL
      }
      return ''
    }
  }
}
</script>
<style scoped>

</style>
