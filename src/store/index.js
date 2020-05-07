import Vue from 'vue'
import Vuex from 'vuex'
// 避免刷新页面出现，数据初始化的功能
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 扫码信息的id，和采集信息的共享二维码id
    qrCodeId: '23bb5832198a42e567186f156db17a2c',
    // 扫码巡检的id
    saomaCodeId: '23bb5832198a42e567186f156db17a2c',
    // 权限变量
    rols: []
  },
  mutations: {
    // 改变qrCodeId的值
    changQrCodeId (state, value) {
      state.qrCodeId = value
    },
    // 存储权限值
    saveRols (state, value) {
      state.rols = value
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
