<template>
    <div>
      <mt-header fixed title="工作量明细" class="header">
        <div slot="left" @click="$router.back()">
          <mt-button icon="back"></mt-button>
        </div>
      </mt-header>
      <div style="height: 60px;width: 100%;"></div>
      <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: (wrapperHeight) + 'px' }">
        <mt-loadmore :top-method="loadTop"
                     @top-status-change="handleTopChange"
                     @translate-change="translateChange"
                     ref="loadmore"
                     :style="{ minHeight: (wrapperHeight) + 'px' }">
          <ul class="page-loadmore-list detailList"
              v-infinite-scroll="loadMore"
              :infinite-scroll-immediate-check="true"
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="10">
            <li v-for="(item, index) in detailList" class="page-loadmore-listitem detailItem" :key="index">
              <p>开始时间：{{item.startTime}}</p>
              <p>结束时间：{{item.endTime}}</p>
              <p style="display: flex">产品型号：<span style="flex: 1">{{item.productContent}}</span></p>
              <p>产品编号：{{item.productNo}}</p>
              <p>生产类型：{{ item.productType}} {{'（' + (produceTypeToCHN(item.productType) || '') + '）' }}</p>
              <p>订单编号：{{item.order}}</p>
            </li>
          </ul>

          <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
            <!--<span v-show="topStatus === 'loading'">-->
              <!--<mt-spinner type="snake"></mt-spinner>-->
            <!--</span>-->
          </div>

          <div slot="bottom" class="mint-loadmore-bottom" style="margin-bottom: 0!important;">
            <span v-show="noMoreData">无更多数据</span>
            <div v-show="loading" class="page-infinite-loading">
              <mt-spinner type="fading-circle"></mt-spinner>
              加载中...
            </div>
          </div>
        </mt-loadmore>
      </div>
    </div>
</template>

<script>
import { listStatisticsDetail } from '@/api/mine'

export default {
  name: 'detailList',
  data () {
    return {
      noData: false,
      noMoreData: false,
      wrapperHeight: 0,
      pageNum: 1,
      pageSize: 10,
      detailList: [],
      translate: 0,
      topStatus: '',
      loading: false,
      detailParams: {}
    }
  },
  created () {
  },
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - 60
    this.detailParams = this.$route.params
    this.loadMore()
  },
  methods: {
    fetchData (beginDate, endDate, processNo, fb, produceType, pageNum, pageSize) {
      return listStatisticsDetail(beginDate, endDate, processNo, fb, produceType, pageNum, pageSize)
    },
    translateChange (translate) {
      this.translate = translate
    },
    loadMore () {
      if (!this.noMoreData) {
        this.loading = true
        return this.fetchData(this.detailParams.beginDate, this.detailParams.endDate, this.detailParams.processNo, this.detailParams.fb, this.detailParams.produceType, this.pageNum, this.pageSize).then(resp => {
          if (resp.data.data.length === 0) {
            this.noData = true
          }
          this.detailList = this.detailList.concat(resp.data.data)
          console.log(resp.data.data.length)
          if (resp.data.data.length < this.pageSize) {
            this.noMoreData = true
          }
          this.loading = false
          this.pageNum++
        }).catch((e) => {
          this.loading = false
          console.log(e)
        })
      } else {
        return Promise.reject(new Error('no data'))
      }
    },
    handleTopChange (status) {
      this.topStatus = status
    },
    loadTop () {
      this.reloadData().then((resp) => {
        this.$refs.loadmore.onTopLoaded()
      }).catch(e => {
        this.$refs.loadmore.onTopLoaded()
        console.log(e)
      })
    },
    // resetTransform () {
    //   // eslint-disable-next-line
    //   // if (this.translate == '0' || this.translate == '50' || this.translate == '-50') {
    //   const loadmore = document.querySelector('.is-dropped')
    //   if (loadmore && loadmore.style.transform) {
    //     console.log(loadmore.style.transform)
    //     loadmore.style.transform = ''
    //   }
    //   // }
    // },
    reloadData () {
      this.noMoreData = false
      this.pageNum = 1
      this.detailList = []
      return this.loadMore()
    }
  }
}
</script>

<style scoped lang="less">
  .detailList{
    list-style: none;
    .detailItem{
      margin: 5px 20px;
      border-radius: 6px;
      padding: 0.6rem 1rem;
      background: #fff;
      p {
        margin: 5px 0;
        font-size: 0.8em;
      }
    }
  }
  // 上拉下拉相关
  .loading-background, .mint-loadmore-top span {
    -webkit-transition: .2s linear;
    transition: .2s linear
  }
  .mint-loadmore-top span {
    display: inline-block;
    vertical-align: middle
  }
  .mint-loadmore-top span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
  }
  .page-loadmore .mint-spinner {
    display: inline-block;
    vertical-align: middle
  }
  .page-loadmore-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5px
  }
  /*.page-loadmore-desc:last-of-type,
  .page-loadmore-listitem {
    border-bottom: 1px solid #eee
  }
  .page-loadmore-listitem {
    height: 50px;
    line-height: 50px;
    text-align: center
  }
  .page-loadmore-listitem:first-child {
    border-top: 1px solid #eee
  }*/
  .page-loadmore-wrapper {
    /*overflow: auto;*/
    -webkit-overflow-scrolling: touch
  }
  .mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
  }
  .mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
  }
</style>
