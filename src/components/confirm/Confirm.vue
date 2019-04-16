/*
* @class   独有确定弹窗
* @author  Jeff Tsui
* @date    17.06.23
*/
<style lang="scss" rel="stylesheet/scss">
  .hb-confirm{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, .5);
    .hb-confirm-box{
      margin: 50px 20px;
      padding: 20px 25px;
      background-color: #ffffff;
      text-align: center;
    }
    .hb-confirm-icon{
      margin-top: 30px;
    }
    .hb-confirm-content{
      margin: 10px 5px 0;
      color: #000000;
      line-height: 1.6;
      font-size: 1.3rem;
      p{
        margin: 0;
      }
    }
    .hb-confirm-tips{
      padding: 15px 0;
      color: #666666;
      font-size: .7125rem;
      line-height: 1.5;
    }
    .hb-confirm-button{
      margin: 40px 0 20px;
    }
  }
</style>

<template>
  <div class="hb-confirm" v-show="show">
    <div class="hb-confirm-box">
      <div class="hb-confirm-icon" v-show="icon">
        <i :class="'hby-icon ' + 'hby-icon-' + icon" ></i>
      </div>
      <div class="hb-confirm-content" v-html="content"></div>
      <div class="hb-confirm-tips" v-show="tips" v-html="tips"></div>
      <div class="hb-confirm-button">
        <mt-button size="large" :type="btnType || 'primary'" @click="ok">{{btnTxt || '立即登录'}}</mt-button>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'hby-confirm',
    props: {
      icon: String,
      content: String,
      tips: String,
      btnType: String,
      btnTxt: String,
      callback: [Function, Boolean],
      show: {
        default: true,
        type: Boolean
      }
    },
    methods: {
      ok(evt) {
        if (this.callback) {
          typeof this.callback == 'function' && this.callback()
          return
        }
      }
    }
  }
</script>
