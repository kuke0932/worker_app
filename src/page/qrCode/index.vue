<template>
  <div>
    <mt-header fixed title="扫码" class="header">
      <div slot="left" @click="goBack">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>
    <div class="scan">
      <div id="bcid" :style="'height:'+ (screenHeight - 129) + 'px'">
        <div style="height:40%"></div>
        <p class="tip">...载入中...</p>
      </div>
      <van-row class="bottom">
        <van-col class="appBox" span="12" align="center" @click.native="startScan">
          <div class="img_box" >
            <img slot="icon" src="../../assets/icon/qr.svg">
          </div>
          <span>重新扫描</span>
        </van-col>
        <van-col class="appBox" span="12" align="center" @click.native="setFlash">
          <div class="img_box">
            <img slot="icon" src="../../assets/icon/flash.svg">
          </div>
          <span>闪光灯</span>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getOrderInfo, startProcess, getMaterial, send, scanRepair } from '@/api/process'
import { Dialog, Toast } from 'vant'
let scan = null
export default {
  components: {
  },
  data () {
    return {
      screenHeight: document.documentElement.clientHeight,
      active: 0,
      codeUrl: '',
      openFlash: false,
      processCode: '',
      processSort: '',
      title: '',
      content: '',
      orderInfo: {}
    }
  },
  created () {
    const that = this
    function plusReady () {
      window.plus.key.addEventListener('backbutton', function () {
        // 事件处理
        that.closeScan()
        window.history.go(-1)
      }, false)
      setTimeout(() => {
        that.resizeScan()
      }, 500)
    }
    if (window.plus) {
      plusReady()
    } else {
      document.addEventListener('plusready', plusReady, false)
    }
  },
  mounted () {
    this.processCode = this.$route.query.code
    this.processSort = this.$route.query.processSort
    this.title = this.$route.query.title
    this.content = this.$route.params.content
  },
  methods: {
    goBack () {
      this.closeScan()
      this.$router.replace({name: 'Index'})
    },
    // 创建扫描控件
    resizeScan () {
      const that = this
      if (!window.plus) return
      scan = new window.plus.barcode.Barcode('bcid', [window.plus.barcode.CODE128, window.plus.barcode.QR], {
        frameColor: '#09BB07',
        scanbarColor: '#09BB07',
        background: ''
      })
      scan.start()
      scan.onmarked = (type, str) => {
        /* var text = '未知: '
        switch (type) {
          case window.plus.barcode.QR:
            text = 'QR: '
            break
          case window.plus.barcode.EAN13:
            text = 'EAN13: '
            break
          case window.plus.barcode.EAN8:
            text = 'EAN8: '
            break
        } */
        const result = str.replace(/\n/g, '').split('=')[1]
        that.closeScan()
        if (this.processCode === 'LL') {
          const s = str.split(',')
          getMaterial(s[0], s[1]).then(resp => {
            if (resp.data.status === 200) {
              new Audio(
                'http://tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=311&tex=扫码成功'
              ).play()
              Toast.success({
                duration: 1000,
                message: '领料成功!'
              })
              setTimeout(() => {
                that.$router.back()
              }, 1000)
            }
          })
        } else if (this.processCode === 'FH') {
          Dialog.confirm({
            title: '提示!',
            message: '确认发货吗？'
          }).then(() => {
            let s = str
            if (str.indexOf('=') > 0) {
              s = str.replace(/\n/g, '').split('=')[1]
            } else {
              s = str
            }
            send(s).then(resp => {
              if (resp.data.status === 200) {
                new Audio(
                  'http://tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=311&tex=扫码成功'
                ).play()
                Toast.success({
                  duration: 1000,
                  message: '发货成功!'
                })
                setTimeout(() => {
                  that.$router.back()
                }, 1000)
              } else {
                if (resp.data.status === 261) {
                  Dialog.alert({
                    title: '警告！',
                    message: resp.data.message
                  }).then(() => {
                    // on close
                    Toast.success({
                      duration: 1000,
                      message: '发货成功!'
                    })
                    setTimeout(() => {
                      that.$router.back()
                    }, 1000)
                  })
                }
              }
            })
          }).catch(() => {
            that.resizeScan()
          })
        } else if (this.processCode === 'WX') {
          scanRepair(result).then(resp => {
            if (resp.data.status === 200) {
              new Audio(
                'http://tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=311&tex=扫码成功'
              ).play()
              setTimeout(() => {
                that.closeScan()
                that.$router.replace({name: 'Content', query: {code: this.processCode, title: this.title}, params: {orderInfo: resp.data.data, productNo: result, content: this.content}})
              }, 1000)
            }
          }).catch(e => {
            if (e.response.status === 500) {
              new Audio(
                'http://tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=311&tex=扫码失败，请重新扫码'
              ).play()
            }
          })
        } else {
          getOrderInfo(result, this.processCode).then(resp => {
            if (resp.data.status === 200) {
              new Audio(
                'http://tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=311&tex=扫码成功'
              ).play()
              if (resp.data.data.productWorkerProcessId) {
                that.closeScan()
                that.$router.replace({name: 'Content', query: {code: this.processCode, processSort: this.processSort, title: this.title}, params: {orderInfo: resp.data.data, id: resp.data.data.productWorkerProcessId, content: this.content}})
              } else {
                that.confirmStart(resp.data.data, result)
              }
            } else if (resp.data.status === 270) {
              new Audio(
                'http://tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=311&tex=扫码失败，请重新扫码'
              ).play()
              Dialog.alert({
                title: '提示',
                message: resp.data.message
              }).then(() => {
                // on close
                this.closeScan()
                this.resizeScan()
              })
            } else {
              that.closeScan()
              that.$router.replace({name: 'Content', query: {code: this.processCode, processSort: this.processSort, title: this.title}, params: {orderInfo: resp.data.data, id: resp.data.data.productWorkerProcessId, content: this.content}})
            }
          })
        }
      }
    },
    // 开始扫描
    startScan () {
      if (!window.plus) return
      this.closeScan()
      this.resizeScan()
    },
    // 取消扫描并且关闭扫描控件
    closeScan () {
      if (!window.plus) return
      scan.cancel()
      scan.close()
    },
    setFlash () {
      if (!window.plus) return
      this.openFlash = !this.openFlash
      scan.setFlash(this.openFlash)
    },
    confirmStart (data, result) {
      const that = this
      Dialog.confirm({
        title: '提示',
        message: '确认开始吗？'
      }).then(() => {
        startProcess(data.orderNo, result, '', this.processCode, this.processSort).then(resp => {
          that.closeScan()
          that.$router.replace({name: 'Content', query: {code: this.processCode, processSort: this.processSort, title: this.title}, params: {orderInfo: data, id: resp.data.data, content: this.content}})
        })
      }).catch((e) => {
        that.resizeScan()
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .scan {
    #bcid {
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 64px;
      bottom: 0;
      text-align: center;
      color: #666;
      background: #000;
    }
    .bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding-bottom: 0.5rem;
      background: #000;
      .appBox{
        span{
          font-size: 0.8rem;
          display: block;
          color:#666;
          margin-top: -0.5rem;
        }
        .img_box{
          width:3em;
          height:3em;
          display: table-cell;
          vertical-align: middle;
          text-align: center;
          border-radius: 50%;
          img{
            width:1.5em;
            height:1.5em;
          }
        }
      }
    }
  }
</style>
