/*
* @class   银行卡详情页
* @author  Dennis Lei
* @date    19.04.04
*/

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/assets/css/variable.scss";

  .page-main {
    height: 100%;
    overflow: auto;
    margin-bottom: 0;

    .head {
      width: 100%;
      min-height: 90px;
      padding-top: 20px;
      background: linear-gradient(to top, $color2, $color3);
      color: white;

      .title {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
      }
      .amount {
        text-align: center;
        font-size: 18px;
      }
      > ul {
        margin: 10px 40px 0;
        display: flex;
        min-height: 60px;
        li {
          flex: 1;
          text-align: center;
        }
      }
    }
    .search-section {
      position: relative;
      display: flex;
      margin: 10px;

      .employee-no {
        flex: 0 0 70%;
        min-height: 34px;
        line-height: 34px;
        border: none;
        border-radius: 4px;
      }
      .search-btn {
        flex: 30%;
        font-size: 12px;
        padding-left: 10px;
      }
    }
    .nav {
      padding: 0 10px;
      margin-bottom: 1px;
      .mint-button {
        border-radius: 8px 8px 1px 1px;
      }
    }
    .order-tab-container {
      width: 100%;
      height: calc(100% - 177px);
      .order-tabbar {
        display: flex;
        background-color: #fff;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;

        li {
          flex: 1;
          text-align: center;
          &.actived {
            border-bottom: 3px solid;
            border-image: linear-gradient(to left, $color2, $color3) 3 3;
            color: $color3;
          }
        }
      }
      .notice {
        margin-top: 10px;
        color: red;
        font-size: 12px;
        padding: 0 10px;
      }
      .order-list {
        position: relative;
        margin-top: 20px;
      }
      .order-ul {
        padding: 10px;
        background-color: #fff;
        li {
          position: relative;
          margin-bottom: 10px;
          padding-bottom: 15px;
          border-bottom: 1px solid $fgxian;

          &:last-child {
            border-bottom: none;
          }
          .title {
            font-size: 18px;
            margin-bottom: 8px;
            padding-right: 50px;
          }
          label {
            position: absolute;
            right: 0;
            top: 2px;
            color: $gray;
            i {
              font-size: 14px;
              color: $color4;
              margin-right: 4px;
            }
            span {
              font-size: 12px;
            }
          }
          p {
            color: $color4;
            line-height: 20px;
          }
          section {
            margin-top: 10px;

            .mini {
              font-size: 12px;
              height: 24px;
              padding: 4px 8px;
              margin-right: 4px;
            }
          }

        }
      }
    }
    .set-btn {
      background: none;
      border: 1px solid $color3;
      color: $color3;
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
</style>
<style lang="scss" rel="stylesheet/scss">
  @import "~@/assets/css/variable.scss";

  #app .page.fixed {
    position: fixed;
    bottom: 55px;
    left: 0;
    right: 0;
    top: 0;
  }

  .bg-1 {
    background: linear-gradient(to left, $color2, $color3);
    padding: 0 30px;
    color: white;
  }
</style>
<template>
  <div class="page fixed">
    <section class="page-main">
      <div class="head">
        <p class="title">订单总数</p>
        <p class="amount">{{orderAmount}}</p>
        <!--<ul>-->
        <!--<li>-->
        <!--<p>信用卡</p>-->
        <!--<p>{{amountObj.creditCard}}</p>-->
        <!--</li>-->
        <!--<li>-->
        <!--<p>借记卡</p>-->
        <!--<p>{{amountObj.debitCard}}</p>-->
        <!--</li>-->
        <!--<li>-->
        <!--<p>贷款</p>-->
        <!--<p>{{amountObj.loans}}</p>-->
        <!--</li>-->
        <!--<li>-->
        <!--<p>保险</p>-->
        <!--<p>{{amountObj.applyForReimbursement}}</p>-->
        <!--</li>-->
        <!--<li>-->
        <!--<p>理财</p>-->
        <!--<p>{{amountObj.financing}}</p>-->
        <!--</li>-->
        <!--</ul>-->
      </div>
      <div class="search-section">
        <mt-field class="employee-no"
                  placeholder="请输入ID搜索"
                  :attr="{maxlength: 12}"
                  v-model="searchKey">
        </mt-field>
        <div class="search-btn">
          <mt-button size="small" class="bg-1" @click="search">查询</mt-button>
        </div>
      </div>
      <div class="nav">
        <mt-button size="small" @click.native.prevent="active = 'creditCard'">信用卡</mt-button>
        <!--<mt-button size="small" @click.native.prevent="active = 'debitCard'">借记卡</mt-button>-->
        <!--<mt-button size="small" @click.native.prevent="active = 'loans'">贷款</mt-button>-->
      </div>
      <mt-tab-container v-model="active" class="order-tab-container">
        <mt-tab-container-item id="creditCard" style="overflow: auto;">
          <ul class="order-tabbar">
            <li v-for="item in creditOrderBars" :class="activeState == item.index && 'actived'" @click="filter(item)">
              {{item.text}}
            </li>
          </ul>
          <p class="notice">
            说明：该明细为用户进行信用卡申请页面时的浏览记录，不能视为信用卡申请订单。
          </p>
          <section class="order-list">
            <ul class="order-ul" v-if="creditOrderList.length">
              <li v-for="(item , index) in creditOrderList">
                <div class="title">{{item.productName}}</div>
                <label><i class="iconkehuziliao iconfont"></i>{{item.employeeNo === user.employeeNo? '自己':
                  '客户'}}</label>
                <p>申请人：{{item.realName | nameXXX }} (ID：{{item.employeeNo}})</p>
                <p>手机号：{{item.mobile | mobileXXX }}</p>
                <p>浏览时间：{{item.createdDate | timeAuto}}</p>
                <section v-if="activeState !== 4 && activeState !== 3">
                  <mt-button size="small" v-if="activeState !== 1" class="mini set-btn" @click="move(item, 1)">移至待确认
                  </mt-button>
                  <mt-button size="small" v-if="activeState !== 2" class="mini set-btn" @click="move(item, 2)">移至待再查
                  </mt-button>
                  <mt-button v-if="activeState !== 6" size="small" class="mini set-btn" @click="move(item, 6)">移至回收站
                  </mt-button>
                  <mt-button v-if="activeState === 1 || activeState === 5" size="small" class="mini set-btn"
                             @click="$router.push({path: 'schedule_form', query:{orderid: item.id	}})">查看进度
                  </mt-button>
                </section>
              </li>
            </ul>
            <div class="no-data-view" v-if="noData">
              <img class="no-data-icon" src="../../assets/img/icon_empty_logo.png">
              <p>暂无数据</p>
            </div>
          </section>
          <!---->
          <p v-if="loadNoData" style="padding: 10px;text-align: center">没有更多数据</p>
          <div class="load" v-if="loadList">
            <p @click="load">加载更多</p>
          </div>
          <!---->
        </mt-tab-container-item>
        <mt-tab-container-item id="debitCard">
          借记卡内容 -- 待做
        </mt-tab-container-item>
        <mt-tab-container-item id="loans">
          321
        </mt-tab-container-item>
      </mt-tab-container>
      <div v-if="false" style="text-align: center; margin-top: 60px;color: #a4a4a4;">
        <p>淘个卡</p>
        <br>
        <p>copyright@2019-2020 taogeka.All Rights Reserved</p>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import moment from 'moment'
  import {Toast} from 'mint-ui'
  import orderAPI from '@/api/orderAPI'
  import ScrollWrapper from '../../components/scrollWrapper/ScrollWrapper'

  export default {
    name: 'OrderIndex',
    components: {
      ScrollWrapper
    },
    computed: {
      ...mapState({
        user: (state => state.security.user),
        initialized: (state => state.metadata.initialized)
      })
    },
    data() {
      return {
        orderAmount: null,
        limit: 10,
        searchKey: '',
        active: 'creditCard',
        activeState: 1,
        statusEnum: {
          ToConfirm: 1, // 待确认
          ToCheck: 2, // 待再查
          ToAudit: 3, // 待审核
          BeCompleted: 4, // 已完成
          NotPass: 5, // 未通过
          RecyclingBin: 6 // 回收站
        },
        creditOrderBars: [
          {
            text: '待确认',
            index: 1
          },
          {
            text: '待再查',
            index: 2
          },
          {
            text: '待审核',
            index: 3
          },
          {
            text: '已完成',
            index: 4
          },
          {
            text: '未通过',
            index: 5
          },
          {
            text: '回收站',
            index: 6
          }
        ],
        amountObj: {
          creditCard: 10,
          debitCard: 8,
          loans: 10,
          applyForReimbursement: 10,
          financing: 5
        },
        // 信用卡订单的翻页参数
        status: 1, // 状态值：1=待确认，2=待再查，3=待审核，4=已完成，5=未通过，6=回收站
        currentPage: 1, // 当前页
        noMore: false,
        noData: false,
        creditOrderList: [], // 信用卡订单,
        loadNoData: false,
        loadList: false,
        page: {
          pageNum: 1,
          limit: 10
        },
      }
    },
    methods: {
      getData(fn) {
        let filter = []
        if (this.searchKey) {
          filter.push({
            property: '_member.employeeNo',
            value: this.searchKey
          })
        }
        orderAPI.fetchOrderList({
          status: this.status
        }, this.page, (res) => {
          this.creditOrderList.push(...res.data.items)
          this.noData = false // 无数据图片隐藏
          if (this.page.pageNum === 1 && res.data.items.length === 0) { // 首次查询无数据
            this.noData = true // 图片隐藏
            this.loadNoData = false // 加载按钮隐藏
            this.loadList = false // 无更多数据提示文字隐藏
          } else {
            if (res.data.items.length === this.page.limit) {
              this.loadList = true
              this.loadNoData = false
            } else if (res.data.items.length < this.page.limit) {
              this.loadList = false
              this.loadNoData = true
            }
          }

          fn && fn(res)
        }, filter)
      },
      search() {
        this.creditOrderList = []
        this.page.pageNum = 1
        this.getData()
      },
      move(data, status) {
        orderAPI.moveCreditCardOrder({
          status,
          id: data.id
        }, (res) => {
          let index = this.creditOrderList.findIndex(item => item.id === data.id)
          this.creditOrderList.splice(index, 1)
          Toast({
            message: '操作成功',
            position: 'top'
          })
        })
      },
      fetchOrderList(currentPage, callback) {
        let filter = []
        if (this.searchKey) {
          filter.push({
            property: '_member.employeeNo',
            value: this.searchKey
          })
        }
        orderAPI.fetchOrderList({
          status: this.status
        }, {
          limit: this.limit,
          pageNum: currentPage
        }, (res) => {
          callback && callback(res)
        }, filter)
        this.$refs.scroll.forceUpdate(false) // 显示没有更多
      },
      filter(item) {
        this.status = this.activeState = item.index
        this.searchKey = ''
        this.page.pageNum = 1
        this.creditOrderList = []
        this.getData()
      },
      load() {
        // 下一页数据
        this.page.pageNum++
        this.getData()
      },
    },
    created() {
      this.status = this.$route.query.status || 1
      this.getData()
    },
    mounted() {
      orderAPI.count((res) => {
        this.orderAmount = res.data.totalCount
      })
    },
    filters: {
      timeAuto: function (val) {
        return moment(Number(val)).format('YYYY-MM-DD HH:mm')
      },
      mobileXXX(val) {
        let a = ''
        if (val) {
          a = val.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2")
        }
        return a
      },
      nameXXX(val) {
        let a = ''
        if (val) {
          a = val.trim().replace(/^(\S{1})(.*)/g, '$1**')
        }
        return a
      }
    },
  }
</script>
