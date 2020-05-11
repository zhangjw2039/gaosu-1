<template>
  <div>
    <div class="errItemFalseSb-box-item" @click="toMap">
      <p class="errItemFalseSb-box-item-l">上报位置</p>
      <van-icon name="arrow" class="my-icon-nof-center" />
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">上下行</p>
      <p class="errItemFalseSb-box-item-r">{{list.upDown === 1? '上行': '下行'}}</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">责任单位</p>
      <p class="errItemFalseSb-box-item-r">{{list.groupName}}</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">上报时间</p>
      <p class="errItemFalseSb-box-item-r">{{list.repairorderUpTime}}</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">上报人</p>
      <p class="errItemFalseSb-box-item-r">{{list.sbName}}</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <h3 class="errItemFalseSb-box-item-t">图片</h3>
      <img src="../../assets/image/ad35c8d7ly1fnctsb3hvpj22yo1uou10.jpg" alt />
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">录音</p>
      <audio class="errItemFalseSb-box-item-audio" src controls></audio>
    </div>
    <div class="errItemFalseSb-box-item">
      <h3 class="errItemFalseSb-box-item-t">上报描述</h3>
      <textarea v-model="list.convenientlyInfo" readonly class="thing-miaosu" placeholder="描述"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">维修单位</p>
      <p class="errItemFalseSb-box-item-r">{{list.groupName}}</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">指派时间</p>
      <p class="errItemFalseSb-box-item-r">{{list.assignTime}}</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">规定完成时间</p>
      <p class="errItemFalseSb-box-item-r">{{list.assignCompletionTime}}</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">维修方案</p>
      <textarea readonly v-model="list.maintenanceinfo" class="thing-miaosu" placeholder="维修方案"></textarea>
    </div>
    <!-- 上传图片 -->
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">图片</p>
      <p class="errItemFalseSb-box-item-r">{{showImageList.length}}/5</p>
      <div class="image-box">
        <div class="image-box-show" v-for="(item, index) in showImageList" :key="index">
          <van-icon class="deleteImage" name="cross" @click="deleteImage(index)" color="#c81912" />
          <img src="item" alt />
        </div>
        <div v-show="showImageList.length !== 5" class="add-image" @click="getImage"></div>
      </div>
    </div>
    <!-- 录音 -->
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">录 音</p>
      <van-button
        @click="endVoild"
        class="errItemFalseSb-box-item-r button-small"
        type="default"
      >停止录音</van-button>
      <van-button
        @click="startVoild"
        class="errItemFalseSb-box-item-r button-small"
        type="primary"
      >开始录音</van-button>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">维修描述</p>
      <textarea v-model="info" class="thing-miaosu" placeholder="维修方案"></textarea>
    </div>
    <van-button :loading="loading" :disabled="!rols1" class="btm-msg" type="primary" @click="upload">完成维修</van-button>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // pics
      showImageList: [],
      //   录音
      localId: '',
      info: '',
      list: {},
      loading: false
    }
  },
  methods: {
    //   微信上传图片接口
    getImage () {
      wx.ready(() => {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: res => {
            if (res.localIds) {
              this.showImageList.push(res.localIds[0])
            }
          }
        })
      })
      wx.error(function (res) {})
    },
    // 删除图片
    deleteImage (index) {
      this.showImageList.splice(index, 1)
    },
    // 上传录音
    endVoild () {
      const that = this
      wx.stopRecord({
        success: function (res) {
          var localId = res.localId
          console.log(localId)
          that.voildId = localId
        }
      })
    },
    startVoild () {
      wx.startRecord()
    },
    // 上传数据
    async upload () {
      if (this.localId === '' || this.showImageList.length === 0 || this.info.trim() === '') {
        this.$toast('信息不全')
        return
      }
      this.loading = true
      const { data } = await this.$ajax.post(`repairOrder/complete?sid=${window.localStorage.getItem('token')}&type=2`, {
        id: this.list.id,
        record: this.localId,
        pics: this.showImageList,
        repairorderInfo: this.info,
        assignId: this.list.assignId
      })
      console.log(data)
      if (data.code === 200) {
        this.$toast('维修完成')
        this.$router.go(-2)
      } else {
        this.$toast('维修提交失败')
      }
      this.loading = false
    },
    toMap () {
      this.$router.push({
        path: '/map',
        name: '/map',
        query: {
          lat: this.list.lat,
          lng: this.list.lng
        }
      })
    }
  },
  mounted () {
    //   配置微信接口
    this.util.wxConfig.call(this, wx)
    this.list = this.$route.query
    console.log(this.list)
  },
  computed: {
    ...mapState(['rols']),
    rols1 () {
      return this.rols.includes('repairOrder:complete')
    }
  }
}
</script>
<style scoped>
.image-box {
  margin-top: 28px;
  height: 60px;
  padding: 0 10px;
  display: flex;
}
.add-image {
  position: relative;
  box-sizing: border-box;
  height: 60px;
  width: 60px;
  border: 1px solid #ccc;
  line-height: 60px;
  text-align: center;
}
.add-image::before {
  content: "";
  position: absolute;
  width: 100%;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 1px;
  background: #ccc;
}
.add-image::after {
  content: "";
  position: absolute;
  width: 1px;
  height: 100% !important;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  height: 1px;
  background: #ccc;
}
.image-box-show {
  position: relative;
  margin-right: 10px;
  width: 60px;
  height: 100%;
}
.image-box-show img {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
}
.deleteImage {
  position: absolute !important;
  top: 0;
  right: 0;
  font-weight: 200;
}
.button-small {
  height: 20px;
  font-size: 10px;
  line-height: 20px;
  margin-right: 10px;
}
</style>
