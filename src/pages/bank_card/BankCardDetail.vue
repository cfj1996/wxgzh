/*
* @class   银行卡详情页
* @author  Dennis Lei
* @date    19.04.04
*/

<style scoped  lang="scss" rel="stylesheet/scss">
  @import "~@/assets/css/variable.scss";
  .page-main{
    height: 100%;
    overflow: auto;
    padding-bottom: 55px;
    margin-bottom: 0;
    background-color: #fff;
  }
  .card-group{
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-wrap: wrap;
    justify-content: left;
    padding: 0 10px;

    li{
      box-sizing: border-box;
      height: 26px;
      text-align: center;

      &:first-child{
        flex: 50%;
        height: 100%;
        position: relative;
        display: flex;
        /*css3 实现背景line */
        background: linear-gradient(270deg,
          #fff calc(57% - 1px),
          #999 calc(40% - 4px),
          #fff calc(50% + 50px)
        );
        background-position: 50% 49.6%;
        background-size: 1px 80%;
        background-repeat: no-repeat;

        .menu{
          flex: 1;
          &:first-child{
            i{
              color: #ff4f0b;
            }
          }
          &:last-child{
            i{
              color: #3ecd0f;
            }
          }
          p{
            color: $color3;
          }
          span{
            font-size: 12px;
            line-height: 18px;
          }
        }
      }
      &:last-child{
        flex: 50%;
        text-align: right;
      }
    }
  }
  .share-to-popup{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    .show{
      background: url("../../assets/img/fenxiang.png") right no-repeat;
    }
    .fenxian{
      position: relative;
      left: 0;
      top: 0;
      height: calc(100% - 60px);
      opacity: 0.8;
      background-size: contain;
    }
    .share-ul{
      position: relative;
      height: 60px;
      display: flex;
      bottom: 0;
      padding: 8px 0;
      >li {
        flex: 1;
        text-align: center;
        border-right: 1px solid #cecece;

        &:last-child{
          border-right: none;
        }
      }
    }
  }
</style>
<style lang="scss">
  @import "~@/assets/css/variable.scss";
  .mint-button--primary{
    background-color: $color3;
  }
  .bank-card-promotion-dialog {
    .dialog-box{
      position: relative;
      width: 100%;
      min-width: 300px;
      margin: 0 auto;
      background: transparent;
      height: 100%;
    }
    .dialog-body{
      height: 60%;
      .tip-content{
        height: 100%;
      }
    }
    .dialog-footer{
      position: absolute;
      width: 100%;
      height: 40%;
      top: 60%;
      background: #fff;
    }
    .promotion-desc{
      line-height: 16px;
      padding: 10px;
      text-align: left;
    }
    .promotion-url-section{
      display: flex;
      padding: 10px;

      input{
        flex:60%;
        border: 1px solid #999;
        margin-right: 10px;
        border-radius: 4px;
      }

    }
  }
  .bank-card-content{
    width: 100%;
    img{
      max-width: 100%;
      height: auto;
      display: block;
    }
  }
