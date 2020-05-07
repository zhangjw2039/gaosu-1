<template>
  <div class="record-box">
    <van-tabs v-model="active" @click="toggle">
      <van-tab title="未处理">
        <div class="van-tab-fen">
          <van-list>
            <!-- 未处理数据展示页面 -->
            <div class="van-list-box"  v-show="active1 === 0">
              <div class="van-list-box-message">
                <van-cell v-for="(item, index) in dataList1" :key="index" @click="goItem(item, '/errItemFalseSb')">
                  <p class="van-cell-title">
                    {{item.wholeTypeName}}
                  </p>
                  <p class="van-cell-date">{{item.checkquestionTime}}<van-icon name="arrow" /></p>
                </van-cell>
              </div>
              <div class="van-list-page">
                <van-pagination @change="changCurrentPage(1)" v-model="pageNum1" :page-count="Math.ceil(total1/10)" mode="simple" />
              </div>
            </div>

            <!-- 未处理随手报数据展示页面 -->
            <div class="van-list-box" v-show="active1 === 1">
              <div class="van-list-box-message">
                <van-cell v-for="(item, index) in dataList3" :key="index" @click="goItem(item, '/errItemFalsePe')">
                  <p class="van-cell-title">
                    {{item.ssbtype}}
                  </p>
                  <p class="van-cell-date">{{item.convenientlyTime}}<van-icon name="arrow" /></p>
                </van-cell>
              </div>
              <div class="van-list-page">
                <van-pagination @change="changCurrentPage(3)" v-model="pageNum3" :page-count="Math.ceil(total3/10)" mode="simple" />
              </div>
            </div>
          </van-list>
        </div>
      </van-tab>
      <!-- 已处理展示页面 -->
      <van-tab title="已处理">
        <div class="van-tab-fen">
          <van-list>
            <!-- 已经处理设备展示页面 -->
            <div class="van-list-box"  v-show="active1 === 0">
              <div class="van-list-box-message">
                <van-cell v-for="(item, index) in dataList2" :key="index" @click="goItem(item, '/errItemTrueSb')">
                  <p class="van-cell-title">
                    {{item.wholeTypeName}}
                  </p>
                  <p class="van-cell-date">{{item.checkquestionTime}}<van-icon name="arrow" /></p>
                </van-cell>
              </div>
              <div class="van-list-page">
                <van-pagination @change="changCurrentPage(2)" v-model="pageNum2" :page-count="Math.ceil(total2/10)" mode="simple" />
              </div>
            </div>

            <!-- 已经处理的随手报展示页面 -->
            <div class="van-list-box"  v-show="active1 === 1">
              <div class="van-list-box-message">
                <van-cell v-for="(item, index) in dataList4" :key="index" @click="goItem(item, '/errItemTruePe')">
                  <p class="van-cell-title">
                    {{item.ssbtype}}
                  </p>
                  <p class="van-cell-date">{{item.convenientlyTime}}<van-icon name="arrow" /></p>
                </van-cell>
              </div>
              <div class="van-list-page">
                <van-pagination @change="changCurrentPage(4)" v-model="pageNum4" :page-count="Math.ceil(total4/10)" mode="simple" />
              </div>
            </div>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
    <div>
      <van-tabbar v-model="active1" active-color="#07c160" inactive-color="#000">
        <van-tabbar-item icon="scan" @click="sildeStatus">设施</van-tabbar-item>
        <van-tabbar-item icon="icon iconfont icon-liaotiankuang" @click="sildeStatus">随手报</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 未处理和已处理之间的切换
      active: 0,
      // 设施和随手报之间的处理
      active1: 0,

      // 未处理设备数据
      dataList1: [],
      pageNum1: 1,
      total1: 1,

      // 已经处理的设备数据
      dataList2: [],
      pageNum2: 1,
      total2: 1,

      // 未处理的随手报
      dataList3: [],
      pageNum3: 1,
      total3: 1,

      // 处理的随手报
      dataList4: [],
      pageNum4: 1,
      total4: 1
    }
  },
  methods: {

    // 跳转路由
    goItem (item, path) {
      if (path === '/errItemFalseSb') {
        this.$router.push({
          path,
          name: path,
          query: item
        })
      } else if (path === '/errItemFalsePe') {
        this.$router.push({
          path,
          name: path,
          query: item
        })
      } else if (path === '/errItemTrueSb') {
        this.$router.push({
          path,
          name: path,
          query: item
        })
      } else {
        this.$router.push({
          path,
          name: path,
          query: item
        })
      }
    },

    // tab栏切换
    toggle () {

    },

    // 选择设备和随手报
    sildeStatus () {
      if (this.active === 0) {
        if (this.active1 === 0) {
          this.getData1(0, this.pageNum1)
        } else {
          this.getData2(0, this.pageNum3)
        }
      } else {
        if (this.active1 === 0) {
          this.getData1(1, this.pageNum2)
        } else {
          this.getData2(1, this.pageNum4)
        }
      }
    },

    // 获取设施数据
    async getData1 (handle = 0, pageNum = 1) {
      const { data } = await this.$ajax.get('http://192.168.0.80:9090/chkQuestion/list', {
        params: {
          sid: window.sessionStorage.getItem('token'),
          handle,
          pageNum,
          pageSize: 10
        }
      })
      console.log(data)
      if (data.code === 200) {
        if (handle === 0) {
          this.dataList1 = data.data.rows
          this.total1 = data.data.total
        } else {
          this.dataList2 = data.data.rows
          this.total2 = data.data.total
        }
      } else {
        this.$toast('获取数据失败')
      }
    },

    // 获取随手报信息
    async getData2 (handle = 0, pageNum = 1) {
      const { data } = await this.$ajax.get('http://192.168.0.80:9090/conveniently/list', {
        params: {
          sid: window.sessionStorage.getItem('token'),
          handle,
          pageNum,
          pageSize: 10
        }
      })
      console.log(data)
      if (data.code === 200) {
        if (handle === 0) {
          this.dataList3 = data.data.rows
          this.total3 = data.data.total
        } else {
          this.dataList4 = data.data.rows
          this.total4 = data.data.total
        }
      } else {
        this.$toast('获取数据失败')
      }
    },

    // 点击下一页
    changCurrentPage (index) {
      if (index === 1) {
        this.getData1(0, this.pageNum1)
      } else if (index === 2) {
        this.getData1(1, this.pageNum2)
      } else if (index === 3) {
        this.getData2(0, this.pageNum3)
      } else {
        this.getData2(1, this.pageNum4)
      }
    }

  },
  mounted () {
    this.getData1(0, 1)
    this.getData1(1, 1)
    this.getData2(0, 1)
    this.getData2(1, 1)
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
  transform: translateY(-50%)
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
