<template>
  <div>
    <div class="errItemFalseSb-box-item">
      <van-field
        class="van-field-nopadding"
        readonly
        clickable
        label="随手报类型"
        :value="value"
        placeholder="请选择类型"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
    </div>
    <van-cell-group>
      <van-field
        readonly
        clickable
        label="桩号"
        :value="value1"
        placeholder="请选择类型"
        @click="showPicker1 = true"
      />
      <van-popup v-model="showPicker1" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns1"
          @cancel="showPicker1 = false"
          @confirm="onConfirm1"
        />
      </van-popup>
    </van-cell-group>
    <!-- <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l" style="font-weight: 400">所属责任单位</p>
    </div> -->
    <div class="errItemFalseSb-box-item">
      <textarea v-model="info" class="thing-miaosu" placeholder="请输入描述"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">图片/视频上传</p>
      <p class="errItemFalseSb-box-item-r">{{showImageList.length}}/5</p>
      <div class="image-box">
        <div class="image-box-show" v-for="(item, index) in showImageList" :key="index">
          <van-icon class="deleteImage" name="cross" @click="deleteImage(index)" color="#c81912" />
          <img src="item" alt @click="toggleShowImg(index)" />
        </div>
        <div v-show="showImageList.length !== 5" class="add-image" @click="getImage"></div>
      </div>
    </div>
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
      <p class="errItemFalseSb-box-item-l">位置</p>
      <p class="errItemFalseSb-box-item-l"></p>
      <span class="get-location-angin" @click="getLocationAngin">重新获取</span>
    </div>
    <div class="collection-map">
      <baidu-map class="map" :center="center" :zoom="15" :scroll-wheel-zoom="true">
        <bm-marker :position="center" :dragging="false"></bm-marker>
      </baidu-map>
    </div>
    <van-button class="all-scroll" @click="uploadMessage" :loading="loadFlag" type="info" loading-text="提交中...">上报</van-button>
    <van-popup v-model="showToggle">
      <div>
        <img :src="showImageList[toggleIndex]" class="showToggl-img" alt />
      </div>
    </van-popup>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      value: '',
      value1: '',
      showPicker: false,
      showPicker1: false,
      columns: ['路面', '绿化', '自定义'],
      columns1: ['上行', '下行'],

      // 信息描述
      info: '',

      // 照片id
      showImageList: [],

      //   loading
      loadFlag: false,

      //   地图位置
      center: { lng: 1, lat: 1 },

      // 展示图片
      showToggle: false,
      toggleIndex: 0,

      // 录音id
      voildId: ''

    }
  },
  methods: {
    onConfirm (value) {
      this.value = value
      this.showPicker = false
    },
    onConfirm1 (value) {
      this.value1 = value
      this.showPicker1 = false
    },

    // 删除照片
    deleteImage (index) {
      this.showImageList.splice(index, 1)
    },

    // 获取照片
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

    // 停止录音
    endVoild () {
      const that = this
      wx.stopRecord({
        success: function (res) {
          var localId = res.localId
          console.log(localId)
          that.voildId = localId
          that.$toast('结束录音')
        }
      })
    },

    // 开始录音
    startVoild () {
      wx.startRecord()
      this.$toast('开始录音')
    },

    // 获取地理位置
    getLocationAngin () {
      const that = this
      wx.ready(function () {
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: res => {
            that.center.lng = res.longitude
            that.center.lat = res.latitude
          }
        })
      })
      wx.error(function (res) {})
    },

    // 展示图片
    toggleShowImg (index) {
      this.showToggle = true
      this.toggleIndex = index
    },

    // 提交数据
    async uploadMessage () {
      this.loadFlag = true
      if (this.info.trim() === '' || this.value1.trim() === '' || this.showImageList.length === 0 || this.voildId === '') {
        this.$toast('信息不完整')
        this.loadFlag = false
        return false
      }
      var params = {}
      params.convenientlyType = 1
      params.convenientlyInfo = this.info
      params.upDown = this.value1 === '上行' ? 1 : 2
      params.pics = this.showImageList
      params.record = this.voildId
      params.lng = this.center.lng
      params.lat = this.center.lat
      console.log(params)
      const { data } = await this.$ajax.post('conveniently?sid=' + window.localStorage.getItem('token'), params)
      console.log(data)
      if (data.code === 200) {
        this.$toast('上报成功')
        this.loadFlag = false
        this.$router.go(-1)
      } else {
        this.$toast('数据提交异常')
      }
    }

  },
  mounted () {
    this.util.wxConfig.call(this, wx)
    this.getLocationAngin()
  }
}
</script>
<style scoped>
.van-field-nopadding {
  padding: 0 10px !important;
}
.van-cell:not(:last-child)::after {
  border: 0 !important;
}
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
.van-popup {
  width: 100%;
}
.showToggl-img {
  display: block;
  width: 100%;
  height: 200px;
}
.get-location-angin {
  position: absolute;
  padding-left: 10px;
  top: 10px;
  right: 10px;
  border-left: 1px solid #ebedf0;
  color: #21bf73;
}
.collection-map {
  height: 160px;
}
.collection-map .map {
  height: 100%;
}
.showToggl-img {
  width: 100%;
}
.all-scroll {
  width: 100%;
  margin: 10px 0 !important;
}
.button-small {
  height: 20px;
  font-size: 10px;
  line-height: 20px;
  margin-right: 10px;
}
</style>
