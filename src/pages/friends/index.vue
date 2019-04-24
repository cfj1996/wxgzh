<style lang="scss" scoped>
  .page {
    background-color: white;
    height: 100%;
    width: 100%;
    position: relative;
    .main-img {
      height: 100%;
      width: 100%;
      position: relative;
      overflow: hidden;
      img {
        max-width: 100%;
        height: auto;
        display: block;
      }
    }
    .btn {
      position: fixed;
      display: flex;
      z-index: 998;
      width: 100%;
      bottom: 10px;
      justify-content: space-around;
      align-items: center;
      left: 0;
      .bg-1 {
        background-image: linear-gradient(to right, #ff512f -30%, #e02771);
      }
      .bg-2 {
        background-image: linear-gradient(to right, #535BFF -30%, #41C2FF);
      }
      .item {
        border-radius: 5px;
        font-size: 16px;
        line-height: 1.2;
        width: 110px;
        text-align: center;
        color: white;
        padding: 6px 0;
      }
    }
    .model {
      transform: translateY(100%);
      transition: all .5s;
      .btn-fool {
        font-size: 16px;
        color: #3eb7f3;
        text-align: center;
        position: absolute;
        background-color: white;
        bottom: 0;
        width: 100%;
        padding: 10px 0;
      }
      &.open {
        transform: translateY(0);
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
      position: fixed;
      z-index: 999;
      height: 300px;
      width: 100%;
      bottom: 0;
    }
  }
</style>

<template>
  <div class="page">
    <div class="main-img" @click="open = false"><img src="../../assets/img/friends/yaoqin.png" alt=""></div>
    <div class="btn">
      <div class="item bg-1" @click="open = true">邀请链接</div>
      <div class="item bg-2" @click="$router.push({path: '/mypostrs'})">邀请海报</div>
    </div>
    <div :class="open?'open':''" class="model">
      <p>选择要分享的平台</p>
      <div class="list">
        <span @click="share"><img src="../../assets/img/weixin.png" alt="">微信</span>
        <span @click="share"><img src="../../assets/img/wx-zone.png" alt="">朋友圈</span>
        <!--<span><img src="../../assets/img/xinlang.png" alt="">新浪</span>-->
        <!--<span><img src="../../assets/img/qq.png" alt="">QQ</span>-->
        <!--<span><img src="../../assets/img/konjian.png" alt="">QQ空间</span>-->
      </div>
      <div class="btn-fool" @click="open = false">
        取消分享
      </div>
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
        Toast({
          message: `${config.HOST}/m/invitation/agent?inviterId=${this.$store.state.security.user.id}`,
          position: 'top'
        })
        weixin.wxShare({
          title: `${this.user.displayName}邀请您加入众银家.`,
          desc: '代理最高补贴140.....',
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
