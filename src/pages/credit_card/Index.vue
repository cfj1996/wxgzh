/*
* @class   主页
* @author  Dennis Lei
* @date    19.04.01
*/

<style scoped  lang="scss" rel="stylesheet/scss">
  @import "~@/assets/css/variable.scss";

  .page-main{
    .card-desc {
      padding: 40px 10px 10px;
      background: -webkit-gradient(linear, 0 0, 0 100%, from($color5), to($color1));
      img{
        width: 100%;
      }
    }
    .card-group{
      display: flex;
      display: -webkit-flex; /* Safari */
      flex-wrap: wrap;
      justify-content: left;
      padding: px2rem(10);

      li{
        flex: 49.8%;
        box-sizing: border-box;
        height: 26px;
        text-align: center;

        &:first-child{
          margin-right: 0;
        }
        &:last-child {
          margin-left: 0;
        }
        &.line{
          flex: 0.4%;
          height: 12px;
          background: #37322e;
          margin-top: 8px;
        }
        &.active{
          div{
            border-bottom: 1px solid $color5;
          }
        }
        div{
          display: inline-block;
          line-height: 26px;
          font-size: 14px;
        }
      }
    }
    .slide-wrapper{
      position: relative;
      overflow-x: hidden;
      padding: 0 10px 10px;

      .card-section{
        display: flex;
        margin-bottom: 6px;
        background: #fff;
        padding: 10px;

        .bank-img{
          width: 30%;
          height: 60px;
        }
        .bank-info{
          flex: 0 0 50%;
          padding: 0 6px;
          min-height: 30px;
          .title{
            font-weight: bold;
            padding-bottom: 4px;
          }
          .text{
            font-size: 12px;
          }
        }
        .bank-apply-btn{
          flex: 0 0 20%;
          min-height: 30px;

          >p{
            font-size: 12px;
            line-height: 16px;
            margin-bottom: 6px;
            color: $color5;
            font-size: 12px;
          }
          .mint-button{
            font-size: 12px;
            min-height: 22px;
            height: 22px;
            padding: 4px 6px;
          }
        }
      }
      .swiper-slide{

        .item{
          text-align: center;
          border-right: 1px solid #efefef;

          .goods-desc{
            padding: 10px;
            font-size: 12px;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 16px;
            display: block;
          }

          img{
            width: 100%;
            height: 80px;
            margin-top: 10px;
            margin-bottom: 10px;
          }
        }

        &:last-child{
          .item{
            border-right: none;
          }
        }
      }
    }

    .recommend-card-ul{
      display: flex;
      display: -webkit-flex; /* Safari */
      flex-wrap: wrap;
      justify-content: left;
      padding: 10px;
      align-items: normal;

      .card-li{
        overflow: hidden;
        flex: 0 0 33.3333%;
        padding-right: 5px;
        padding-left: 5px;
        box-sizing: border-box;
        margin-bottom: 10px;
        vertical-align: top;

        section{
          position: relative;
          padding-bottom: 6px;
          width: 100%;
          height: 100%;
          background-color: #fff;

          .bank-icon{
            width: 100%;
            height: 60px;
            background-repeat: no-repeat;
            -webkit-background-size: 30%;
            background-size: 30%;
            background-position: center center;
          }
          .bank-card-tags{
            position: relative;
            height: 20px;
            text-align: center;

            /*
            css3 实现背景line  methods 1：
            background-image:
              linear-gradient( to left,  #ff0000 0px,  #ff0000 250px,  #000000 100px),
              linear-gradient( to right,   red 0px,  #ff0000 250px,  #000000 100px);
            background-size: 80% 1px;
            background-position: center; // 位置居中
            background-repeat: no-repeat;*/

            /*css3 实现背景line  methods 2*/
            background: linear-gradient(180deg,
              #fff calc(57% - 1px),
              #999 calc(40% - 4px),
              #fff calc(50% + 50px)
            );
            background-position: 50% 49.6%;
            background-size: 80% 1px;
            background-repeat: no-repeat;

            span{
              margin: 0 2px;
              padding: 2px 4px;
              border-radius: 3px;
              color: #fff;
              background-color: #ff782e;
              font-size: 12px;
              transform: scale(0.4);
              transform-origin: center;
            }
          }
          .bank-card-name{
            text-align: center;
            font-weight: bold;
          }
          .bank-card-desc{
            font-size: 12px;
            color: gray;
            padding: 4px 6px;
          }
          .bank-card-bonus{
            color: #ff4f0b;
            font-size: 12px;
            padding: 0 6px;
          }
        }
      }
      .card-li:nth-child(3n) {
        padding-right: 0;
        padding-left: 5px;
      }
      .card-li:nth-child(3n+1) {
        padding-right: 5px;
        padding-left: 0;
      }
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  .credit-card-authorise-dialog{
    .dialog-content{
      padding: 0;
      position: relative;
      min-height: 140px;

      .tip-content{
        padding: 30px 20px 20px;
        p{
          line-height: 18px;
        }
      }
    }
  }
</style>

<template>
  <div class="page">
    <section class="page-main">
      <div class="card-desc">
        <img src="../../assets/img/background_img/bg-2.jpg" >
      </div>

      <ul class="card-group">
        <li @click="toggleMenu(0)" :class="activeIndex==0? 'active': ''">
          <div>高端卡</div>
        </li>
        <li class="line"></li>
        <li @click="toggleMenu(1)" :class="activeIndex==1? 'active': ''">
          <div>学生卡</div>
        </li>
      </ul>

      <div class="slide-wrapper">
        <swiper :options="swiperOption" ref="swiper">
          <swiper-slide :key="'card_'+index" v-for="(data, index ) in banners">
            <section v-for="item in data.items" class="card-section">
              <img :src="item.galleryImg" class="bank-img">
              <div class="bank-info">
                <p class="title">{{item.name}}</p>
                <p class="text" v-html="item.descn"></p>
              </div>
              <div class="bank-apply-btn">
                <p v-if="isAgent">奖金: {{item.amount | money(true)}}元</p>
                <mt-button size="small" @click="freeApply(item)">免费申请</mt-button>
              </div>
            </section>
          </swiper-slide>
        </swiper>
      </div>

      <p style="padding: 0 10px; font-weight: bold;">推荐银行</p>
      <ul class="recommend-card-ul">
        <li class="card-li" v-for="item in recommendBankCard" :key="item.id" @click="toBankCardDetail(item)">
          <section>
            <div class="bank-icon" :style="{ 'background-image': `url(${item.galleryImg}`}"></div>
            <div class="bank-card-tags" >
              <template v-if="item.tags && item.tags.length">
                <span v-for="tag in item.tags">{{tag}}</span>
              </template>
            </div>
            <p class="bank-card-name">{{item.name}}</p>
            <p class="bank-card-desc" v-html="item.descn"></p>
            <p class="bank-card-bonus"  v-if="isAgent">奖金: {{item.bonus | money(true)}} 元</p>
          </section>
        </li>
      </ul>
    </section>

    <bzw-dialog class="credit-card-authorise-dialog" v-model="isVisibleDialog"
                :showCloseButton="false"
                :showHeader="false"
                :showFooter="false">
      <div class="tip-content">
        <p>为全面落实《信用卡暂行管理办法》，</p>
        <p> 在本平台申请信用卡必须实名注册，</p>
        <p>且不得包装使用虚假信息。</p>
      </div>
      <div style="padding: 0 20px 20px;">
        <mt-button type="primary" size="large" style="height: 34px;font-size: 16px;" @click="onAuthorise">
          立即实名申请
        </mt-button>
      </div>
    </bzw-dialog>
    <bottom-menu></bottom-menu>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import BottomMenu from '@/pages/BottomMenu'
  import ScrollWrapper from '@/components/scrollWrapper/ScrollWrapper'
  import creditCardApi from '@/api/creditCardAPI'
  import weixin from '../../common/weixin'
  import BzwDialog from '@/components/dialog/BzwDialog'

  import banner1 from '../../assets/img/index_banner/banner-1.jpg'
  import banner2 from '../../assets/img/index_banner/banner-2.jpg'
  import banner3 from '../../assets/img/index_banner/banner-3.jpg'
  import banner4 from '../../assets/img/index_banner/banner-4.jpg'

  import banner6 from '../../assets/img/index_banner/banner-6.png'
  import banner7 from '../../assets/img/index_banner/banner-7.png'
  import banner8 from '../../assets/img/index_banner/banner-8.png'
  import banner9 from '../../assets/img/index_banner/banner-9.png'

  export default {
    name: 'CreditCardIndex',
    components: {
      BottomMenu,
      ScrollWrapper,
      BzwDialog
    },
    data () {
      let self = this
      return {
        isVisibleDialog: false,
        activeIndex: 0,
        swiperOption: {
          autoHeight: true,
          initialSlide: 0, // default page view index
          resistanceRatio: 0,
          slideToClickedSlide: true,
          on: {
            slideChange() {
              if (this.activeIndex === 0) {
                self.activeIndex = 0
              } else {
                self.activeIndex = 1
              }
            }
          }
        },

        // 推荐商品的翻页参数
        pageCount: 1, // 总页数
        currentPage: 1, // 当前页
        noData: false,
        storeId: null,
        banners: [],
        // 推荐的银行卡
        recommendBankCard: [],
        basicInfo: {
          county: '440306',
          province: '440000',
          city: '440300',
          storeLogoUrl: 'http://7xv6zz.com2.z0.glb.qiniucdn.com/20171122201942390.jpg'
        },
        paramBankId: '', // [高端卡，学生卡，其他推荐]选中的银行的ID
        paramCreditCardId: '' // 免费申请时选中的卡的ID
      }
    },
    computed: {
      swiper() {
        return this.$refs.swiper.swiper
      },
      ...mapState({
        user: state => state.security && state.security.user || {},
        identity: state => state.security && state.security.user && state.security.user.identity || {},
        initialized: (state => state.metadata.initialized)
      }),
      isAgent() {
        return Number(this.user.level) > 1
      }
    },
    methods: {
      /*
       * 免费申请
       * */
      freeApply(item) {
        this.paramBankId = item.bankId
        this.paramCreditCardId = item.id
        console.log(this.paramBankId, this.paramCreditCardId)
        if (this.user.identity && this.user.identity.IDCardNo) {
          // 如果该用户已经实名认证过了，则跳转确认申请信息页面
          this.$router.push({
            path: '/confirm_applicant_info',
            query: {
              bankId: this.paramBankId,
              creditCardId: this.paramCreditCardId
            }
          })
        } else {
          this.isVisibleDialog = true
        }
      },
      onAuthorise() {
        this.isVisibleDialog = false
        this.$router.push({
          path: '/apply_credit_card_form',
          query: {
            bankId: this.paramBankId,
            creditCardId: this.paramCreditCardId
          }
        })
      },
      toggleMenu(activeIndex) {
        this.activeIndex = activeIndex
        if (this.activeIndex === 0) {
          this.swiper.slidePrev()
        } else {
          this.swiper.slideNext()
        }
      },
      showGoodsPage(item) {
        this.$router.push({ path: '/credit_card' })
      },
      getRecommendedProducts(currentPage, callback) {
        if (this.storeId) {
          let data = {
            storeId: this.storeId,
            pageSize: 10,
            page: currentPage
          }
          /* goodsApi.recommendedProducts({
            data,
            callback: (res)=>{
              if(this.public.isSuccess(res.code)){
                callback && callback(res.result)
              }
            }
          })*/
        } else {
          callback && callback()
          this.$refs.scroll.forceUpdate(false) // 显示没有更多
        }
      },
      toRedirectPage(index) {
        switch (index) {
          case 1:
            // 跳转信用卡
            this.$router.push({
              path: '/credit_card',
              query: {
              }
            })
            break;
          case 2:
            // 跳转到活动页面
            break;
          case 3:
            // 代金券
            this.$router.push({
              path: '/cashCoupon',
              query: {
                _key: _key
              }
            })
            break;
        }
      },
      toBankCardDetail(data) {
        if (this.user.identity && this.user.identity.IDCardNo) {
          // 如果该用户已经实名认证过了，则跳转确认银行详情页面
          this.$router.push({
            path: '/bank_card_info',
            query: {
              creditCardId: data.id,
              bankId: data.bankId,
              title: data.title
            }
          })
        } else {
          this.isVisibleDialog = true
        }
      }
    },
    created() {
      let that = this
      creditCardApi.getCreditCards({
        catalog: 1
      }, (res) => {
        console.log(res)
        that.recommendBankCard.splice(0, that.recommendBankCard.length)
        // 1=普通卡(推荐卡)，2=高端卡，3=学生卡
        if (res.data && res.data.length) {
          let highEndCard =  [] // 高端卡
          let studentCard = [] // 学生卡
          res.data.forEach(item => {
            item.tags = (item.tag && item.tag.length && item.tag.split(',')) || []
            let category = Number(item.category)
            item.descn && (item.descn = item.descn.replace(/\n/gm, '<br>'))
            console.log('item.descn ', item.descn)
            if (category === 1) {
              that.recommendBankCard.push(item)
            } else if (category === 2) {
              highEndCard.push(item)
            } else {
              studentCard.push(item)
            }
          })
          that.banners = [{
            items: highEndCard
          }, {
            items: studentCard
          }]
        }
      })
    },
    mounted() {
    }
  }
</script>
