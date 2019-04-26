/*
* @class   邀请好友
* @author  Dennis Lei
* @date    19.04.15
*/

<style scoped  lang="scss" rel="stylesheet/scss">
  @import "~@/assets/css/variable.scss";
  .page-main{
    height: 100%;
    overflow: auto;
    margin-bottom: 0;
    background-color: #fff;

    .content{
      position: absolute;
      width: 100%;
      bottom: 60px;
      top: 0;
    }

    .invitation-btns{
      display: flex;
      position: absolute;
      bottom: 0;
      height: 60px;
      width: 100%;
      background-color: #fff;

      li{
        flex: 0 0 50%;
        text-align: center;

        &:first-child {
          .mint-button {
            color: #fff;
            background-image: linear-gradient(to right, $color2 -50%, $color3);
          }
        }
        &:last-child{
          .mint-button {
            color: #fff;
            background-image:linear-gradient(to right, $color7 -50%, $color5);
          }
        }
      }
    }
  }
  .invitation-popup{
    width: 100%;
    padding: 10px 10px;

    .contact-info{
      display: flex;
      li{
        flex: 0 0 50%;
        text-align: center;
        line-height: 40px;
        height: 40px;

        .iconfont{
          font-size: 16px;
        }
      }
    }
    .mint-button {
      border: 1px solid $color2;
      border-radius: 4px 0 0 4px;
      color: $color2;
    }
  }

</style>
<style lang="scss" rel="stylesheet/scss">
  #app .page.fixed{
    position: fixed;
    bottom: 55px;
    left: 0;
    right: 0;
    top: 0;
  }
</style>
<template>
  <div class="page fixed">
    <div class="page-main">
      <div class="content">内容图片</div>
      <ul class="invitation-btns">
        <li @click="isVisiblePopup = true">
          <mt-button>邀请链接</mt-button>
        </li>
        <li>
          <mt-button>邀请海报</mt-button>
        </li>
      </ul>
    </div>

    <mt-popup v-model="isVisiblePopup" position="bottom" class="invitation-popup">
      <ul class="contact-info">
        <li @click="wxShare">
          <label>
            <i class="icondianhua iconfont" style="color: green;"></i>微信
          </label>
        </li>
        <li @click="wxShare">
          <label>
            <i class="iconweixin iconfont" style="color: blueviolet;"></i>微信朋友圈
          </label>
        </li>
      </ul>
      <div class="bottom-button">
        <mt-button size="large">取消分享</mt-button>
      </div>
    </mt-popup>
    <FenXiang :show="fex"></FenXiang>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Toast } from 'mint-ui'
  import config from '@/config'
  import weixin from '../../common/weixin'
  import FenXiang from '../../components/fenxing'

  export default {
    name: 'Invitation',
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {},
        identity: state => state.security && state.security.user && state.security.user.identity || {}
      })
    },
    components: {
      FenXiang
    },
    data () {
      return {
        isVisiblePopup: false,
        fenx: false
      }
    },
    methods: {
      wxShare() {
        this.fenx = true
        console.log(this.user)
        Toast({
          message: `${this.identity}/m/invitation/agent?inviterId=${this.user.id}`,
          position: 'top'
        })
        weixin.wxShare({
          title: this.user.displayName + '邀请您加入淘个卡，开启轻创业之旅.',
          desc: '代理最高补贴140元，办卡轻松拿佣金，点击获取更多权益。',
          link: encodeURI(`${config.HOST}/m/invitation/agent?inviterId=${this.user.id}`),
          imgUrl: 'http://devxykviph5.isales.tech/static/img/yaoqin.7da0515.png'
        }, () => {
          this.fenx = false
        })
      }
    }
  }
</script>
