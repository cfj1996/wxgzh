<style scoped lang="scss">
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .team {
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
        section {
          padding: 15px;
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
  <div class="page team">
    <div class="view">
      <div class="head">
        <p>客户总人数（人）</p>
        <h2>{{ pageData.count}}</h2>
        <div class="mx">
          <div>
            <p>我的客户（人）</p>
            <h2>{{ pageData.customerCount}}</h2>
          </div>
          <div>
            <p>我的团队（个）</p>
            <h2>{{ pageData.teamCustomerCount}}</h2>
          </div>
        </div>
      </div>
      <div class="body">
        <section>
          <h3>我的团队</h3>
          <ul>
            <li v-for="val in level"
                v-if="val.value !== 1 && val.value !== 6 &&val.value !== 7"
                @click="$router.push({path: 'team_detailed', query: {level: val.value}})">
              <span>{{ val.label }}</span>
              <p><span>{{ getSet(val.value) }}</span> <span class="mintui mintui-back"></span></p>
            </li>
          </ul>
        </section>
        <section>
          <h3>我的客户</h3>
          <ul>
            <li @click="$router.push({path: 'team_detailed', query: {level: 1}})">
              <span>客户</span>
              <p><span>{{ pageData.customerCount }}</span> <span class="mintui mintui-back"></span></p>
            </li>
          </ul>
        </section>
        <bzw-dialog class="credit-card-authorise-dialog" v-model="certificatedStatus"
                    :showCloseButton="false"
                    :showHeader="false"
                    :showFooter="false">
          <div class="tip-content">
            <p>为了保障您的资金安全，同时依照《国家反洗钱法》的要求，必须通过实名认证后方可提款</p>
          </div>
          <div style="padding: 0 20px 20px;">
            <mt-button type="primary" size="large" style="height: 34px;font-size: 16px;" @click="this.$router.push('/real_name')">
              立即实名认证
            </mt-button>
          </div>
        </bzw-dialog>
      </div>
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
        pageData: {
          count: 0, //	客户总数
          customerCount: 0, //	我的客户数
          teamCustomerCount: 0, //	团队数
          probationCount: 0, //	青铜
          commissionerCount: 0, //	白银
          managerCount: 0, //	黄金
          bankerCount: 0 // 钻石
        },
        level: JSON.parse(sessionStorage.level).reverse()
      }
    },
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {}
      })
    },
    methods: {
      getSet(level) {
        let msg = ''
        switch (level) {
          case 2:
            msg = this.pageData.probationCount
            break;
          case 3:
            msg = this.pageData.commissionerCount
            break;
          case 4:
            msg = this.pageData.managerCount
            break;
          case 5:
            msg = this.pageData.bankerCount
            break;
        }
        return msg
      },
      tixanToFrom() {
        this.user.identity.certificatedStatus !== 2 ? this.certificatedStatus = true : this.$router.push('/withd_from')
      }
    },
    created() {
      userAPI.userCustomer((res) => {
        this.pageData = res.data
      })
    }
  }
</script>
