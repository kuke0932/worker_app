<template>
  <div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="home">
        <mt-header fixed title="首页" class="header"></mt-header>
        <div class="container">
          <div style="height: 70px;width: 100%;"></div>
          <van-row class="bigBox" type="flex" justify="center" gutter="50">
            <van-col class="appBox" span="6" align="center" @click.native="goLL">
              <div class="img_box" style="background-color: #89c47d" >
                <img slot="icon" src="../assets/icon/search.svg">
              </div>
              <span>领料</span>
            </van-col>
            <van-col class="appBox" span="6" align="center" v-if="isShow(item.code)" @click.native="openProcess(item)" v-for="(item, index) in processList" v-bind:key="index" >
              <div class="img_box" :style="'background-color:' + background[item.code]" >
                <img slot="icon" :src="icon[item.code]">
              </div>
              <span>{{item.name}}</span>
            </van-col>
            <van-col class="appBox" span="6" align="center" @click.native="goWX">
              <div class="img_box" style="background-color: #db7164" >
                <img slot="icon" src="../assets/icon/repair.svg">
              </div>
              <span>维修</span>
            </van-col>
            <van-col class="appBoxEmp" span="6"></van-col>
            <van-col class="appBoxEmp" span="6"></van-col>
          </van-row>
        </div>
      </mt-tab-container-item>

      <mt-tab-container-item id="mine">
        <mt-header class="header" fixed title="我的" ></mt-header>
        <div class="container">
          <div style="height: 70px;width: 100%;"></div>
          <van-card
            style="background: #fff;margin-bottom: 15px;"
            :title="('账号：' + userName)"
            :thumb="imageURL"
            :centered="true"
          />
          <!--<van-cell-group>-->
            <!--<van-cell title="当前账号" :value="userName" />-->
          <!--</van-cell-group>-->
          <van-cell-group>
            <van-cell title="修改密码" is-link :to="{name: 'ChangePwd'}" />
            <van-cell title="工作量统计" is-link :to="{name: 'WorkloadAccount'}" />
            <van-cell title="帮助" is-link :to="{name: 'Help'}" />
            <van-cell title="设置" is-link :to="{name: 'Set'}" />
            <van-cell title="退出登录" is-link @click="loginOut" />
          </van-cell-group>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

    <mt-tabbar v-model="selected" class="tabbar">
      <mt-tab-item id="home">
        <img v-if="selected === 'home'" slot="icon" src="../assets/icon/home.png">
        <img v-else slot="icon" src="../assets/icon/home01.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="mine">
        <img v-if="selected === 'mine'" slot="icon" src="../assets/icon/mine.png">
        <img v-else slot="icon" src="../assets/icon/mine01.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import { ImagePreview, Dialog, Toast } from 'vant'
import { listProcessByLoginName } from '@/api/process'

export default {
  components: {
  },
  data () {
    return {
      userName: '',
      selected: 'home',
      imageURL: 'static/img/workerHead.jpg',
      processList: [],
      background: {
        CJ: '#25C9A9',
        PJ: '#f0a45d',
        QB: '#f3bc33',
        BB: '#3498db',
        DK: '#D57AE8',
        FH: '#8ed9cc'
      },
      icon: {
        CJ: require('../assets/icon/caijian.svg'),
        PJ: require('../assets/icon/pinjie.svg'),
        QB: require('../assets/icon/daily.svg'),
        BB: require('../assets/icon/document.svg'),
        DK: require('../assets/icon/dingkou.svg'),
        FH: require('../assets/icon/send.svg')
      }
    }
  },
  created () {
    const that = this
    function plusReady () {
      const token = window.plus.storage.getItem('token')
      if (token) {
        listProcessByLoginName().then(resp => {
          that.processList = resp.data.data
        }).catch((e) => {
          if (e.response.status === 500) {
            that.$store.dispatch('LogOut', {}).then(() => {
              this.$emit('loginStatus', this.$store.getters.loginStatus)
              Toast.success({
                duration: 1000,
                forbidClick: true,
                message: '退出成功'
              })
            })
          }
        })
      }
      setTimeout(() => {
        window.plus.navigator.closeSplashscreen()
      }, 1)
    }
    if (window.plus) {
      plusReady()
    } else {
      document.addEventListener('plusready', plusReady, false)
    }
  },
  mounted () {
    // this.preImg(0, 2000)
    this.userName = this.$store.getters.name
  },
  methods: {
    clickHelp () {
    },
    goLL () {
      this.$router.push({name: 'QrCode', query: {code: 'LL', title: '领料', content: '领料'}})
    },
    goWX () {
      this.$router.push({name: 'QrCode', query: {code: 'WX', title: '维修', content: '维修'}})
    },
    openProcess (item) {
      this.$router.push({name: 'QrCode', query: {code: item.code, processSort: item.processSort, title: item.name}, params: {content: item.content}})
    },
    isShow (code) {
      let codeList = []
      let flag = false
      this.processList.forEach(v => {
        codeList.push(v.code)
      })
      codeList.forEach(v => {
        if (code === v) {
          flag = true
        }
      })
      return flag
    },
    loginOut () {
      const that = this
      Dialog.confirm({
        title: '提示',
        message: '您确认退出吗？'
      }).then(() => {
        // on confirm
        that.$store.dispatch('LogOut', {}).then(() => {
          this.$emit('loginStatus', this.$store.getters.loginStatus)
          Toast.success({
            duration: 1000,
            forbidClick: true,
            message: '退出成功'
          })
        })
      }).catch(() => {
        // on cancel
      })
    },
    preImg (position, timer) {
      const that = this
      const img = document.getElementsByClassName('van-card__img')[0]
      img.onclick = function () {
        ImagePreview([
          that.imageURL
        ], 0)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    .bigBox{
      -webkit-flex-wrap:wrap;
      flex-wrap:wrap;
      .appBoxEmp {
        padding: 1rem;
        margin: 0.3rem;
      }
      .appBox{
        background: #fff;
        padding: 1rem;
        margin: 0.3rem;
        span{
          font-size: 0.8rem;
          margin-top: 0.5rem;
          display: block;
        }
        .img_box{
          width:3.5em;
          height:3.3em;
          display: table-cell;
          vertical-align: middle;
          text-align: center;
          border-radius: 50%;
          img{
            width:2em;
            height:2em;
          }
        }
      }
    }
  }
  .tabbar {
    color: #666;
  }
</style>
