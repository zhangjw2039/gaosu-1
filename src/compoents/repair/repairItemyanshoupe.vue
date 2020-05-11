<template>
  <div>
    <div class="errItemFalseSb-box-item">
      <h1 class="errItemFalseSb-box-item-h1">上报信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.groupName}}</p>
      <p class="errItemFalseSb-box-item-l">责任单位</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.convenientlyTime}}</p>
      <p class="errItemFalseSb-box-item-l">上报时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">上报描述</p>
      <textarea readonly v-model="list.convenientlyInfo" class="thing-miaosu" placeholder="请输入巡检描述"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
      <h3 class="errItemFalseSb-box-item-t">上报照片</h3>
      <img v-for="(item, index) in imageList" :key="index" :src="item" alt />
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">巡检录音</p>
      <audio class="errItemFalseSb-box-item-audio" :src="recordingURL" controls></audio>
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
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">指派描述</p>
      <textarea readonly v-model="list.examineInfo" class="thing-miaosu"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.groupName}}</p>
      <p class="errItemFalseSb-box-item-l">指派维修单位</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <h1 class="errItemFalseSb-box-item-h1">指派审核信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.shName}}</p>
      <p class="errItemFalseSb-box-item-l">指派审核人</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.examineTime}}</p>
      <p class="errItemFalseSb-box-item-l">指派审核时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">审核描述</p>
      <textarea readonly v-model="list.examineInfo" class="thing-miaosu"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
      <h1 class="errItemFalseSb-box-item-h1">维修信息</h1>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.repairName}}</p>
      <p class="errItemFalseSb-box-item-l">维修人</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.startTime}}</p>
      <p class="errItemFalseSb-box-item-l">维修开始时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-r">{{list.endTime}}</p>
      <p class="errItemFalseSb-box-item-l">维修结束时间</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <h3 class="errItemFalseSb-box-item-t">维修照片</h3>
      <img v-for="(item, index) in repairorderImagesURL" :key="index" :src="item" alt />
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">维修录音</p>
      <audio class="errItemFalseSb-box-item-audio" :src="repairorderRecordingURL" controls></audio>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">维修描述</p>
      <textarea readonly v-model="list.repairorderInfo" class="thing-miaosu"></textarea>
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
      info: ''
    }
  },
  methods: {
    showOrHide () {
      this.pass = !this.pass
    },
    async upload () {
      const data = await this.$ajax.post(`repairOrder/checkOrder?sid=${window.localStorage.getItem('token')}&type=2&status=${this.pass}`, {
        examine: this.info,
        repairorderId: this.list.id
      })
      console.log(data)
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
      if (this.list.convenientlyImagesURL) {
        const arr = [];
        (this.list.convenientlyImagesURL.split(',')).map((item) => {
          arr.push(this.$ajax.defaults.baseURL + 'images' + item)
        })
        return arr
      }
      return []
    },
    recordingURL () {
      if (this.list.convenientlyRecordingURL) {
        return this.$ajax.defaults.baseURL + 'files' + this.list.convenientlyRecordingURL
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
