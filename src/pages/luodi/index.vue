<template>
  <div class="page">
    <div class="page-view">
      <img src="../../assets/img/landing_page/img1.png" alt="">
      <div class="content">
        <div class="cont">
          <div class="cont-img">
            <img :src="pageData.headImgURL" alt="">
          </div>
          <div class="cont-text">
            <div class="name">{{ pageData.displayName }} (实名: {{ pageData.realName }}) <span class="level"
                                                                                             :class="'level' + (Number(pageData.level) - 1)"></span>
            </div>
            <div class="xx">
              <span>ID: {{ pageData.employeeNo }}</span> <span>等级: {{ pageData.level | setLevel }}</span>
            </div>
          </div>
        </div>
        <div class="lt">
          <div v-if="pageData.weixinQRCodeURL || pageData.weixinAccountNo"
               @click="ISopen = true"
               class="tiem btn-copy liao bo-wei">
            <div class="wei-cher-icon"></div> <span>微信聊</span>
          </div>
          <div v-else  class="tiem btn-copy liao bo-wei">
            <img src="../../assets/img/weixin_on.png" alt=""> <span>微信聊</span>
          </div>
          <a class="tiem liao bo-dha" :href="`tel:${ pageData.mobile }`">
            <img src="../../assets/img/shouji.png" alt=""><span>电话聊</span></a>
        </div>
        <add-wechat :open="ISopen" v-model="ISopen" :weChatImg="pageData.weixinQRCodeURL" :weChatName="pageData.weixinAccountNo"/>
      </div>
      <img src="../../assets/img/landing_page/img2.png" alt="">
    </div>
    <div class="foot-bt">
      <div class="jiaru" @click='$router.push("/be_agent_form")'>立即加入淘个卡</div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import orderAPI from '../../api/orderAPI'
  import {Toast} from 'mint-ui'
  import weixin from '../../common/weixin'

  export default {
    name: 'myLink',
    data() {
      return {
        ISopen: false,
        pageData: {},
        link: '',
        my: false
      }
    },
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {},
        identity: state => state.security && state.security.user && state.security.user.identity || {}
      })
    },
    filters: {
      setLevel: function (i) {
        let level = JSON.parse(sessionStorage.level)
        let a = ''
        level.forEach((val) => {
          if (val.value === +i) {
            a = val.label
          }
        })
        return a
      }
    },
    methods: {},
    mounted() {
      orderAPI.getCustomerService((res) => {
        this.pageData = res.data
      })
      orderAPI.getAgent((res) => {
        this.link = res.data.link
      })
      let clipboard1 = new this.clipboard('.copy');
      clipboard1.on('success', function (e) {
        Toast({
          message: '已成功复制微信号',
          position: 'top'
        })
        e.clearSelection();
      });
      let clipboard2 = new this.clipboard('.cope-link');
      clipboard2.on('success', function (e) {
        Toast({
          message: '复制成功',
          position: 'top'
        })
        e.clearSelection();
      });
      if (this.$route.query.inviterId === this.user.id) {
        this.my = true
      } else {
        this.my = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .page {
    display: flex;
    flex-wrap: wrap;
    .page-view {
      flex: 1 0 100%;
      height: calc(100% - 53px);
      overflow: auto;
      img {
        max-width: 100%;
        height: auto;
        display: block;
      }
      .content {
        width: 100%;
        height: 122px;
        padding: 0 10px;
        p {
          font-size: 18px;
        }
        .cont {
          margin-top: 15px;
          display: flex;
          align-items: center;
          .cont-img {
            margin-right: 30px;
            width: 50px;
            height: 50px;
            overflow: hidden;
            border-radius: 25px;
            img {
              max-width: 100%;
              height: auto;
            }
          }
          .cont-text {
            font-size: 14px;
            .name {
              display: flex;
              align-items: center;
            }
            i {
              display: inline-block;
              width: 16px;
              height: 16px;
              line-height: 16px;
              border-radius: 8px;
              background-color: yellow;
              margin-left: 10px;
              text-align: center;
            }
            .xx {
              margin-top: 10px;
              font-size: 12px;
              span {
                margin-right: 15px;
                color: #b5b5b5;
              }
            }
          }
        }
        .lt {
          margin-top: 15px;
          border-top: 1px solid #e2e2e2;
          padding: 10px 0;
          display: flex;
          align-items: center;
          justify-content: space-around;

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
    .foot-bt {
      width: 100%;
      height: 53px;
      background-color: white;
      padding: 10px 0;
      bottom: 0;
      display: flex;
      left: 0;
      justify-content: space-around;
      font-size: 16px;
      .item {
        border-radius: 16px;
        &:nth-child(1) {
          color: #ddb883;
          border: 1px solid #ddb883;
        }
        &:nth-child(2) {
          color: white;
          background: #ddb883;
        }
        padding: 6px 15px;
        line-height: 1.2;
      }
    }
    .jiaru {
      width: 150px;
      padding: 6px 15px;
      line-height: 1.2;
      background-image: linear-gradient(to right, $color2 -30%, $color3);
      color: white;
      margin: 0 auto;
      border-radius: 16px;
    }
  }
</style>
