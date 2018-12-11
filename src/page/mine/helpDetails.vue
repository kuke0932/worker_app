<template>
  <div>
    <mt-header fixed :title='title' class="header">
      <div slot="left" @click="$router.back()">
        <mt-button icon="back"></mt-button>
      </div>
      <mt-button  slot="right" @click="choseCar" style="font-size: 0.8rem;">选择车型</mt-button>
    </mt-header>
    <div class="container">
      <div style="height: 106px;width: 100%;"></div>
      <p v-if="!details && !noData" style="text-align: center;color: #999;">-- 请选择或搜索车型 --</p>
      <p v-if="noData" style="text-align: center;color: #999;">-- 无此帮助详情 --</p>
      <div v-html="details" style="padding: 1rem 0.5rem;"></div>
    </div>
    <form action="/" class="carSearch">
      <van-search
        v-model="carCode"
        show-action
        placeholder="请输入车型编码"
        @search="onSearch"
      >
        <div style="margin: 0 10px;" slot="action" @click="onSearch">搜索</div>
      </van-search>
    </form>
    <van-popup v-model="showPopup" position="bottom" >
      <van-picker
        value-key="name"
        show-toolbar
        title="选择车型"
        :columns="carColumns"
        @cancel="onCancel"
        @confirm="onConfirm"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
// import { Toast } from 'vant'
import { getHelp } from '@/api/mine'
import { listAllCarType } from '@/api/process'

export default {
  components: {
  },
  data () {
    return {
      title: '',
      processCode: '',
      details: '',
      noData: false,
      showPopup: false,
      carCode: '',
      carList: [],
      carColumns: [
        {
          values: [],
          className: 'column1'
        },
        {
          values: [],
          className: 'column2'
        }
      ]
    }
  },
  activated () {
    this.carCode = ''
    this.processCode = this.$route.query.code
    this.title = this.$route.query.title
    const code = this.$route.params.carCode
    if (code) {
      this.fetchData(this.processCode, code)
    }
  },
  deactivated () {
    this.reset()
  },
  created () {
    listAllCarType().then(resp => {
      this.carList = resp.data.data
      this.carColumns[0].values = this.carList
      if (this.carList[0].carTypeList) {
        this.carColumns[1].values = this.carList[0].carTypeList
      }
    })
  },
  methods: {
    fetchData (processCode, carCode) {
      getHelp(processCode, carCode).then(resp => {
        if (resp.data.data) {
          this.noData = false
          this.details = resp.data.data.helpContent
        } else {
          this.details = ''
          this.noData = true
        }
        this.showPopup = false
      })
    },
    reset () {
      this.processCode = ''
      this.details = ''
      // this.carColumns = []
    },
    choseCar () {
      this.showPopup = true
      this.carCode = ''
    },
    onCancel () {
      this.showPopup = false
    },
    onConfirm (v) {
      this.showPopup = false
      this.fetchData(this.processCode, v[1].code)
    },
    onChange (picker, values) {
      picker.setColumnValues(1, values[0].carTypeList)
    },
    onSearch () {
      this.fetchData(this.processCode, this.carCode)
    }
  }
}
</script>

<style lang="less">
.container {
}
.carSearch {
  width: 100%;
  position: fixed;
  top: 64px;
}
</style>
