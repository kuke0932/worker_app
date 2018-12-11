<template>
<div class="container">
  <div style="height: 70px;width: 100%;"></div>
  <h2>欢迎使用生产管理系统</h2>
  <div class="logo">
    <!--<img v-lazy="imgUrl"/>-->
    <img src="../assets/product.jpg" alt="">
  </div>
  <div class="myForm">
    <van-field
      left-icon="contact"
      v-model="form.workerNumber"
      label="工号"
      label-align="center"
      placeholder="请输入工号"
    />
    <van-field
      left-icon="question"
      v-model="form.password"
      label="密码"
      label-align="center"
      placeholder="请输入密码"
      type="password"
    />
  </div>
  <div style="text-align: center">
    <van-button class="btnSubmit" size="large" @click="loginSystem">立即登录</van-button>
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
      // imgUrl: '/static/img/product.jpg',
      form: {
        workerNumber: '',
        password: ''
      }
    }
  },
  created () {
    function plusReady () {
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
    loginSystem () {
      if (!this.form.workerNumber) {
        Toast.fail('请输入工号')
        return
      }
      if (!this.form.password) {
        Toast.fail('请输入密码')
        return
      }
      this.$store.dispatch('LoginByUsername', this.form).then(() => {
        this.$emit('loginStatus', this.$store.getters.loginStatus)
        if (window.plus.storage.getItem('needChangePwd') === 'true') {
          this.$router.replace({path: '/mine/changePwd.vue', query: {needChangePwd: true}})
          Toast('密码为初始密码，请先修改密码！')
        } else {
          Toast.success({
            duration: 1000,
            forbidClick: true,
            message: '登录成功'
          })
        }
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  h2{
    width:100%;
    float: left;
    text-align: center;
    height: auto;
    font-size: 28px;
    letter-spacing: 2px;
    color: #444;
  }
  .logo{
    width:100%;
    float: left;
    height: auto;
    text-align: center;
    img{
      width: 70%;
    }
  }
  .myForm{
    width: 90%;
    float: left;
    height: auto;
    margin-top: 20px;
    padding-left: 5%;
    padding-right: 5%;
  }
  .btnSubmit{
    width: 90%;
    height: 44px;
    line-height: 44px;
    margin-top: 2.5rem;
    background: #26a2ff;
    color:#fff;
    text-align: center;
  }
}
</style>
