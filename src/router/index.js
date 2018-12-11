import Vue from 'vue'
import Router from 'vue-router'

// import Index from '@/components/Index.vue'

// import ChangePwd from '@/page/mine/changePwd.vue'
// import Help from '@/page/mine/help.vue'
// import HelpDetails from '@/page/mine/helpDetails.vue'
// import Set from '@/page/mine/set.vue'
//
// import Content from '@/page/content/index.vue'
// import QrCode from '@/page/qrCode/index.vue'

const Index = resolve => require(['@/components/Index.vue'], resolve)
const ChangePwd = resolve => require(['@/page/mine/changePwd.vue'], resolve)
const Help = resolve => require(['@/page/mine/help.vue'], resolve)
const HelpDetails = resolve => require(['@/page/mine/helpDetails.vue'], resolve)
const Set = resolve => require(['@/page/mine/set.vue'], resolve)
const WorkloadAccount = resolve => require(['@/page/mine/workloadAccount.vue'], resolve)
const WorkloadDetail = resolve => require(['@/page/mine/workloadDetail.vue'], resolve)
const Content = resolve => require(['@/page/content/index.vue'], resolve)
const QrCode = resolve => require(['@/page/qrCode/index.vue'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/mine/changePwd.vue',
      name: 'ChangePwd',
      component: ChangePwd,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/mine/help.vue',
      name: 'Help',
      component: Help,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/mine/helpDetails.vue',
      name: 'HelpDetails',
      component: HelpDetails,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/mine/workloadAccount.vue',
      name: 'WorkloadAccount',
      component: WorkloadAccount,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/mine/workloadDetail.vue',
      name: 'WorkloadDetail',
      component: WorkloadDetail
    },
    {
      path: '/mine/set.vue',
      name: 'Set',
      component: Set,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/content',
      name: 'Content',
      component: Content,
      meta: {
        keepAlive: true // 需要缓存
      }
    },
    {
      path: '/qrCode',
      name: 'QrCode',
      component: QrCode
    }
  ]
})
