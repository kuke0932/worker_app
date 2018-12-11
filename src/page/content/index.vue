<template>
<div class="contentInfo">
  <mt-header fixed :title="title" class="header">
    <div slot="left" @click="$router.back()">
      <mt-button icon="back"></mt-button>
    </div>
    <mt-button icon="field-warning" slot="right" @click="gohelp"></mt-button>
  </mt-header>
    <van-tabs v-model="active" swipeable class="container">
      <van-tab>
        <div slot="title">
          <van-icon name="shopping-cart" class="icon" />订单信息
        </div>
        <div style="height: 70px;width: 100%;"></div>
        <div class="content" :style="'min-height:' + contentHeight + 'px'">
          <div v-if="!orderInfo.cause">
            <div>
              <div class="title">订单编号</div>
              <span>{{orderInfo.orderNo}}</span>
            </div>
            <div>
              <div class="title">产品内容</div>
              <span>{{orderInfo.productContent}}</span>
            </div>
            <div>
              <div class="title">下单时间</div>
              <span>{{orderInfo.createTime}}</span>
            </div>
            <div>
              <div class="title">订单备注</div>
              <span>{{orderInfo.orderRemark}}</span>
            </div>
            <div>
              <div class="title">产品备注</div>
              <span>{{orderInfo.productRemark}}</span>
            </div>
            <div class="workInfo">
              <div class="title">完成工序明细</div>
              <div v-for="(item, index) in orderInfo.processRecordList" v-bind:key="index" class="workDetails">
                <div>{{item.startTime}} 至 {{item.endTime}}</div>
                <div>{{item.content}}</div>
              </div>
            </div>
          </div>
          <div v-if="orderInfo.cause" class="repair">
            <div>
              <div class="title">维修原因</div>
              <span v-html="orderInfo.cause"></span>
            </div>
            <div>
              <div class="title">审核意见</div>
              <span v-html="orderInfo.opinion"></span>
            </div>
            <div>
              <div class="title">维修来源</div>
              <span>
                {{orderInfo.repairSource === 0 ? '退货入库维修' : orderInfo.repairSource === 1 ? '客户寄回维修' : orderInfo.repairSource === 2 ? '出库维修' : ''}}
              </span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab>
        <div slot="title">
          <van-icon name="description" class="icon" />工序操作内容
        </div>
        <div style="height: 70px;width: 100%;"></div>
        <div class="content" :style="'min-height:' + contentHeight + 'px'">
          <div v-html="content">
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <van-row type="flex" justify="space-around" class="btn_box" v-if="!orderInfo.cause">
      <van-col :span="orderInfo.canOperate ? '12' : '24'" align="center">
      <!--<van-col span="12" align="center">-->
        <van-button class="btn"  @click.native="gotoQrcode" style="background-color: #26a2ff;border-color: #26a2ff;"> 扫码 </van-button>
      </van-col>
      <van-col span="12" align="center" v-if="orderInfo.canOperate">
      <!--<van-col span="12" align="center">-->
        <van-button class="btn" type="danger" @click.native="confirm"> 确认 </van-button>
      </van-col>
    </van-row>
    <van-row type="flex" justify="space-around" class="btn_box" v-if="orderInfo.cause">
      <van-col span="12" align="center" v-if="orderInfo.canOperate">
        <van-button class="btn" @click.native="getStart"  style="background-color: #26a2ff;border-color: #26a2ff;"> 开始 </van-button>
      </van-col>
      <van-col span="12" align="center" v-if="orderInfo.canOperate">
        <van-button class="btn" type="danger" @click.native="getEnd"> 结束 </van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant'
import { endProcess, startRepair, endRepair } from '@/api/process'
export default {
  components: {
  },
  data () {
    return {
      contentHeight: document.documentElement.clientHeight - 175,
      active: 0,
      processCode: '',
      processSort: '',
      title: '',
      content: '',
      orderInfo: {},
      id: '',
      status: 0,
      productNo: ''
    }
  },
  activated () {
    this.processCode = this.$route.query.code
    this.processSort = this.$route.query.processSort
    this.title = this.$route.query.title
    this.content = this.$route.params.content
    this.orderInfo = this.$route.params.orderInfo
    this.id = this.$route.params.id
    this.productNo = this.$route.params.productNo // 维修用
  },
  mounted () {
  },
  methods: {
    gohelp () {
      this.$router.push({ name: 'HelpDetails', query: {code: this.processCode, title: this.title}, params: {carCode: this.orderInfo.carTypeCode} })
    },
    gotoQrcode () {
      this.$router.replace({ name: 'QrCode', query: {code: this.processCode, processSort: this.processSort, title: this.title} })
    },
    confirm () {
      Dialog.confirm({
        title: '提示',
        message: '确认完成吗？'
      }).then(() => {
        endProcess(this.orderInfo.orderNo, this.id, this.processCode, this.orderInfo.productNo).then(resp => {
          if (resp.data.status === 200) {
            console.log('后退')
            this.$router.back()
          }
        })
      }).catch(() => {
        console.log('出错')
      })
    },
    getStart () {
      Dialog.confirm({
        title: '提示',
        message: '确认开始吗？'
      }).then(() => {
        startRepair(this.productNo).then(resp => {
          if (resp.data.status === 200) {
            Toast.success('维修开始')
          } else {
            Dialog.alert({
              title: '提示',
              message: resp.data.message
            }).then(() => {
            }).catch(() => {
            })
          }
        })
      }).catch(() => {
      })
    },
    getEnd () {
      const that = this
      Dialog.confirm({
        title: '提示',
        message: '确认完成吗？'
      }).then(() => {
        endRepair(this.productNo).then(resp => {
          if (resp.data.status === 200) {
            this.$router.back()
            Toast.success({
              duration: 1000,
              message: '维修结束!'
            })
            setTimeout(() => {
              that.$router.back()
            }, 1000)
          } else {
            Dialog.alert({
              title: '提示',
              message: resp.data.message
            }).then(() => {
            }).catch(() => {
            })
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  padding-bottom: 60px;
}
.icon{
  vertical-align: sub;
  margin-right: 0.2rem;
}
.content{
  padding: 0 1rem;
  .title {
    padding: 0.5rem 0;
    font-weight: bold;
    font-size: 1.3rem;
  }
  .workInfo {
    .workDetails{
      color: #555;
      font-size: 0.9rem;
      padding: 0.5rem;
      background: #eee;
      border-radius: 5px;
      margin-bottom: 0.2rem;
    }
  }
}
.repair {
  title {
    padding: 0.5rem 0;
    font-weight: bold;
    font-size: 1.3rem;
  }
}
.btn_box {
  width: 100%;
  position: fixed;
  bottom: 0;
  .btn{
    width: 100%;
    height: 2.3rem;
    border-radius: 0;
    line-height: 2.3rem;
    font-size: 1rem;
    color: #fff;
  }
}

</style>
