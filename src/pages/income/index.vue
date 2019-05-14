// 我的收入
<style scoped lang="scss">
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .my-income {
    .view {
      position: relative;
      width: 100%;
      height: calc(100% - 54px);
      overflow: auto;
      .head {
        color: white;
        text-align: center;
        padding: 20px;
        background: linear-gradient(to top, $color2, $color3);
        p {
          font-size: 14px;
        }
        h2 {
          margin: 0;
          font-size: 20px;
          padding-top: 10px;
          font-weight: 400;
        }
        .mx {
          display: flex;
          justify-content: baseline;
          align-items: center;
          div:nth-child(1) {
            flex: 1;
            h2 {
              border-right: 1px solid #ff7777;
              padding: 0;
              margin-top: 10px;
            }
          }
          div:nth-child(2) {
            flex: 1;
            h2 {

              padding: 0;
              margin-top: 10px;
              border-left: 1px solid #ff7777;
            }
          }
        }
      }
      .body {
        padding: 0 10px;
        .title {
          padding: 15px 20px;
        }
        ul {
          border-radius: 10px;
          background: white;
          padding: 0 15px;
          li {
            padding: 15px 10px;
            color: $textColor1;
            display: flex;
            justify-content: space-between;
            border-top: 1px solid #f2f2f2;
            &:nth-child(1) {
              border-top: none;
            }
            p {
              color: $color3;
              .mintui {
                color: $color1;
                margin-left: 10px;
                transform: rotateZ(-180deg);
                display: inline-block;
              }
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
      .btn {
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
  <div class="page my-income">
    <div class="view">
      <div class="head">
        <p>可提现</p>
        <h2>￥ {{ pageData.withdrawTotal | currencyAuot}}</h2>
        <div class="mx">
          <div>
            <p>我的收入</p>
            <h2>￥{{ SUM | currencyAuot}}</h2>
          </div>
          <div @click="$router.push('/withd_list')">
            <p>已提现</p>
            <h2>￥{{ pageData.withdrawTotal | currencyAuot}}</h2>
          </div>
        </div>
      </div>
      <div class="body">
        <p class="title">基本收益</p>
        <ul>
          <li @click="$router.push('/mine_total')"><span>直推业务奖励</span>
            <p><span>￥{{ pageData.mineTotal | currencyAuot}}</span><span class="mintui mintui-back"></span></p></li>
          <li @click="$router.push('/team_total')"><span>团队业务奖励</span>
            <p><span>￥{{ pageData.teamTotal | currencyAuot}}</span><span class="mintui mintui-back"></span></p></li>
        </ul>
      </div>
      <bzw-dialog class="credit-card-authorise-dialog" v-model="certificatedStatus"
                  :showCloseButton="false"
                  :showHeader="false"
                  :showFooter="false">
        <div class="tip-content">
          <p>为了保障您的资金安全，同时依照《国家反洗钱法》的要求，必须通过实名认证后方可提款</p>
        </div>
        <div style="padding: 0 20px 20px;">
          <mt-button type="primary" size="large" style="height: 34px;font-size: 16px;" @click="onAuthorise">
            立即实认证
          </mt-button>
        </div>
      </bzw-dialog>
    </div>
    <div class="foot">
      <div class="btn" @click="tixanToFrom">提现</div>
    </div>
  </div>
</template>

<script>
  import userAPI from '../../api/userAPI'
  import {mapState} from 'vuex'
  import BzwDialog from '@/components/dialog/BzwDialog'

  export default {
    name: 'index',
    components: {
      BzwDialog
    },
    data() {
      return {
        certificatedStatus: false,
        SUM: 0, // 我的收入
        pageData: {
          availableTotal: 0, // 可提现
          withdrawTotal: 0, // 已提现
          mineTotal: 0, // 直推收入
          teamTotal: 0 // 团队收入
        }
      }
    },
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {}
      })
    },
    methods: {
      tixanToFrom() {
        console.log(this.user.identity.certificatedStatus)
        this.user.identity.certificatedStatus !== 2 ? this.certificatedStatus = true : this.$router.push('/withd_from')
      },
      onAuthorise() {
        this.$router.push('/real_name')
      }
    },
    filters: {
      currencyAuot(val) {
        val = Number(val)
        if (val === 0) {
          return '0.00'
        }
        return (val / 100).toFixed(2)
      }
    },
    mounted() {
      userAPI.userIncome((res) => {
        this.pageData = res.data
        this.SUM = Number(res.data.mineTotal) + Number(res.data.teamTotal)
      })
    }
  }
</script>

