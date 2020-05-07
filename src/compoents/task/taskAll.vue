<template>
  <div class="record-box">
    <van-tabs v-model="active">
      <van-tab class="my-record" title="待巡" :badge="getRedNum">
          <div class="van-tab-fen">
          <van-list>
            <van-cell v-for="(item, index) in list2" :key="index">
                <p class="van-cell-title">{{item.title}}</p>
                <p class="van-cell-date">{{item.data}}</p>
            </van-cell>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="已巡">
        <div class="van-tab-fen">
          <van-list>
            <van-cell v-for="(item, index) in list" :key="index">
                <p class="van-cell-title">{{item.title}}</p>
                <p class="van-cell-date">{{item.date}}</p>
            </van-cell>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="未巡">
        <div class="van-tab-fen">
          <van-list>
            <van-cell v-for="(item, index) in list3" :key="index">
                <p class="van-cell-title">{{item.title}}</p>
                <p class="van-cell-date">{{item.data}}</p>
            </van-cell>
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
      list: [
        { title: '待巡', date: 1, status: true },
        { title: '待巡', date: 1, status: false },
        { title: '待巡', date: 1, status: true },
        { title: '待巡', date: 1, status: false },
        { title: '待巡', date: 1, status: true },
        { title: '待巡', date: 1, status: false },
        { title: '待巡', date: 1, status: true },
        { title: '待巡', date: 1, status: false },
        { title: '待巡', date: 1, status: false },
        { title: '待巡', date: 1, status: true },
        { title: '待巡', date: 1, status: false },
        { title: '待巡', date: 1, status: true },
        { title: '待巡', date: 1, status: false },
        { title: '待巡', date: 1, status: false },
        { title: '待巡', date: 1, status: true },
        { title: '待巡', date: 1, status: false },
        { title: '待巡', date: 1, status: false },
        { title: '待巡', date: 1, status: true },
        { title: '待巡', date: 1, status: false },
        { title: '待巡', date: 1, status: true },
        { title: '待巡', date: 1, status: false },
        { title: '待巡', date: 1, status: false },
        { title: '待巡', date: 1, status: true }
      ],
      list2: [
        { title: '已巡', data: 2, status: false },
        { title: '已巡', data: 2, status: true },
        { title: '已巡', data: 2, status: false },
        { title: '已巡', data: 2, status: true },
        { title: '已巡', data: 2, status: true },
        { title: '已巡', data: 2, status: true },
        { title: '已巡', data: 2, status: true },
        { title: '已巡', data: 2, status: true },
        { title: '已巡', data: 2, status: false },
        { title: '已巡', data: 2, status: false },
        { title: '已巡', data: 2, status: false },
        { title: '已巡', data: 2, status: true },
        { title: '已巡', data: 2, status: false },
        { title: '已巡', data: 2, status: false },
        { title: '已巡', data: 2, status: true },
        { title: '已巡', data: 2, status: false },
        { title: '已巡', data: 2, status: true },
        { title: '已巡', data: 2, status: false },
        { title: '已巡', data: 2, status: true }
      ],
      list3: [
        { title: '未巡', data: 3, status: false },
        { title: '未巡', data: 3, status: true },
        { title: '未巡', data: 3, status: false },
        { title: '未巡', data: 3, status: true },
        { title: '未巡', data: 3, status: true },
        { title: '未巡', data: 3, status: true },
        { title: '未巡', data: 3, status: true },
        { title: '未巡', data: 3, status: true },
        { title: '未巡', data: 3, status: false },
        { title: '未巡', data: 3, status: false },
        { title: '未巡', data: 3, status: false },
        { title: '未巡', data: 3, status: true },
        { title: '未巡', data: 3, status: false },
        { title: '未巡', data: 3, status: false },
        { title: '未巡', data: 3, status: true },
        { title: '未巡', data: 3, status: false },
        { title: '未巡', data: 3, status: true },
        { title: '未巡', data: 3, status: false },
        { title: '未巡', data: 3, status: true }
      ]
    }
  },
  methods: {
  },
  computed: {
    getRedNum () {
    //   var num = 0
      var num1 = this.list2.filter((item) => {
        return !item.status
      }).length
      return num1
    }
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
</style>
