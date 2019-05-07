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
        background: linear-gradient(to left, $color2, $color3);
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
              border-right: 1px solid $color1;
              padding: 0;
              margin-top: 10px;
            }
          }
          div:nth-child(2) {
            flex: 1;
            h2 {

              padding: 0;
              margin-top: 10px;
              border-left: 1px solid $color1;
            }
          }
        }
      }
      .body {
        .title {
          padding: 15px 20px;
        }
        ul {
          border-radius: 10px;
          background: white;
          padding: 0 15px;
          li {
            padding: 15px 10px;
            color: $color1;
            display: flex;
            justify-content: space-between;
            border-top: 1px solid $color1;
            &:nth-child(1) {
              border-top: none;
            }
            p {
              color: #3eb7f3;
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
        <h2>￥ {{ pageData.all | currencyAuot}}</h2>
        <div class="mx">
          <div>
            <p>我的收入</p>
            <h2>￥{{ pageData.income | currencyAuot}}</h2>
          </div>
          <div>
            <p>已提现</p>
            <h2>￥{{ pageData.withdraw | currencyAuot}}</h2>
          </div>
        </div>
      </div>
      <div class="body">
        <p class="title">基本收益</p>
        <ul>
          <li @click="$router.push('/mine_total')"><span>直推业务奖励</span>
            <p><span>￥{{ (pageData.mineTotal/100).toFixed(2)}}</span><span class="mintui mintui-back"></span></p></li>
          <li @click="$router.push('/team_total')"><span>团队业务奖励</span>
            <p><span>￥{{ (pageData.teamTotal/100).toFixed(2)}}</span><span class="mintui mintui-back"></span></p></li>
        </ul>
      </div>
    </div>
    <div class="foot">
      <div class="btn">提现</div>
    </div>
  </div>
</template>

<script>
  import userAPI from '../../api/userAPI'

  export default {
    name: 'index',
    data() {
      return {
        pageData: {
          all: '34000',
          income: '25000',
          withdraw: '15000', // 已提现
          mineTotal: '1523', // 直推收入
          teamTotal: '26522' // 团队收入
        }
      }
    },
    filters: {
      currencyAuot(val) {
        val = Number(val)
        if (val === 0) {
          return '0.00'
        } else {
          return (val / 100).toFixed(2)
        }
      }
    },
    mounted() {
      userAPI.userIncome((res) => {
        this.pageData = res.data
        this.pageData.all = 300000
        this.pageData.income = 300000
      })
    }
  }
</script>

