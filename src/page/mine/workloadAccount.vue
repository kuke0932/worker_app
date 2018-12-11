<template>
  <div>
    <mt-header fixed title="工作量统计" class="header">
      <div slot="left" @click="$router.back()">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>
    <div class="container">
      <div style="height: 60px;width: 100%;"></div>
      <div class="search">
        <div class="cell1">
          <mt-cell v-model="selBeginDate" is-link @click.native="openBeginDatePicker"></mt-cell>
        </div>
        <div class="cell2">
          <mt-cell v-model="selEndDate" is-link @click.native="openEndDatePicker"></mt-cell>
        </div>
        <div class="cell3">
          <div @click="search">查询</div>
        </div>
      </div>
      <div style="height: 60px;width: 100%;"></div>
      <p v-if="noData" class="nodataNotice">- 暂无工作量 -</p>
      <van-collapse class="data_container" v-for="(item, index) in statisticsList" v-model="activeNames" :key="index">
        <van-collapse-item  :name="index" >
          <div slot="title">生产类型：
            <span style="margin-left: 20px">{{item.produceType}}</span>
            <img @click.stop="lookDetail(item.produceType)" src="../../assets/icon/question.svg"  alt="" style="vertical-align: middle;margin-left: 10px;">
          </div>
          <p v-if="item.CJ1">  <span>裁剪下层：</span>         <i>{{item.CJ1 }}</i>      <van-button @click.native="goToDetail('CJ1', 'BFB', item.produceType)" class="btn" size="mini">明细</van-button></p>
          <p v-if="item.CJ2">  <span>裁剪上层：</span>         <i>{{item.CJ2 }}</i>      <van-button @click.native="goToDetail('CJ2', 'BFB', item.produceType)" class="btn" size="mini">明细</van-button></p>
          <p v-if="item.CJ1F"> <span>裁剪下层（翻边）：</span> <i>{{item.CJ1F }}</i>     <van-button @click.native="goToDetail('CJ1', 'FB', item.produceType)" class="btn" size="mini">明细</van-button></p>
          <p v-if="item.PJ">   <span>拼接：</span>             <i>{{item.PJ }}</i>       <van-button @click.native="goToDetail('PJ', 'BFB', item.produceType)" class="btn" size="mini">明细</van-button></p>
          <p v-if="item.PJF">  <span>拼接（翻边）：</span>     <i>{{item.PJF }}</i>      <van-button @click.native="goToDetail('PJ', 'FB', item.produceType)" class="btn" size="mini">明细</van-button></p>
          <p v-if="item.QB">   <span>去边：</span>             <i>{{item.QB }}</i>       <van-button @click.native="goToDetail('QB', 'BFB', item.produceType)" class="btn" size="mini">明细</van-button></p>
          <p v-if="item.BB">   <span>包边：</span>             <i>{{item.BB }}</i>       <van-button @click.native="goToDetail('BB', 'BFB', item.produceType)" class="btn" size="mini">明细</van-button></p>
          <p v-if="item.BBF">  <span>包边（翻边）：</span>      <i>{{item.BBF }}</i>     <van-button @click.native="goToDetail('BB', 'FB', item.produceType)" class="btn" size="mini">明细</van-button></p>
          <p v-if="item.DK">   <span>钉扣：</span>             <i>{{item.DK }}</i>      <van-button @click.native="goToDetail('DK', 'BFB', item.produceType)" class="btn" size="mini">明细</van-button></p>
        </van-collapse-item>
      </van-collapse>
    </div>
    <mt-popup
      v-model="popupVisible" style="border-radius: 6px">
      <SketchMap :produceType="selProduceType" style="margin: 0 auto;"></SketchMap>
    </mt-popup>
    <mt-datetime-picker
      ref="picker1"
      v-model="beginDate"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :endDate="new Date()"
      type="date"
      @confirm="choseBeginDate">
    </mt-datetime-picker>
    <mt-datetime-picker
      ref="picker2"
      v-model="endDate"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :endDate="new Date()"
      type="date"
      @confirm="choseEndDate">
    </mt-datetime-picker>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { listStatistics } from '@/api/mine'
