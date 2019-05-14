<style lang="scss" scoped>
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .friends {
    background-color: white;
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    background-size: cover;
    .view {
      position: relative;
      height: calc(100% - 53px);
      overflow-x: hidden;
      overflow-y: auto;

      width: 100%;
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
              background-color: $color3;
              color: $color1;
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
      img {
        max-width: 100%;
        height: auto;
        display: block;
      }
    }
    .btn {
      background-color: white;
      position: absolute;
      height: 53px;
      padding: 10px 0;
      display: flex;
      z-index: 998;
      width: 100%;
      bottom: 0;
      justify-content: space-around;
      align-items: center;
      left: 0;
      .bg-letf {
        border: 1px solid $color3;
        color: $color3;
        border-radius: 20px;
      }
      .bg-rigth {
        background-image: linear-gradient(to right, $color2 -30%, $color3);
        color: white;
        border-radius: 20px;
      }
      .item {
        font-size: 16px;
        line-height: 1.2;
        width: 110px;
        text-align: center;
        padding: 6px 0;
      }
    }
    .mint-popup {
      width: 100%;
      bottom: 0;
      transform: none;
      left: 0;
    }
    .fenx-model {
      width: 100%;
      position: absolute;
      bottom: 0;
      .btn-fool {
        background-image: linear-gradient(to right, $color2 -30%, $color3);
        border: 1px solid $color3;
        border-radius: 20px;
        font-size: 16px;
        color: $color1;
        text-align: center;
        position: absolute;
        background-color: white;
        bottom: 0;
        width: 100%;
        padding: 10px 0;
      }
      background-color: #f2f2f2;
      padding: 10px 0;
      p {
        text-align: center;
        font-size: 18px;
      }
      .list {
        display: flex;
        flex-wrap: wrap;
        span {
          margin-top: 15px;
          text-align: center;
          img {
            display: block;
            margin: 5px auto;
            width: 30px;
            height: 30px;
          }
          flex: 0 0 33.333%;
        }
      }
      z-index: 999;
      height: 300px;
    }
  }
</style>

<template>
  <div class="friends">
    <div class="view">
      <div><img src="../../assets/img/landing_page/img1.png" alt=""></div>
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
              <span>ID: {{ pageData.employeeNo }}</span>
            </div>
          </div>
        </div>
        <div class="lt">
          <div v-if="pageData.weixinQRCodeURL || pageData.weixinAccountNo"
               @click="ISopen = true"
               class="tiem liao bo-wei">
            <img src="../../assets/img/weixin.png" alt=""> <span>微信聊</span>
          </div>
          <div v-else  class="tiem liao bo-wei">
            <img src="../../assets/img/weixin_on.png" alt=""> <span>微信聊</span>
          </div>
          <a class="tiem liao bo-dha" :href="`tel:${ pageData.mobile }`">
            <img src="../../assets/img/shouji.png" alt=""><span>电话聊</span></a>
        </div>
        <add-wechat :open="ISopen" v-model="ISopen" :weChatImg="pageData.weixinQRCodeURL" :weChatName="pageData.weixinAccountNo"/>
      </div>
      <div><img src="../../assets/img/landing_page/img2.png" alt=""></div>
    </div>
    <div class="btn">
      <div class="item bg-letf" @click="share">邀请链接</div>
      <div class="item bg-rigth" @click="$router.push({path: '/mypostrs'})">邀请海报</div>
    </div>

    <FenXiang :show="fex"></FenXiang>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {Toast} from 'mint-ui'
  import orderAPI from '../../api/orderAPI'
  import config from '@/config'
  import FenXiang from '../../components/fenxing'
  import weixin from '../../common/weixin'

  export default {
    name: 'index',
    components: {
      FenXiang
    },
    data() {
      return {
        ISopen: false,
        open: false,
        detail: {},
        fex: false,
        pageData: {}
      }
    },
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {},
        identity: state => state.security && state.security.user && state.security.user.identity || {}
      })
    },
    methods: {
      share() {
        this.fex = true
        setTimeout(() => {
          this.fex = false
        }, 3000)
        weixin.wxShare({
          title: `${this.user.displayName}邀请您加入淘个卡，开启轻创业之旅.`,
          desc: '会员最高补贴140元，办卡轻松拿佣金，点击获取更多权益。',
          link: encodeURI(`${config.HOST}/m/invitation/agent?inviterId=${this.user.id}`),
        }, () => {
          this.open = false
          this.fex = false
        })
      }
    },
    created() {
      orderAPI.getCustomerService((res) => {
        this.pageData = res.data
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
  }
</script>
