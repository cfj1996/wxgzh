/*
* @class   确认申请人信息
* @author  Dennis Lei
* @date    19.04.04
*/

<style scoped  lang="scss" rel="stylesheet/scss">
  @import "~@/assets/css/variable.scss";
  .page-main{
    min-height: 100%;
    padding-bottom: 61px;
    margin-bottom: 0;
    background: #fff;

    .apply-desc {
      text-align: center;
      padding: 30px 10px 10px;
      /*background: -webkit-gradient(linear, 0 0, 0 100%, from(#535BFF), to(#41C2FF));*/
      background-image:linear-gradient(to bottom, $color2 -30%, $color3);
      color: #fff;
      padding-bottom: 10px;
      h3{
        margin: 10px 0;
      }
    }
    .form-section{
      background-color: #fff;

      @mixin line {
        content: ' ';
        position: absolute;
        left: 10px;
        right: 10px;
        height: 1px;
        background-color: #eee;
      }

      .form-cell{
        &:after{
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
      .badge-section{
        padding-bottom: 10px;
      }
      .mint-badge.is-primary{
        border: 1px solid #7c868c;
        color: $mainFontColor;
        margin: 10px 0 0 10px;
        background-color: #fff;
        &.checked{
          background-color: $color3;
          color: #fff;
        }
      }

      .credit-card-section{
        padding: 0 10px 10px;
        span{
          color: $color4;
        }
      }
      .credit-card-badge-section{

      }
    }

    .notice{
      padding: 10px 10px 10px;
      h4{
        margin: 6px 0;
        font-size: 14px;
      }
      p{
        line-height: 18px;
        color: $color4;
      }
    }
  }
  .tip-content{
    padding: 2px 10px 0;
    .line-1{
      line-height: 20px;
      color: gray;
    }
    .line-2{
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
  .dialog-btns{
    display: flex;
    padding: 6px 0;
    border-top: 1px solid #eee;

    div{
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
  .applicant-confirm-modify-dialog{
    .tip-content{
      padding: 0;
    }
    .mint-cell .mint-cell-wrapper{
      padding: 0;
      .mint-cell-title{
        width: 54px;
      }
    }
    .refresh-check-code{
      width: 64px;
      font-size: 12px;
      text-align: center;
      display: inline-block;
      vertical-align: middle;
      line-height: 16px;
      margin-right: -4px;
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
        <mt-field class="form-cell" label="身份证号" placeholder="" disabled readonly v-model="formInfo.IDCardNo"></mt-field>
        <mt-field class="form-cell" label="手机号" placeholder="" disabled readonly type="tel" :attr="{maxlength: 11}" v-model="formInfo.mobile"></mt-field>
        <mt-field class="form-cell" label="微信号" placeholder="" disabled readonly type="tel" v-model="formInfo.weixinAccountNo"></mt-field>
      </div>

      <mt-checklist class="agree-checkbox"
                    @change="agreeChange"
                    :value.sync="agreeState"
                    :options="agreeOption">
      </mt-checklist>

      <div class="notice">
        <h4>注意事项：</h4>
        <p>1.必须填写真实个人信息，否则无法在平台办理业务。</p>
        <p>2.收到办卡审核通知短信， 第2个工作日查到</p>
        <p>进度并提示“等待工作人员审核”，将有机会拆红包。</p>
        <p>3.在XX申请信用卡不收取任何费用，凡是索取均为欺诈，请不要相信！</p>
        <p>4.会员资料与银行无关，XX对此资料提供隐私保护。平台监督举报电话：，举报属实者均有现金奖励。</p>
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
        <p class="line-2">在XX平台申请信用卡完全免费，凡索取费用的均为欺诈行为，请不要相信！</p>
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
        <mt-field class="form-cell" label="手机号" type="tel" disabled readonly v-model="dialogForm.mobile" v-if="!isModifyState"></mt-field>
        <mt-field class="form-cell" label="手机号" type="tel" placeholder="请输入新手机号"  v-model="dialogForm.newMobile" v-else></mt-field>
        <mt-field label="校验码"  placeholder="请输入校验码" :attr="{ maxlength: 4 }" v-if="!isModifyState">
          <img src="../../assets/img/banks_banner/guangda-1.jpg" height="30px" width="60px">
          <a href="javascript:;" class="refresh-check-code">
            看不清楚？
            换一个
          </a>
        </mt-field>
        <mt-field label="验证码"  placeholder="请输入短信验证码" :attr="{maxlength: 6}" v-model="dialogForm.authCode" >
          <mt-button style="font-size: 12px;" size="small" :readonly="!!countDownNum" :disabled="!!countDownNum" @click="sendAuthCode">{{countDownNum > 0 ? '剩余'+countDownNum+ 's' : '获取'}}</mt-button>
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
  import BzwDialog from "@/components/dialog/BzwDialog"
  import { Toast } from 'mint-ui'
  import userAPI from '@/api/userAPI'
  import orderAPI from '@/api/orderAPI'
  export default {
    name: 'ConfirmApplicantInfo',
    components: {
      BzwDialog
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

      }
    },
    data () {
      return {
        countDownNum: 0, // 倒计时
        isVisibleModifyDialog: false,
        isVisibleConfirmDialog: false,
        isModifyState: false, // 是否处于修改手机号码状态
        dialogForm: {
          mobile: '',
          newMobile: '',
          authCode: ''
        },
        formInfo: {
          realName: '',
          IDCardNo: '',
          mobile: '',
          weixinAccountNo: ''
        },
        isToBeingAgent: false, // 控制是否显示代理人相关表单信息
        agreeState: ['1'],
        agreeOption: [
          {
            label: '我已认真阅读并完全同意：《XX平台服务协议》的所有条款',
            value: '1',
            checked: true
          }
        ]
      }
    },
    methods: {
      validateMobile(mobile) {
        if (!mobile) {
          return '请填写手机号'
        } else if (this.$util.checkMobile(mobile, () => {})) {
          return '请填写正确的手机号'
        } else if (this.isModifyState && this.dialogForm.newMobile === this.dialogForm.mobile) {
          return '新手机号不能与原手机号相同'
        }
        return null
      },
      sendAuthCode() {
        // todo 刷新短信验证码
        const mobile = this.isModifyState ? this.dialogForm.newMobile : this.dialogForm.mobile
        let msg = this.validateMobile(mobile)
        if (msg) {
          Toast({
            message: msg,
            position: 'top'
          })
          return
        }
        this.$util.countDown(10, (iCount) =>{this.countDownNum = iCount},()=>{ this.countDownNum = 0 })
        userAPI.sendPhoneAuthCode({
          mobile: this.dialogForm.newMobile, // 手机号码
          category: 'REGISTER' // CHANGEMOBILE=修改手机号码，REGISTER=注册
        }, () => {
          Toast({
            message: '短信验证码发送成功！',
            position: 'top'
          })
        })
      },
      agreeChange(data) {
        this.agreeState = data
        console.log(data)
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
          // window.location.href = 'www.guagnda-bank.com'
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
      dialogNextOperate() {
        if (this.validate()) {
          if (!this.isModifyState) {
            this.dialogForm.newMobile = ''
            this.dialogForm.authCode = ''
            this.isModifyState = true
          } else {
            // 确定修改手机号
            this.dialogForm.newMobile = ''
            this.dialogForm.authCode = ''
            // to save new phone number
            // after save new phone number
            this.isModifyState = false
          }
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
      this.productId = this.$route.query.creditCardId || ''
      if (this.$route.path.includes('/be_agent_form')) {
        this.isToBeingAgent = true
      }
    }
  }
</script>
