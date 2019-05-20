<style scoped lang="scss">
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .to-author {
    .view{
      padding: 10px;
      position: relative;
      width: 100%;
      height: calc(100% - 54px);
      .body{
        padding-top: 10px;
        margin: -10px;
        background-color: white;
        .content{
          display: flex;
          .img-ku{
            margin: 0 15px;
            img{
              border-radius: 50%;
            }
          },
        .text{
          flex: 1;
          p{
            margin-top: 5px;
            color: $color1;
          }
          .name{
            color: black;
            font-size: 16px;
          }
          .id{
            padding-bottom: 10px;
            border-bottom: 1px solid $fgxian;
          }
          .danhao{
           color: $textColor1;
          }
        }
        }
        .lt {
          border-top: 1px solid $fgxian;
          padding: 10px 0;
          margin: 10px -10px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .shu{
            &::after{
              content: '';
              width: 1px;
              height: 25px;
              background-color: $fgxian;
              position: relative;
              left: 60%;
            }
          }
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          .tiem {
            display: flex;
            align-items: center;
            span {
              padding: 0 10px;
              color: #000;
            }
          }
        }
      }
    }
    .foot {
      position: relative;
      width: 100%;
      height: 54px;
      padding: 10px;
      display: flex;
      .btn1 {
        flex: 0 50%;
        color: white;
        background: linear-gradient(to left, $color2, $color3);
        height: 34px;
        font-size: 18px;
        text-align: center;
        line-height: 34px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      .btn2 {
        flex: 0 50%;
        color: $color3;
        border: 1px solid $color3;
        height: 34px;
        font-size: 18px;
        text-align: center;
        line-height: 34px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-right: none;
      }
    }
  }
</style>
<template>
  <div class="page to-author">
    <div class="view">
      <div class="body">
        <div class="content">
          <div class="img-ku">
            <img v-if="pageData.headImgURL" :src="pageData.headImgURL" width="65px" height="65ox" alt="">
            <img v-else src="../../assets/img/new_img/user/iocn/user.png" width="65px" height="65ox" alt="">
          </div>
          <div class="text">
            <p class="name">{{ pageData.displayName }}</p>
            <p class="id">ID {{ pageData.employeeNo }}</p>
            <p class="danhao">{{ pageData.approvalNo }}</p>
            <p class="start">授权状态: {{ pageData.status | isStatus }}</p>
            <p class="time">申请时间：{{ pageData.submitDate | timeAuto }}</p>
          </div>
        </div>
        <div class="lt">
          <div v-if="pageData.weixinQRCodeURL || pageData.weixinAccountNo"
               @click="ISopen = true"
               class="tiem btn-copy liao bo-wei shu">
            <div class="wei-cher-icon"></div> <span>微信聊</span>
          </div>
          <div v-else  class="tiem btn-copy liao bo-wei">
            <img src="../../assets/img/weixin_on.png" alt=""> <span>微信聊</span>
          </div>
          <a class="tiem liao bo-dha" :href="`tel:${ pageData.mobile }`">
            <img src="../../assets/img/shouji.png" alt=""><span>电话聊</span></a>
        </div>
      </div>
      <add-wechat :open="ISopen" v-model="ISopen" :user-name="pageData.displayName" :weChatImg="pageData.weixinQRCodeURL" :weChatName="pageData.weixinAccountNo"/>
    </div>
    <div class="foot">
      <mt-button class="btn2" @click="out">关闭</mt-button>
      <mt-button class="btn1" :disabled="pageData.status === 2 ? true: false" @click="shouquan">{{ pageData.status | sqyuan }}</mt-button>
    </div>
  </div>
</template>

<script>
  import proxyAPI from '../../api/proxy'
  import creditCardAPI from '../../api/creditCardAPI'
  import moment from 'moment'
  import {Toast} from 'mint-ui';

  export default {
    name: 'to_author',
    data(){
      return {
        isOut: true,
        ISopen: false,
        pageData: {},
        start: {
          shouq: false
        }
      }
    },
    filters: {
      isStatus: function (value) {
        if (value === 1) {
          return '待审'
        } else if (value === 2) {
          return '通过'
        }
        return '拒绝'
      },
      timeAuto: function (val) {
        return moment(Number(val)).format('YYYY-MM-DD HH:mm')
      },
      sqyuan(val){
        if (val === 1) {
          return '授权'
        } else if (val === 2) {
          return '已授权'
        }
        return '拒绝'
      }
    },
    methods: {
      shouquan() {
        proxyAPI.aprvAgent({id: this.$route.query.id, status: 2}, () => {
          Toast({
            message: '操作成功'
          });
          this.out()
        })
      },
      out(){
        if(this.isOut){
          this.$router.go(-1)
        }else {
        this.$util.closeWindow()
        }
      }
    },
    created(){
      creditCardAPI.readInfo(()=>{
        this.$store.dispatch('getUnreadInfo')
      })
      proxyAPI.getAgentDetail({
        id: this.$route.query.id
      }, res => {
        this.pageData = res.data
      })
      console.log('信息', this.$router.currentRoute)

    },
    beforeRouteEnter(to, from, next){
      next(vm=>{          //  这里的vm指的就是vue实例，可以用来当做this使用
        console.log(from)
        if(from.path === '/'){
          vm.isOut = false
        }
      })
    }
  }
</script>
