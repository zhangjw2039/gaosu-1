<template>
  <div class="record-box">
    <van-tabs v-model="active">
      <van-tab class="my-record" title="我的记录">
          <div class="van-tab-fen">
          <van-list>
            <div class="van-list-box">
              <div class="van-list-box-message">
                <van-cell v-for="(item, index) in dataList1" :key="index" @click="goItem(item)">
                  <p :class="'van-cell-title ' + (item.flag ===1? 'isRed':'')">
                    {{item.wholeTypeName}}
                  </p>
                  <p class="van-cell-date">
                    {{item.checkquestionTime}}
                    <van-icon name="arrow" /></p>
                </van-cell>
              </div>
              <div class="van-list-page">
                <van-pagination @change="changCurrentPage(1)" v-model="pageNum1" :page-count="Math.ceil(total1/10)" mode="simple" />
              </div>
            </div>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="分组记录">
        <div class="van-tab-fen">
          <van-list>
            <div class="van-list-box">
              <div class="van-list-box-message">
                <van-cell v-for="(item, index) in dataList2" :key="index" @click="goItem(item)">
                  <p :class="'van-cell-title ' + (item.flag ===1? 'isRed':'')">
                    {{item.wholeTypeName}}
                  </p>
                  <p class="van-cell-date">
                    {{item.checkquestionTime}}
                    <van-icon name="arrow" /></p>
                </van-cell>
              </div>
              <div class="van-list-page">
                <van-pagination @change="changCurrentPage(2)" v-model="pageNum2" :page-count="Math.ceil(total2/10)" mode="simple" />
              </div>
            </div>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 0,
      dataList1: [],
      pageNum1: 1,
      total1: 1,
      dataList2: [],
      pageNum2: 1,
      total2: 1
    }
  },
  methods: {
    goItem (item) {
      console.log(item)
      this.$router.push({
        path: '/recordAllItem',
        name: '/recordAllItem',
        query: item
      })
    },
    // 获取我的记录数据
    async getMyData (pageNum = 1) {
      const { data } = await this.$ajax.get('chkQuestion/my', {
        params: {
          sid: window.sessionStorage.getItem('token'),
          pageNum
        }
      })
      console.log(data)
      if (data.code === 200) {
        this.dataList1 = data.data.rows
        this.total1 = data.data.total
      } else {
        this.$toast('获取数据失败')
      }
    },
    // 获取我的小组数据
    async getMyTeamData (pageNum = 1) {
      const { data } = await this.$ajax.get('chkQuestion/myGroup', {
        params: {
          sid: window.sessionStorage.getItem('token'),
          pageNum
        }
      })
      console.log(data)
      if (data.code === 200) {
        this.$toast('获取数据成功')
        this.dataList2 = data.data.rows
        this.total2 = data.data.total
      } else {
        this.$toast('获取数据失败')
      }
    },
    changCurrentPage (index) {
      if (index === 1) {
        this.getMyData(this.pageNum1)
      } else {
        this.getMyTeamData(this.pageNum2)
      }
    }
  },
  mounted () {
    this.getMyData()
    this.getMyTeamData()
  }
}
</script>
<style scoped>
.record-box {
  height: 100%;
}
.van-tab-fen {
  overflow: scroll;
  height: 100%;
}
.van-cell {
    padding: 0;
}
.van-cell-title, .van-cell-date {
    margin: 10px 0;
}
.van-cell-title {
    float: left;
    margin-left: 10px;
}
.van-cell-date {
    float: right;
    margin-right: 15px;
}
.isRed {
    color: red;
}
/deep/.van-info{
    top: 4px!important;
    right: -17px!important;
}
.van-list {
  height: 100%;
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
