<!--添加微信好友-->
<style scoped lang="scss">
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .addWachat {
    .content {
      padding: 10px;
      position: relative;
      width: 100%;
      h2 {
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        border-bottom: 1px solid #F5F5F5;
        img {
          margin-right: 15px;
        }
        font-size: 18px;
        font-weight: 400;
      }
      .img-content {
        display: flex;
        margin-left: 50px;
        align-items: center;
        p{
          margin-left: 20px;
          width: 200px;
        }
      }
      .name{
        font-size: 20px;
        font-weight: 500;
        text-align: center;
      }
      .foot {
        position: relative;
        top: 12px;
        background-color: $fgxian;
        width: calc(100% + 20px);
        margin: 0 -10px;
        height: 54px;
        padding: 10px;
        display: flex;
        .btn {
          flex: 1;
          border: 1px solid $color3;
          color: $color3;
          text-align: center;
          background: none;
          height: 34px;
          font-size: 18px;
          line-height: 34px;
          border-radius: 10px;
        }
      }
    }
  }

</style>
<template>
  <div class="addWachat">
    <mt-popup v-model="popupVisible" style="width: 100%" position="bottom">
      <div class="content">
        <h2><img src="../../assets/img/weixin.png" width="35px" height="35px" alt="">{{ kefu? userName + '微信': userName + '微信' }}</h2>
        <div class="img-content" v-if="weChatImg !== ''">
          <img :src="weChatImg" alt="" width="110px" height="110px">
          <p>长按二维码，<br>加我微信</p>
        </div>
        <div class="name" v-else-if="weChatName !== ''">
          {{ weChatName }} <mt-button v-if="weChatName !== ''" class="copy"
                                      :data-clipboard-text="weChatName"
                                      style="margin-left: 50px"
                                      size="small">点击复制</mt-button>
        </div>
        <div class="foot">
          <mt-button class="btn" @click="out">关闭</mt-button>
        </div>

      </div>
    </mt-popup>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  export default {
    name: 'index',
    data() {
      return {
        popupVisible: false
      }
    },
    props: {
      'weChatImg': {
        type: String,
        default: ''
      },
      'weChatName': {
        type: String,
        default: ''
      },
      'open':{
        type: Boolean,
        default: false
      },
      'kefu': {
        type: Boolean,
        default: false
      },
      'userName': {
        type: String,
        default: ''
      }
    },
    computed: {
      openProxy(){
        this.popupVisible = this.open
        if(this.popupVisible === false){
          return false
        } else {
          return this.popupVisible
        }
      }
    },
    methods: {
      out(val){
        this.$emit('input', false)
      },
      onCope(){
        let clipboard = new this.clipboard('.copy');
        let _this = this
        clipboard.on('success', function (e) {
          Toast({
            message: '已成功复制微信号',
            position: 'top'
          })
          _this.out()
          e.clearSelection();
        });
      }
    },
    watch: {
      'open': function (val) {
        this.popupVisible = val
      },
      'popupVisible': function (val) {
        if(val === false){
          this.out()
        }
      }
    },
    created(){
      this.onCope()
      console.log(this.userName)
    }
  }
</script>
