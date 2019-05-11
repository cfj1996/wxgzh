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
        img {
          margin-right: 15px;
          width: 10%;
          height: auto;
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
        width: 100%;
        height: 54px;
        padding: 10px;
        display: flex;
        .btn {
          flex: 1;
          color: white;
          background: linear-gradient(to left, $color2, $color3);
          height: 34px;
          font-size: 18px;
          text-align: center;
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
        <h2><img src="../../assets/img/weixin.png" alt="">{{ kefu? '客服微信':'推荐人微信' }}</h2>
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
    }
  }
</script>
