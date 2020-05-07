<template>
  <div class="collection-box">
    <div class="top-title">
      <p>设施采集</p>
    </div>
    <div class="collection-form">
      <van-field v-model="name" label="巡检点名称" placeholder="请输入巡检设备名称" />
      <van-field
        readonly
        clickable
        :value="typeName"
        label="类型"
        placeholder="请选择类型"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </van-popup>
      <div class="colletion-location">
        <van-field label="设施位置" readonly></van-field>
        <span class="colletion-angin" @click="getLocationAngin">重新获取</span>
      </div>
      <div class="collection-map">
        <baidu-map class="map" :center="center" :zoom="15" :scroll-wheel-zoom="true">
          <bm-marker
            :position="center"
            :dragging="false"
          >
          </bm-marker>
        </baidu-map>
      </div>
      <div class="uploadImg">
        <div class="uploadImg-title">
          <span>图片上传</span>
          <span>{{showImageList.length}}/5</span>
        </div>
        <div class="image-box">
          <div class="image-box-show" v-for="(item, index) in showImageList" :key="index">
            <van-icon class="deleteImage" name="cross" @click="deleteImage(index)" color="#c81912"/>
            <img @click="toggleShowImg(index)" :src="item" alt="">
          </div>
          <div v-show="showImageList.length !== 5" class="add-image" @click="getImage">
            <van-icon name="plus" size="60px" />
          </div>
        </div>
      </div>
    </div>
    <van-button class="van-btn-80" type="primary" @click="uploadImageData">完成采集</van-button>
    <!-- 弹出层 -->
    <van-popup v-model="showToggle">
      <div>
        <img class="showToggl-img" alt="">
      </div>
    </van-popup>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      // 地理位置信息
      // center: { lng: '', lat: '' },
      center: { lng: 116.404, lat: 39.915 },

      // 用于存放的信息
      columnsAll: [],
      name: '',
      typeName: '',
      columns: [],

      // 选择框是否展示
      showPicker: false,

      // 图片上传
      fileList: [],

      // 图片预览的数组
      showImageList: [],
      showToggle: false,
      toggleIndex: 0
    }
  },
  methods: {
    //   获取地理位置
    getLocation () {
      const that = this
      wx.ready(function () {
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: (res) => {
            that.center.lng = res.longitude
            that.center.lat = res.latitude
          }
        })
      })
      wx.error(function (res) {})
    },
    onConfirm (value) {
      this.typeName = value
      this.showPicker = false
    },
    onCancel () {
      this.showPicker = false
    },
    // 重新获取地理位置
    getLocationAngin () {
      this.getLocation()
    },

    // 上传图片
    getImage () {
      const that = this
      wx.ready(function () {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            if (res.localIds) {
              that.showImageList.push(res.localIds[0])
            }
          }
        })
      })
      wx.error(function (res) {})
    },

    // 删除预览图片
    deleteImage (index) {
      this.showImageList.splice(index, 1)
    },

    // 全屏展示图片
    toggleShowImg (index) {
      this.showToggle = true
      this.toggleIndex = index
    },

    // 获取类型数据
    async getColumns () {
      const res = await this.$ajax.get('wholetype/child?sid=' + window.sessionStorage.getItem('token'))
      console.log(res)
      var { data: { data } } = res
      this.columnsAll = data
      data.forEach((item) => {
        this.columns.push(item.wholeTypeName)
      })
      console.log(data)
    },
    // 提交填写好的信息
    async uploadImageData () {
      // if (this.name.trim() === '' || this.typeName.trim() === '' || this.showImageList.length === 0) {
      //   this.$toast('请将信息填写完整')
      //   return
      // }
      var parms = {}
      parms.codeMessage = this.$store.state.qrCodeId
      parms.wholeName = this.name
      // parms.wholeType = this.typeName
      parms.lng = this.center.lng
      parms.lat = this.center.lat
      parms.pics = this.showImageList
      parms.parentIds = this.columnsAll[this.columns.indexOf(this.typeName)].parentIds
      const data = await this.$ajax.post('QRcode/bindQRcode?sid=' + window.sessionStorage.getItem('token'), parms)
      console.log(data)
    }
  },
  mounted () {
    // 页面加载之前请求微信接口
    this.util.wxConfig.call(this, wx)
    this.getLocation()

    // 页面加载之前请求后端数据
    this.getColumns()
  }
}
</script>
<style scoped>
.top-title {
  text-align: center;
  color: #21bf73;
  font-size: 25px;
}
.top-title p {
  margin-top: 30px;
}

.colletion-location {
  position: relative;
}
.colletion-angin {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  box-sizing: border-box;
  border-left: 1px solid #ebedf0;
  padding: 10px 10px;
  color: #21bf73;
}
.collection-map {
  height: 160px;
}
.collection-map .map {
  height: 100%;
}
.uploadImg {
  padding: 0px 16px 10px;
  margin: 10px;
  border-top: 1px solid #ebedf0;
  border-bottom: 1px solid #ebedf0;
}
.uploadImg-title {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #323233;
}
.add-image {
  height: 60px;
  width: 60px;
  border: 1px solid #ccc;
  line-height: 60px;
  text-align: center;
}
.image-box {
  display: flex;
}
.image-box-show {
  position: relative;
  height: 60px;
  width: 60px;
  border: 1px solid #ccc;
  margin-right: 10px;
}
.image-box-show img {
  display: block;
  width: 100%;
  height: 100%;
}
.deleteImage {
  position: absolute!important;
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
  background: red;
}
.van-btn-80 {
  width: 80%;
  margin-left: 10%;
}
</style>
