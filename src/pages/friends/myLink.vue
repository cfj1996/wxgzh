<template>
  <div class="page">
    <div class="content">
      <p>推荐人信息</p>
      <div class="cont">
        <div class="cont-img">
          <img :src="pageData.headImgURL" alt="">
        </div>
        <div class="cont-text">
          <div class="name">{{ pageData.displayName }} (实名: {{ pageData.realName }}) <i>{{ pageData.level }}</i></div>
          <div class="xx">
            <span>工号: {{ pageData.employeeNo }}</span> <span>职务: {{ pageData.level | setLevel }}</span>
          </div>
        </div>
      </div>
      <div class="lt">
        <div class="tiem copy" :data-clipboard-text="pageData.weixinAccountNo"><img src="../../assets/img/weixin.png"
                                                                                    alt=""> <span>微信聊</span></div>
        <a class="tiem" :href="`tel:${ pageData.mobile }`"><img src="../../assets/img/shouji.png"
                                                                alt=""><span>电话聊</span></a>
      </div>
    </div>
    <div class="foot-bt">
      <div class="item cope-link" :data-clipboard-text="link">复制邀请链接</div>
      <div class="item" @click="fenxi">分享给好友</div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import orderAPI from '../../api/orderAPI'
  import {Toast} from 'mint-ui'
  import weixin from '../../common/weixin'

  export default {
    name: 'myLink',
    data() {
      return {
        pageData: {
          id: '',
          employeeNo: '', // 工号
          displayName: '', // 微信昵称
          headImgURL: 'http://thirdwx.qlogo.cn/mmopen/ey4onjt5WiaepYWINm4dn5ib6YkbpHZbWKh5Exia8RFsIEhtLebQNGteRwbSWkxNyuer6RCpC4Xkb1jQVibS4ypx1e8iaCgOsqP3p/132', // 头像
          weixinAccountNo: '', // 微信号
          mobile: '', // 手机号
          realName: '',
          level: null
        },
        link: '',
        my: false
      }
    },
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {},
        identity: state => state.security && state.security.user && state.security.user.identity || {}
      })
    },
    filters: {
      setLevel: function (i) {
        let level = JSON.parse(sessionStorage.level)
        let a = ''
        level.forEach((val) => {
          if (val.value === +i) {
            a = val.label
          }
        })
        return a
      }
    },
    methods: {
      fenxi() {
        weixin.wxShare({
          title: `${this.user.displayName}邀请您加入众银家.`,
          desc: '代理最高补贴140.....',
          link: this.link,
          imgUrl: 'http://devxykviph5.isales.tech/static/img/yaoqin.7da0515.png'
        })
      }
    },
    mounted() {
      orderAPI.getCustomerService((res) => {
        this.pageData = res.data
      })
      orderAPI.getAgent((res) => {
        this.link = res.data.link
      })
      let clipboard1 = new this.clipboard('.copy');
      clipboard1.on('success', function (e) {
        Toast({
          message: '已成功复制微信号',
          position: 'top'
        })
        e.clearSelection();
      });
      let clipboard2 = new this.clipboard('.cope-link');
      clipboard2.on('success', function (e) {
        Toast({
          message: '复制成功',
          position: 'top'
        })
        e.clearSelection();
      });
      if (this.$route.query.inviterId === this.user.id) {
        this.my = true
      } else {
        this.my = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page {
    position: relative;
    height: 100%;
    width: 100%;
    background: url("../../assets/img/friends/yaoqin.png") no-repeat center;
    background-size: cover;
    .content {
      width: 100%;
      height: 100px;
      margin-top: 80%;
      padding: 0 10px;
      p {
        font-size: 18px;
      }
      .cont {
        margin-top: 15px;
        display: flex;
        align-items: center;
        .cont-img {
          margin-right: 30px;
          width: 50px;
          height: 50px;
          overflow: hidden;
          border-radius: 25px;
          img {
            max-width: 100%;
            height: auto;
          }
        }
        .cont-text {
          font-size: 14px;
          i {
            display: inline-block;
            width: 16px;
            height: 16px;
            line-height: 16px;
            border-radius: 8px;
            background-color: yellow;
            margin-left: 10px;
            text-align: center;
          }
          .xx {
            margin-top: 10px;
            font-size: 12px;
            span {
              margin-right: 15px;
              color: #b5b5b5;
            }
          }
        }
      }
      .lt {
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: space-around;

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .tiem {
          display: flex;
          align-items: center;
          span {
            padding: 0 10px;
            color: #000;
          }
        }
      }
    }
    .foot-bt {
      display: flex;
      position: fixed;
      bottom: 10px;
      left: 0;
      width: 100%;
      justify-content: space-around;
      font-size: 16px;
      .item {
        border-radius: 16px;
        &:nth-child(1) {
          color: #ddb883;
          border: 1px solid #ddb883;
        }
        &:nth-child(2) {
          color: white;
          background: #ddb883;
        }
        padding: 6px 15px;
        line-height: 1.2;
      }
    }
    .jiaru{
      width: 150px;
      padding: 6px 15px;
      line-height: 1.2;
      background: #ddb883;
      color: white;
      margin: 0 auto;
      border-radius: 16px;
    }
  }
</style>
