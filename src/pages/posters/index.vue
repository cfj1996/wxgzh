<style lang="scss">
  @import "~@/assets/css/variable.scss";

  .page {
    .mint-navbar .mint-tab-item.is-selected {
      color: $color2;
    }
    .mint-tab-container {
      height: calc(100% - 50px);
      .mint-tab-container-wrap {
        position: relative;
        height: 100%;
        .mint-tab-container-item {
          position: relative;
          height: 100%;
        }
      }
    }
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
      position: relative;
      height: calc(100% - 71px);
      padding: 15px 60px 0 60px;
      overflow: auto;
      img {
        max-width: 100%;
        height: auto;
        display: block;
      }
    }
    .post-foot {
      position: relative;
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
        padding: 0 15px;
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
      position: relative;
      left: 0;
      padding: 0 5px;
      width: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      height: calc(100% - 71px);
      flex-wrap: wrap;
      /*justify-content: space-between;*/
      .img-list {
        transition: all .5s;
        display: flex;
        min-height: 320px;
        display: flex;
        align-items: center;
        .active {
          img {
            transition: all .5s;
            transform: scale(1.2);
          }
        }
        li {
          &:first-child {
            /*padding: 0 !important;*/
          }
          &:last-child {
            /*padding: 0 !important;*/
          }
          padding: 0 35px;

          img {
            transform: scale(0.9);
            width: 150px;
            height: auto;
          }
        }

      }
      .active {
        span {
          border: none!important;
          color: white;
          background-image: linear-gradient(to right, #ff7777 -30%, #ff2222);
        }
      }
      .xyk-list{
        padding: 10px 15px;
        p {
          margin-top: 20px;
          display: inline-block;
          text-align: center;
          padding-right: 15px;
          span {
            border-radius: 10px;
            padding: 3px 10px;
            border: 1px solid #a6a6a6;
          }
        }
      }
    }
    .generate-view {
      h3{
        padding: 0 10px;
      }
      p{
        padding: 0 10px;
      };
      width: 375px;
      ul {
        margin-top: 10px;
        li {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .mint-button {
            width: 100px;
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
<template>
  <div class="page">
    <!-- navbar -->
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1" @click="getData">会员招募</mt-tab-item>
      <mt-tab-item id="2">信用卡推广</mt-tab-item>
    </mt-navbar>
    <!-- tabcontainer -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1" style="overflow: auto">
        <div class="img-ku"><img v-if="pageDailiData.posterURL" :src="pageDailiData.posterURL" alt=""></div>
        <div class="post-foot">
          <div class="item">
            <img @click.prevent ="updataDaiLi()" src="../../assets/img/genxin.png" alt="">
            <p>更新海报</p>
          </div>
          <div class="item">
            <img src="../../assets/img/baocun.png" @click.prevent="saveOpen = true" alt="">
            <p>保存海报</p>
          </div>
          <div class="item"><img @click="dailiFenXiang" src="../../assets/img/fenxian.png" alt="">
            <p>推广分享</p></div>
          <button type="button" class="item dai-cope btn-copy" :data-clipboard-text="pageDailiData.link"><img
            src="../../assets/img/fzhi.png" alt="">
            <p>复制链接</p></button>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2" style="overflow: auto">
        <div class="yh-list">
          <ul class="img-list" :style="lunbo">
            <li v-for="(val, key) in imgList" :class="val.id === inId? 'active': ''">
              <img @click.prevent ="inId = val.id" :src="val.posterURL" alt="">
            </li>
          </ul>
          <div class="xyk-list">
            <p v-for="(val, key) in productList" @click="qiek(val.id)" :class="val.id === inId? 'active': ''"><span>{{ val.shortName }}</span>
            </p>
          </div>
        </div>
        <div class="post-foot">
          <div class="item">
            <img @click.prevent="updataXykKu = true" src="../../assets/img/genxin.png" alt="">
            <p>更新海报</p>
          </div>
          <div class="item">
            <img src="../../assets/img/baocun.png" @click="saveOpen = true" alt="">
            <p>保存海报</p>
          </div>
          <div class="item" @click="haibaoFenXiang"><img src="../../assets/img/fenxian.png" alt="">
            <p>推广分享</p></div>
          <button type="button" class="item hai-cope btn-copy" :data-clipboard-text="pageHaibaoData.link"><img
            src="../../assets/img/fzhi.png" alt="">
            <p>复制链接</p></button>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="s1" v-if="saveOpen" @click="saveOpen=false">
      <div class="s2"></div>
      <div class="s3"><img src="../../assets/img/seve.png" alt=""></div>
    </div>
    <mt-popup v-model="updataXykKu" position="bottom">
        <section class="generate-view">
          <h3>自定义海报内容</h3>
          <p>请选择想要在海报上生成的内容</p>
          <ul>
            <li>
              <mt-radio
                v-model="name"
                :options="[{label: '真实姓名', value: 'realName'}, {label: '微信昵称', value: 'displayName'}]">
              </mt-radio>
              <span>单选</span>
            </li>
            <li style="padding-bottom: 50px">
              <mt-checklist
                v-model="inform"
                :options="[{label: '手机号', value: 'mobile'}, {label:  '微信号', value: 'weixin'}]">
              </mt-checklist>
              <span>多选</span>
            </li>
          </ul>
          <div class="bottom-single-btn">
            <mt-button type="primary" size="large" @click="updataXyk()">
              生成海报
            </mt-button>
          </div>
        </section>
    </mt-popup>
    <fen-xiang :show="frnx"></fen-xiang>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {Toast} from 'mint-ui'
  import orderAPI from '../../api/orderAPI'
  import FenXiang from '../../components/fenxing'
  import creditCardAPI from '../../api/creditCardAPI'
  import {Indicator} from 'mint-ui';
  import weixin from '../../common/weixin'

  export default {
    name: 'posters',
    components: {
      FenXiang
    },
    data() {
      return {
        updataXykKu: false,
        name: 'realName',
        inform: ['weixin'],
        saveOpen: false,
        frnx: false,
        selected: '1',
        pageDailiData: {
          link: '',
          posterURL: ''
        },
        pageHaibaoData: {},
        productList: [],
        imgList: [],
        inId: null// 0=> 70, 1 => -160
      };
    },
    methods: {
      updataDaiLi() {
        Indicator.open({
          text: '正在更新海报...',
          spinnerType: 'fading-circle'
        });
        orderAPI.generateAgentPoster((res2) => {
          this.pageDailiData.posterURL = res2.data.url
          Indicator.close();
        })
      },
      updataXyk() {
        Indicator.open({
          text: '正在更新海报...',
          spinnerType: 'fading-circle'
        });
        creditCardAPI.generateCreditCardPoster({
          productId: this.inId,
          name: this.name,
          contact: this.inform.toString()
        }, (res2) => {
          Indicator.close();
          let key = null
          this.imgList.forEach((val, i) => {
            if(val.id === this.inId){
              key = i
            }
          })
          this.$set(this.imgList, key, {
            link: this.imgList[key].link,
            posterURL: res2.data.url,
            id: this.inId
          })
          this.updataXykKu = false
        })
      },
      getPosters(id, key) {
        console.log('inId', this.inId)
        Indicator.open({
          text: '正在加载海报...',
          spinnerType: 'fading-circle'
        });
        creditCardAPI.getCreditCardPosterDetail({productId: id}, (res) => {
          res.data.id = id
          Indicator.close();
          if (res.data.posterURL) {
            this.imgList.push(res.data)
            if (key) {
              this.inId = this.imgList[this.imgList.length - 1].id
            }
          } else {
            Indicator.open({
              text: '正在加载海报...',
              spinnerType: 'fading-circle'
            });
            creditCardAPI.generateCreditCardPoster({
              productId: id,
              name: this.name,
              contact: this.inform.toString()
            }, (res2) => {
              Indicator.close();
              this.imgList.push({
                link: res.data.link,
                posterURL: res2.data.url,
                id: id
              })
              if (key) {
                this.inId = this.imgList[this.imgList.length - 1].id
              }
            })
          }
        })
      },
      qiek(id) {
        let i = true
        this.imgList.forEach((val, key) => {
          if (val.id === id) {
            this.inId = id
            i = false
          }
        })
        if (i) {
          this.getPosters(id, i)
        }
      },
      getData(fn) {
        orderAPI.getAgent((res) => {
          if (res.data.posterURL) {
            this.pageDailiData = res.data
            if(fn && fn()){fn()}
          } else {
            orderAPI.generateAgentPoster((res2) => {
              this.pageDailiData.posterURL = res2.data.url
              this.pageDailiData.link = res.data.link
              if(fn && fn()){fn()}
            })
          }
        })
      },
      dailiFenXiang() {
        this.frnx = true
        setTimeout(() => {
          this.frnx = false
        }, 3000)
        weixin.wxShare({
          title: this.user.displayName + '邀请您加入淘个卡，开启轻创业之旅',
          desc: '代理最高补贴140元，办卡轻松拿佣金，点击获取更多权益。',
          link: encodeURI(this.pageDailiData.link),
        }, () => {
          this.frnx = false
        })
      },
      haibaoFenXiang() {
        this.frnx = true
        setTimeout(() => {
          this.frnx = false
        }, 3000)
        weixin.wxShare({
          title: this.user.displayName + '邀请您加入淘个卡，开启轻创业之旅',
          desc: '代理最高补贴140元，办卡轻松拿佣金，点击获取更多权益。',
          link: encodeURI(this.pageHaibaoData.link),
        }, () => {
          this.frnx = false
        })
      }
    },
    computed: {
      lunbo() {
        let width = window.innerWidth
        let a = null
        this.imgList.forEach((val, key) => {
          if (this.inId === val.id) {
            a = key
          }
        })
        if (this.imgList[a]) {
          this.pageHaibaoData = this.imgList[a]
        }
        return {
          width: `${this.imgList.length * 150}+px`,
          transform: `translateX(${70 - 220 * a}px)`
        }
      },
      ...mapState({
        user: (state => state.security.user),
        initialized: (state => state.metadata.initialized)
      })
    },
    mounted() {
      creditCardAPI.getCreditCards({catalog: 1}, (res) => {
        this.productList = res.data
        this.inId = this.productList[1].id
        this.getPosters(this.productList[0].id)
        this.getPosters(this.productList[1].id)
        this.getPosters(this.productList[2].id)
      })
      this.getData()
      let clipboard1 = new this.clipboard('.hai-cope');
      clipboard1.on('success', function (e) {
        Toast({
          message: '已成功复制链接',
          position: 'top'
        })
        e.clearSelection();
      });
      let clipboard2 = new this.clipboard('.dai-cope');
      clipboard2.on('success', function (e) {
        Toast({
          message: '已成功复制链接',
          position: 'top'
        })
        e.clearSelection();
      });
    }
  };
</script>
