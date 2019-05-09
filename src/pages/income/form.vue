<style scoped lang="scss">
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .withd-from {
    .view {
      position: relative;
      width: 100%;
      height: calc(100% - 54px);
      overflow: auto;
      @mixin line {
        content: ' ';
        position: absolute;
        left: 10px;
        right: 10px;
        height: 1px;
        background-color: #eee;
      }
      .form-section {
        .form-cell {
          &:after {
            bottom: 0;
            @include line
          }
        }
      }
      .prompt {
        padding: 10px 15px;
        color: $color1;
        h3 {
          color: $color3;
        }
        p {
          padding: 0 15px;
          line-height: 1.3;
        }
      }
    }
    .foot {
      position: relative;
      width: 100%;
      height: 54px;
      padding: 10px;
      .btn {
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
<style>
  .all-money input[disabled], .all-money input:disabled {
    background-color: #fff;
    -webkit-text-fill-color: #cacaca;
    opacity: 1;
  }
</style>
<template>
  <div class="page withd-from">
    <div class="view">
      <div class="form-section">
        <mt-field class="form-cell" label="提现金额(元)" placeholder="请输入提现额" type="number" v-model="amount"></mt-field>
        <mt-field class="form-cell all-money" :placeholder="'当前金额 '+ availableTotal+'元'" disabled>
          <mt-button size="small" @click="AllOnWithdrawal">全部提现</mt-button>
        </mt-field>
        <mt-field class="form-cell" label="收款人姓名" placeholder="当前微信实名认证的真实姓名" v-model="form.name"></mt-field>
        <mt-field class="form-cell" label="手机号" type="tel" placeholder="请输入手机号" disabled
                  :value="user.identity.mobile"></mt-field>
        <mt-field class="form-cell" label="验证码" placeholder="请输入图片验证码" type="text" :attr="{maxlength: 4}"
                  v-model="form.imgcode">
          <img @click="getImgCode" :src="imgCodeSrc" height="45px" width="100px">
        </mt-field>
        <mt-field class="form-cell" label="短信验证码" placeholder="请输入短信验证码" v-model="form.mobileYzm">
          <mt-button style="width: 94px" size="small" type="danger" @click="getYzmCode" :disabled="yzmCode.isONclick">{{
            yzmCode.text }}
          </mt-button>
        </mt-field>
      </div>
      <section class="prompt">
        <h3>温馨提示：</h3>
        <p>
          1.仅支持已通过微信实名认证的用户进行提现；<br>
          2.单笔提现金最低为1元，最高为2万元；<br>
          3.每天只能提现1次；<br>
        </p>
      </section>
    </div>
    <div class="foot">
      <mt-button :disabled="canOnSubmit" class="btn" @click="tixain">提现到微信零钱</mt-button>
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
        availableTotal: '', // 可以提现的金额
        amount: null,
        form: {
          amount: 0,
          name: '',
          mobileYzm: '',
          imgcode: ''
        },
        yzmCode: {
          text: '获取验证码',
          isONclick: false
        },
        imgCodeSrc: ''
      }
    },
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {}
      }),
      canOnSubmit() {
        let i = false
        if (this.form.amount/100 > Number(this.availableTotal)) {
          i = true
          console.log(this.form.amount, Number(this.availableTotal))
        }
        if (this.form.name === '' || this.form.mobileYzm === '' || this.form.imgcode === '') {
          i = true
        }
        return i
      }
    },
    methods: {
      tixain() {
        let qian = this.form.amount
        console.log(qian)
        userAPI.withdraw({
          amount: qian,
          realName: this.form.name,
          mobile: this.user.identity.mobile,
          authCode: this.form.mobileYzm
        }, () => {
          Toast({
            message: '提现成功',
            position: 'top'
          })
          this.$router.push('/income')
        })
      },
      AllOnWithdrawal() {
        this.amount = this.availableTotal
      },
      getYzmCode() {
        let a = 10
        this.yzmCode.text = a + 's'
        this.yzmCode.isONclick = true
        let time = null
        userAPI.getPhoneAuthCode({
          mobile: this.user.identity.mobile,
          imageAuthCode: this.form.imgcode,
          category: 'WITHDRAW'
        }, () => {
          Toast({
            message: '短信发送成功',
            position: 'top'
          })
        })
        time = setInterval(() => {
          a -= 1
          this.yzmCode.text = a + 's'
          if (a < 1) {
            this.yzmCode.text = '获取验证码'
            this.yzmCode.isONclick = false
            clearInterval(time)
          }
        }, 1000)
      },
      getImgCode() {
        this.imgCodeSrc = config.HOST + '/m/auth/getImageAuthCode?' + Math.floor(Math.random() * 100)
      }
    },
    created() {
      this.getImgCode()
      userAPI.userIncome((res) => {
        this.availableTotal = (Number(res.data.availableTotal) / 100).toFixed(2)
      })
      this.user.identity.certificatedStatus !== 2 ? this.$router.push('/income') : ''
    },
    watch: {
      'amount': function (val) {
        this.form.amount = Number(val) * 100
      }
    }
  }
</script>

