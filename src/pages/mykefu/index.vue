<style scoped lang="scss">
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .kefu{
    .view{
      position: relative;
      width: 100%;
      height: calc(100% - 54px);
      overflow: auto;
      ul{
        padding: 0 10px;
        li{
          margin-bottom: 1px;
          display: flex;
          background: white;
          padding: 10px 20px;
          align-items: center;
          justify-content: space-between;
          .img-content{
            img{
              border-radius: 50%;
            }
          }
          .name{
            font-size: 18px;
            text-align: center;
          }
          .btn{
            width: 150px;
            height: 40px;
            align-items: center;
            color: #1AAD19;
            background: none;
            box-shadow: 0 0 1px #1AAD19;
          }
        }
      }
    }
    .foot {
      position: relative;
      width: 100%;
      height: 54px;
      padding: 10px;
      .btn {
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
</style>
<style lang="scss">
  .kefu .add-wecher .btn  .mint-button-text{
    display: flex;
    align-items: center;
    img {
      display: block;
      margin-right: 10px;
    }
  }
</style>
<template>
  <div class="page kefu">
    <div class="view">
      <ul>
        <li v-for="val in pageData.list">
          <div>
            <div class="img-content"><img :src="val.headImgURL" width="80px" height="80px" alt=""></div>
            <p class="name">{{ val.name }}</p>
          </div>
          <div class="add-wecher">
            <mt-button @click="openModel(val.weixinQRCodeURL, val.name)" class="btn">
              <div class="wei-cher-icon" style="width: 30px;height: 30px"></div>加我微信</mt-button>
          </div>
        </li>
        <li style="margin-top: 10px;">
          <div style="padding: 10px 0">
            <p>客服是淘个卡平台为申请信用卡用户或会员，提供指导、培训、答疑解惑的专属客服。</p>
            <p style="color: red;margin-top: 15px">温馨提示：<br>
              如某个客服微信加不了好友，请加其他客服微信。</p>
          </div>
        </li>
      </ul>
      <add-wechat :open="ISopen" :user-name="userName" v-model="ISopen" :weChatImg="weixinQRCodeURL" :kefu="true"/>
    </div>
    <div class="foot">
      <div class="btn" @click="$router.push('/user_center')">返回</div>
    </div>
  </div>
</template>

<script>
  import userAPI from '../../api/userAPI'

  export default {
    name: "index",
    data(){
      return {
        userName: '',
        ISopen: false,
        weixinQRCodeURL: '',
        pageData: {
          list: []
        }
      }
    },
    methods:{
      openModel(url, name){
        this.weixinQRCodeURL = url
        this.userName = name
        this.ISopen = true
      }
    },
    created(){
      userAPI.listCustomerService(res=>{
        this.pageData.list = res.data
      })
    }
  }
</script>

