/*
* @class   主页
* @author  Dennis Lei
* @date    19.04.01
*/

<style lang="scss" rel="stylesheet/scss">
  @import "~@/assets/css/px2rem.scss";
  @import "~@/assets/css/variable.scss";

  .swiper-pagination-bullet {
    background: #000;
  }

  .wrapper1 .swiper-container {
    padding-bottom: 30px !important;
  }

  .swiper-pagination-bullet {
    background: $color2 !important;
  }

  .page-main.home-page {
    height: calc(100% - 56px);
    overflow-x: hidden;
    overflow-y: auto;
    .slide-wrapper {
      position: relative;
      overflow-x: hidden;

      .credit-asset {
        padding: 10px;
        background-color: #fff;
        height: 180px;
        text-align: center;

        h3 {
          font-weight: bold;
          margin-bottom: 20px;
        }
        p {
          &:first-child {
            margin-top: 80px;
          }
          &:last-child {
            margin-top: 40px;
          }
        }
      }
      .banners {
        width: 100%;
        background-color: #fff;
        height: 180px;
        overflow: hidden;

        .slide-img {
          width: 100%;
        }
      }

    }

    .store-info {
      padding: px2rem(10);
      display: flex;
      justify-content: space-between;
      align-items: stretch;

      .store-info-left {
        width: 100%;
        p {
          margin: 0;
          &:first-child {
            font-size: 18px;
            line-height: 26px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &:last-child {
            padding: px2rem(4) 0;
            font-size: 14px;
            color: #666;
            line-height: 16px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
        }
      }
    }
    .proprietary-products {
      width: 100%;
      border-top: 1px solid #efefef;
      padding: 0 20px;

      .swiper-slide {
        .item {
          text-align: center;
          border-right: 1px solid #efefef;

          img {
            width: 100%;
            background-color: #000;
            margin: 20px 0;
          }
        }

        &:last-child {
          .item {
            border-right: none;
          }
        }
      }
    }
    .recommended-products {
      width: 100%;
      border-top: 1px solid #efefef;
      padding-top: px2rem(20);

      li {
        display: inline-block;
        float: left;
        width: 50%;
        text-align: center;
        background-color: transparent;
        margin-bottom: 12px;

        &.row-left {
          padding-right: 6px;
        }
        &.row-right {
          padding-left: 6px;
        }

        > img {
          display: block;
        }

        .prod-desc {
          height: px2rem(75);
          line-height: px2rem(90);
          padding: 0 px2rem(20);
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-align: left;
          background-color: #fff;

          .mark-proprietary {
            padding: px2rem(4) px2rem(6);
            color: #fff;
            text-align: center;
            margin-right: px2rem(20);
            background: #c30911;
            border-radius: px2rem(8);
            font-size: 12px;
          }
        }
        .prod-money {
          display: block;
          padding: px2rem(20);
          font-size: 14px;
          color: #c30911;
          text-align: left;
          background-color: #fff;

          span {
            font-size: 12px;
          }
        }
      }
    }

    .card-ul {
      display: flex;
      display: -webkit-flex; /* Safari */
      flex-wrap: wrap;
      justify-content: left;
      padding: 20px 0;

      li {
        overflow: hidden;
        flex: 0 0 33.333%;
        box-sizing: border-box;
        min-height: 60px;
        /*margin-top: 10px;*/
        text-align: center;
        position: relative;

        &::after {
          content: " ";
          width: 1px;
          background-color: #7c868c;
          position: absolute;
          right: 0;
          top: 10px;
          bottom: 10px;
        }
        &:last-child::after {
          display: none;
        }
        div {
          display: inline-block;
          font-size: 30px;
        }
      }
    }
  }
</style>
<style scoped lang="scss">
  .page-icon {
    width: 40px;
    height: 40px;
    background: no-repeat center;
    background-size: contain;
  }

  .bg1 {
    background-image: url("../assets/img/new_img/home/xyka.png");
  }

  .bg2 {
    background-image: url("../assets/img/new_img/home/jdcx.png");
  }

  .bg3 {
    background-image: url("../assets/img/new_img/home/user.png");
  }
</style>
<template>
  <div class="page">
    <section class="page-main home-page">
      <div class="slide-wrapper wrapper1">
        <swiper :options="swiperOption" style="height: auto">
          <swiper-slide v-for="(item, index) in basicInfo.banners" :key="index" class="banners">
            <router-link to="/credit_card">
              <img class="slide-img" :src="item.imageUrl">
            </router-link>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>

      <div class="store-info">
        <div class="store-info-left">
          <p>财富优选</p>
          <p>
            <span>优享信用生活，开启财富之选。</span>
          </p>
        </div>
      </div>

      <ul class="card-ul">
        <li @click="toRedirectPage(1)" v-if="permissions('CREDIT_CARD', 'List')">
          <!--<div class="iconfont iconxinyongqiahuankuan" style="color: #000;"></div>-->
          <div class="page-icon bg1"></div>
          <p>信用卡</p>
        </li>
        <li @click="toRedirectPage(2)" v-if="permissions('BANK_SCHEDULER', 'Query')">
          <!--<div class="iconfont icongroup47"></div>-->
          <div class="page-icon bg2"></div>
          <p>进度中心</p>
        </li>
        <li @click="toRedirectPage(3)" v-if="permissions('USER_CENTER', 'View')">
          <!--<div class="iconfont iconyonghuzhongxin user-icon"></div>-->
          <div class="page-icon bg3"></div>
          <p>用户中心</p>
        </li>
      </ul>

      <section class="proprietary-products clearfix">
        <swiper :options="swiperProperietaryOption">
          <swiper-slide :key="key" v-for="(item, key) in proprietaryProductsList">
            <div class="item">
              <router-link to="credit_card">
                <img :src="item.imageUrl">
              </router-link>
            </div>
          </swiper-slide>
        </swiper>
      </section>

      <ul v-if="recommendedProductList.length" class="recommended-products clearfix">
        <li v-for="(item, index) in recommendedProductList" :class="index%2 == 0? 'row-left': 'row-right'">
          <router-link to="credit_card">
            <img v-bind:style="recommendedProdStyleObject" :src="item.imageUrl">
            <p class="prod-desc"><span class="mark-proprietary" v-if="item.isStoreAutotrophy">自营</span> {{item.name}}
            </p>
            <p class="prod-money"><span>￥{{item.salesPrice | moneyInteger}}.</span>{{item.salesPrice | moneyPenny}}</p>
          </router-link>
        </li>
      </ul>
    </section>
    <bottom-menu></bottom-menu>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BottomMenu from './BottomMenu'
  import ScrollWrapper from '../components/scrollWrapper/ScrollWrapper'

  import userApi from '../api/userAPI'
  import banner1 from '../assets/img/index_banner/new-bg-1.png'
  import banner2 from '../assets/img/index_banner/new-bg-2.png'
  import banner3 from '../assets/img/index_banner/new-bg-3.png'

  import banner6 from '../assets/img/index_banner/new-bg-4.png'
  import banner7 from '../assets/img/index_banner/new-bg-4.png'
  import banner8 from '../assets/img/index_banner/new-bg-4.png'
  import banner9 from '../assets/img/index_banner/new-bg-4.png'

  export default {
    name: 'Home',
    components: {
      BottomMenu,
      ScrollWrapper
    },
    data() {
      return {
        swiperOption: Object.freeze({
          // autoHeight: true, //enable auto height
          spaceBetween: 20,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false
          }
        }),

        swiperProperietaryOption: {
          // slidesPerView: 4, // display four pic per page
          loop: true,
          spaceBetween: 10,
          freeMode: false
        },

        // 推荐商品的翻页参数
        pageCount: 1, // 总页数
        currentPage: 1, // 当前页
        noData: false,
        recommendedProductList: [], // 热门推荐商品
        storeId: null,

        basicInfo: {
          county: '440306',
          province: '440000',
          city: '440300',
          banners: [
            {
              forwardUrl: 'www.baidu.com',
              imageUrl: banner1
            },
            {
              forwardUrl: 'www.baidu.com',
              imageUrl: banner2
            },
            {
              forwardUrl: 'www.baidu.com',
              imageUrl: banner3
            }
          ],
          storeLogoUrl: 'http://7xv6zz.com2.z0.glb.qiniucdn.com/20171122201942390.jpg'
        },
        proprietaryProductsList: [
          {
            id: 2,
            imageUrl: banner6,
            salesPrice: 'xx'
          },
          {
            id: 3,
            imageUrl: banner7,
            salesPrice: '33'
          },
          {
            id: 4,
            imageUrl: banner8,
            salesPrice: '33'
          },
          {
            id: 5,
            name: '返现2',
            imageUrl: banner9,
            salesPrice: '3'
          }
        ], // 自营商品
        homeCategoryArr: [], // 首页分类商品
        recommendedProdImgW: 0,
        recommendedProdImgH: 0
      }
    },
    computed: {
      ...mapState({
        user: (state => state.security.user),
        userPerm: state => state.security && state.security.userPerm || {},
      }),
      /* propProdStyleObject(){
        return {
          width: this.propProdImgW + 'rem',
          height: this.propProdImgH +'rem'
        }
      },*/
      recommendedProdStyleObject() {
        return {
          width: this.recommendedProdImgW + 'px',
          height: this.recommendedProdImgH + 'px'
        }
      }
    },
    methods: {
      permissions(name, page) {
        if (this.userPerm[name] && this.userPerm[name][page] === 1) {
          return true
        } else {
          return false
        }
      },
      showGoodsPage(item) {
        this.$router.push({path: '/credit_card'})
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
        console.log(index)
        switch (index) {
          case 1:
            // 跳转信用卡
            this.$router.push({
              path: '/credit_card',
              query: {}
            })
            break;
          case 2:
            // 跳转到银行信用卡详情
            this.$router.push({
              path: '/schedule',
              query: {}
            })
            break;
          case 3:
            // 我的页面
            this.$router.push({
              path: '/user_center'
            })
            break;
        }
      },
      showSearchPopup() {
        this.$router.push({
          path: '/search'
        })
      },
      moreProperietaryGoods() {
        this.$router.push({
          path: '/proprietaryGoods'
        })
      },
      searchEv(e) {
        console.log('searchEv')
      }
    },
    created() {
      // 获取门店基本信息
      let userId = (this.$route.params && this.$route.params.userId) || sessionStorage.getItem('BZW_USER_ID')
      if (userId) {
        /* userApi.getStoreInfoByUserId({
          data: {
            userId
          },
          callback: (res) => {
            if (this.public.isSuccess(res.code)) {
              Object.assign(this.basicInfo, res.result)
              this.storeId = res.result.storeId
              sessionStorage.setItem('BZW_STORE_ID', res.result.storeId)
              this.onRefreshPage(true)
            }
          }
        }) */
      } else {
        this.storeId = sessionStorage.getItem('BZW_STORE_ID')
      }
    },
    mounted() {
      // alert(window.location.href)
      if (+this.$route.query.operation === 2) {
        if (+this.user.level === 1) {
          if (this.user.agentApproveStatus && +this.user.agentApproveStatus === 1) {
            this.$router.push('/waitFor'); // 等待审核
          } else {
            this.$router.push('/newpage?'); // 申请审核
          }
        } else {
          this.$router.push('/mylink');
        }
      } else if (+this.$route.query.operation === 1 && +this.$route.query.biz !== 0) { // 信用卡分享过来的
        this.$router.push({
          path: '/credit_card',
          query: {
            creditCardId: this.$route.query.biz
          }
        })
      } else if (+this.$route.query.operation === 3) {
        this.$router.push({
          path: '/to_author',
          query: {
            id: this.$route.query.biz
          }
        })
      } else if (+this.$route.query.operation === 5) {
        this.$router.push('credit_card')
      } else if (+this.$route.query.operation === 6) {
        this.$router.push('user_center')
      } else if (+this.$route.query.operation === 7) {
        this.$router.push('mykefu')
      }
    }
  }
</script>
