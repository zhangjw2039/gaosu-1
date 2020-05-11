<template>
  <div class="record-box">
    <van-tabs v-model="active" @click="toggle">
      <van-tab title="维修单">
        <div class="van-tab-fen">
          <van-list>
            <!-- 维修单这杯展示页面 -->
            <div class="van-list-box" v-show="active1 === 0">
              <div class="van-list-box-message">
                <van-cell v-for="(item, index) in dataList3" :key="index" @click="goMessage(item, '/repairItemweixiudan')">
                  <p class="van-cell-title">{{item.wholeTypeName}}</p>
                  <p class="van-cell-date">{{item.checkquestionTime}}</p>
                </van-cell>
              </div>
              <div class="van-list-page">
                <van-pagination @change="changePage(3)" v-model="pageNum3" :page-count="Math.ceil(total3/10)" mode="simple" />
              </div>
            </div>

            <!-- 指派审核随手报展示数据 -->
            <div class="van-list-box" v-show="active1 === 1">
              <div class="van-list-box-message">
                <van-cell v-for="(item, index) in dataList4" :key="index" @click="goMessage(item, '/repairItemwxdp')">
                  <p class="van-cell-title">{{item.ssbtype}}</p>
                  <p class="van-cell-date">{{item.assignTime}}</p>
                </van-cell>
              </div>
              <div class="van-list-page">
                <van-pagination @change="changePage(4)" v-model="pageNum4" :page-count="Math.ceil(total4/10)" mode="simple" />
              </div>
            </div>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="维修验收">
        <div class="van-tab-fen">
          <van-list>
            <!-- 维修验收设备展示页面 -->
            <div class="van-list-box" v-show="active1 === 0">
              <div class="van-list-box-message">
                <van-cell v-for="(item, index) in dataList5" :key="index" @click="goMessage(item, '/repairItemyanshousb')">
                  <p class="van-cell-title">{{item.wholeTypeName}}</p>
                  <p class="van-cell-date">{{item.checkquestionTime}}</p>
                </van-cell>
              </div>
              <div class="van-list-page">
                <van-pagination @change="changePage(5)" v-model="pageNum5" :page-count="Math.ceil(total5/10)" mode="simple" />
              </div>
            </div>
            <!-- 维修验收随后报展示页面 -->
            <div class="van-list-box" v-show="active1 === 1">
              <div class="van-list-box-message">
                <van-cell v-for="(item, index) in dataList6" :key="index" @click="goMessage(item, '/repairItemyanshoupe')">
                  <p class="van-cell-title">{{item.ssbtype}}</p>
                  <p class="van-cell-date">{{item.assignTime}}</p>
                </van-cell>
              </div>
              <div class="van-list-page">
                <van-pagination @change="changePage(6)" v-model="pageNum6" :page-count="Math.ceil(total6/10)" mode="simple" />
              </div>
            </div>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="已维修">
        <div class="van-tab-fen">
          <van-list>
            <!-- 已维修设备展示页面 -->
            <div class="van-list-box" v-show="active1 === 0">
              <div class="van-list-box-message">
                <van-cell v-for="(item, index) in dataList7" :key="index" @click="goMessage(item, '/repairItemywxsb')">
                  <p class="van-cell-title">{{item.wholeTypeName}}</p>
                  <p class="van-cell-date">{{item.checkquestionTime}}</p>
                </van-cell>
              </div>
              <div class="van-list-page">
                <van-pagination @change="changePage(7)" v-model="pageNum7" :page-count="Math.ceil(total7/10)" mode="simple" />
              </div>
            </div>
            <!-- 已维修随手报展示页面 -->
            <div class="van-list-box" v-show="active1 === 1">
              <div class="van-list-box-message">
                <van-cell v-for="(item, index) in dataList8" :key="index" @click="goMessage(item, '/repairItemywxpe')">
                  <p class="van-cell-title">{{item.ssbtype}}</p>
                  <p class="van-cell-date">{{item.assignTime}}</p>
                </van-cell>
              </div>
              <div class="van-list-page">
                <van-pagination @change="changePage(8)" v-model="pageNum8" :page-count="Math.ceil(total8/10)" mode="simple" />
              </div>
            </div>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
    <van-tabbar v-model="active1" active-color="#07c160" inactive-color="#000">
      <van-tabbar-item icon="scan" @click="sildeStatus('shebei')">设施</van-tabbar-item>
      <van-tabbar-item icon="icon iconfont icon-liaotiankuang" @click="sildeStatus('people')">随手报</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 1,
      active1: 0,

      // 维修单设备数据
      dataList3: [],
      pageNum3: 1,
      total3: 1,
      // 维修单随手报数
      dataList4: [],
      pageNum4: 1,
      total4: 1,
      // 维修验收设备数据
      dataList5: [],
      pageNum5: 1,
      total5: 1,
      // 维修验收随手报数据
      dataList6: [],
      pageNum6: 1,
      total6: 1,
      // 已维修设备报数据
      dataList7: [],
      pageNum7: 1,
      total7: 1,
      // 已维修随手报数据
      dataList8: [],
      pageNum8: 1,
      total8: 1
    }
  },
  methods: {
    goItem (item) {},
    sildeStatus () {},
    toggle () {},
    // 切换下一页
    changePage (index) {
      if (index === 3) {
        this.getSbData(0, this.pageNum3)
      } else if (index === 4) {
        this.getPeData(0, this.pageNum4)
      } else if (index === 5) {
        this.getSbData(1, this.pageNum5)
      } else if (index === 6) {
        this.getPeData(1, this.pageNum6)
      } else if (index === 7) {
        this.getSbData(3, this.pageNum7)
      } else {
        this.getPeData(3, this.pageNum8)
      }
    },
    // 跳转到设备指派审核
    goMessage (item, path) {
      this.$router.push({
        path,
        query: item
      })
    },
    // 获取设备数据
    async getSbData (state, pageNum = 1) {
      const { data } = await this.$ajax.get('repairOrder/checkList', {
        params: {
          sid: window.localStorage.getItem('token'),
          pageNum,
          pageSize: 10,
          handle: state
        }
      })
      console.log(data)
      if (data.code === 200) {
        if (state === 0) { // 获取的是维修单设备数据
          this.dataList3 = data.data.rows
          this.total3 = data.data.total
        } else if (state === 1) { // 获取的是维修验收的设备数据
          this.dataList5 = data.data.rows
          this.total5 = data.data.total
        } else { // 获取的已维修的设备数据
          this.dataList7 = data.data.rows
          this.total7 = data.data.total
        }
      } else {
        this.$toast('获取数据失败')
      }
    },
    // 获取随手报数据
    async getPeData (state, pageNum = 1) {
      const { data } = await this.$ajax.get('repairOrder/reportList', {
        params: {
          sid: window.localStorage.getItem('token'),
          pageNum,
          pageSize: 10,
          handle: state
        }
      })
      console.log(data)
      if (data.code === 200) {
        if (state === 0) { // 获取的是维修单的随手报的数据
          this.dataList4 = data.data.rows
          this.total4 = data.data.total
        } else if (state === 1) { // 获取的是维修验收的随手报数据
          this.dataList6 = data.data.rows
          this.total6 = data.data.total
        } else { // 获取的是已维修的随手报数据
          this.dataList8 = data.data.rows
          this.total8 = data.data.total
        }
      } else {
        this.$toast('获取数据失败')
      }
    }
  },
  computed: {},
  mounted () {
    // 获取指派审核设备信息
    this.getSbData(4)
    this.getPeData(4)
    this.getSbData(0)
    this.getPeData(0)
    this.getSbData(1)
    this.getPeData(1)
    this.getSbData(3)
    this.getPeData(3)
  }
}
</script>
<style scoped>
.record-box {
  height: 100%;
}
.van-tab-fen {
  height: 100%;
}
.van-list {
  height: 100%;
}
.van-cell-title,
.van-cell-date {
  position: relative;
  margin: 10px 0;
}
.van-cell-title {
  float: left;
  margin-left: 30px;
}
.van-cell-date {
  float: right;
  margin-right: 15px;
}
.isRed {
  color: red;
}
/deep/.van-info {
  top: 4px !important;
  right: -17px !important;
}
/deep/.van-tabs__content {
  height: calc(100% - 94px) !important;
}

.van-icon {
  position: absolute;
  top: 50%;
  right: -19px;
  transform: translateY(-50%);
}
.van-list-box {
  height: 100%;
  position: relative;
}
.van-list-page {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
.van-list-box-message {
  height: calc(100% - 40px) !important;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
