/*
* @class   代理授权
* @author  Dennis Lei
* @date    19.04.15
*/

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/assets/css/variable.scss";

  .page-main {
    height: 100%;
    overflow: auto;
    margin-bottom: 0;

    .head {
      width: 100%;
      min-height: 60px;
      padding-top: 10px;

      /*background: -webkit-gradient(linear, 0 0, 0 100%, from(#535BFF), to(#41C2FF));*/
      background-image: linear-gradient(to right, $color2 -30%, $color3);
      color: #fff;

      .title {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
      }
      .amount {
        text-align: center;
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
        padding-bottom: 10px;
        border-bottom: 1px solid $color4;

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

          .mint-button {
            font-size: 12px;
            height: 20px;
            line-height: 20px;

            color: #fff;
            &.is-authorizing {
              background-image: linear-gradient(to right bottom, $color7 -30%, $color5);
            }
            &.is-authorized {
              background-image: linear-gradient(to right, $color2 -30%, $color3);
            }
            &.is-refused {
              background-image: linear-gradient(to right, $color2 -30%, $color3);
            }
          }
        }
        p {
          color: $color4;
          line-height: 20px;
        }
      }
    }
    .no-data-view {
      position: relative;
      min-height: 200px;
      text-align: center;
      img {
        width: 200px;
      }
      p {
        padding-top: 10px;
      }
    }
  }

  .authorization-popup {
    width: 100%;
    padding: 10px 10px;
    .head {
      font-size: 18px;
      font-weight: bold;
      color: $color7;
    }
    .base-info {
      margin-top: 20px;
      padding-bottom: 10px;
      display: flex;
      border-bottom: 1px solid $color6;

      li {
        &:first-child {
          flex: 0 0 20%;
          text-align: center;
          img {
            width: 80%;
          }
        }
        &:last-child {
          flex: 0 0 80%;
          .title {
            color: #000;
            margin-bottom: 10px;
            margin-top: 4px;
          }
          p {
            color: $color4;
            line-height: 20px;
          }
        }
      }
    }
    .contact-info {
      display: flex;
      li {
        flex: 0 0 50%;
        text-align: center;
        line-height: 40px;
        height: 40px;

        .iconfont {
          font-size: 16px;
        }
      }
    }
    .bottom-button {
      display: flex;
      .mint-button {
        &:first-child {
          border: 1px solid $color2;
          border-radius: 4px 0 0 4px;
          color: $color2;
        }
        &:last-child {
          border: none;
          border-radius: 0 4px 4px 0;
          color: #fff;
          background-image: linear-gradient(to right, $color2 -30%, $color3);
        }
        flex: 0 0 50%;
      }
    }
  }

</style>
<style lang="scss" rel="stylesheet/scss">
  #app .page.fixed {
    position: fixed;
    bottom: 55px;
    left: 0;
    right: 0;
    top: 0;
  }
