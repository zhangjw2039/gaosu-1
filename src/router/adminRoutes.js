// 管理员权限路由
import scan from '../compoents/saoma.vue'
import abnormal from '../compoents/err.vue'
import patrol from '../compoents/record.vue'
import repairOrder from '../compoents/repair.vue'
import facility from '../compoents/facilities.vue'
import bind from '../compoents/collection.vue'
import reported from '../compoents/handy.vue'

// 二级路由
import recordAll from '../compoents/record/record-all.vue'
import recordAllItem from '../compoents/record/record-allItem.vue'
import errAll from '../compoents/err/errAll.vue'
import errItemFalseSb from '../compoents/err/errItemFalseSb.vue'
import errItemFalsePe from '../compoents/err/errItemFalsePe.vue'
import errItemTrueSb from '../compoents/err/errItemTrueSb.vue'
import errItemTruePe from '../compoents/err/errItemTruePe.vue'
import weixiuzhipai from '../compoents/err/weixiuzhipai.vue'
import repairAll from '../compoents/repair/repairAll.vue'
import repairItemzhipai from '../compoents/repair/repairItemzhipai.vue'
import repairItemweixiudan from '../compoents/repair/repairItemweixiudan.vue'
import repairItemwxdp from '../compoents/repair/repairItemwxdp.vue'
import repairItemyanshousb from '../compoents/repair/repairItemyanshousb.vue'
import repairItemyanshoupe from '../compoents/repair/repairItemyanshoupe.vue'
import repairItemywxsb from '../compoents/repair/repairItemywxsb.vue'
import repairItemywxpe from '../compoents/repair/repairItemywxpe.vue'
import repairItemzhipaiPe from '../compoents/repair/repairItemzhipaiPe.vue'
import repairweixiusb from '../compoents/repair/weixiusb.vue'
import repairweixiupe from '../compoents/repair/weixiupe.vue'

const adminRoutes = [
  {
    path: '/scan',
    component: scan
  },
  {
    path: '/abnormal',
    component: abnormal,
    children: [
      { path: '/', redirect: '/errAll' },
      { path: '/errAll', component: errAll },
      { path: '/errItemFalseSb', name: '/errItemFalseSb', component: errItemFalseSb },
      { path: '/errItemFalsePe', name: '/errItemFalsePe', component: errItemFalsePe },
      { path: '/errItemTrueSb', name: '/errItemTrueSb', component: errItemTrueSb },
      { path: '/errItemTruePe', name: '/errItemTruePe', component: errItemTruePe },
      { path: '/weixiuzhipai', name: '/weixiuzhipai', component: weixiuzhipai }
    ]
  },
  {
    path: '/patrol',
    component: patrol,
    children: [
      { path: '/', redirect: '/recordAll' },
      { path: '/recordAll', component: recordAll },
      { path: '/recordAllItem', name: '/recordAllItem', component: recordAllItem }
    ]
  },
  {
    path: '/repairOrder',
    component: repairOrder,
    children: [
      { path: '/', redirect: '/repairAll' },
      { path: '/repairAll', component: repairAll },
      { path: '/repairItemzhipai', name: '/repairItemzhipai', component: repairItemzhipai },
      { path: '/repairItemweixiudan', component: repairItemweixiudan },
      { path: '/repairItemwxdp', component: repairItemwxdp },
      { path: '/repairItemyanshousb', component: repairItemyanshousb },
      { path: '/repairItemyanshoupe', component: repairItemyanshoupe },
      { path: '/repairItemywxsb', component: repairItemywxsb },
      { path: '/repairItemywxpe', component: repairItemywxpe },
      { path: '/repairItemzhipaiPe', name: '/repairItemzhipaiPe', component: repairItemzhipaiPe },
      { path: '/repairweixiusb', name: '/repairweixiusb', component: repairweixiusb },
      { path: '/repairweixiupe', name: '/repairweixiupe', component: repairweixiupe }
    ]
  },
  {
    path: '/facility',
    component: facility
  },
  {
    path: '/bind',
    component: bind
  },
  {
    path: '/reported',
    component: reported
  }
]
export default adminRoutes
