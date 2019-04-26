<style lang="scss" scoped>
  @import "~@/assets/css/variable.scss";
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
        max-width: 70%;
        height: auto;
        display: block;
        margin: auto;
      }
    }
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
        font-size: 16px;
        color: #3eb7f3;
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
    }
  }
</style>

<template>
  <div class="page">
    <div class="main-img"><img :src="pageData.posterURL" alt=""></div>
    <div class="btn">
      <div class="item bg-letf" @click="$router.push({path: '/friends'})">邀请链接</div>
      <div class="item bg-rigth" @click="saveOpen = true">保存邀请海报</div>
    </div>
    <div class="s1" v-if="saveOpen" @click="saveOpen=false">
      <div class="s2"></div>
      <div class="s3"><img src="../../assets/img/seve.png" alt=""></div>
    </div>
    <fen-xiang :show="fenx"></fen-xiang>
  </div>
</template>

<script>
  import FenXiang from '../../components/fenxing'
  import { mapState } from 'vuex'
  import { Toast } from 'mint-ui'
  import config from '@/config'
  import weixin from '../../common/weixin'
  import orderAPI from '../../api/orderAPI'

  export default {
    name: 'posters',
    data() {
      return {
        saveOpen: false,
        pageData: {
          posterURL: '',
          link: ''
        },
        detail: {},
        fenx: false
      }
    },
    components: {
      FenXiang
    },
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {},
        identity: state => state.security && state.security.user && state.security.user.identity || {}
      })
    },
    methods: {
      seve() {
        alert(1)
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
      })
    }
  }
</script>