</style>
<template>
  <div class="page">
    <section class="page-main">
      <div class="bank-card-content" v-html="bankCardContent"></div>
    </section>
    <section class="bottom-single-btn" style="height: 54px;">
      <ul class="card-group">
        <li>

          <div class="menu" v-if="user.level > 1">
            <router-link :to="{ path: 'credit_promotion', query: { creditCardId: this.$route.query.creditCardId }}">
            <i class="iconfont iconzizhutuiguang"></i>
            <p>我要推广</p>
            </router-link>
          </div>
          <div class="menu" v-else @click="isVisibleSharePopup = true">
            <i class="iconfont iconzizhutuiguang"></i>
            <p>分享</p>
          </div>
          <!--this.$router.push({ name: 'news', params: { userId: 123 }})-->
          <div @click="$router.push({ name: 'sqzn', params: { path: detail.guide }})" class="menu">
            <i class="iconfont iconbangzhuzhongxin"></i>
            <p style="color: #36464e">申请指南</p>
          </div>
        </li>
        <li>
          <mt-button type="primary" size="small" @click="toApply">立即申请</mt-button>
        </li>
      </ul>
    </section>

    <mt-popup v-model="isVisibleSharePopup" position="bottom" class="share-to-popup">
      <div :class="show?'show': ''" class="fenxian" @click="isVisibleSharePopup = false"></div>
      <ul class="share-ul">
        <li @click="share">
          <img src="../../assets/img/wechat.png" width="24" height="24">
          <p>微信</p>
        </li>
        <li @click="share">
          <img src="../../assets/img/wx-zone.png" width="24" height="24">
          <p>微信朋友圈</p>
        </li>
      </ul>
    </mt-popup>
    <fen-xiang :show="fenxin"></fen-xiang>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Toast } from 'mint-ui'
  import config from '@/config'
  import FenXiang from '@/components/fenxing'
  import BzwDialog from '@/components/dialog/BzwDialog'
  import banner1 from '@/assets/img/banks_banner/guangda-1.jpg'
  import banner2 from '@/assets/img/banks_banner/guangda-2.jpg'
  import banner3 from '@/assets/img/banks_banner/guangda-3.png'
  import weixin from '../../common/weixin'
  import creditCardAPI from '@/api/creditCardAPI'

  export default {
    name: 'BankCardDetail',
    components: {
      BzwDialog,
      FenXiang
    },
    data () {
      return {
        fenxin: false,
        show: false,
        isToBeingAgent: false, // 控制是否显示代理人相关表单信息
        isVisibleSharePopup: false, // 分享
        bankCardContent: '',
        detail: {},
        productId: '',
        creditCardId: ''
      }
    },
    computed: {
      ...mapState({
        user: (state => state.security.user),
        initialized: (state => state.metadata.initialized)
      })
    },
    methods: {
      share() {
        this.fenxin = true
        this.show = true
        setTimeout(() => {this.fenxin = false}, 3000)
        weixin.wxShare({
          title: this.user.displayName + '邀请您加入淘个卡，开启轻创业之旅',
          desc: '代理最高补贴140元，办卡轻松拿佣金，点击获取更多权益。',
          link: encodeURI(`${config.HOST}/m/invitation/xyc?productId=${this.$route.query.creditCardId}&inviterId=${this.user.id}`),
        }, () => {this.fenxin = false})
      },
      toApply() {
        if (this.user) {
          if (this.user.identity && this.user.identity.IDCardNo) {
            // 已经实名认证过
            if (Number(this.user.level) > 1) {
              // 代理商
              // 跳转到确认申请人信息页面
              this.$router.push({
                path: '/confirm_applicant_info',
                query: {
                  // bankId: this.$route.query.bankId || '',
                  creditCardId: this.creditCardId
                }
              })
            } else {
              // 普通用户
              this.$router.push({
                path: '/confirm_applicant_info',
                query: {
                  // bankId: this.$route.query.bankId || '',
                  creditCardId: this.creditCardId
                }
              })
            }
          } else {
            // 未实名认证则跳转到信用卡申请，用户资料填写
            this.$router.push({
              path: '/apply_credit_card_form',
              query: this.$route.query
            })
          }
        } else {
          // 未登录授权
          this.$router.push('/')
        }
      },
      getCardDetail() {
        creditCardAPI.getCardDetail({
          id: this.$route.query.creditCardId || ''
        }, (res) => {
          this.detail = res.data
          this.$util.setWxTitle(res.data.name) // 银行信用卡
          this.bankCardContent = res.data.content || '暂无信用卡详情'
          // this.share()
        })
      }
    },
    created() {
      alert(window.location.href)
      this.getCardDetail()
    },
    mounted() {
      // 银行信用卡详情
      this.creditCardId = this.$route.query.creditCardId || ''
      if (this.$route.path.includes('/be_agent_form')) {
        this.isToBeingAgent = true
      }
    }
  }
</script>
