<template>
  <div>
    <div class="login-title">{{data.name === 0 ? '维修指派' : '随手报维修指派'}}</div>
    <div class="errItemFalseSb-box-item">
      <van-field
        class="van-field-nopadding"
        readonly
        clickable
        label="维修单位"
        :value="value"
        placeholder="请选择维修单位"
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
    <div class="errItemFalseSb-box-item">
      <p class="errItemFalseSb-box-item-l">维修方案</p>
    </div>
    <div class="errItemFalseSb-box-item">
      <textarea v-model="info" class="thing-miaosu" placeholder="请输入维修方案"></textarea>
    </div>
    <div class="errItemFalseSb-box-item">
      <van-cell class="van-field-nopadding" title="选择维修日期" :value="date" @click="show = true" />
    </div>
    <van-calendar v-model="show" type="range" @confirm="onDateConfirm" />
    <van-button :loading="loading" :disabled="!rols1" type="info" @click="onSubmit">提交维修单</van-button>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      data: {},
      value: '',
      showPicker: false,
      columns: [],
      columnsAll: [],
      date: '',
      show: false,
      info: '',
      id: '',
      loading: false
    }
  },
  methods: {
    onConfirm (value) {
      const newarr = []
      value.forEach((item) => {
        if (item) {
          newarr.push(item)
        }
      })
      console.log(newarr)
      this.showPicker = false
      this.value = value.toString()
      this.id = this.deepFind(this.columnsAll, newarr[newarr.length - 1])
      console.log(this.id)
    },
    formatDate (date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    },
    onDateConfirm (date) {
      const [start, end] = date
      this.show = false
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`
    },
    async onSubmit () {
      // 获取维修单位id
      console.log(this.value)
      console.log(this.id)
      if (this.id === '' || this.info.trim() === '' || this.date === '') {
        this.$toast('信息不完整')
        return
      }
      this.loading = true
      const params = {}
      params.maintenanceinfo = this.info
      params.assignCompletionTime = this.date
      params.repairorderGroupId = this.id
      if (this.data.convenientlyInfo) {
        params.convenientlyId = this.data.id
      } else {
        params.chkQuestionId = this.data.id
      }
      const { data } = await this.$ajax.post('assign?sid=' + window.localStorage.getItem('token'), params)
      console.log(data)
      if (data.code === 200) {
        this.$toast('提交维修指派成功')
        this.$router.go(-2)
      } else {
        this.$toast(data.jwje)
      }
      this.loading = false
    },
    // 获取维修单位
    async getEquip () {
      const {
        data: { data }
      } = await this.$ajax.get(
        'equip/tree?sid=' +
          window.localStorage.getItem('token')
      )
      this.columnsAll = data
      this.columns = this.deepCopy(data)
    },
    // 重新给columns赋值
    deepCopy (arr) {
      // 定义一个空的数组
      var arr1 = []
      arr.forEach(item => {
        // 定义一个空的对象
        var object = {}
        for (const key in item) {
          if (item[key] instanceof Array) {
            object.children = this.deepCopy(item[key])
          } else {
            // console.log(item[key])
            if (key === 'title') {
              object.text = item[key]
            }
          }
        }
        arr1.push(object)
      })
      return arr1
    },
    // 深度查找id
    deepFind (arr, str) {
      var id
      for (const item of arr) {
        for (const key in item) {
          if (item[key] instanceof Array) {
            id = this.deepFind(item[key], str)
            if (id) {
              return id
            }
          } else {
            if (item[key] === str) {
              id = item.id
              console.log(id)
              return id
            }
          }
        }
      }
      return id
    }
  },
  mounted () {
    this.getEquip()
    this.data = this.$route.query
    console.log(this.data)
  },
  computed: {
    ...mapState(['rols']),
    rols1 () {
      return this.rols.includes('assign:add')
    }
  }
}
</script>
<style scoped>
.login-title {
  height: 100px;
  text-align: center;
  font-size: 20px;
  line-height: 100px;
}
.van-field-nopadding {
  padding: 0 10px !important;
  font-size: 15px;
  font-weight: 400;
}
.van-button {
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
}
.van-cell__value {
  font-size: 14px;
}
</style>
