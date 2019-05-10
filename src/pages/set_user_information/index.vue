<style scoped lang="scss">
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .set-inform {
    .view {
      position: relative;
      width: 100%;
      height: calc(100% - 54px);
      overflow: auto;
      .head {
        padding: 15px 10px;
        background: $color3;
        color: white;
        h2 {
          margin: 6px 0;
        }
      }
      .body {
        .form-section {
          p {
            padding: 0 15px;
            background: white;
            span {
              color: #3eb7f3;
            }
          }
        }
      }
    }
    .foot {
      position: relative;
      width: 100%;
      height: 54px;
      padding: 10px;
      display: flex;
      .btn {
        flex: 1;
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
  .set-inform .mint-checklist-title{
    display: none;
  }
</style>
<template>
  <div class="page set-inform">
    <div class="view">
      <div class="head">
        <div>
          <h2>修改申请人信息</h2>
          <p>以上信息将直接关系您在平台的所有操作， <br>
            请如实填写您的相关信息，一旦提交，不予以修改。</p>
        </div>
      </div>
      <div class="body">
        <div class="form-section">
          <mt-field label="ID" disabled :value="user.employeeNo"></mt-field>
          <mt-field label="姓名" v-model="fromData.name"></mt-field>
          <mt-field label="身份证" placeholder="未实名认证" disabled :value="user.identity.IDCardNo"></mt-field>
          <mt-field label="手机号" type="tel" v-model="fromData.mobile"></mt-field>
          <template v-if="state.openMobile">
            <mt-field class="form-cell" label="验证码" placeholder="请输入图片验证码" type="text" :attr="{maxlength: 4}"
                      v-model="fromData.imgcode">
              <img @click="getImgCode" :src="pageData.imgCodeSrc" height="45px" width="100px">
              <p style="font-size: 12px;color: #3eb7f3;text-align: center">点击图片切换</p>
            </mt-field>
            <mt-field class="form-cell" label="短信验证码" placeholder="请输入短信验证码" v-model="fromData.mobileYzm">
              <mt-button style="width: 94px" size="small" type="danger" @click="getYzmCode"
                         :disabled="pageData.yzmCode.isONclick">{{
                pageData.yzmCode.text }}
              </mt-button>
            </mt-field>
          </template>
          <mt-field label="微信号" v-model="fromData.weixinAccountNo"></mt-field>
          <mt-checklist style="overflow: hidden;display: block;"
            v-model="state.agreement"
            :options="pageData.options">
          </mt-checklist>
          <p>
            <span @click="state.popupVisible = true;state.xieyi = true">
              《淘个卡平台服务协议》
            </span>
            <span @click="state.popupVisible = true;state.xieyi = false">《淘个卡平台信用卡推广规范守则》</span>
          </p>
        </div>
      </div>
    </div>
    <mt-popup v-model="state.popupVisible" position="right" style="border-radius: 0">
      <xie-yi :isDaili="state.xieyi"/>
      <div style="text-align: center">
        <div class="xy-out" @click="state.popupVisible = false" size="small">关闭</div>
      </div>
    </mt-popup>
    <div class="foot">
      <mt-button :disabled="canSubmit" @click="OnSubmit" class="btn">确认修改</mt-button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import XieYi from '../../components/agreement'
  import userAPI from '../../api/userAPI'
  import config from '../../config'
  import { Toast } from 'mint-ui'

  export default {
    name: 'set_user_information',
    components: {
      XieYi
    },
    data() {
      return {
        fromData: {
          mobileYzm: '',  // 短信验证码
          name: '',  // 姓名
          mobile: '', // 手机号
          weixinAccountNo: '', // 微信号
          imgcode: '' // 图片验证码
        },
        pageData: { // 页面展示
          imgCodeSrc: '',
          yzmCode: {
            text: '获取验证码',
            isONclick: false
          },
          options: [{
            label: '我已认真阅读并完全同意以下协议：',
            value: '1',
            checked: true
          }]
        },
        state: { // 页面按钮，显示状态。
          openMobile: false,
          agreement: [1],
          popupVisible: false,
          xieyi: true,
          isOnSubmit: true
        }
      }
    },
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {},
        initialized: (state => state.metadata.initialized)
      }),
      canSubmit() {
        let can = false
        if (this.state.agreement.length) {
          if (Object.values(this.fromData).toString().replace(/,/g, '') === Array.of(this.user.identity.realName, this.user.identity.mobile, this.user.weixinAccountNo).toString().replace(/,/g, '')) {
            can = true
          } else {
            can = false
          }
        } else {
          can = true
        }
        return can
      }
    },
    methods: {
      OnSubmit() {
        if (this.state.openMobile) {
          userAPI.PhoneAuthCode({
            mobile: this.fromData.mobile,
            smsAuthCode: this.fromData.mobileYzm,
            category: 'CHANGEMOBILE'
          }, () => {
            this.updataUser(() => {
              this.$store.dispatch('getUserDetails')
              Toast({
                message: '修改成功',
                position: 'top'
              })
              this.$router.push('/user_center')
            })
          })
        } else {
          this.updataUser(() => {
            this.$store.dispatch('getUserDetails')
            Toast({
              message: '修改成功',
              position: 'top'
            })
            this.$router.push('/user_center')
          })
        }
      },
      getYzmCode() {
        if (this.form.imgcode === '') {
          Toast({
            message: '请输入图片验证码',
            position: 'top'
          })
          return false
        }
        let time = null
        userAPI.getPhoneAuthCode({
          mobile: this.fromData.mobile,
          category: 'CHANGEMOBILE',
          imageAuthCode: this.fromData.imgcode
        }, () => {
          Toast({
            message: '短信发送成功',
            position: 'top'
          })
          let a = 10
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
      updataUser(fn) {
        let data = {}
        if (this.user.identity.realName !== this.fromData.name) {
          data.realName = this.fromData.name
        }
        if (this.user.identity.mobile !== this.fromData.mobile) {
          data.mobile = this.fromData.mobile
        }
        if (this.user.identity.weixinAccountNo !== this.fromData.weixinAccountNo) {
          data.weixinAccountNo = this.fromData.weixinAccountNo
        }
        userAPI.severwm(data, () => {
          if (fn && fn()) {
            fn()
          }
        })
      },
      getImgCode() {
        this.pageData.imgCodeSrc = config.HOST + '/m/auth/getImageAuthCode?' + Math.floor(Math.random() * 100)
      }
    },
    watch: {
      'fromData.mobile': function (val) {
        if (val !== this.user.identity.mobile){
          this.state.openMobile = true
        } else {
          this.state.openMobile = false
        }
      }
    },
    created() {
      this.getImgCode()
      // 姓名
      this.user.identity.realName ? this.fromData.name = this.user.identity.realName : this.fromData.name = ''
      // 手机号
      this.user.identity.mobile ? this.fromData.mobile = this.user.identity.mobile : this.fromData.mobile = ''
      // 微信号
      this.user.weixinAccountNo ? this.fromData.weixinAccountNo = this.user.weixinAccountNo : this.fromData.weixinAccountNo = ''
    }
  }
</script>


