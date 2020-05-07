<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
    </van-swipe>

    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">{{list.wholeTypeName}}</p>
        <p class="errItemFalseSb-box-item-r">名称</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">{{list.wholeTypeName}}</p>
        <p class="errItemFalseSb-box-item-r">属性</p>
    </div>
    <div class="errItemFalseSb-box-item" @click="toMap">
        <p class="errItemFalseSb-box-item-r" style="padding-right: 12px">桩号位置
            <van-icon name="arrow" class="my-icon-center" />
        </p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p class="errItemFalseSb-box-item-l">{{list.groupName}}</p>
        <p class="errItemFalseSb-box-item-r">责任单位</p>
    </div>
    <div class="errItemFalseSb-box-item">
        <p :class="'errItemFalseSb-box-item-l '+(list.flag === 1? 'font-red': 'font-green')">{{list.flag === 1? '异常': '正常'}}</p>
        <p class="errItemFalseSb-box-item-r">设施状态</p>
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
  methods: {
    toMap () {
      this.$router.push({
        path: '/map',
        query: {
          lat: this.list.lat,
          lng: this.list.lng
        }
      })
    }
  },
  mounted () {
    this.list = this.$route.query
    console.log(this.list)
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
</style>