import SketchMap from '@/components/SketchMap/index'
export default {
  components: {
    SketchMap
  },
  data () {
    return {
      beginDate: new Date(),
      endDate: new Date(),
      selBeginDate: '',
      selEndDate: '',
      noData: false,
      activeNames: ['0'],
      statisticsList: [],
      selProduceType: '',
      popupVisible: false
    }
  },
  mounted () {
    const time = new Date()
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const date = time.getDate()
    this.selBeginDate = year + '-' + this.isTen(month) + '-' + 1
    this.selEndDate = year + '-' + this.isTen(month) + '-' + this.isTen(date)
    this.fetchData(this.selBeginDate, this.selEndDate)
  },
  methods: {
    fetchData (beginDate, endDate) {
      listStatistics(beginDate, endDate).then(resp => {
        if (resp.data.data.length === 0) {
          this.noData = true
        } else {
          this.statisticsList = resp.data.data
        }
      })
    },
    openBeginDatePicker () {
      this.$refs.picker1.open()
    },
    openEndDatePicker () {
      this.$refs.picker2.open()
    },
    isTen (num) {
      return num < 10 ? '0' + num : num
    },
    choseBeginDate (e) {
      if (this.endDate) {
        if (e > this.endDate) {
          Toast({
            message: '开始日期不能大于结束日期',
            position: 'middle',
            duration: 1000
          })
          return
        }
      }
      this.beginDate = e
      const year = e.getFullYear()
      const month = e.getMonth() + 1
      const date = e.getDate()
      this.selBeginDate = year + '-' + this.isTen(month) + '-' + this.isTen(date)
    },
    choseEndDate (e) {
      if (this.beginDate) {
        if (e < this.beginDate) {
          Toast({
            message: '结束日期不能小于开始日期',
            position: 'middle',
            duration: 1000
          })
          return
        }
      }
      this.endDate = e
      const year = e.getFullYear()
      const month = e.getMonth() + 1
      const date = e.getDate()
      this.selEndDate = year + '-' + this.isTen(month) + '-' + this.isTen(date)
    },
    search () {
      if (this.selBeginDate === '选择开始日期') {
        Toast({
          message: '请选择开始日期',
          position: 'middle',
          duration: 1000
        })
        return
      }
      if (this.selEndDate === '选择结束日期') {
        Toast({
          message: '请选择结束日期',
          position: 'middle',
          duration: 1000
        })
        return
      }
      this.fetchData(this.selBeginDate, this.selEndDate)
    },
    goToDetail (processNo, fb, produceType) {
      const detailParam = {
        processNo: processNo,
        fb: fb,
        produceType: produceType,
        beginDate: this.selBeginDate,
        endDate: this.selEndDate
      }
      this.$router.push({ name: 'WorkloadDetail', params: detailParam })
    },
    lookDetail (type) {
      this.selProduceType = type
      this.popupVisible = true
    }
    /*
    processToCHN (code) {
      switch (code) {
        case 'CJX': return '裁剪下层'
        case 'CJS': return '裁剪上层'
        case 'CJXF': return '裁剪下层（翻边）'
        case 'PJ': return '拼接'
        case 'PJF': return '拼接（翻边）'
        case 'QB': return '去边'
        case 'BB': return '包边'
        case 'BBF': return '包边（翻边）'
        case 'DK': return '钉扣'
        default: break
      }
    }, */
  }
}
</script>

<style lang="less">

.container{
  .search{
    width: 100%;
    height: 48px;
    position: fixed;
    top: 65px;
    color: #888;
    z-index: 100;
    .cell1 {
      width: 40%;
      height: 100%;
      position: absolute;
      left: 0;
      border-right: 1px solid whitesmoke;
      box-sizing: border-box;
    }
    .cell2 {
      width: 40%;
      position: absolute;
      left: 40%;
      border-right: 1px solid whitesmoke;
      box-sizing: border-box;
    }
    .cell3 {
      width: 20%;
      position: absolute;
      right: 0;
      box-sizing: border-box;
      background: #fff;
      height: 100%;
      padding: 5px;
      /*border-bottom: 0.5px solid #ddd;*/
      div{
        color: #fff;
        line-height: 38px;
        border-radius: 5px;
        text-align: center;
        background: #26a2ff;
      }
    }

  }
  .nodataNotice {
    text-align: center;
    color: #888;
  }
  .data_container {
    position: relative;
    width: 90%;
    margin: 0 auto;
    margin-top: 10px;
    overflow: hidden;
    p {
      margin: 8px;
      font-size: 0.9em;
      span {
        display: inline-block;
        width: 50%;
      }
      i {
        display: inline-block;
        width: 20px;
        text-align: center;
      }
      .btn {
        float: right;
      }
    }
  }
  .data_container:first-child {
  }
  .data_container:after {
  }
}
</style>
