/*
* @class   确认申请人信息
* @author  Dennis Lei
* @date    19.04.04
*/

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/assets/css/variable.scss";

  .page-main {
    min-height: 100%;
    padding-bottom: 61px;
    margin-bottom: 0;
    background: #fff;

    .apply-desc {
      text-align: center;
      padding: 30px 10px 10px;
      /*background: -webkit-gradient(linear, 0 0, 0 100%, from(#535BFF), to(#41C2FF));*/
      background-image: linear-gradient(to bottom, $color2 -30%, $color3);
      color: #fff;
      padding-bottom: 10px;
      h3 {
        margin: 10px 0;
      }
    }
    .form-section {
      background-color: #fff;

      @mixin line {
        content: ' ';
        position: absolute;
        left: 10px;
        right: 10px;
        height: 1px;
        background-color: #eee;
      }

      .form-cell {
        &:after {
          bottom: 0;
          @include line
        }
      }
      /*.mint-cell-text{
        min-height: 48px;
        line-height: 48px;
        position: relative;
        padding: 0 10px;

        &:after{
          bottom: 0;
          @include line
        }

        &.credit-card-badge-label:after{
          display: none;
        }
        span{
          color: $color4;
        }
      }*/
      .badge-section {
        padding-bottom: 10px;
      }
      .mint-badge.is-primary {
        border: 1px solid #7c868c;
        color: $mainFontColor;
        margin: 10px 0 0 10px;
        background-color: #fff;
        &.checked {
          background-color: $color3;
          color: #fff;
        }
      }

      .credit-card-section {
        padding: 0 10px 10px;
        span {
          color: $color4;
        }
      }
      .credit-card-badge-section {

      }
    }

    .notice {
      padding: 10px 10px 10px;
      h4 {
        margin: 6px 0;
        font-size: 14px;
      }
      p {
        line-height: 18px;
        color: $color4;
      }
    }
  }

  .tip-content {
    padding: 2px 10px 0;
    .line-1 {
      line-height: 20px;
      color: gray;
    }
    .line-2 {
      line-height: 20px;
      color: red;
      margin-bottom: 4px;
    }
    li {
      line-height: 30px;
      label {
        color: gray;
        display: inline-block;
        width: 80px;
      }
    }
  }

  .dialog-btns {
    display: flex;
    padding: 6px 0;
    border-top: 1px solid #eee;

    div {
      flex: 50%;
      text-align: center;
      button {
        height: 32px;
        line-height: 32px;
        width: 100px;
      }
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  @import "~@/assets/css/variable.scss";
  .applicant-confirm-modify-dialog {
    .tip-content {
      padding: 0;
    }
    .mint-cell .mint-cell-wrapper {
      padding: 0;
      .mint-cell-title {
        width: 54px;
      }
    }
    .refresh-check-code {
      color: #3eb7f3;
      width: 64px;
      font-size: 12px;
      text-align: center;
      display: inline-block;
      vertical-align: middle;
      line-height: 16px;
      margin-right: -4px;
    }
  }
  .xieyi {
    color: #3eb7f3;
    padding-left: 33px;
  }
  .huoqu{
    border: 1px solid $color3;
    background: none!important;
    .mint-button-text{
      color: $color3;
    }
  }

</style>
<template>
  <div class="page">
    <section class="page-main">
      <div class="apply-desc">
        <h3>请确认申请人信息</h3>
      </div>

      <div class="form-section">
        <mt-field class="form-cell" label="用户名" placeholder="" disabled readonly v-model="formInfo.realName"></mt-field>
        <mt-field class="form-cell" label="身份证号" placeholder="" disabled readonly
                  v-model="formInfo.IDCardNo"></mt-field>
        <mt-field class="form-cell" label="手机号" placeholder="" disabled readonly type="tel" :attr="{maxlength: 11}"
                  v-model="formInfo.mobile"></mt-field>
        <mt-field v-if="formInfo.weixinAccountNo" class="form-cell" label="微信号" placeholder="" disabled readonly type="tel"
                  v-model="formInfo.weixinAccountNo"></mt-field>
      </div>

      <mt-checklist class="agree-checkbox"
                    @change="agreeChange"
                    :value.sync="agreeState"
                    :options="agreeOption">
      </mt-checklist>
      <span class="xieyi" @click="popupVisible = true">《淘个卡平台服务协议》</span>
      <mt-popup v-model="popupVisible" position="right">
        <xie-yi :isDaili="true"/>
        <div style="text-align: center; padding: 0 10px">
          <div class="xiye-out" @click="popupVisible = false" size="small">关闭</div>
        </div>
      </mt-popup>
      <div class="notice">
        <h4>注意事项：</h4>
        <p>1.必须填写真实个人信息，否则无法在平台办理业务。</p>
        <p>2.收到办卡审核通知短信， 第2个工作日查到</p>
        <p>进度并提示“等待工作人员审核”。</p>
        <p>3.在淘个卡申请信用卡不收取任何费用，凡是索取均为欺诈，请不要相信！</p>
        <p>4.会员资料与银行无关，淘个卡对此资料提供隐私保护。平台监督举报电话：，举报属实者均有现金奖励。</p>
      </div>
    </section>
    <div class="bottom-single-btn">
      <mt-button :disabled="agreeState.length === 0" type="primary" size="large" @click="onSubmit">
        下一步
      </mt-button>
    </div>

    <bzw-dialog v-model="isVisibleConfirmDialog"
                :showCloseButton="false"
                :showHeader="true"
                :showFooter="true">
      <div class="tip-content">
        <p class="line-1">请仔细核对您的身份信息，</p>
        <p class="line-2">在淘个卡平台申请信用卡完全免费，凡索取费用的均为欺诈行为，请不要相信！</p>
        <ul>
          <li><label>姓名</label> <span>{{formInfo.realName}}</span></li>
          <li><label>身份证</label> <span>{{formInfo.mobile}}</span></li>
          <li><label>手机号</label> <span>{{formInfo.IDCardNo}}</span></li>
        </ul>
      </div>
      <section class="dialog-btns" slot="footer">
        <div>
          <mt-button type="default" size="small" @click="showModifyDialog">
            修改
          </mt-button>
        </div>
        <div>
          <mt-button type="primary" size="small" @click="toCreateOrder">
            确认无误
          </mt-button>
        </div>
      </section>
    </bzw-dialog>

    <bzw-dialog v-model="isVisibleModifyDialog" class="applicant-confirm-modify-dialog"
                :enableCoverClick="false"
                :showCloseButton="false"
                :showHeader="true"
                :showFooter="true">
      <div slot="header" style="line-height: 40px;">
        {{ isModifyState? '修改手机号码' : '修改个人信息' }}
      </div>
      <div class="tip-content">
        <p class="line-2">系统将给以下手机号发送验证码</p>
        <mt-field class="form-cell" label="手机号" type="tel" disabled readonly v-model="dialogForm.mobile"
                  v-if="!isModifyState"></mt-field>
        <mt-field class="form-cell" label="手机号" type="tel" placeholder="请输入新手机号" v-model="dialogForm.newMobile"
                  v-else></mt-field>
        <mt-field label="校验码" placeholder="请输入校验码" v-if="!isModifyState" :attr="{maxlength: 4}"
                  v-model="dialogForm.imgCode">
          <img :src="imgDataCode.src" height="30px" width="60px">
          <p class="refresh-check-code" @click="getImgCode">
            看不清楚？
            换一个
          </p>
        </mt-field>
        <mt-field label="验证码" placeholder="请输入短信验证码" :attr="{maxlength: 6}" v-model="dialogForm.authCode">
          <mt-button class="huoqu" type="primary" size="small" :readonly="!!countDownNum"
                     :disabled="!!countDownNum" @click="sendAuthCode">{{countDownNum
            > 0 ? '剩余'+countDownNum+ 's' : '获取'}}
          </mt-button>
        </mt-field>
      </div>
      <section class="dialog-btns" slot="footer">
        <div>
          <mt-button type="default" size="small" @click="toCancelModify">
            取消
          </mt-button>
        </div>
        <div>
          <mt-button :disableClear="false" type="primary" size="small" @click="dialogNextOperate">
            {{ isModifyState? '确定' : '下一步' }}
          </mt-button>
        </div>
      </section>
    </bzw-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import store from '../../store/index'
  import BzwDialog from '@/components/dialog/BzwDialog'
  import { Toast } from 'mint-ui'
  import userAPI from '@/api/userAPI'
  import orderAPI from '@/api/orderAPI'
  import config from '@/config'
  import XieYi from '../../components/agreement'

  export default {
    name: 'ConfirmApplicantInfo',
    components: {
      BzwDialog,
      XieYi
    },
    computed: {
      user() {
        console.log('333', store.state.security && store.state.security.user && store.state.security.user.identity.realName)
        if (store.state.security && store.state.security.user && store.state.security.user.identity) {
          this.initUserInfo(store.state.security.user.identity)
        }
        return store.state.security && store.state.security.user || {}
      }
    },
    watch: {
      user() {

      },
      'isVisibleModifyDialog': function () {
        this.getImgCode()
        this.dialogForm.imgCode = ''
      }
    },
    data() {
      return {
        popupVisible: false,
        countDownNum: 0, // 倒计时
        isVisibleModifyDialog: false,
        isVisibleConfirmDialog: false,
        isModifyState: false, // 是否处于修改手机号码状态
        dialogForm: {
          mobile: '',
          newMobile: '',
          authCode: '',
          imgCode: ''
        },
        formInfo: {
          realName: '',
          IDCardNo: '',
          mobile: '',
          weixinAccountNo: ''
        },
        isToBeingAgent: false, // 控制是否显示会员人相关表单信息
        agreeState: ['1'],
        agreeOption: [
          {
            label: '我已认真阅读并完全同意淘个卡平台协议',
            value: '1',
            checked: true
          }
        ],
        imgDataCode: {
          src: ''
        }
      }
    },
    methods: {
      validateMobile(mobile) {
        if (!mobile) {
          return '请填写手机号'
        } else if (this.$util.checkMobile(mobile, () => {
        })) {
          return '请填写正确的手机号'
        } else if (this.isModifyState && this.dialogForm.newMobile === this.dialogForm.mobile) {
          return '新手机号不能与原手机号相同'
        }
        return null
      },
      getImgCode() {
        // 点击重新获取图片验证码
        this.imgDataCode.src = `${config.HOST}/m/auth/getImageAuthCode?${Math.floor(Math.random() * 100)}`
      },
      sendAuthCode() {
        // 图片验证码检验，获取短信验证码
        const mobile = this.isModifyState ? this.dialogForm.newMobile : this.dialogForm.mobile
        let msg = this.validateMobile(mobile)
        console.log('msg', msg)
        if (msg) {
          Toast({
            message: msg,
            position: 'top'
          })
          return
        }
        if (this.isModifyState) { // 修改手机号不带图片验证码
          userAPI.sendPhoneAuthCode({
            mobile, // 手机号码
            category: 'CHANGEMOBILE' // CHANGEMOBILE=修改手机号码，REGISTER=注册
          }, () => {
            this.$util.countDown(10, (iCount) =>{this.countDownNum = iCount},()=>{ this.countDownNum = 0 })
            Toast({
              message: '短信验证码发送成功！',
              position: 'top'
            })
          })
        } else { // 修改手机号带图片验证码
          userAPI.getPhoneAuthCode({
            mobile,
            category: 'CHANGEMOBILE',
            imageAuthCode: this.dialogForm.imgCode
          }, () => {
            this.$util.countDown(10, (iCount) =>{this.countDownNum = iCount},()=>{ this.countDownNum = 0 })
            Toast({
              message: '短信验证码发送成功！',
              position: 'top'
            })
          })
        }
      },
      agreeChange(data) {
        this.agreeState = data
      },
      onSubmit() {
        this.isVisibleConfirmDialog = true
      },
      showModifyDialog() {
        this.isVisibleModifyDialog = true
        this.isVisibleConfirmDialog = false
      },
      toCreateOrder() {
        orderAPI.createApplyCreditCardOrder({
          productId: this.productId
        }, (res) => {
          this.resetDialogVisible()
          // 创建订单成功后跳转到具体银行的办卡页面
          window.location.href = res.data.url
        })
      },
      toCancelModify() {
        this.isModifyState = false
        this.isVisibleModifyDialog = false
      },
      resetDialogVisible() {
        this.isVisibleModifyDialog = false
        this.isVisibleConfirmDialog = false
        this.isModifyState = false
      },
      dialogNextOperate() { // 下一步或者确认
        const mobile = this.isModifyState ? this.dialogForm.newMobile : this.dialogForm.mobile
        const category = this.isModifyState ? 'REGISTER' : 'CHANGEMOBILE'
        if (!this.isModifyState) { // 下一步
          userAPI.validatePhoneAuthCode({
            mobile: this.dialogForm.mobile,
            smsAuthCode: this.dialogForm.authCode,
            category: 'CHANGEMOBILE'
          }, () => {
            this.isModifyState = true
            this.dialogForm.authCode = ''
          })
        } else { // 确认信息
          userAPI.changeMobile({
            mobile: this.dialogForm.newMobile,
            authCode: this.dialogForm.authCode
          }, () => {
            console.log('修改成功')
            this.dialogForm.newMobile = '' // 新手机号
            this.dialogForm.imgCode = '' // 图片验证码
            this.dialogForm.authCode = '' // 短信验证码
            this.resetDialogVisible()
            this.$store.dispatch('getUserDetails')
            Toast({
              message: '修改成功！',
              position: 'top'
            })
          })
        }
      },
      modifyPhone() {

      },
      updateSessionUserIdentity() {

      },
      validate() {
        return true
      },
      initUserInfo(data) {
        this.formInfo = JSON.parse(JSON.stringify(data))
        this.dialogForm.mobile = this.formInfo.mobile
      }
    },
    created() {
      // 未实名认证则跳转到信用卡申请，用户资料填写
      // this.$router.push('/apply_credit_card_form')
      // this.$router.push('/confirm_applicant_info')
    },
    mounted() {
      this.getImgCode()
      this.productId = this.$route.query.creditCardId || ''
      if (this.$route.path.includes('/be_agent_form')) {
        this.isToBeingAgent = true
      }
    }
  }
</script>
