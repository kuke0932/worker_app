<template>
  <div>
    <mt-header fixed title="设置" class="header">
      <div slot="left" @click="$router.back()">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>
    <div class="container">
      <div style="height: 70px;width: 100%;"></div>
      <van-cell-group>
        <van-cell title="清除缓存" is-link @click="clear" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="关于" is-link @click="about" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    clear () {
      Toast.loading({
        duration: 2000,
        forbidClick: true,
        loadingType: 'spinner',
        message: '正在清理...'
      })
      setTimeout(() => {
        Toast.success('清除成功')
      }, 2000)
    },
    about () {

    }
  }
}
</script>

<style lang="less">
.container{
}
</style>
