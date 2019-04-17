/*
* @class   银行卡详情页
* @author  Dennis Lei
* @date    19.04.04
*/

<style scoped  lang="scss" rel="stylesheet/scss">
  @import "~@/assets/css/variable.scss";
  .page-main{
    height: 100%;
    overflow: auto;
    margin-bottom: 0;

    .head{
      width: 100%;
      min-height: 90px;
      padding-top: 20px;
      background-color: #fff;

      .title{
        text-align: center;
        font-size: 20px;
        font-weight: bold;
      }
      .amount{
        text-align: center;
      }
      >ul{
        margin: 10px 40px 0;
        display: flex;
        min-height: 60px;
        li {
          flex: 1;
          text-align: center;
        }
      }
    }
    .search-section{
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
      .search-btn{
        flex: 30%;
        font-size: 12px;
        padding-left: 10px;
      }
    }
    .nav{
      padding: 0 10px;
      margin-bottom:1px;
      .mint-button{
        border-radius: 8px 8px 1px 1px;
      }
    }
    .order-tab-container{
      width: 100%;

      .order-tabbar{
        display: flex;
        background-color: #fff;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;

        li{
          flex: 1;
          text-align: center;
          &.actived{
            border-bottom: 3px solid;
            border-image: linear-gradient(to left, #43B9FF , #525FFF) 3 3;
            color: #525FFF;
          }
        }
      }
      .notice{
        margin-top: 10px;
        color: red;
        font-size: 12px;
        padding: 0 10px;
      }
      .order-list{
        position: relative;
        margin-top: 20px;
      }
      .order-ul{
        padding: 10px;
        background-color: #fff;
        li {
          position: relative;
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid $color4;

          &:last-child{
            border-bottom: none;
          }
          .title{
            font-size: 18px;
            margin-bottom: 8px;
            padding-right: 50px;
          }
          label{
            position: absolute;
            right: 0;
            top: 2px;

            i{
              font-size: 14px;
              color: $color4;
              margin-right: 4px;
            }
            span{
              font-size: 12px;
            }
          }
          p{
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
      .no-data-view{
        position: relative;
        min-height: 200px;
        text-align: center;
        img{
          width: 200px;
        }
        p{
          padding-top: 10px;
        }
      }
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  #app .page.fixed{
    position: fixed;
    bottom: 55px;
    left: 0;
    right: 0;
    top: 0;
  }
  .bg-1{
    background: linear-gradient(to left, #43B9FF , #525FFF);
    padding: 0 30px;
    color: white;
  }
</style>
<template>
  <div class="page fixed">
    <section class="page-main">
      <scroll-wrapper ref="scroll"
                      :scrollbar="scrollbarObj"
                      :pullDownRefresh="pullDownRefreshObj"
                      :pullUpLoad="pullUpLoadObj"
                      :startY="0"
                      @pullingDown="onRefreshPage"
                      @pullingUp="onPullingUp"
      >
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
                    placeholder="请输入工号搜索"
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
          <mt-tab-container-item id="creditCard">
            <ul class="order-tabbar">
              <li v-for="item in creditOrderBars" :class="activeState == item.index && 'actived'" @click="filter(item)">{{item.text}}</li>
            </ul>

            <p class="notice">
              说明：该明细为用户进行信用卡申请页面时的浏览记录，不能视为信用卡申请订单。
            </p>
            <section class="order-list">
              <ul class="order-ul" v-if="creditOrderList.length">
                <li v-for="(item , index) in creditOrderList">
                  <div class="title">{{item.productName}}</div>
                  <label><i class="iconkehuziliao iconfont"></i>{{item.employeeNo === user.employeeNo? '自己': '客户'}}</label>
                  <p>申请人：{{item.realName}} (工号：{{item.employeeNo}})</p>
                  <p>手机号：{{item.mobile}}</p>
                  <p>浏览时间：{{item.createdDate}}</p>
                  <section v-if="activeState !== 6">
                    <mt-button size="small" v-if="activeState !== 2" class="mini" @click="move(item, 2)">移至待再查</mt-button>
                    <mt-button size="small" class="mini" @click="move(item, 6)">移至回收站</mt-button>
                    <!--<mt-button size="small" class="mini">查询进度</mt-button>-->
                  </section>
                </li>
              </ul>
              <div class="no-data-view" v-if="noData">
                <img class="no-data-icon" src="../../assets/img/icon_empty_logo.png">
                <p>暂无数据</p>
              </div>
            </section>
          </mt-tab-container-item>
          <mt-tab-container-item id="debitCard">
           借记卡内容 -- 待做
          </mt-tab-container-item>
          <mt-tab-container-item id="loans">
            321
          </mt-tab-container-item>
      </mt-tab-container>
        <div style="text-align: center; margin-top: 60px;">
          <p>全国统一客服热线：0755-********</p>
          <p>商务合作：marketing@***.com</p>
          <p>copyright@2019-2020 ***.All Rights Reserved</p>
        </div>
      </scroll-wrapper>
    </section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Toast } from 'mint-ui'
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
    data () {
      return {
        orderAmount: 10,
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
        scrollbarObj: Object.freeze({
          fade: true
        }),
        pullDownRefreshObj: Object.freeze({
          threshold: 90,
          stop: 40
        }),
        pullUpLoadObj: Object.freeze({
          threshold: 0,
          txt: { more: '加载更多', noMore: `没有更多` }
        }),
        // 信用卡订单的翻页参数
        status: 1, // 状态值：1=待确认，2=待再查，3=待审核，4=已完成，5=未通过，6=回收站
        currentPage: 1, // 当前页
        noMore: false,
        noData: false,
        creditOrderList: [] // 信用卡订单
      }
    },
    methods: {
      search() {
        console.log('search', this.searchKey)
        this.onRefreshPage()
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
      onRefreshPage(timeNum) {
        // 模拟更新数据
        this.pullingDownTimer && clearTimeout(this.pullingDownTimer)
        this.pullingDownTimer = setTimeout(() => {
          console.log('pulling down and refresh page')
          this.currentPage = 1
          this.noMore = false
          this.fetchOrderList(this.currentPage, (res) => {
            console.log('pulling down and refresh page')
            let list = res.data && res.data.items || []
            if (!list.length) {
              // 页面空白,显示【暂无数据】
              this.noData = true
              this.creditOrderList.length = 0
              this.$refs.scroll.forceUpdate()
            } else {
              this.noData = false
              this.$refs.scroll.forceUpdate(true)
              this.creditOrderList.length = 0
              this.creditOrderList = this.creditOrderList.concat(list)
            }
          })
        }, timeNum || 100)
      },
      onPullingUp() {
        // 下一页数据
        if (this.noData || this.noMore) {
          this.$refs.scroll.forceUpdate(false) // 显示没有更多
          return
        }
        this.fetchOrderList(++this.currentPage, (res) => {
          let list = res.data && res.data.items && res.data.items.length || []
          console.log('this ', list.length, this.limit)
          if (list.length < this.limit) {
            // 展示【没有更多数据】
            this.noMore = true
            this.$refs.scroll.forceUpdate(false) // 显示没有更多
            return
          }
          this.$refs.scroll.forceUpdate(true)
          this.creditOrderList = this.creditOrderList.concat(list)
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
          status: this.status,
          filters: filter
        }, {
          limit: this.limit,
          pageNum: currentPage
        }, (res) => {
          callback && callback(res)
        })
        this.$refs.scroll.forceUpdate(false) // 显示没有更多
      },
      filter(item) {
        this.status = this.activeState = item.index
        this.searchKey = ''
        this.onRefreshPage()
      }
    },
    created() {
      this.status = this.$route.query.status || 1
      this.$nextTick(() => {
        this.onRefreshPage(500)
      })
    },
    mounted() {
      orderAPI.count((res) => {
        this.orderAmount = res.data.totalCount
      })
    }
  }
</script>
