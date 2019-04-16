/*
* @class   主页
* @author  Dennis Lei
* @date    19.04.01
*/

<style scoped  lang="scss" rel="stylesheet/scss">
  @import "~@/assets/css/px2rem.scss";
  .page-main.home-page{
    background-image: url("../assets/img/background_img/bg-1.jpg");
    background-size:100% 20%;
    background-repeat: no-repeat;


    .slide-wrapper{
      position: relative;
      overflow-x: hidden;
      padding: 90px 10px 10px;

      .credit-asset{
        padding: 10px;
        background-color: #fff;
        height: 180px;
        text-align: center;

        h3{
          font-weight: bold;
          margin-bottom: 20px;
        }
        p{
          &:first-child{
            margin-top: 80px;
          }
          &:last-child{
            margin-top: 40px;
          }
        }
      }
      .banners{
        width: 100%;
        background-color: #fff;
        height: 180px;

        .slide-img{
          width: 100%;
        }
      }

    }

    .store-info{
      padding: px2rem(10);
      display: flex;
      justify-content: space-between;
      align-items: stretch;

      .store-info-left{
        width: 100%;
        p{
          margin: 0;
          &:first-child{
            font-size: 18px;
            line-height: 26px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          &:last-child{
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
    .proprietary-products{
      width: 100%;
      border-top: 1px solid #efefef;
      padding: 0 20px;
      background-color: #fff;

      .swiper-slide{
        .item{
          text-align: center;
          border-right: 1px solid #efefef;

          img{
            width: 100%;
            background-color: #000;
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
    .recommended-products{
      width: 100%;
      border-top: 1px solid #efefef;
      padding-top: px2rem(20);

      li{
        display: inline-block;
        float: left;
        width: 50%;
        text-align: center;
        background-color: transparent;
        margin-bottom: 12px;

        &.row-left{
          padding-right: 6px;
        }
        &.row-right{
          padding-left: 6px;
        }

        >img{
          display: block;
        }

        .prod-desc{
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

          .mark-proprietary{
            padding: px2rem(4) px2rem(6);
            color: #fff;
            text-align: center;
            margin-right: px2rem(20);
            background: #c30911;
            border-radius: px2rem(8);
            font-size: 12px;
          }
        }
        .prod-money{
          display: block;
          padding: px2rem(20);
          font-size: 14px;
          color: #c30911;
          text-align: left;
          background-color: #fff;

          span{
            font-size: 12px;
          }
        }
      }
    }

    .card-ul{
      background: #fff;
      display: flex;
      display: -webkit-flex; /* Safari */
      flex-wrap: wrap;
      justify-content: left;
      padding: px2rem(10);
      background-color: #fff;

      li{
        overflow: hidden;
        flex: 0 0 32%;
        margin-right: 2%;
        box-sizing: border-box;
        min-height: 60px;
        margin-top: 10px;
        text-align: center;
        position: relative;

        &:after{
          content: " ";
          width: 1px;
          background-color: #7c868c;
          position: absolute;
          right: 0;
          top: 10px;
          bottom: 10px;
        }

        &:nth-child(3n) {
          margin-right: 0;
          &:after{
            display: none;
          }
        }
        &:nth-child(3n+1) {
          margin-left: 0;
        }
        div{
          display: inline-block;
          font-size: 30px;
        }
      }
    }
  }
</style>

<template>
  <div class="page">
    <section class="page-main home-page">
        <div class="slide-wrapper">
          <swiper :options="swiperOption" style="height: auto">
            <swiper-slide class="credit-asset">
              <h3>信用资产</h3>
              <p>暂未激活信用资产</p>
              <p>信用即财富，分值越高，用户信用评级越好</p>
            </swiper-slide>
            <swiper-slide v-for="(item, index) in basicInfo.banners" :key="'swiper_'+index" class="banners">
              <a :href="item.forwardUrl || 'javascript:;'">
                <img class="slide-img" :src="item.imageUrl">
              </a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>

        <div class="store-info">
          <div class="store-info-left">
            <p>财富优选</p>
            <p>
              <span>尊享财富之选，开启梦想生活</span>
            </p>
          </div>
        </div>

        <ul class="card-ul">
          <li @click="toRedirectPage(1)">
            <div class="iconfont  iconxinyongqiahuankuan" style="color: #000;"></div>
            <p>信用卡</p>
          </li>
          <li @click="toRedirectPage(2)">
            <div class="iconfont  icongroup47"></div>
            <p>进度中心</p>
          </li>
          <li @click="toRedirectPage(3)">
            <div class="iconfont  iconyonghuzhongxin user-icon"></div>
            <p>用户中心</p>
          </li>
        </ul>

        <section class="proprietary-products clearfix">
          <swiper :options="swiperProperietaryOption">
            <swiper-slide :key="'properietary_'+item.id" v-for="item in proprietaryProductsList">
              <div class="item"  @click="showGoodsPage(item)">
                <img :src="item.imageUrl">
              </div>
            </swiper-slide>
          </swiper>
        </section>

        <ul class="recommended-products clearfix">
          <li v-for="(item, index) in recommendedProductList" :class="index%2 == 0? 'row-left': 'row-right'" @click="showGoodsPage(item)">
            <img v-bind:style="recommendedProdStyleObject" :src="item.imageUrl">
            <p class="prod-desc"><span class="mark-proprietary" v-if="item.isStoreAutotrophy">自营</span> {{item.name}}</p>
            <p class="prod-money"><span>￥{{item.salesPrice | moneyInteger}}.</span>{{item.salesPrice | moneyPenny}}</p>
          </li>
        </ul>
    </section>
    <bottom-menu></bottom-menu>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import BottomMenu from './BottomMenu'
  import ScrollWrapper from '../components/scrollWrapper/ScrollWrapper'

  import userApi from '../api/userAPI'
  import banner1 from '../assets/img/index_banner/banner-1.jpg'
  import banner2 from '../assets/img/index_banner/banner-2.jpg'
  import banner3 from '../assets/img/index_banner/banner-3.jpg'
  import banner4 from '../assets/img/index_banner/banner-4.jpg'

  import banner6 from '../assets/img/index_banner/banner-6.png'
  import banner7 from '../assets/img/index_banner/banner-7.png'
  import banner8 from '../assets/img/index_banner/banner-8.png'
  import banner9 from '../assets/img/index_banner/banner-9.png'

  export default {
    name: 'Home',
    components: {
      BottomMenu,
      ScrollWrapper
    },
    data () {
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
            },
            {
              forwardUrl: 'www.baidu.com',
              imageUrl: banner4
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
        permissions: state => state.user.permissions
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
      showGoodsPage(item) {
        this.$router.push({ path: '/credit_card'})
      },
      getRecommendedProducts(currentPage, callback){
        if(this.storeId) {
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
        }else{
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
              query: {
              }
            })
            break;
          case 2:
            // 跳转到银行信用卡详情
            this.$router.push({
              path: '/bank_card_info',
              query: { }
            })
            break;
          case 3:
            // 代金券
            this.$router.push({
              path: '/userCenter'
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
        /*userApi.getStoreInfoByUserId({
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
        })*/
      } else {
        this.storeId = sessionStorage.getItem('BZW_STORE_ID')
      }
    },
    mounted() {
    }
  }
</script>
