<style scoped lang="scss">
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .tixian-list{
    .view{
      position: relative;
      width: 100%;
      height: calc(100% - 54px);
      overflow: auto;
      .head{
        color: white;
        padding: 20px;
        text-align: center;
        background: linear-gradient(to left, $color2, $color3);
        p {
          font-size: 14px;
        }
        h2 {
          font-size: 18px;
          font-weight: 400;
          margin: 0;
        }
      }
      .body{
        ul{
          padding: 15px 10px;
          li{
            .min-tis{
              display: flex;
              justify-content: space-between;
              padding: 5px 10px;
            }
            .content{
              background: white;
              border-radius: 10px;
              padding: 10px;
              .a2{
                color: $color1;
              }
              div{
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
                .mangli{
                  color: #2ba146;
                }
                .fail{
                  color: $color3
                }
                span{
                  i{
                    font-size: 18px;
                  }
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
        display: block;
        width: 100%;
        color: white;
        background: linear-gradient(to top, $color2, $color3);
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
  <div class="page tixian-list">
    <div class="view">
      <div class="head">
        <h2>已提现</h2>
        <p>￥{{ pageData.count | currencyAuot }}</p>
      </div>
      <div class="body">
        <ul>
          <li v-for="val in pageData.list">
            <section>
              <div class="min-tis"><span>{{ val.time }}</span> <span>小计{{ val.minAll | currencyAuot }}</span></div>
              <div class="content" v-for="t in val.list">
                <div class="a1"><p>收入提现</p></div>
                <div class="a2"><p>提现至微信零钱</p>
                  <span class="mangli" v-if="t.status === 200"><i>-</i>￥{{ t.amount | currencyAuot }}</span>
                  <span class=" fail" v-else><i>-</i>￥{{ t.amount | currencyAuot }}</span>
                </div>
                <div class="a2">
                  <p>{{ t.createdDate | timeAuto }}</p> <span>{{ t.status === 200 ? '提现成功' : '提现失败' }}</span>
                </div>
              </div>
            </section>
          </li>
        </ul>
        <div class="no-data-view" v-if="noData">
          <img class="no-data-icon" src="../../assets/img/icon_empty_logo.png">
          <p>暂无数据</p>
        </div>
        <div class="bound" v-if="load">
          <mt-button size="small" @click="DataLoad">加载更多数据</mt-button>
        </div>
        <p v-if="loadNoData" style="padding: 10px;text-align: center">没有更多数据</p>
      </div>
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
          立即实名认证
        </mt-button>
      </div>
    </bzw-dialog>
    <div class="foot">
      <mt-button class="btn" @click="tixanToFrom">提现</mt-button>
    </div>
  </div>
</template>

<script>
  import userAPI from '../../api/userAPI'
  import moment from 'moment'
  import {mapState} from 'vuex'
  import BzwDialog from '@/components/dialog/BzwDialog'

  export default {
    components: {
      BzwDialog
    },
    data() {
      return {
        certificatedStatus: false,
        pageData: {
          list: [],
          count: '' // 已提现金额
        },
        load: false,
        noData: false,
        loadNoData: false,
        page: {
          limit: 10,
          pageNum: 1
        }
      }
    },
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {}
      })
    },
    methods: {
      getData() {
        userAPI.findWithdrawPaged(this.page, res => {
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
          let newYYDDTT = dataList.map((val) => {
            val.yyyydd = moment(Number(val.createdDate)).format('YYYY-MM-DD')
            return val
          })
          let index = 0
          let pinZhuang = [] // 拼装的数组{time: 'yyyy-dd',minAll: 0, list: [] }
          for (let i = 0; i < newYYDDTT.length; i++) {
            pinZhuang[index] = {time: newYYDDTT[i].yyyydd, list: [newYYDDTT[i]]}
            for (let n = i + 1; n < newYYDDTT.length; n++) {
              if (newYYDDTT[i].yyyyddd === newYYDDTT[n].yyyyddd) {
                i++
                n = i
                pinZhuang[index].list.push(newYYDDTT[n])
              }
            }
            index++
          }
          pinZhuang = pinZhuang.map(val => {
            let all = 0
            val.list.forEach(v => {
              if(v.status === 200){
                all += Number(v.amount)
              }
            })
            val.minAll = all
            return val
          })
          if (this.pageData.list[this.pageData.list.length - 1] && this.pageData.list[this.pageData.list.length - 1].time && this.pageData.list[this.pageData.list.length - 1].time === pinZhuang[0].time) {
            let msg = this.pageData.list.map(val => { // cope
              return val
            })
            msg[msg.length - 1].list.push(...pinZhuang[0].list)
            let all = 0
            msg[msg.length - 1].list.forEach(v => {
              all += Number(v.amount)
            })
            msg[msg.length - 1].minAll = all
            msg.push(...(pinZhuang.slice(1)))
            this.pageData.list = msg
          } else {
            this.pageData.list.push(...pinZhuang)
          }
          console.log(this.pageData.list)
        })
      },
      DataLoad() {
        this.page.pageNum++
        this.getData()
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
      onAuthorise() {
        this.$router.push('/real_name')
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
      }
    },
    created() {
      userAPI.countWithdrew((res) => {
        this.pageData.count = res.data.count
      })
      this.getData()
    }
  }
</script>
