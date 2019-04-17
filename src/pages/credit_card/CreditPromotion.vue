/*
* @class   我要推广
* @author  Dennis Lei
* @date    19.04.14
*/

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/assets/css/variable.scss";

  .page-main {
    height: 100%;
    margin-bottom: 0;

    .credit-card-view {
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 220px;
      text-align: center;
      padding: 10px 0;
      img {
        max-width: 80%;
        max-height: 100%;
      }
    }
    .bottom-section {
      position: absolute;
      width: 100%;
      height: 220px;
      bottom: 0px;
      padding: 0 10px;
      background-color: #fff;

      .generate-view {
        ul {
          margin-top: 10px;
          li {
            margin-bottom: 10px;
            .mint-button {
              width: 100px;
              margin-right: 10px;
            }
          }
        }
      }
      .promotion-desc {
        line-height: 16px;
        padding: 10px;
        text-align: left;
      }
      .promotion-url-section {
        display: flex;
        padding: 10px;

        input {
          flex: 60%;
          border: 1px solid #999;
          margin-right: 10px;
          padding: 0 10px;
          border-radius: 4px;
        }
      }
    }
  }
</style>
<style>
  li .mint-cell {
    display: inline-block;
  }
</style>
<template>
  <div class="page">
    <section class="page-main">
      <div class="credit-card-view">
        <img :src="src" alt="">
      </div>
      <div class="bottom-section">
        <section v-if="isVisibleGenerate" class="generate-view">
          <h3>自定义海报内容</h3>
          <p>请选择想要在海报上生成的内容</p>
          <ul>
            <li>
              <mt-radio
                v-model="name"
                :options="[{label: '真实姓名', value: 'realName'}, {label: '微信昵称', value: 'displayName'}]">
              </mt-radio>
            </li>
            <li style="padding-bottom: 50px">
              <mt-checklist
                v-model="inform"
                :options="[{label: '手机号', value: 'mobile'}, {label:  '微信号', value: 'weixin'}]">
              </mt-checklist>
            </li>
          </ul>
          <div class="bottom-single-btn">
            <mt-button type="primary" size="large" @click="generateBanner">
              生成海报
            </mt-button>
          </div>
        </section>
        <section v-else>
          <p class="promotion-desc">你可以选择长按推广海报发送至客户，或是复制以下推广链接给客户申请信用卡。</p>
          <div class="promotion-url-section">
            <input v-model="copy" type="text" readonly>
            <mt-button type="primary" size="small" class="copy" :data-clipboard-text="copy">复制链接</mt-button>
          </div>
          <div class="bottom-single-btn" style="height: 114px;">
            <mt-button type="primary" size="large" style="margin-bottom: 10px;" @click="isVisibleGenerate = true">
              自定义海报
            </mt-button>
            <mt-button type="primary" size="large" @click="baocun">
              保存图片
            </mt-button>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import creditCardApi from '@/api/creditCardAPI'
  import {Toast} from 'mint-ui'
  import mor from '../../assets/img/credit-1.png'

  export default {
    name: 'CreditPromotion',
    components: {},
    data() {
      return {
        shareUrl: 'http://devxykviph5.isales.tech/credit_promotion?userId=123',
        isVisibleGenerate: false,
        copy: '',
        name: '',
        inform: [],
        src: mor
      }
    },
    computed: {
      ...mapState({
        user: (state => state.security.user),
        initialized: (state => state.metadata.initialized)
      }),
      isAgent() {
        return Number(this.user.level) > 1
      }
    },
    methods: {
      generateBanner() {
        creditCardApi.generateCreditCardPoster({
          productId: this.$route.query.creditCardId,
          name: this.name,
          contact: this.inform.toString()
        }, (res) => {
          this.src = this.copy = res.data.url
          this.isVisibleGenerate = false
        })
      },
      baocun() {
        wx.downloadImage({
          serverId: this.src, // 需要下载的图片的服务器端ID，由uploadImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            var localId = res.localId;
            console.log(localId)
          }
        });
      }
    },
    created() {
      creditCardApi.getCreditCardPosterDetail({
        productId: this.$route.query.creditCardId
      }, (res) => {
        this.copy = res.data.link
      })
    },
    mounted() {
      window.onload = function () {
        let clipboard = new ClipboardJS('.copy');
        clipboard.on('success', function (e) {
          Toast({
            message: '复制成功',
            position: 'top'
          })
          e.clearSelection();
        });
      }
    }
  }
</script>
