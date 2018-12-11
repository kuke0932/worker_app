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
      <p v-if="!statisticsList" class="nodataNotice">- 暂无数据 -</p>
      <div v-else class="table">
        <div>
        <!--<table border="1" style="border-collapse:collapse;width: 100%;text-align: center;">-->
          <!--<tr>-->
            <!--<th></th>-->
            <!--<th>下层</th>-->
            <!--<th>上层</th>-->
            <!--<th>拼接</th>-->
            <!--<th>去边</th>-->
            <!--<th>包边</th>-->
            <!--<th>钉扣</th>-->
          <!--</tr>-->
          <!--<tr>-->
            <!--<td>整套</td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
          <!--</tr>-->
          <!--<tr>-->
            <!--<td>单套</td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
          <!--</tr>-->
          <!--<tr>-->
            <!--<td>主驾下层</td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td></tr>-->
          <!--<tr>-->
            <!--<td>主驾上层</td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td></tr>-->
          <!--<tr>-->
            <!--<td>副驾下层</td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td></tr>-->
          <!--<tr>-->
            <!--<td>副驾上层</td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td></tr>-->
          <!--<tr>-->
            <!--<td>7座后排下层</td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td></tr>-->
          <!--<tr>-->
            <!--<td>合计</td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
            <!--<td></td>-->
          <!--</tr>-->
        <!--</table>-->
        </div>
        <div class="title">
          <span>工序 / 位置</span>
          <span>整套</span>
          <span>单套</span>
          <span>主驾下层</span>
          <span>主驾上层</span>
          <span>副驾下层</span>
          <span>后排下层</span>
          <span>7座后排下层</span>
        </div>
        <ul class="content">da
          <li class="list" v-for="(val, key, index) in statisticsList" :key="index">
            <span>{{toCHN(key)}}</span>
            <span>{{val['1'] || '-'}}</span>
            <span>{{val['2'] || '-'}}</span>
            <span>{{val['4'] || '-'}}</span>
            <span>{{val['8'] || '-'}}</span>
            <span>{{val['16'] || '-'}}</span>
            <span>{{val['32'] || '-'}}</span>
            <span>{{val['64'] || '-'}}</span>
          </li>
        </ul>
      </div>
    </div>
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
export default {
  components: {
  },
  data () {
    return {
      beginDate: new Date(),
      endDate: new Date(),
      selBeginDate: '',
      selEndDate: '',
      statisticsList: ''
      // {
      // 'CJ1': {
      //   '1': 2,
      //   '4': 2
      // },
      // 'CJ2': {
      //   '32': 2,
      //   '16': 1
      // },
      // 'PJ': {
      //   '2': 2,
      //   '32': 7
      // },
      // 'QB': {
      //   '3': 2,
      //   '16': 1
      // },
      // 'BB': {
      //   '8': 2,
      //   '64': 5
      // },
      // 'DK': {
      //   '32': 2,
      //   '4': 3
      // }
      // }
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
        this.statisticsList = resp.data.data.processCount
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
    toCHN (code) {
      switch (code) {
        case 'CJ1': return '下层'
        case 'CJ2': return '上层'
        case 'PJ': return '拼接'
        case 'QB': return '去边'
        case 'BB': return '包边'
        case 'DK': return '钉扣'
        case 'FH': return '发货'
        default: break
      }
    }
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
    margin-top: 60px;
    text-align: center;
    color: #888;
  }
  .table {
    margin-top: 60px;
    padding: 0 0.4rem;
  }
  .title {
    display: flex;
    height: 38px;
    background-color: #db615b;
    color: white;
    span {
      flex: 1;
      text-align: center;
      font-size: 0.8rem;
    }
    span:nth-child(2) {
      line-height: 38px;
    }
    span:nth-child(3) {
      line-height: 38px;
    }
    span:first-child {
      line-height: 38px;
      flex: 2.5!important;
    }
    span:last-child {
      flex: 1.5!important;
    }
  }
  .content {
    .list {
      display: flex;
      margin-top: 0.6rem;
      padding: 0.3rem 0;
      background: #efefef;
      span{
        flex: 1;
        text-align: center;
      }
      span:first-child {
        flex: 2.5!important;
      }
      span:last-child {
        flex: 1.5!important;
      }
    }
  }
}
</style>
