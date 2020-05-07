<template>
  <div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">lat:{{list.lat}}, lng:{{list.lng}}</p>
      <p class="errItemFalseSb-box-item-r" style="padding-right: 12px">桩号位置
         <van-icon name="arrow" class="my-icon-center" />
      </p>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">设施异常详情</p>
      <van-icon name="arrow" class="my-icon-nof-center" />
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">{{list.assignTime}}</p>
      <p class="errItemFalseSb-box-item-r">指派时间</p>
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
      <textarea v-model="info" class="thing-miaosu" placeholder="维修描述"></textarea>
    </div>
    <van-button class="btm-msg" type="primary" @click="upload">完成维修</van-button>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      // pics
      showImageList: [],
      //   录音
      localId: '',
      info: '',
      list: {}
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
      const { data } = await this.$ajax.post(`repairOrder/complete?sid=${window.sessionStorage.getItem('token')}&type=1`, {
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
    }
  },
  mounted () {
    //   配置微信接口
    this.util.wxConfig.call(this, wx)
    this.list = this.$route.query
    console.log(this.list)
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
