/*
* @class   申请人信息表单
* @author  Dennis Lei
* @date    19.04.03
*/

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/assets/css/variable.scss";

  .page-main {
    min-height: 100%;
    margin-bottom: 0;
    background-color: #fff;

    .apply-desc {
      padding: 30px 10px 10px;
      /*background: -webkit-gradient(linear, 0 0, 0 100%, from(#535BFF), to(#41C2FF));*/
      background-image: linear-gradient(to bottom, $color2 -30%, $color3);
      color: #fff;
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
      .mint-cell-text {
        min-height: 48px;
        line-height: 48px;
        position: relative;
        padding: 0 10px;

        &:after {
          bottom: 0;
          @include line
        }

        &.credit-card-badge-label:after {
          display: none;
        }
        span {
          color: $color4;
        }
      }
      .badge-section {
        padding-bottom: 10px;
      }
      .mint-badge.is-primary {
        box-sizing: border-box;
        border: 1px solid #7c868c;
        color: $mainFontColor;
        margin: 10px 0 0 10px;
        background-color: #fff;
        height: 20px;
        line-height: 16px;
        &.checked {
          background-color: $color3;
          color: #fff;
          border: 1px solid transparent;
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
      padding: 10px 10px 0;
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
</style>
<style lang="scss" rel="stylesheet/scss">
  .agree-checkbox {
    margin-top: 5px;
    .mint-checklist-title {
      display: none;
    }
    .mint-checklist-label {
      padding: 0;
    }
    .mint-checkbox-core {
      border-radius: 4px;
      width: 18px;
      height: 18px;
      position: absolute;
      &::after {
        top: 2px;
        left: 5px;
      }
    }
    .mint-checkbox-label {
      display: block;
      margin-left: 24px;
    }
  }

  .xieyi {
    color: #3eb7f3;
    padding-left: 20px;
  }

  .xy-out {
    display: inline-block;
    padding: 8px 20px;
    text-align: center;
  }
</style>
<template>
  <div class="page">
    <section class="page-main">
      <div class="apply-desc">
        <h3>填写申请人信息</h3>
        <p>以上信息将直接关系您在平台的所有操作，</p>
        <p>请如实填写您的相关信息，一旦提交，不予以修改。</p>
      </div>
      <div class="form-section">
        <mt-field class="form-cell" label="ID" placeholder="" disabled readonly v-model="form.employeeNo"
                  v-if="isToBeingAgent"></mt-field>
        <mt-field class="form-cell" label="用户名" :disabled="disabled" placeholder="请输入您的真实姓名"
                  v-model="form.realName"></mt-field>
        <mt-field class="form-cell" label="身份证号" :disabled="disabled" placeholder="请输入您的身份证号" :attr="{maxlength: 20}"
                  v-model="form.IDCardNo"></mt-field>
        <mt-field class="form-cell" label="手机号" :disabled="disabled" placeholder="请输入您的常用手机号" type="tel"
                  :attr="{maxlength: 11}" v-model="form.mobile"></mt-field>
        <mt-field class="form-cell" label="验证码" v-if="!disabled" :disabled="disabled" placeholder="请输入短信验证码" :attr="{maxlength: 6}"
                  v-model="form.authCode">
          <mt-button v-if="!disabled" style="font-size: 12px;border: 1px solid #ff2521; background: none; color: #ff2521" size="small" :readonly="!!countDownNum" :disabled="!!countDownNum"
                     @click="sendAuthCode">{{countDownNum > 0 ? '剩余'+countDownNum+ 's' : '获取'}}
          </mt-button>
        </mt-field>
        <mt-field class="form-cell" label="微信号" placeholder="请输入微信号" v-model="form.weixinAccountNo"
                  v-if="isToBeingAgent"></mt-field>

        <p v-if="isToBeingAgent" class="mint-cell-text">您是否有过以下推广经验<span>(请选择标签)</span></p>
        <div v-if="isToBeingAgent" class="badge-section">
          <mt-badge size="small" @click.native="checkExperienceBadgeEv(item, experienceBadge)"
                    :class="item.checked ? 'checked': ''"
                    v-for="item in experienceBadge" :key="item.id">
            {{item.name}}
          </mt-badge>
        </div>

        <p v-if="!isToBeingAgent" class="mint-cell-text credit-card-badge-label">您持有以下哪家银行信用卡？<span>(请选择标签)</span></p>
        <div class="credit-card-badge-section" v-if="!isToBeingAgent">
          <mt-badge size="small" @click.native="checkExperienceBadgeEv(item, banksBadge)"
                    :class="item.checked ? 'checked': ''"
                    v-for="item in banksBadge" :key="item.id">
            {{item.shortName}}
          </mt-badge>
        </div>
      </div>

      <mt-checklist class="agree-checkbox"
                    @change="agreeChange"
                    :value.sync="agreeState"
                    :options="agreeOption">
      </mt-checklist>
      <span class="xieyi" @click="popupVisible = true;xieyi = true">《淘个卡平台服务协议》</span> <br>
      <span v-if="isToBeingAgent" class="xieyi" @click="popupVisible = true; xieyi = false">《淘个卡平台信用卡推广规范守则》</span>
      <mt-popup v-model="popupVisible" position="right" style="border-radius: 0">
        <xie-yi :isDaili="xieyi"/>
        <div style="text-align: center; padding: 5px 10px">
          <div class="xiye-out" @click="popupVisible = false" size="small">关闭</div>
        </div>
      </mt-popup>

      <div class="notice">
        <h4>注意事项：</h4>

        <p>1.必须填写真实个人信息，否则无法在平台办理业务。</p>
        <p>2.收到办卡审核通知短信，第2个工作日查到进度并提示“等待工作人员审核。</p>
        <p>3.在淘个卡申请信用卡不收取任何费用，凡是索取均为欺诈，请不要相信！</p>
        <p> 4.会员资料与银行无关，淘个卡对此资料提供隐私保护。</p>
      </div>
      <br>
      <div style="padding:0 10px;">
        <mt-button type="primary" size="large" @click="onSubmit" :disabled="!agreeState.length">
          提交
        </mt-button>
      </div>
      <br>
    </section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Toast } from 'mint-ui'
  import creditCardApi from '@/api/creditCardAPI'
  import userAPI from '@/api/userAPI'
  import XieYi from '../../components/agreement'
  import orderAPI from '../../api/orderAPI';

  export default {
    name: 'ApplicantForm',
    components: {
      XieYi
    },
    data() {
      return {
        disabled: false,
        xieyi: true,
        popupVisible: false,
        isToBeingAgent: false, // 控制是否显示会员相关表单信息
        form: {
          employeeNo: '', // ID，用户同意授权后台即给该微信用户分配ID
          realName: '', // 用户真实姓名
          IDCardNo: '', // 用户身份证
          mobile: '', // 用户手机
          weixinAccountNo: '', // 用户微信号
          authCode: ''
        },
        agreeState: ['1'],
        agreeOption: [
          {
            label: '我已认真阅读并完全同意以下协议：',
            value: '1',
            checked: true
          }
        ],
        experienceBadge: [ // 经验列表
          /* {
            name: 'fgfgfdgfd',
            id: 66,
            checked: false
          }*/
        ],
        banksBadge: [], // 银行列表
        countDownNum: 0 // 倒计时
      }
    },
    computed: {
      ...mapState({
        user: state => state.security.user,
        permissions: state => state.user.permissions
      })
    },
    methods: {
      agreeChange(data) {
        this.agreeState = data
      },
      onSubmit() {
        if (this.validate()) {
          // TODO 请求后台
          var experience = []
          this.experienceBadge.forEach(item => {
            if (item.checked) {
              experience.push(item.id)
            }
          })
          var ownBankCard = []
          this.banksBadge.forEach(item => {
            if (item.checked) {
              ownBankCard.push(item.id)
            }
          })

          // 已经实名后成为会员的接口 更新微信号
          if (this.isToBeingAgent && this.user.identity && this.user.identity.IDCardNo) {
            orderAPI.enroll({
              weixinAccountNo: this.form.weixinAccountNo
            }, () => {
              this.$router.replace({
                path: '/applicant_uaer',
                query: this.$route.query
              })
            })
          } else {
            if (this.isToBeingAgent) { // 会员
              userAPI.agentRegiste({
                realName: this.form.realName,
                mobile: this.form.mobile,
                IDCardNo: this.form.IDCardNo,
                experience: experience.join(','),
                weixinAccountNo: this.form.weixinAccountNo,
                authCode: this.form.authCode
              }, (res) => {
                Toast({
                  message: '会员申请信息提交成功',
                  position: 'top'
                })
                this.refreshBaseData(() => {
                  this.$router.replace({
                    path: '/applicant_uaer',
                    query: this.$route.query
                  })
                })
              })
            } else { // 银行卡
              userAPI.memberRegiste({
                realName: this.form.realName,
                mobile: this.form.mobile,
                IDCardNo: this.form.IDCardNo,
                experience: experience.join(','),
                ownBankCard: ownBankCard.join(','),
                authCode: this.form.authCode
              }, (res) => { // 银行卡实名认证信息提交成功
                Toast({
                  message: '申请人信息已提交成功',
                  position: 'top'
                })
                this.refreshBaseData(() => {
                  this.$router.replace({
                    path: '/bank_card_info',
                    query: {
                      creditCardId: this.$route.query.creditCardId
                    }
                  })
                })
              })
            }
          }
        }
      },
      validate() {
        let msg = ''
        msg = this.validateRealName()
        !msg && (msg = this.validateIDCardNo())
        !msg && (msg = this.validateMobile())
        !msg && (msg = this.validateAuthCode())

        if (msg) {
          Toast({
            message: msg,
            position: 'top'
          })
        }
        return !msg
      },
      validateRealName() {
        if (!this.form.realName) {
          return '请填写姓名'
        } else if (this.form.realName.length < 2) {
          return '姓名最少两个字符'
        }
        return null
      },
      validateIDCardNo() {
        if (!this.form.IDCardNo) {
          return '请填写身份证'
        } else if (!this.$util.checkID(this.form.IDCardNo)) {
          return '身份证格式不正确,请检查'
        }
        return null
      },
      validateMobile() {
        if (!this.form.mobile) {
          return '请填写手机号'
        } else if (this.$util.checkMobile(this.form.mobile, () => {
        })) {
          return '请填写正确的手机号'
        }
        return null
      },
      validateAuthCode() {
        if (!this.form.authCode) {
          return '请填写短信验证码'
        } else if (this.form.authCode.length < 6) {
          return '短信验证码不能少于6位'
        }
        return null
      },
      weixinAccountNo() {
        if (this.isToBeingAgent && !this.form.weixinAccountNo) {
          return '请填写微信号'
        }
        return null
      },
      checkExperienceBadgeEv(item, array) {
        let result = array.find(data => data.id === item.id)
        console.log('result', result)
        if (result) {
          result.checked = !result.checked
        }
      },
      refreshBaseData(fn) {
        this.$store.dispatch('getUserDetails').then((data) => {
          if (fn && fn()) {
            fn()
          }
        })
      },
      sendAuthCode() {
        // todo 刷新短信验证码
        let msg = this.validateMobile()
        if (msg) {
          Toast({
            message: msg,
            position: 'top'
          })
          return
        }
        this.$util.countDown(10, (iCount) => {
          this.countDownNum = iCount
        }, () => {
          this.countDownNum = 0
        })
        userAPI.sendPhoneAuthCode({
          mobile: this.form.mobile, // 手机号码
          category: 'REGISTER' // CHANGEMOBILE=修改手机号码，REGISTER=注册
        }, () => {
          Toast({
            message: '短信验证码发送成功！',
            position: 'top'
          })
        })
      }
    },
    created() {
      this.form.employeeNo = this.user.employeeNo || ''
      let metadata = sessionStorage.getItem('metadata')
      if (metadata) {
        metadata = JSON.parse(metadata)
        // 从session获取银行类型
        let banks = metadata.bank || []
        banks.forEach(item => {
          item.checked = false
        })
        this.banksBadge = banks
        // 从session获取经验类型
        let promotionExperience = metadata.promotionExperience || []
        promotionExperience.forEach(item => {
          item.checked = false
        })
        this.experienceBadge = promotionExperience
      }
      creditCardApi.getCreditCards({
        catalog: 1
      }, (res) => {
        console.log(res)
      })
    },
    mounted() {
      // alert(window.location.href)
      if (this.$route.path.includes('/be_agent_form')) {
        this.isToBeingAgent = true
      }
      // 已经实名后成为会员商的接口
      if (this.isToBeingAgent && this.user.identity && this.user.identity.IDCardNo) {
        this.disabled = true
        this.form.IDCardNo = this.user.identity.IDCardNo
        this.form.mobile = this.user.identity.mobile
        this.form.realName = this.user.identity.realName
        this.form.authCode = '******'
      }
    }
  }
</script>
