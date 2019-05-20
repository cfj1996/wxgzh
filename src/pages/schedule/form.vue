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
          <mt-field v-if="pageData.mobile" label="手机号" placeholder="请输入手机号" class="form-cell" v-model="formData.mobileRequired"></mt-field>
          <mt-field v-if="pageData.imgCode" class="form-cell" label="验证码" placeholder="请输入图片验证码"
                    :attr="{maxlength: 4}"
                    v-model="formData.imgcode">
            <img @click.prevent ="getImgCode" :src="pageData.imgCodeSrc" height="45px" width="100px">
            <p style="font-size: 12px;color: #3eb7f3;text-align: center">点击图片切换</p>
          </mt-field>
          <mt-field v-if="pageData.smsCodeRequired" class="form-cell" label="短信验证码" type="number" placeholder="请输入短信验证码"
                    v-model="formData.mobileYzm">
            <mt-button style="width: 94px" size="small" type="danger" @click="getYzmCode">
              {{ pageData.yzmCode.text }}
            </mt-button>
          </mt-field>
        </div>
        <div class="text">
          <h3>温馨提示：</h3>
          <p>请输入与申请人提交的信用卡申请资料一致的身份证号码或手机号码。
            <span v-if="user.level > 2">否则，无法查询到信用卡申请进度，也不能领取信用卡推广奖励金。</span></p>
        </div>
      </div>
    </div>
    <div class="foot">
      <mt-button class="btn" @click="cxjd">查询进度</mt-button>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import userAPI from '../../api/userAPI'
  import orderAPI from '../../api/orderAPI'
  import config from '../../config'
  import {Toast, MessageBox} from 'mint-ui'
  import axios from 'axios'

  export default {
    data() {
      return {
        pageData: {
          imgCodeSrc: '',
          imgCode: false,
          mobile: false,
          smsCodeRequired: false,
          attrs: {},
          yzmCode: {
            text: '获取验证码',
            isONclick: false
          },
          bankId: '',
          realMobile: '', // 真实手机号
          realCardID: '' // 真实身份证号
        },
        formData: {
          name: '',
          // cardID: '440981198410143932',
          cardID: '', // 身份证号
          mobileRequired: '', // 手机号
          imgcode: '',
          mobileYzm: ''// 手机号验证码
        }
      }
    },
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {}
      }),
      cenOnSubmit() {
        if (Object.values(this.formData).includes('')) {
          return true
        }
        return false
      }
    },
    methods: {
      getImgCode() {
        this.pageData.imgCodeSrc = config.HOST + config.getImageCodeUrl + '?memberId=' + this.user.id + '&bankId=' + this.pageData.bankId + '&_=' + (new Date()).getTime()
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
        let req = {
          realName: '',
          IDCardNo: '',
          bankId: '',
          imageCode: '',
          mobile: ''
        }
        // 测试身份证号码。
        if (this.$route.query.orderid) {
          req = {
            realName: this.formData.name,
            IDCardNo: this.pageData.realCardID,
            // IDCardNo: '440981198410143932',
            bankId: this.pageData.bankId,
            imageCode: this.formData.imgcode,
            mobile: this.pageData.realMobile
          }
        } else {
          req = {
            realName: this.formData.name,
            IDCardNo: this.formData.cardID,
            // IDCardNo: '440981198410143932',
            bankId: this.pageData.bankId,
            imageCode: this.formData.imgcode,
            mobile: this.formData.mobileRequired
          }
        }
        userAPI.getSmsCode(req, (res) => {
          Toast({
            message: '短信发送成功',
            position: 'top'
          })
          this.pageData.attrs = res.data.attrs || {}
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
        let that = this

        if(that.formData.name === '') {
          MessageBox('错误', '用户名必填');
          return
        }
        if(that.formData.cardID === '') {
          MessageBox('错误', '身份证号必填');
          return
        }

        if (that.pageData.mobile) {
          if(that.pageData.realMobile === '') {
            MessageBox('错误', '手机号码必填');
            return
          }
        }

        if (that.pageData.imgCode) {
          if(that.pageData.imgcode === '') {
            MessageBox('错误', '图片校验码必填');
            return
          }
        }

        if (that.pageData.smsCodeRequired) {
          if(that.formData.mobileYzm === '') {
            MessageBox('错误', '短信验证码必填');
            return
          }
        }

        let req = {
          realName: '',
          IDCardNo: '',
          bankId: '',
          imageCode: '',
          mobile: '',
          smsCode: '',
          attrs: {},
        }
        if (this.$route.query.orderid) {
          req = {
            IDCardNo: this.pageData.realCardID,
            // IDCardNo: '440981198410143932',
            bankId: this.pageData.bankId,
            imageCode: this.formData.imgcode,
            mobile: this.pageData.realMobile,
            realName: this.formData.name,
            smsCode: this.formData.mobileYzm,
            attrs: this.pageData.attrs
          }
        } else {
          req = {
            IDCardNo: this.formData.cardID,
            // IDCardNo: '440981198410143932',
            bankId: this.pageData.bankId,
            imageCode: this.formData.imgcode,
            mobile: this.formData.mobileRequired,
            realName: this.formData.name,
            smsCode: this.formData.mobileYzm,
            attrs: this.pageData.attrs
          }
        }
        userAPI.pustQuery(req, (res) => {
          let a = []
          if(res.data){
            a = res.data
          }
          console.log(a)
          this.$router.push({
            name: 'scheduleResults', params: {
              data: a
            }
          })
        })
      },
      setCode(id) {
        userAPI.createView({bankId: id}, res => {
          this.pageData.mobile = res.data.mobileRequired
          this.pageData.imgCode = res.data.imageCodeRequired
          this.pageData.smsCodeRequired = res.data.smsCodeRequired
        })
      }
    },
    created() {
      if (this.$route.query.id) {
        this.setCode(this.$route.query.id)
        this.pageData.bankId = this.$route.query.id
        this.getImgCode()
      }
      if (this.$route.query.orderid) { // 订单id
        orderAPI.getDetails({id: this.$route.query.orderid}, (res) => {
          this.pageData.bankId = res.data.bankId
          this.getImgCode()
          this.setCode(res.data.bankId)
          let str = res.data.IDCardNo
          this.pageData.realMobile = res.data.mobile // 真实手机号
          this.pageData.realCardID = str // 真实身份证
          this.formData.cardID = str.substring(0, 4) + '**********' + str.substring(str.length - 4)
          this.formData.mobileRequired = res.data.mobile.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2")
          this.formData.name = res.data.realName // 表单姓名
        })
      }
    }
  }
</script>
