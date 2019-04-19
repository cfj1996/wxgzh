<style lang="scss">
  @import "~@/assets/css/variable.scss";

  .page {
    .mint-tab-item-label {
      &:after {
        background-image: linear-gradient(to right, $color2 -30%, $color3);
      }
    }
  }
</style>
<style scoped lang="scss">
  .page {
    .img-ku {
      padding: 15px 60px 0 60px;
      img {
        max-width: 100%;
        height: auto;
        display: block;
      }
    }
    .post-foot {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      background-color: white;
      padding: 10px 0;
      justify-content: space-between;
      .item {
        &:last-child {
          border: none;
        }
        flex: 1;
        padding: 0 8px;
        border-right: 1px solid #b8b8b8;
        img {
          display: block;
          width: 30px;
          height: 30px;
          margin: 0 auto;
        }
        p {
          color: #7c868c;
          margin-top: 5px;
          text-align: center;
        }
      }
    }
    .yh-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .atrcitr {
        span {
          color: white;
          background-image: linear-gradient(to right, #535BFF -30%, #41C2FF);
          border: none;
        }
      }
      p {
        margin-top: 10px;
        text-align: center;
        padding: 5px 0;
        flex: 0 0 25%;
        span {
          border-radius: 10px;
          border: 1px solid #a6a6a6;
          padding: 3px 5px;
        }
      }
    }
  }
</style>
<template>
  <div class="page">
    <!-- navbar -->
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1">招募代理商</mt-tab-item>
      <mt-tab-item id="2">信用卡推广</mt-tab-item>
    </mt-navbar>
    <!-- tabcontainer -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="img-ku"><img v-if="pageData.posterURL" :src="pageData.posterURL" alt=""></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="img-list-ku">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
        <div class="yh-list">
          <p class="" v-for="val in productList" @click="qiek(val.id)"><span>{{ val.shortName }}</span></p>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="post-foot">
      <div class="item">
        <img src="../../assets/img/genxin.png" alt="">
        <p>更新海报</p>
      </div>
      <div class="item">
        <a :href="pageData.posterURL" download="">
          <img src="../../assets/img/baocun.png" alt="">
          <p>保存海报</p>
        </a>
      </div>
      <div class="item"><img src="../../assets/img/fenxian.png" alt="">
        <p>推广分享</p></div>
      <div class="item"><img src="../../assets/img/fzhi.png" alt="">
        <p>复制链接</p></div>
    </div>
  </div>
</template>

<script>
  import orderAPI from '../../api/orderAPI'
  import creditCardAPI from '../../api/creditCardAPI'

  export default {
    name: 'posters',
    data() {
      return {
        selected: '2',
        pageData: {
          link: '',
          posterURL: ''
        },
        productList: [],
        imgList: [],
        yhList: []
      };
    },
    methods: {
      getPosters(id) {
        creditCardAPI.getCreditCardPosterDetail({productId: id}, (res) => {
          if (res.data.posterURL) {
            this.imgList.push(res.data)
          } else {
            creditCardAPI.generateCreditCardPoster({ productId: 14,
              name: 'displayName',
              contact: 'weixin'
            }, (res2) => {
              this.imgList.push({
                link: res.data.link,
                posterURL: res2.data.url
              })
            })
          }
        })
      },
      qiek(id) {

      }
    },
    mounted() {
      this.productList = JSON.parse(sessionStorage.metadata).bank
      this.getPosters(this.productList[0].id)
      this.getPosters(this.productList[1].id)
      this.getPosters(this.productList[2].id)
      orderAPI.getAgent((res) => {
        if (res.data.posterURL) {
          this.pageData = res.data
        } else {
          orderAPI.generateAgentPoster((res2) => {
            this.pageData.posterURL = res2.data.url
            this.pageData.link = res.data.link
          })
        }
      })
    }
  };
</script>
