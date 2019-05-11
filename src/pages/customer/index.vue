<style lang="scss" scoped>
  @import "~@/assets/css/level.scss";

  .page {
    padding-top: 20px;
    .title {
      p {
        line-height: 1.5;
        .level {
          transform: translateY(8px);
          display: inline-block;
          width: 30px;
          height: 30px;
        }
      }
      span {
        display: block;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        margin: 0 auto;
        overflow: hidden;
        img {
          max-width: 100%;
          height: auto;
          display: block;
        }
      }

    }
    .text {
      margin-top: 20px;
      text-align: center;
      line-height: 1.2;
    }
    .icon {
      width: 75%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item {
        div {
          width: 35px;
          height: 35px;
          margin: 20px auto;
          img {
            border-radius: 50%;
            overflow: hidden;
            width: 35px;
            height: 35px;
            display: block;
          }
        }
        p {
          color: black;
        }
      }
    }
  }
</style>
<template>
  <div class="page">
    <div class="title"><span><img v-if="pageData.headImgURL" :src="pageData.headImgURL" alt=""></span>
      <p class="text">{{pageData.displayName}} <span :class="'level' + (Number(pageData.level) - 1)"
                                                     class="level"></span> <br> ID:{{pageData.employeeNo}} </p>
    </div>
    <div class="icon">
      <div class="item">
        <a :href="`tel:${ pageData.mobile }`">
          <div><img src="../../assets/img/shouji.png" alt=""></div>
          <p>给我打电话</p>
        </a>
      </div>
      <div class="item">
        <div @click="ISopen = true"
             style="margin-bottom: 13px"
             v-if="pageData.weixinQRCodeURL || pageData.weixinAccountNo">
          <img src="../../assets/img/weixin.png" alt=""></div>
        <div style="margin-bottom: 13px" v-else><img src="../../assets/img/weixin_on.png" alt=""></div>
        <p style="margin-top: 16px;">加我微信</p>
      </div>
    </div>
    <add-wechat :open="ISopen" v-model="ISopen" :weChatImg="pageData.weixinQRCodeURL" :weChatName="pageData.weixinAccountNo"/>
    <p style="padding: 50px 10%;line-height: 1.5;font-size: 16px">
      专属服务经理是淘个卡面对用户的第一责任人，在享有淘个卡相关权益的同时，也肩负指导、培训和为用户排疑解惑的责任与义务。</p>
  </div>
</template>

<script>
  import orderApi from '../../api/orderAPI'
  import {Toast} from 'mint-ui'

  export default {
    name: 'index',
    data() {
      return {
        pageData: {},
        ISopen: false
      }
    },
    mounted() {
      orderApi.getCustomerService((res) => {
        console.log(res)
        this.pageData = res.data
      })
    }
  }
</script>

