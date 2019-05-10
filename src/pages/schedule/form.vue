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
          <mt-field v-if="pageData.imgCode" class="form-cell" label="验证码" placeholder="请输入图片验证码"
                    :attr="{maxlength: 4}"
                    v-model="formData.imgcode">
            <img @click="getImgCode" :src="pageData.imgCodeSrc" height="45px" width="100px">
            <p style="font-size: 12px;color: #3eb7f3;text-align: center">点击图片切换</p>
          </mt-field>
          <mt-field class="form-cell" label="短信验证码" type="number" placeholder="请输入短信验证码"
                    v-model="formData.mobileYzm">
            <mt-button style="width: 94px" size="small" type="danger" @click="getYzmCode"
                       :disabled="pageData.yzmCode.isONclick">
              {{ pageData.yzmCode.text }}
            </mt-button>
          </mt-field>
        </div>
        <div class="text">
          <h3>温馨提示：</h3>
          <p>请输入与申请人提交的信用卡申请资料一致的身份证号码或手机号码。
            <span v-if="user.level !== 1">否则，无法查询到信用卡申请进度，也不能领取信用卡推广奖励金。</span></p>
        </div>
      </div>
    </div>
    <div class="foot">
      <mt-button class="btn" @click="cxjd" :disabled="cenOnSubmit">查询进度</mt-button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import userAPI from '../../api/userAPI'
  import config from '../../config'
  import { Toast } from 'mint-ui'
  import axios from 'axios'

  export default {
    data() {
      return {
        pageData: {
          imgCodeSrc: '',
          imgCode: false,
          yzmCode: {
            text: '获取验证码',
            isONclick: false
          }
        },
        formData: {
          name: '',
          cardID: '440981198410143932',
          imgcode: '',
          mobileYzm: ''
        }
      }
    },
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {}
      }),
      cenOnSubmit() {
        if (Object.values(this.formData).includes('') || !this.$util.checkID(this.formData.cardID)) {
          return true
        }
        return false
      }
    },
    methods: {
      getImgCode() {
        this.pageData.imgCodeSrc = config.HOST + config.getImageCodeUrl + '?memberId=' + this.user.id + '&bankId=' + this.$route.query.id + '&_=' + (new Date()).getTime()
      },
      getYzmCode() {
        if (this.formData.imgcode === '') {
          Toast({
            message: '请填写图片验证码',
            position: 'top'
          })
          return false
        }
        let time = null
        userAPI.getSmsCode({
          IDCardNo: this.formData.cardID,
          bankId: this.$route.query.id,
          imageCode: this.formData.imgcode
        }, () => {
          Toast({
            message: '短信发送成功',
            position: 'top'
          })
          let a = 120
          this.pageData.yzmCode.text = a + 's'
          this.pageData.yzmCode.isONclick = true
          time = setInterval(() => {
            a -= 1
            this.pageData.yzmCode.text = a + 's'
            if (a < 1) {
              this.pageData.yzmCode.text = '获取验证码'
              this.pageData.yzmCode.isONclick = false
              clearInterval(time)
            }
          }, 1000)
        })
      },
      cxjd() {
        userAPI.pustQuery({
          realName: this.formData.name,
          IDCardNo: this.formData.cardID,
          imageCode: this.formData.imgcode,
          smsCode: this.formData.mobileYzm,
          bankId: this.$route.query.id
        }, (res) => {
          this.$router.push({name: 'scheduleResults', params: res.data})
        })
      }
    },
    created() {
      userAPI.createView({ bankId: this.$route.query.id }, res => {
        this.pageData.imgCode = res.data.imageCodeRequired
      })
      this.getImgCode()
    }
  }
</script>
