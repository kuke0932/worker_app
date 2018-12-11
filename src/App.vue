<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" v-transition class="box">
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" v-transition class="box">
      <index></index>
    </router-view>
  </div>
</template>

<script>
// import { Dialog } from 'vant'
import Index from '@/components/Index'
export default {
  name: 'App',
  components: { Index },
  created () {
    const that = this
    function plusReady () {
      document.addEventListener('pause', () => {
        that.getTime()
      }, false)
      window.plus.key.addEventListener('backbutton', function () {
        // 事件处理
        if (that.$route.path === '/') {
          that.getTime()
          window.plus.runtime.quit()
        } else {
          window.history.go(-1)
        }
      }, false)
    }
    if (window.plus) {
      plusReady()
    } else {
      document.addEventListener('plusready', plusReady, false)
    }
  },
  mounted () {
  },
  methods: {
    getTime () {
      let date = new Date()
      let startTime = date.getTime()
      window.plus.storage.setItem('startTime', startTime + '')
    }
  }
}
</script>

<style lang="less">
.box {
  height: 100vh;
  background: #f8f8f8;
}

body {
  background: #f8f8f8;
  -webkit-font-smoothing: antialiased;
  font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
}
.mint-header{
  padding-top: 1.5rem!important;
  height: 4rem!important;
  font-size: 1.0rem!important;
}
.contentInfo p {
  margin: 0!important;
}
/* tab标签页位置修改 */
.van-tabs__wrap {
  position: fixed!important;
  top: 64px!important;
}
/* tab标签页内容区域大小 */
.van-tabs__content .content {
  padding-bottom: 5rem;
}
/* 对话框样式修改 */
.van-dialog {
  width: 60% !important;
  .van-dialog__message--has-title {
    text-align: center;
  }
}
/* 登录label宽度 */
.myForm .van-field .van-cell__title{
  max-width: 50px;
}

/* 导航条z-index */
.mint-header.is-fixed {
  z-index: 100;
}

</style>
