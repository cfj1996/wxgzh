/*
* @class   主页
* @author  Dennis Lei
* @date    19.04.01
*/

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/assets/css/variable.scss";

  .page-main {
    position: relative;
    height: calc(100% - 53px);
    overflow-y: auto;
    overflow-x: hidden;
    .card-desc {
      padding: 40px 10px 10px;
      background: -webkit-gradient(linear, 0 0, 0 100%, from($color5), to($color1));
      img {
        width: 100%;
      }
    }
    .card-group {
      display: flex;
      display: -webkit-flex; /* Safari */
      flex-wrap: wrap;
      justify-content: left;
      padding-top: 5px;

      li {
        flex: 49.8%;
        box-sizing: border-box;
        height: 26px;
        text-align: center;

        &:first-child {
          margin-right: 0;
        }
        &:last-child {
          margin-left: 0;
        }
        &.line {
          flex: 0.4%;
          height: 12px;
          background: #37322e;
          margin-top: 8px;
        }
        &.active {
          div {
            color: $color3;
            border-bottom: 2px solid $color3;
          }
        }
        div {
          display: inline-block;
          line-height: 26px;
          font-size: 14px;
        }
      }
    }
    .slide-wrapper {
      margin-top: 10px;
      position: relative;
      overflow-x: hidden;
      padding: 0 10px 10px;

      .card-section {
        display: flex;
        margin-bottom: 6px;
        background: #fff;
        padding: 10px;

        .bank-img {
          flex: 0 0 90px;
          height: 60px;
        }
        .bank-info {
          flex: 1;
          padding: 0 6px;
          min-height: 30px;
          .title {
            font-weight: bold;
            padding-bottom: 4px;
          }
          .text {
            font-size: 12px;
            color: $color1;
          }
        }
        .bank-apply-btn {
          flex: 0 0 85px;
          min-height: 30px;

          > p {
            font-size: 12px;
            line-height: 16px;
            margin-bottom: 6px;
            color: #ff2521;
            font-size: 12px;
          }
          .mint-button {
            font-size: 12px;
            min-height: 22px;
            height: 22px;
            padding: 4px 6px;
          }
        }
      }
      .swiper-slide {

        .item {
          text-align: center;
          border-right: 1px solid #efefef;

          .goods-desc {
            padding: 10px;
            font-size: 12px;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 16px;
            display: block;
          }

          img {
            width: 100%;
            height: 80px;
            margin-top: 10px;
            margin-bottom: 10px;
          }
        }

        &:last-child {
          .item {
            border-right: none;
          }
        }
      }
    }
    .recommend-card-ul {
      display: flex;
      display: -webkit-flex; /* Safari */
      flex-wrap: wrap;
      justify-content: left;
      padding: 10px;
      align-items: normal;

      .card-li {
        overflow: hidden;
        flex: 0 0 33.3333%;
        padding-right: 5px;
        padding-left: 5px;
        box-sizing: border-box;
        margin-bottom: 10px;
        vertical-align: top;

        section {
          position: relative;
          padding-bottom: 6px;
          width: 100%;
          height: 100%;
          background-color: #fff;
          display: flex;
          flex-wrap: wrap;

          .bank-icon {
            width: 100%;
            height: 60px;
            background-repeat: no-repeat;
            -webkit-background-size: 30%;
            background-size: 30%;
            background-position: center center;
          }
          .bank-card-tags {
            position: relative;
            height: 20px;
            width: 100%;
            text-align: center;
            .xian {
              background-color: #cdcdcd;
              position: relative;
              z-index: 0;
              margin-top: 10px;
              width: 100%;
              height: 1px;
            }
            span {
              margin: 0 2px;
              padding: 2px 6px;
              border-radius: 10px;
              position: relative;
              top: -10px;
              color: #fff;
              background: linear-gradient(to right, #ff4f42, #ff2521);
              font-size: 12px;
              transform: scale(0.4);
              transform-origin: center;
            }
          }
          .bank-card-name {
            text-align: center;
            width: 100%;
            display: block;
            font-weight: bold;
          }
          .applications {
            text-align: center;
            display: block;
            width: 100%;
            padding: 5px 0 3px 0;
            color: $color1;
            font-size: 12px;
          }
          .bank-card-desc {
            color: $color1;
            font-size: 12px;
            padding: 4px 2px;
            min-height: 55px;
          }
          .bank-card-bonus {
            padding: 5px 0;
            width: 100%;
            border-top: 1px solid #cdcdcd;
            color: #ff2521;
            font-size: 12px;
            padding-left: 5px;
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
  .credit-card-authorise-dialog {
    .dialog-content {
      padding: 0;
      position: relative;
      min-height: 140px;

      .tip-content {
        padding: 30px 20px 20px;
        p {
          line-height: 18px;
        }
      }
    }
  }

  .con-text {
    width: 100%;
    h2 {
      padding: 10px;
      border-bottom: 1px solid #9f9f9f;
      margin-bottom: 0;
    }
    .t-title {
      padding: 10px;
      display: flex;
      text-align: center;
      justify-content: space-between;
      border-bottom: 1px solid #9f9f9f;
      span {
        flex: 1;

      }
    }
    .t-boby {
      text-align: center;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #9f9f9f;
      span {
        flex: 1;
      }
    }
    .con-text {
      margin-top: 30px;
      padding: 0 10px;
      font-size: 16px;
      line-height: 1.3;
    }
    .zhu {
      color: #bfbfbf;
      font-size: 14px;
      padding-bottom: 25px;
      line-height: 1.2;
    }
  }

  .mf-btn {
    margin-top: 30px;
    color: #ff2521;
    background: none;
    font-size: 14px !important;
    padding: 5px 10px !important;
    line-height: 0.8;
    border-radius: 10px;
    border: 1px solid #ff2521 !important;
  }

  .xyk-xq {
    .mint-popup {
      width: 90%;
      margin: 0 auto;
      border-radius: 10px;
    }
  }

  .out {
    position: absolute;
    margin-top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>

<template>
  <div class="page xyk-xq">
    <section class="page-main">
      <div class="card-desc">
        <img src="../../assets/img/background_img/bg-2.jpg">
      </div>

      <ul class="card-group" v-if="headShow">
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
                <mt-button class="mf-btn" size="small" @click="freeApply(item)">免费申请</mt-button>
              </div>
            </section>
          </swiper-slide>
        </swiper>
      </div>

      <p style="padding: 0 10px; font-weight: bold;">推荐银行</p>
      <ul class="recommend-card-ul">
        <li class="card-li" v-for="item in recommendBankCard" :key="item.id" @click="toBankCardDetail(item)">
          <section class="content">
            <div style="width: 100%;position: relative;height: 90px;">
              <div class="bank-icon" :style="{ 'background-image': `url(${item.galleryImg}`}"></div>
              <div class="bank-card-tags">
                <div class="xian"></div>
                <template v-if="item.tags && item.tags.length">
                  <span v-for="tag in item.tags">{{tag | miashu}}</span>
                </template>
              </div>
            </div>
            <p class="bank-card-name">{{item.name}}</p>
            <p class="applications">已申请：{{ item.applyCount}}</p>
            <p class="bank-card-desc" v-html="item.descn"></p>
            <p class="bank-card-bonus" @click.stop="shuoming(item.amount, item.settlement)" v-if="isAgent">
              奖金: {{item.amount | money(true)}} 元<span class="mintui mintui-back"
                                                       style="display: inline-block; transform: rotateZ(-90deg);color: #7c868c;font-size: 14px;"></span>
            </p>
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
    <mt-popup v-model="jiesGze">
      <div class="con-text">
        <div class="">
          <h2>佣金结算说明</h2>
          <div class="t-title">
            <span>会员等级</span>
            <span v-for="val in levelList"
                  v-if="val.value !== 1 && val.value !== 2 && val.value !== 6&& val.value !== 7">{{ val.label }}</span>
          </div>
          <div class="t-boby">
            <span>佣金(元)</span>
            <span v-for="val in levelList"
                  v-if=" val.value !== 1 && val.value !== 2&& val.value !== 6&& val.value !== 7">{{ jiesuan(val.value, thisBonus) }}</span>
          </div>
          <div class="con-text">
            结算周期：
            T+2 (查询进度符合银行要求后，一般2个工作日内结算) <br>
            注：如曾申请过或有次行信用卡，不发放奖金。3个工作日可查结果。
          </div>
          <div class="con-text zhu">
            <p v-html="settlement"></p>
            <!--首次申请+资料审批通过+短信通知=成功办理此业务。（未通过审批的不结算奖金）-->
          </div>
        </div>
      </div>
      <div class="out" @click="jiesGze = false"><img src="../../assets/img/out.png" alt=""></div>
    </mt-popup>
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
    data() {
      let self = this
      return {
        jiesGze: false,
        thisBonus: 0,
        levelList: [],
        isVisibleDialog: false,
        settlement: '',
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
        paramBankId: '', // [高端卡，学生卡，其他推荐]选中的银行的ID
        paramCreditCardId: '' // 免费申请时选中的卡的ID
      }
    },
    computed: {
      headShow() {
        let a = false
        if (this.banners !== 0) {
          this.banners.forEach(val => {
            if (val.items.length !== 0) {
              val.items.forEach(val2 => {
                if (val2.length !== 0) {
                  a = true
                }
              })
            }
          })
        }
        return a
      },
      swiper() {
        return this.$refs.swiper.swiper
      },
      ...mapState({
        user: state => state.security && state.security.user || {},
        identity: state => state.security && state.security.user && state.security.user.identity || {},
        initialized: state => state.metadata.initialized
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
        if (this.user.identity && this.user.identity.IDCardNo) {
          // 如果该用户已经实名认证过了，则跳转确认申请信息页面
          this.$router.push({
            path: '/confirm_applicant_info',
            query: {
              // bankId: this.paramBankId,
              creditCardId: this.paramCreditCardId
            }
          })
        } else {
          this.isVisibleDialog = true
        }
      },
      onAuthorise() { // 跳转信用卡实名认证 带creditCardId 产品id
        this.isVisibleDialog = false
        this.$router.push({
          path: '/apply_credit_card_form',
          query: {
            // bankId: this.paramBankId,
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
              query: {}
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
        // data = {id: 3}
        if (this.user.identity && this.user.identity.IDCardNo) {
          // 如果该用户已经实名认证过了，则跳转确认银行详情页面
          this.$router.push({
            path: '/bank_card_info',
            query: {
              creditCardId: data.id
              // bankId: data.bankId,
              // title: data.title
            }
          })
        } else {
          this.paramCreditCardId = data.id
          this.isVisibleDialog = true
        }
      },
      shuoming(bonus, settlement) {
        let reg = new RegExp('\n', 'g')
        this.settlement = settlement.replace(reg, '<br/>')
        this.thisBonus = bonus
        this.jiesGze = true
      },
      jiesuan(level, bonus) {
        let dili = null
        JSON.parse(sessionStorage.commissionRule).forEach(val => {
          if (level === val.userLevel) {
            dili = val.commission
          }
        })
        let the = bonus * dili / 10000
        return the
      }
    },
    created() {
      let that = this
      this.levelList = JSON.parse(sessionStorage.level)
      alert(window.location.href)
      if (this.$route.query.creditCardId) {
        this.paramCreditCardId = this.$route.query.creditCardId
      }
      creditCardApi.getCreditCards({ catalog: 1 }, (res) => {
        console.log(res)
        that.recommendBankCard.splice(0, that.recommendBankCard.length)
        // 1=普通卡(推荐卡)，2=高端卡，3=学生卡
        if (res.data && res.data.length) {
          let highEndCard = [] // 高端卡
          let studentCard = [] // 学生卡
          res.data.forEach(item => {
            item.tags = (item.tag && item.tag.length && item.tag.split(',')) || []
            let category = Number(item.category)
            item.descn && (item.descn = item.descn.replace(/\n/gm, '<br>'))
            console.log('item.descn ', item.descn)
            if (category === 1) {
              that.recommendBankCard.push(item)
              console.log(that.recommendBankCard)
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
      if (this.$route.query.creditCardId) {
        this.toBankCardDetail({
          id: this.$route.query.creditCardId
        })
      }
    },
    filters: {
      miashu: function (val) {
        let data = JSON.parse(sessionStorage.metadata)
        let name
        data.productTag.forEach((i) => {
          if (i.id == val) {
            name = i.name
          }
        })
        return name
      }
    }
  }
</script>
