<style scoped lang="scss">
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .mine-total {
    .head {
      position: relative;
      /*height: 60px;*/
      color: white;
      padding: 20px;
      text-align: center;
      background: linear-gradient(to top, $color2, $color3);
      p {
        font-size: 14px;
      }
      h2 {
        font-size: 18px;
        font-weight: 400;
        margin: 0;
      }
    }
    .body {
      position: relative;
      height: calc(100% - 76px - 54px);
      overflow: auto;
      ul {
        li {
          margin-top: 15px;
          padding: 0 15px;
          .min-head {
            padding: 5px 0;
            display: flex;
            justify-content: space-between;
          }
          section {
            border-radius: 10px;
            background-color: white;
            padding: 0 10px;
            .time-list {
              border-top: 1px solid $fgxian;
              padding: 10px 0;
              &:nth-child(1) {
                border: none;
              }
              .title {
                padding: 3px 0;
              }
              .content {
                line-height: 1.5;
                span {
                  float: right;
                  color: $color2;
                  font-size: 16px;
                }
              }
            }
          }
        }
      }

      .bound {
        text-align: center;
      }
    }
    .load {
      text-align: center;
      padding: 10px;
      p {
        font-size: 12px;
        display: inline-block;
        background: #cacaca;
        height: 20px;
        line-height: 16px;
        border-radius: 10px;
        padding: 3px 10px;
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
  <div class="page mine-total">
    <div class="head">
      <p>团队业务奖励</p>
      <h2>￥{{ pageData.teamTotal | currencyAuot }}</h2>
    </div>
    <div class="body">
      <ul>
        <li v-for="val in zuZhuangData">
          <div class="min-head"><span>{{ val.time }}</span> <span>小计: ￥{{ val.minAll | currencyAuot }}</span></div>
          <section>
            <div class="time-list" v-for="i in val.list">
              <p class="title">团队业务奖励:{{ i.productId | productName }}</p>
              <div class="content">
                {{ isName(i.employeeNo) }}：{{ i.realName| nameXXX }} <span><i
                style="font-size: 18px;padding-top: 3px">+</i>￥{{i.amount | currencyAuot }}</span>
                <br>
                时间：{{ i.createdDate | timeAuto }}
              </div>
            </div>
          </section>

        </li>
      </ul>
      <div class="no-data-view" v-if="noData">
        <img class="no-data-icon" src="../../assets/img/icon_empty_logo.png">
        <p>暂无数据</p>
      </div>
      <div class="load" v-if="load">
        <p @click="DataLoad">加载更多数据</p>
      </div>
      <p v-if="loadNoData" style="padding: 10px;text-align: center">没有更多数据</p>
      <bzw-dialog class="credit-card-authorise-dialog" v-model="certificatedStatus"
                  :showCloseButton="false"
                  :showHeader="false"
                  :showFooter="false">
        <div class="tip-content">
          <p>为了保障您的资金安全，同时依照《国家反洗钱法》的要求，必须通过实名认证后方可提款</p>
        </div>
        <div style="padding: 0 20px 20px;">
          <mt-button type="primary" size="large" style="height: 34px;font-size: 16px;" @click="onAuthorise">
            立即实名认证
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
  import moment from 'moment'
  import {mapState} from 'vuex'
  import BzwDialog from '@/components/dialog/BzwDialog'


  // 测试数据
  export default {
    name: 'mine_total',
    components: {
      BzwDialog
    },
    data() {
      return {
        loadNoData: false,
        certificatedStatus: false,
        pageData: {
          teamTotal: 0
        },
        load: false,
        noData: false,
        page: {
          limit: 10,
          pageNum: 1
        },
        lan: [],
        zuZhuangData: []
      }
    },
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {}
      })
    },
    methods: {
      getData() {
        userAPI.findDirectPaged({category: 2}, this.page, (res) => {
          this.noData = false
          if (this.page.pageNum === 1 && res.data.items.length === 0) {
            this.noData = true
            this.loadNoData = false
            this.load = false
          } else {
            if (res.data.items.length === this.page.limit) {
              this.load = true
              this.loadNoData = false
            } else {
              this.load = false
              this.loadNoData = true
            }
          }
          let dataList = res.data.items // 请求的原始数据
          if (dataList.length === 0) {
            return
          }
          dataList.forEach((val, key) => {
            dataList[key].yyyyddd = moment(Number(val.createdDate)).format('YYYY-MM-DD')
          })

          let index = 0
          let pinZhuang = [] // 拼装的数组{time: 'yyyy-dd',minAll: 0, list: [] }
          for (let i = 0; i < dataList.length; i++) {
            pinZhuang[index] = {time: dataList[i].yyyyddd, list: [dataList[i]]}
            for (let n = i + 1; n < dataList.length; n++) {
              if (dataList[i].yyyyddd === dataList[n].yyyyddd) {
                i++
                n = i
                pinZhuang[index].list.push(dataList[n])
              }
            }
            index++
          }
          console.log('pinZhuang1', pinZhuang)
          pinZhuang.forEach((val, key) => {
            let all = 0
            val.list.forEach(v => {
              all += Number(v.amount)
            })
            pinZhuang[key].minAll = all
          })
          if (this.zuZhuangData[this.zuZhuangData.length - 1] && this.zuZhuangData[this.zuZhuangData.length - 1].time && this.zuZhuangData[this.zuZhuangData.length - 1].time === pinZhuang[0].time) {
            let msg = this.zuZhuangData.map(val => {
              return val
            })
            msg[msg.length - 1].list.push(...pinZhuang[0].list)
            let all = 0
            msg[msg.length - 1].list.forEach(v => {
              all += Number(v.amount)
            })
            msg[msg.length - 1].minAll = all
            msg.push(...(pinZhuang.slice(1)))
            this.zuZhuangData = msg
          } else {
            this.zuZhuangData.push(...pinZhuang)
          }
          console.log('pinZhuang3', pinZhuang)
        })
      },
      DataLoad() {
        this.page.pageNum++
        this.getData()
      },
      onAuthorise() {
        this.$router.push('/real_name')
      },
      tixanToFrom() {
        if (this.user.identity.certificatedStatus !== 2) {
          this.certificatedStatus = true
        } else {
          userAPI.createWithdrawView(res => {
            window.location.href = res.data.redirectURL
          })
        }
      },
      isName(uid) {
        if (this.user.employeeNo === uid) {
          return '自己'
        }
        return '客户'
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
      },
      timeAuto: function (val) {
        return moment(Number(val)).format('YYYY-MM-DD HH:mm')
      },
      productName(i) {
        let name = ''
        JSON.parse(sessionStorage.metadata).bank.forEach(val => {
          if (val.id == i) {
            name = val.bankName
          }
        })
        return name
      },
      nameXXX(val) {
        let a = ''
        if (val) {
          a = val.trim().replace(/^(\S{1})(.*)/g, '$1**')
        }
        return a
      }
    },
    created() {
      userAPI.userIncome((res) => {
        this.pageData.teamTotal = (Number(res.data.teamTotal) / 100).toFixed(2)
      })
      this.getData()
    }
  }
</script>


