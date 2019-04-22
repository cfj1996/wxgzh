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
    <div class="main-img" @click="open = false"><img :src="pageData.posterURL" alt=""></div>
    <div class="btn">
      <div class="item bg-1" @click="$router.push({path: '/friends'})">邀请链接</div>
      <div class="item bg-2" @click="open = true">邀请海报</div>
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
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Toast } from 'mint-ui'
  import config from '@/config'
  import weixin from '../../common/weixin'
  import orderAPI from '../../api/orderAPI'

  export default {
    name: 'posters',
    data() {
      return {
        open: false,
        pageData: {
          posterURL: '',
          link: ''
        },
        detail: {}
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
        Toast({
          message: this.pageData.link,
          position: 'top'
        })
        weixin.wxShare({
          title: `${this.user.displayName}邀请您加入众银家.`,
          desc: '代理最高补贴140.....',
          link: encodeURI(this.pageData.link),
          imgUrl: encodeURI(this.pageData.posterURL)
        }, () => {
          this.open = false
        })
      }
    },
    mounted() {
      orderAPI.getAgent((res) => {
        if (res.data.posterURL) {
          this.pageData = res.data
        } else {
          orderAPI.generateAgentPoster((res2) => {
            this.pageData.posterURL = res2.data.url
            this.pageData.link = res.data.link
          })
        }
        console.log(this.pageData)

      })
    }
  }
</script>
