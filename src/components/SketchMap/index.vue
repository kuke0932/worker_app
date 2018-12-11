<template>
  <div id="sketchMap">
    <div class="driver mainDriver" :class="mainDriverSelected ? 'matSelected' : ''">
      <div class="coil mainDriverCoil" :class="mainDriverCoilSelected ? 'CoilSelected' : ''">主驾丝圈</div>
      <span>主驾</span>
    </div>

    <div class="driver copilot" :class="copilotSelected ? 'matSelected' : ''">
      <div class="coil copilotCoil" :class="copilotCoil ? 'CoilSelected' : ''">副驾丝圈</div>
      <span>副驾</span>
    </div>

    <div class="backRow" :class="backRow ? 'matSelected' : ''">
      <div class="semiCircle"></div>
      <div class="backRowCoil backRowLeftCoil" :class="backRowLeftCoil ? 'CoilSelected' : ''">后排左丝圈</div>
      <div class="backRowCoil backRowRightCoil" :class="backRowRightCoil ? 'CoilSelected' : ''">后排右丝圈</div>
      <span>后排</span>
    </div>

    <div class="backRow7" :class="backRow7 ? 'matSelected' : ''">
      <div class="backRow7Coil" :class="backRow7Coil ? 'CoilSelected' : ''">丝圈</div>
      <span>后排7座</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    produceType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      arrayProductType: [],
      mainDriverSelected: false,
      mainDriverCoilSelected: false,
      copilotSelected: false,
      copilotCoil: false,
      backRow: false,
      backRowLeftCoil: false,
      backRowRightCoil: false,
      backRow7: false,
      backRow7Coil: false
    }
  },
  watch: {
    produceType (val) {
      this.arrayProductType = this.produceType.split('')
      // 主驾
      if (this.arrayProductType[0] === '0') {
        this.mainDriverSelected = false
        this.mainDriverCoilSelected = false
      }
      if (this.arrayProductType[0] === '1') {
        this.mainDriverSelected = true
        this.mainDriverCoilSelected = false
      }
      if (this.arrayProductType[0] === '2') {
        this.mainDriverSelected = false
        this.mainDriverCoilSelected = true
      }
      if (this.arrayProductType[0] === '3') {
        this.mainDriverSelected = true
        this.mainDriverCoilSelected = true
      }
      // 副驾
      if (this.arrayProductType[1] === '0') {
        this.copilotSelected = false
        this.copilotCoil = false
      }
      if (this.arrayProductType[1] === '1') {
        this.copilotSelected = true
        this.copilotCoil = false
      }
      if (this.arrayProductType[1] === '2') {
        this.copilotSelected = false
        this.copilotCoil = true
      }
      if (this.arrayProductType[1] === '3') {
        this.copilotSelected = true
        this.copilotCoil = true
      }
      // 后排左
      if (this.arrayProductType[2] === '0') {
        this.backRow = false
        this.backRowLeftCoil = false
      }
      if (this.arrayProductType[2] === '1') {
        this.backRow = true
        this.backRowLeftCoil = false
      }
      if (this.arrayProductType[2] === '2') {
        this.backRow = false
        this.backRowLeftCoil = true
      }
      if (this.arrayProductType[2] === '3') {
        this.backRow = true
        this.backRowLeftCoil = true
      }
      // 后排右
      if (this.arrayProductType[3] === '0') {
        this.backRow = false
        this.backRowRightCoil = false
      }
      if (this.arrayProductType[3] === '1') {
        this.backRow = true
        this.backRowRightCoil = false
      }
      if (this.arrayProductType[3] === '2') {
        this.backRow = false
        this.backRowRightCoil = true
      }
      if (this.arrayProductType[3] === '3') {
        this.backRow = true
        this.backRowRightCoil = true
      }
      // 后排7座
      if (this.arrayProductType[4] === '0') {
        this.backRow7 = false
        this.backRow7Coil = false
      }
      if (this.arrayProductType[4] === '1') {
        this.backRow7 = true
        this.backRow7Coil = false
      }
      if (this.arrayProductType[4] === '2') {
        this.backRow7 = false
        this.backRow7Coil = true
      }
      if (this.arrayProductType[4] === '3') {
        this.backRow7 = true
        this.backRow7Coil = true
      }
    }
  }
}
</script>

<style scoped>
  #sketchMap{
    width: 280px;
    height: 345px;
    border: 1px solid #bcbcbc;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .driver{
    width: 119px;
    height: 100px;
    line-height: 60px;
    font-size: 14px;
    color: #6b6b6b;
    text-align: center;
    float: left;
    background: #dddddd;
    margin-top: 10px;
    overflow: hidden;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .mainDriver{
    margin-left: 15px;
    margin-right: 5px;
  }

  .copilot{
    margin-left: 5px;
    margin-right: 15px;
  }
  .coil{
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #6b6b6b;
    background: #bcbcbc;
    margin: 10px auto 0;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  /*后排*/
  .backRow{
    width: 248px;
    height: 100px;
    background: #dddddd;
    float: left;
    line-height: 38px;
    font-size: 14px;
    color: #6b6b6b;
    text-align: center;
    margin: 10px 15px 0;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    overflow: hidden;
  }
  .semiCircle{
    margin: 0 auto;
    width: 30px;
    height: 15px;
    background: #fff;
    -webkit-border-radius: 0 0 15px 15px;
    -moz-border-radius: 0 0 15px 15px;
    border-radius: 0 0 15px 15px;
  }
  .backRowCoil{
    width: 91px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #6b6b6b;
    float: left;
    background: #bcbcbc;
    margin-top: 0;
  }
  .backRowLeftCoil{
    margin-left: 19px;
    margin-right: 14px;
  }
  .backRowRightCoil{
    margin-left: 14px;
    margin-right: 14px;
  }
/*后排七座*/
  .backRow7{
    width: 248px;
    height: 100px;
    background: #dddddd;
    float: left;
    line-height: 60px;
    font-size: 14px;
    color: #6b6b6b;
    text-align: center;
    margin: 10px 15px 0;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    overflow: hidden;
  }
  .backRow7Coil{
    width: 228px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #6b6b6b;
    margin: 10px 10px 0;
    background: #bcbcbc;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .matSelected{
    background: #22885a;
    color: #fff;
  }
  .CoilSelected{
    background: #42b983;
    color: #fff;
  }
</style>
