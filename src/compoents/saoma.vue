<template>
  <div>
    <!-- 轮播图位置 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
    </van-swipe>

    <!-- 展示信息 -->
    <div class="message-box">
      <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l" style="font-weight: 400">测试位置</p>
        <p class="errItemFalseSb-box-item-r">{{saomaMessage.wholeTypeName}}</p>
      </div>
      <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">本次巡检日期</p>
        <p class="errItemFalseSb-box-item-r">{{dateMessage}}</p>
      </div>
      <div class="errItemFalseSb-box-item" @click="toMap">
        <p class="errItemFalseSb-box-item-l">上行 下行</p>
        <p class="errItemFalseSb-box-item-r" style="padding-right: 20px">
          桩号位置
          <van-icon name="arrow" class="my-icon-center" />
        </p>
      </div>
      <div class="errItemFalseSb-box-item" @click="goXunjian">
        <p class="errItemFalseSb-box-item-l">{{saomaMessage.createTime}}</p>
        <p class="errItemFalseSb-box-item-r" style="padding-right: 20px">
          巡检记录
          <van-icon name="arrow" class="my-icon-center" />
        </p>
      </div>
      <div class="errItemFalseSb-box-item" @click="goWeixiu()">
        <p class="errItemFalseSb-box-item-r" style="padding-right: 20px">
          维修记录
          <van-icon name="arrow" class="my-icon-center" />
        </p>
      </div>
      <van-radio-group v-model="radio">
        <div class="errItemFalseSb-box-item">
          <van-cell title="正常" clickable class="van-field-nopadding">
            <template #right-icon>
              <van-radio name="1" @click="handleErr('1')" />
            </template>
          </van-cell>
        </div>
        <div class="errItemFalseSb-box-item">
          <van-cell title="异常" clickable class="van-field-nopadding">
            <template #right-icon>
              <van-radio name="2" @click="handleErr('2')" />
            </template>
          </van-cell>
          <van-field
            v-show="showFlag"
            class="van-field-nopadding"
            readonly
            clickable
            label="异常等级"
            :value="value"
            placeholder="选择异常等级"
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
      </van-radio-group>

      <!-- 点击异常之后显示出来的 -->
      <div v-show="showFlag">
        <div class="errItemFalseSb-box-item">
          <p class="errItemFalseSb-box-item-l">图片/视频上传</p>
          <p class="errItemFalseSb-box-item-r">{{showImageList.length}}/5</p>
          <div class="image-box">
            <div class="image-box-show" v-for="(item, index) in showImageList" :key="index">
              <van-icon
                class="deleteImage"
                name="cross"
                @click="deleteImage(index)"
                color="#c81912"
              />
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
          <p class="errItemFalseSb-box-item-l">巡检描述</p>
          <textarea v-model="thingMessage" class="thing-miaosu" placeholder="请输入巡检描述"></textarea>
        </div>
      </div>

      <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">位置</p>
        <p class="errItemFalseSb-box-item-l">lat:{{saomaMessage.lat}}, lng:{{saomaMessage.lng}}</p>
        <span class="get-location-angin" @click="getLocationAngin">重新获取</span>
      </div>
      <div class="collection-map">
        <baidu-map class="map" :center="center" :zoom="15" :scroll-wheel-zoom="true">
          <bm-marker :position="center" :dragging="false"></bm-marker>
        </baidu-map>
      </div>
      <van-cell center title="更新巡检点位置">
        <template #right-icon>
          <van-switch v-model="checked" size="24" />
        </template>
      </van-cell>
      <van-button
        class="all-scroll"
        @click="uploadMessage"
        :loading="loadFlag"
        type="info"
        loading-text="提交中..."
      >完成巡检</van-button>
    </div>

    <!-- 弹出层 -->
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
      // 请求获取到的数据
      saomaMessage: {},

      // 时间
      dateMessage: '',

      radio: '1',
      value: '',
      showPicker: false,
      // 异常等级
      columns: ['1', '2', '3'],
      showFlag: false,

      // 存储相片
      showImageList: [],

      // 弹出框
      showToggle: false,
      toggleIndex: 0,

      // 加载条件
      loadFlag: false,

      // 当前位置信息
      center: { lng: 1, lat: 1 },

      // 开关选中的状态
      checked: false,

      // 录音Id
      voildId: '',

      // 巡检描述
      thingMessage: ''
    }
  },
  mounted () {
    // 配置微信接口
    this.util.wxConfig.call(this, wx)
    // 获取当前位置
    this.getLocationAngin()
    // 调用函数
    this.getSaomaMessage()
    this.getTestTime()
  },
  methods: {
    onConfirm (value) {
      this.value = value
      this.showPicker = false
    },
    handleErr (index) {
      if (index === '1') {
        this.showFlag = false
      } else {
        this.showFlag = true
      }
    },
    // 跳转到维修记录
    goWeixiu () {
      this.$router.push('/repairAll')
    },
    goXunjian () {
      this.$router.push('/recordAll')
    },
    // 获取后端数据函数
    async getSaomaMessage () {
      // 根据扫描出来的二维码id获取后端数据
      const { data: { data } } = await this.$ajax.get('QRcode/checkQRcode', {
        params: {
          sid: window.sessionStorage.getItem('token'),
          codeMessage: this.$store.state.saomaCodeId
        }
      })
      if (data) {
        this.saomaMessage = data[0]
        console.log(this.saomaMessage)
      } else {
        // 如果没有数据，则请求数据失败处理
      }
    },

    // 模版一加载时需要获取当前的时间戳
    getTestTime () {
      const dt = new Date()
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')

      const hh = (dt.getHours() + '').padStart(2, '0')
      const mm = (dt.getMinutes() + '').padStart(2, '0')
      const ss = (dt.getSeconds() + '').padStart(2, '0')
      this.dateMessage = `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    },

    // 跳转到地图页面
    toMap () {
      this.$router.push({
        path: '/map',
        name: '/map',
        query: {
          lat: this.saomaMessage.lat,
          lng: this.saomaMessage.lng
        }
      })
    },

    // 调用微信上传图片接口
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

    // 展示点击之后的图片
    toggleShowImg (index) {
      this.showToggle = true
      this.toggleIndex = index
    },

    // 重新获取定位
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

    // 提交数据
    async uploadMessage () {
      this.loadFlag = true
      const params = {}
      params.lng = this.center.lng
      params.lat = this.center.lat
      params.qrcodeId = this.saomaMessage.id
      params.isUpdate = this.checked
      if (this.radio === '1') {
        params.flag = 0
      } else {
        params.flag = 1
        params.abnormalGrade = this.value
        params.pics = this.showImageList
        params.record = this.voildId
        params.checkquestionInfo = this.thingMessage
      }
      const data = await this.$ajax.post('chkQuestion?sid=' + window.sessionStorage.getItem('token'), params)
      console.log(data)
      this.loadFlag = false
    },

    // 开始录音
    startVoild () {
      wx.startRecord()
    },
    // 停止录音
    endVoild () {
      const that = this
      wx.stopRecord({
        success: function (res) {
          var localId = res.localId
          console.log(localId)
          that.voildId = localId
        }
      })
    }
  }
}
</script>
<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
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
