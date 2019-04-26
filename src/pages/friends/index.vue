<style lang="scss" scoped>
  @import "~@/assets/css/variable.scss";

  .page {
    background-color: white;
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    background: url("../../assets/img/invitation/bg.png") no-repeat center;
    background-size: cover;

    .btn {
      background-color: white;
      position: fixed;
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
        color: $color1;
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
    .mint-popup{
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
      width: 100%;
      bottom: 0;
    }
  }
</style>

<template>
  <div class="page">
    <div class="btn ">
      <div class="item bg-letf" @click="share">分享邀请链接</div>
      <div class="item bg-rigth" @click="$router.push({path: '/mypostrs'})">邀请海报</div>
    </div>

    <FenXiang :show="fex"></FenXiang>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Toast } from 'mint-ui'
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
        open: false,
        detail: {},
        fex: false
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
        setTimeout(() => {this.fex = false},3000)
        Toast({
          message: `${config.HOST}/m/invitation/agent?inviterId=${this.$store.state.security.user.id}`,
          position: 'top'
        })
        weixin.wxShare({
          title: `${this.user.displayName}邀请您加入淘个卡，开启轻创业之旅.`,
          desc: '代理最高补贴140元，办卡轻松拿佣金，点击获取更多权益。',
          link: encodeURI(`${config.HOST}/m/invitation/agent?inviterId=${this.user.id}`),
          imgUrl: 'http://devxykviph5.isales.tech/static/img/yaoqin.7da0515.png'
        }, () => {
          this.open = false
          this.fex = false
        })
      }
    }
  }
</script>
