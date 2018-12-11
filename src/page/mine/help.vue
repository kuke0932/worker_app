<template>
  <div>
    <mt-header fixed title="帮助" class="header">
      <div slot="left" @click="$router.back()">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>
    <van-cell-group class="container">
      <div style="height: 70px;width: 100%;"></div>
      <van-cell v-for="(item, index) in processList" v-bind:key='index' :title="item.name" is-link :to="{ name: 'HelpDetails', query: {code: item.code, title: item.name}}" />
    </van-cell-group>
  </div>
</template>

<script>
import { listProcess } from '@/api/mine'
export default {
  components: {
  },
  data () {
    return {
      processList: []
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      listProcess().then(resp => {
        this.processList = resp.data.data
      })
    }
  }
}
</script>

<style lang="less">
.container{
}
</style>
