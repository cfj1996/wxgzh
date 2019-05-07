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
              border-top: 1px solid #d0d0d0;
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
      .no-data-view{
        margin-top: 50px;
        position: relative;
        min-height: 200px;
        text-align: center;
        img{
          width: 250px;
          height: auto;
        }
        p{
          padding-top: 10px;
        }
      }
      .bound {
        text-align: center;
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
      <p>直推业务奖励</p>
      <h2>￥{{ pageData.mineTotal | currencyAuot }}</h2>
    </div>
    <div class="body">
      <ul>
        <li v-for="val in zuZhuangData">
          <div class="min-head"><span>{{ val.time }}</span> <span>小计: ￥{{ val.minAll | currencyAuot }}</span></div>
          <section>
            <div class="time-list" v-for="i in val.list">
              <p class="title">直推业务奖励：{{i.productCatalog}} {{ i.productId | productName }}</p>
              <div class="content">
                客户：{{i.orderNo}}, {{ i.realName }}, {{ i.mobile }} <span>+￥{{i.incomeFee | currencyAuot }}</span>
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
      <div class="bound" v-if="load">
        <mt-button size="small" @click="DataLoad">加载更多数据</mt-button>
      </div>
    </div>
    <div class="foot">
      <div class="btn">提现</div>
    </div>
  </div>
</template>

<script>
  import userAPI from '../../api/userAPI'
  import moment from 'moment'

  export default {
    name: 'mine_total',
    data() {
      return {
        pageData: {
          mineTotal: '0'
        },
        load: false,
        noData: false,
        page: {
          limit: 10,
          pageNum: 1
        },
        lan: [],
        pageList: [
          {
            id: '1', //	订单Id
            orderNo: '0012', //	订单号
            createdDate: '1557130052135', //	创建时间
            mobile: '1568975698', //	手机号码
            incomeFee: '12453', //	收入金额，单位分
            productId: '1', //	产品Id
            productCatalog: '代理', //	产品类型
            productName: '没有1', //	产品名称
            realName: '张飞1', //	真实姓名
            employeeNo: '1586' // 工号
          },
          {
            id: '323', //	订单Id
            orderNo: '0012', //	订单号
            createdDate: '1557130052135', //	创建时间
            mobile: '1568975698', //	手机号码
            incomeFee: '12453', //	收入金额，单位分
            productId: '1', //	产品Id
            productCatalog: '信用卡1', //	产品类型
            productName: '没有1', //	产品名称
            realName: '张飞1', //	真实姓名
            employeeNo: '1586' // 工号
          }, {
            id: '3', //	订单Id
            orderNo: '0012', //	订单号
            createdDate: '1557023430000', //	创建时间
            mobile: '1568975698', //	手机号码
            incomeFee: '12453', //	收入金额，单位分
            productId: '1', //	产品Id
            productCatalog: '信用卡2', //	产品类型
            productName: '没有3', //	产品名称
            realName: '张飞4', //	真实姓名
            employeeNo: '1586' // 工号
          }, {
            id: '4', //	订单Id
            orderNo: '0012', //	订单号
            createdDate: '1556850630000', //	创建时间
            mobile: '1568975698', //	手机号码
            incomeFee: '12453', //	收入金额，单位分
            productId: '1', //	产品Id
            productCatalog: '信用卡5', //	产品类型
            productName: '没有6', //	产品名称
            realName: '张飞7', //	真实姓名
            employeeNo: '1586' // 工号
          }, {
            id: '5', //	订单Id
            orderNo: '0012', //	订单号
            createdDate: '1556850630000', //	创建时间
            mobile: '1568975698', //	手机号码
            incomeFee: '12453', //	收入金额，单位分
            productId: '1', //	产品Id
            productCatalog: '信用卡8', //	产品类型
            productName: '没有4', //	产品名称
            realName: '张飞3', //	真实姓名
            employeeNo: '1586' // 工号
          }],
        zuZhuangData: []
      }
    },
    methods: {
      getData() {
        userAPI.findDirectPaged(this.page, (res) => {
          if (this.page.pageNum === 1 && res.data.items.length === 0) {
            this.noData = true
          }
          if (res.data.items.length > this.page.limit) {
            this.load = true
          } else {
            this.load = false
          }
          this.pageList.push(...res.data.rows)
        })
      },
      DataLoad() {
        this.page.pageNum++
        this.getData()
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
        return ', ' + name
      }
    },
    created() {
      userAPI.userIncome((res) => {
        this.pageData.mineTotal = res.data.mineTotal
      })
      this.pageList.forEach((val, key) => {
        this.pageList[key].yyyyddd = moment(Number(val.createdDate)).format('YYYY-MM-DD')
      })
      let key = 0
      for (let i = 0; i < this.pageList.length; i++) {
        this.zuZhuangData[key] = {time: this.pageList[i].yyyyddd, list: [this.pageList[i]]}
        for (let n = i + 1; n < this.pageList.length; n++) {
          if (this.pageList[i].yyyyddd === this.pageList[n].yyyyddd) {
            i++
            n = i
            this.zuZhuangData[key].list.push(this.pageList[n])
          }
        }
        key++
      }
      this.zuZhuangData.forEach((val, key) => {
        let all = 0
        val.list.forEach(v => {
          all += Number(v.incomeFee)
        })
        this.zuZhuangData[key].minAll = all
      })
      console.log(this.zuZhuangData)
      // this.getData()
    }
  }
</script>