</style>
<template>
  <div class="page fixed">
    <div class="page-main">
      <div class="head">
        <p class="title">待授权订单</p>
        <p class="amount">{{orderAmount}}</p>
      </div>
      <div class="search-section">
        <mt-field class="employee-no"
                  placeholder="请输入工号搜索"
                  :attr="{maxlength: 12}"
                  v-model="searchKey">
        </mt-field>
        <div class="search-btn">
          <mt-button size="small" @click="search">查询</mt-button>
        </div>
      </div>
      <section class="order-list">
        <ul class="order-ul" v-if="authorizationList.length">
          <li v-for="(item , index) in authorizationList">
            <div class="title">{{item.approvalNo}}</div>
            <label>
              <div class="mint-button" @click="btnClick(item)" :disabled="item.status == 3"
                   :class="item.status > 2 ? 'is-refused' : item.status > 1 ? 'is-authorized' : 'is-authorizing'">
                {{item.status > 2 ? '已拒绝' : item.status > 1 ? '已授权' : '待授权'}}
              </div>
            </label>
            <p>用户昵称：{{item.displayName}}</p>
            <p>UID：{{item.employeeNo}}</p>
            <p>申请时间：{{item.submitDate}}</p>
            <p>授权状态：{{stateMateData[item.status]}}</p>
          </li>
        </ul>
        <div class="no-data-view" v-if="noData">
          <img class="no-data-icon" src="../../assets/img/icon_empty_logo.png">
          <p>暂无数据</p>
        </div>
      </section>
    </div>
    <mt-popup v-model="isVisiblePopup" position="bottom" class="authorization-popup">
      <p class="head">您的客户 真爱永恒 正在实习中</p>
      <ul class="base-info">
        <li>
          <img src="../../assets/img/wx-zone.png">
        </li>
        <li>
          <div class="title">真爱永恒</div>
          <div>UID：16690032</div>
          <br/>
          <div class="title">AGT201903181639289784792</div>
          <p>代理类型：青铜</p>
          <p>授权限状态：已授权</p>
          <p>申请时间：2019-03-18 16:39:29</p>
        </li>
      </ul>
      <ul class="contact-info">
        <li>
          <label>
            <i class="icondianhua iconfont" style="color: green;"></i>电话
          </label>
        </li>
        <li>
          <label>
            <i class="iconweixin iconfont" style="color: blueviolet;"></i>微信
          </label>
        </li>
      </ul>
      <div class="bottom-button">
        <mt-button>关闭</mt-button>
        <mt-button>授权</mt-button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {Toast} from 'mint-ui'
  import userAPI from '@/api/userAPI'
  import ScrollWrapper from '../../components/scrollWrapper/ScrollWrapper'

  export default {
    name: 'OrderIndex',
    components: {
      ScrollWrapper
    },
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {},
        identity: state => state.security && state.security.user && state.security.user.identity || {}
      })
    },
    data() {
      return {
        orderAmount: 10,
        limit: 10,
        searchKey: '',
        isVisiblePopup: false,
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
          txt: {more: '加载更多', noMore: `没有更多`}
        }),
        // 信用卡订单的翻页参数
        status: 1, // 状态值：1=待确认，2=待再查，3=待审核，4=已完成，5=未通过，6=回收站
        currentPage: 1, // 当前页
        noMore: false,
        noData: false,
        authorizationList: [{
          id: 1, // 审批id
          approvalNo: '3343432432432432', // 审批编号
          submitterId: '23', // 申请人id
          submitDate: '23', // 申请人Id
          approveId: '1785443', // 审批人id
          approveDate: '201-12-12', // 审批时间
          status: 1, // 审批状态：1=待审，2=通过，3=拒绝
          displayName: 'zhangsan', // 申请者昵称
          employeeNo: '4785443' // 申请者工号
        }],
        stateMateData: Object.freeze({
          1: '待审',
          2: '通过',
          3: '拒绝'
        })
      }
    },
    methods: {
      search() {
        console.log('search', this.searchKey)
        this.onRefreshPage()
      },
      btnClick(data) {
        this.isVisiblePopup = true
        if (data.status == 1) {
          this.isVisiblePopup = true
        }
        /* orderAPI.moveCreditCardOrder({
          status,
          id: data.id
        }, (res) => {
          let index = this.authorizationList.findIndex(item => item.id === data.id)
          this.authorizationList.splice(index, 1)
          Toast({
            message: '操作成功',
            position: 'top'
          })
        })*/
      },
      onRefreshPage(timeNum) {
        // 模拟更新数据
        this.pullingDownTimer && clearTimeout(this.pullingDownTimer)
        this.pullingDownTimer = setTimeout(() => {
          console.log('pulling down and refresh page')
          this.currentPage = 1
          this.noMore = false
          this.fetchAuthorizationList(this.currentPage, (res) => {
            console.log('pulling down and refresh page')
            let list = res.data && res.data.items || []
            if (!list.length) {
              // 页面空白,显示【暂无数据】
              this.noData = true
              this.authorizationList.length = 0
              this.$refs.scroll.forceUpdate()
            } else {
              this.noData = false
              this.$refs.scroll.forceUpdate(true)
              this.authorizationList.length = 0
              this.authorizationList = this.authorizationList.concat(list)
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
        this.fetchAuthorizationList(++this.currentPage, (res) => {
          let list = res.data && res.data.items && res.data.items.length || []
          console.log('this ', list.length, this.limit)
          if (list.length < this.limit) {
            // 展示【没有更多数据】
            this.noMore = true
            this.$refs.scroll.forceUpdate(false) // 显示没有更多
            return
          }
          this.$refs.scroll.forceUpdate(true)
          this.authorizationList = this.authorizationList.concat(list)
        })
      },
      fetchAuthorizationList(currentPage, callback) {
        let filter = []
        if (this.searchKey) {
          filter.push({
            property: '_member.employeeNo',
            value: this.searchKey
          })
        }
        userAPI.fetchAuthorizationList({
          filters: filter
        }, {
          limit: this.limit,
          pageNum: currentPage
        }, (res) => {
          callback && callback(res)
        })
        // this.$refs.scroll.forceUpdate(false) // 显示没有更多
      },
      filter(item) {
        this.searchKey = ''
        this.onRefreshPage()
      }
    },
    created() {
      this.$nextTick(() => {
        // this.onRefreshPage(500)
      })
    },
    mounted() {
    }
  }
</script>
