<template>
  <div>
    <mt-header fixed title="修改密码" class="header">
      <div slot="left" @click="$router.back()">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>
    <div class="container">
      <div style="height: 70px;width: 100%;"></div>
      <div>
        <mt-field label="原密码" placeholder="请输入原密码" type="password" v-model="oldPwd"><span class="must">*</span></mt-field>
        <mt-field label="新密码" placeholder="请确认新密码" type="password" v-model="newPwd"><span class="must">*</span></mt-field>
        <mt-field label="确认密码" placeholder="请确认新密码" type="password" v-model="ConfirmNewPwd"><span class="must">*</span></mt-field>
      </div>
      <van-button type='primary'
                  size="large"
                  style="position: fixed;bottom:0;color: #fff;background-color: #26a2ff;border: 1px solid #26a2ff;" @click.native="confirmChange">确认修改</van-button>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant'
import { changePassword } from '@/api/login'
export default {
  components: {
  },
  data () {
    return {
      oldPwd: '',
      newPwd: '',
      ConfirmNewPwd: ''
    }
  },
  created () {
    const needChangePwd = this.$route.query.needChangePwd
    function plusReady () {
      window.plus.key.addEventListener('backbutton', function () {
        // 事件处理
        if (needChangePwd === true) {
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
  activated () {
    this.oldPwd = ''
    this.newPwd = ''
    this.ConfirmNewPwd = ''
  },
  methods: {
    confirmChange () {
      const that = this
      const reg = /^(?![^a-zA-Z]+$)(?!\D+$).{10,15}$/
      if (!this.oldPwd) {
        Toast.fail('请输入原密码')
        return
      }
      if (!this.newPwd) {
        Toast.fail('请输入新密码')
        return
      }
      if (!reg.test(this.newPwd)) {
        Toast.fail('密码格式错误')
        return
      }
      if (!this.ConfirmNewPwd) {
        Toast.fail('请确认密码')
        return
      }
      if (this.newPwd !== this.ConfirmNewPwd) {
        Toast('两次输入不一致')
        return
      }
      Dialog.confirm({
        title: '提示',
        message: '确认修改吗？'
      }).then(() => {
        changePassword(this.oldPwd, this.newPwd).then(resp => {
          if (resp.status === 200) {
            Toast.success('修改成功')
            setTimeout(() => {
              that.$store.dispatch('LogOut', {}).then(() => {
                window.plus.storage.setItem('needChangePwd', 'false')
                that.$router.replace({name: 'Index', params: {isLogin: this.$store.getters.loginStatus}})
              })
            }, 1000)
          } else {
            Dialog.alert({
              title: '提示',
              message: resp.message
            }).then(() => {
              // on close
            })
          }
        })
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>

<style lang="less">
.container {
  .must {
    display: inline-block;
    float: right;
    color: #e4393c;
    font-size: 1.3rem;
    width: 20px;
    height: 32px;
    line-height: 42px;
  }
}
</style>
