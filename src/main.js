// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import 'mint-ui/lib/style.css'
import 'vant/lib/vant-css/index.css'
import 'vueg/css/transition-min.css'
import vueg from 'vueg'
import Mint from 'mint-ui'
import Vant from 'vant'
import VueLazyload from 'vue-lazyload'
import VConsole from 'vconsole'

// 添加fastclick
FastClick.attach(document.body)

const vconsole = new VConsole()
Vue.use(vconsole)

Vue.config.productionTip = false

Vue.use(Mint).use(Vant)

Vue.use(VueLazyload, {
  preLoad: 0.5,
  error: '',
  loading: '',
  attempt: 1
})

Vue.prototype.produceTypeToCHN = (code) => {
  switch (code) {
    case '11101': return '五座整套双层'
    case '11100': return '五座整套单层'
    case '10001': return '主驾单套双层' // 1
    case '11001': return '主、副单套双层' // 2
    case '10101': return '五座主驾后排单套双层'
    case '01001': return '副驾单套双层' // 3
    case '01101': return '五座副驾后排单套双层'
    case '00101': return '五座后排单套双层'
    case '10000': return '主驾单套单层' // 4
    case '11000': return '主、副单套单层' // 5
    case '10100': return '五座主驾后排单套单层'
    case '01000': return '副驾单套单层' // 6
    case '01100': return '五座副驾后排单套单层'
    case '00100': return '五座后排单套单层'
    case '11011': return '七座整套双层'
    case '11010': return '七座整套单层'
    case '10011': return '七座主驾后排单套双层'
    case '01011': return '七座副驾后排单套双层'
    case '00011': return '七座后排单套双层'
    case '10010': return '七座主驾后排单套单层'
    case '01010': return '七座副驾后排单套单层'
    case '00010': return '七座后排单套单层'
    default: break
  }
}

/* const options = {
  duration: '0.3', // 转场动画时长，默认为0.3，单位秒
  firstEntryDisable: false, // 值为true时禁用首次进入应用时的渐现动画，默认为false
  firstEntryDuration: '.6', // 首次进入应用时的渐现动画时长，默认为.6
  forwardAnim: 'fadeInRight', // 前进动画，默认为fadeInRight
  backAnim: 'fadeInLeft', // 后退动画，默认为fedeInLeft
  sameDepthDisable: false, // url深度相同时禁用动画，默认为false
  tabs: [
    {
      name: 'home'
    },
    {
      name: 'mine'
    }
  ], // 默认为[]，'name'对应路由的name,以实现类似app中点击tab页面水平转场效果，如tabs[1]到tabs[0]    ，会使用backAnim动画，tabs[1]到tabs[2]，会使用forwardAnim动画
  tabsDisable: false, // 值为true时，tabs间的转场没有动画，默认为false
  shadow: true, // 值为false，转场时没有阴影的层次效果
  disable: false, // 禁用转场动画，默认为false，嵌套路由默认为true
  nuxt: false // 若使用后端渲染框架Nuxt，需要将此设为true，默认为false
} */

Vue.use(vueg, router, {
  duration: '0.3',
  forwardAnim: 'fadeInRight',
  backAnim: 'fadeInLeft',
  tabsDisable: false
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

let bus = new Vue()
Vue.prototype.bus = bus
