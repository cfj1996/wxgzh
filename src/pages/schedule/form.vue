<style lang="scss" scoped>
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .schedule-form {
    .view {
      position: relative;
      width: 100%;
      height: calc(100% - 54px);
      overflow: auto;
      .body {
        padding: 0 10px;
        .banner-img {
          margin: 0 -10px;
          img {
            max-width: 100%;
            height: auto;
            display: block;
          }
        }
        .content-form {
          background: white;
          border-radius: 10px;
        }
      }
    }
    .foot {
      position: relative;
      width: 100%;
      height: 54px;
      padding: 10px;
      .btn {
        display: block;
        width: 100%;
        color: white;
        background: linear-gradient(to left, $color2, $color3);
        height: 34px;
        font-size: 18px;
        text-align: center;
        line-height: 34px;
        border-radius: 10px;
      }
    }
  }
</style>

<template>
  <div class="page schedule-form">
    <div class="view">
      <div class="body">
        <div class="banner-img">
          <img src="../../assets/img/jdbnaner.png" alt="">
        </div>
        <h3 class="title">填写申请人信息进行查询</h3>
        <div class="content-form">
          <mt-field label="姓名" placeholder="申请人姓名" v-model="formData.name"></mt-field>
          <mt-field label="身份证" placeholder="身份证号码" v-model="formData.cardID"></mt-field>
          <mt-field class="form-cell" label="验证码" placeholder="请输入图片验证码" type="text" :attr="{maxlength: 4}"
                    v-model="formData.imgcode">
            <img @click="getImgCode" :src="pageData.imgCodeSrc" height="45px" width="100px">
          </mt-field>
          <mt-field class="form-cell" label="短信验证码" placeholder="请输入短信验证码"
                    v-model="formData.mobileYzm">
            <mt-button style="width: 94px" size="small" type="danger" @click="getYzmCode"
                       :disabled="pageData.yzmCode.isONclick">
              {{ pageData.yzmCode.text }}
            </mt-button>
          </mt-field>
        </div>
        <div class="text">
          <h3>温馨提示：</h3>
          <p>请输入与申请人提交的信用卡申请资料一致的身份证号码或手机号码，
            否则，无法查询到信用卡申请进度，也不能领取信用卡推广奖励金。</p>
        </div>
      </div>
    </div>
    <div class="foot">
      <mt-button class="btn" :disabled="cenOnSubmit">查询进度</mt-button>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import userAPI from '../../api/userAPI'
  import config from '../../config'
  import {Toast} from 'mint-ui'

  export default {
    data() {
      return {
        pageData: {
          imgCodeSrc: '',
          yzmCode: {
            text: '获取验证码',
            isONclick: false
          }
        },
        formData: {
          name: '',
          cardID: '',
          imgcode: '',
          mobileYzm: ''
        }
      }
    },
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {},
      }),
      cenOnSubmit() {
        if (Object.values(this.formData).includes('') || !this.$util.checkID(this.formData.cardID)) {
          return true
        } else {
          return false
        }
      },
    },
    methods: {
      getImgCode() {
        this.pageData.imgCodeSrc = config.HOST + '/m/auth/getImageAuthCode?' + Math.floor(Math.random() * 100)
      },
      getYzmCode() {
        let a = 10
        this.pageData.yzmCode.text = a + 's'
        this.pageData.yzmCode.isONclick = true
        let time = null
        userAPI.getPhoneAuthCode({
          mobile: this.user.identity.mobile,
          category: 'CHANGEMOBILE',
          imageAuthCode: this.formData.imgcode
        }, () => {
          Toast({
            message: '短信发送成功',
            position: 'top'
          })
        })
        time = setInterval(() => {
          a -= 1
          this.pageData.yzmCode.text = a + 's'
          if (a < 1) {
            this.pageData.yzmCode.text = '获取验证码'
            this.pageData.yzmCode.isONclick = false
            clearInterval(time)
          }
        }, 1000)
      },
    },
    created() {
      this.getImgCode()
    }
  }
</script>
