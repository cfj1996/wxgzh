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
            height: 50px;
            align-items: center;
            color: $color3;
            background: none;
            box-shadow: 0 0 1px $color3;
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
  .kefu .btn  .mint-button-text{
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
      <p>测试数据</p>
      <ul>
        <li v-for="val in pageData.list">
          <div>
            <div class="img-content"><img :src="val.headImgURL" width="80px" height="80px" alt=""></div>
            <p class="name">{{ val.name }}</p>
          </div>
          <div>
            <mt-button @click="openModel(val.weixinQRCodeURL)" class="btn"><img width="35px" height="35px" src="../../assets/img/weixin.png" alt="">加我微信</mt-button>
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
      <add-wechat :open="ISopen" v-model="ISopen" :weChatImg="weixinQRCodeURL" :kefu="true"/>
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
        ISopen: false,
        weixinQRCodeURL: '',
        pageData: {
          list: [
            {
              headImgURL: 'http://img5.imgtn.bdimg.com/it/u=1396190427,3962471256&fm=26&gp=0.jpg',
              name: 'aaa',
              weixinQRCodeURL: 'http://pic.chinaz.com/2018/0409/18040918011940118.jpg'
            },

            {
              headImgURL: 'http://img2.imgtn.bdimg.com/it/u=1122649470,955539824&fm=26&gp=0.jpg',
              name: 'bbb',
              weixinQRCodeURL: 'http://awb.img.xmtbang.com/img/uploadnew/201505/21/68ce949527c24ea6948e1273bb50f031.jpg'
            },
            {
              headImgURL: 'http://img2.imgtn.bdimg.com/it/u=2472745293,2225498805&fm=26&gp=0.jpg',
              name: 'ccc',
              weixinQRCodeURL: 'http://img.atobo.com/ProductImg/EWM/UWeb/2/4/9/0/3225/24903225/1.gif'
            }
          ]
        }
      }
    },
    methods:{
      openModel(url){
        this.weixinQRCodeURL = url
        this.ISopen = true
      }
    },
    created(){
      userAPI.listCustomerService(res=>{
        // this.pageData.list = res.data
      })
    }
  }
</script>

