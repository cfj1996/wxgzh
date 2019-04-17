/**
* @desc 我的 - 个人中心
* @class   用户主页
* @author  Dennis Lei
* @date    19.04.01
*/

<style lang="scss" scoped rel="stylesheet/scss">
  @import "~@/assets/css/variable.scss";

  .page-main.user-center {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    > section {
      margin-top: 20px;
      &:first-child {
        margin-top: 0;
      }
    }
    .user-info {
      background: #fff;
      padding: 0 10px 0;
      position: relative;
      min-height: 80px;
      display: flex;
      background-image: linear-gradient(to right, $color2 -30%, $color3);
      color: #fff;

      .left-info {
        flex: 0 0 20%;
        position: relative;
        img {
          position: relative;
          display: block;
          width: 40px;
          height: 40px;
          margin: 0 auto;
          top: 50%;
          transform: translateY(-50%);
          background-color: #fff;
          border-radius: 40px;
        }
      }
      .center-info {
        flex: 0 0 40%;
        p {
          padding-left: 10px;
          &:first-child {
            margin-top: 18px;
          }
          &:last-child {
            margin-top: 12px;
          }
        }
      }
      .right-info {
        flex: 0 0 40%;

        p {
          position: relative;
          padding: 10px 10px 10px 20px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 16px 4px 4px 16px;
          background-image: linear-gradient(to right, $color2 -30%, $color3);
        }
      }
    }
    .vertical-group-nav {
      position: relative;
      padding: 20px 0;
      display: flex;
      flex-wrap: wrap;
      .item{
        flex: 0 0 25%;
        margin-bottom: 20px;
        padding: 10px 0;
        background-color: #fff;
      }
      .mint-tab-item-icon {
        width: px2rem(28);
        height: px2rem(28);
      }
    }

    .my-integral {
      margin-top: 20px;
      width: 100%;
      display: flex;

      > section {
        flex: 1;
        min-height: 40px;
        text-align: center;

        > div {
          background-color: #fff;
          height: 100%;
          padding: 10px 0;
          .iconfont {
            font-size: 12px;
          }
          p {
            margin-top: 6px;
            font-size: 16px;
            color: $color3;
          }

          &.left-cell {
            margin-left: 10px;
            margin-right: 5px;
          }
          &.right-cell {
            margin-left: 5px;
            margin-right: 10px;
          }
        }
      }
    }
    .badge-label {
      position: absolute;
      top: 0;
      left: 50%;
      display: block;
      min-width: 14px;
      margin-left: px2rem(8);
      padding: 1px 2px;
      font-size: 12px;
      border-radius: 12px;
      background-color: #c30911;
      color: #fff;
    }
  }
</style>

<template>
  <div class="page ">
    <div class="page-main user-center">
      <section class="user-info">
        <div class="left-info">
          <img :src="avater"/>
        </div>
        <div class="center-info">
          <p>{{identity.realName || ''}}</p>
          <p>UID {{user.employeeNo || ''}}</p>
        </div>
        <div class="right-info">
          <p>普通会员</p>
        </div>
      </section>

      <div class="my-integral">
        <section>
          <div class="left-cell">
            我的收入<i class="iconfont iconshouru" style="color: #e6a23c;"></i>
            <p>¥ {{integrantCount.exchangeableCount}}</p>
          </div>
        </section>
        <section>
          <div class="right-cell">
            我的团队<i class="iconfont icontuandui_keshi" style="color: #535BFF;"></i>
            <p>¥ {{integrantCount.exchangeableCount}}</p>
          </div>
        </section>
      </div>
      <div style="margin: 20px 10px; padding: 10px 0; background-color: #fff;text-align: center;">
        <h3 style="margin: 0 0 10px;">会员必读</h3>
        <p>推荐办卡须知</p>
      </div>

      <section class="my-order">
        <div class="mint-cell">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <mt-tabbar class="order-group-nav vertical-group-nav">
                <mt-tab-item class="item" id="1" @click.native="$router.push({path: '/order'})">
                  <img slot="icon" src="../../assets/img/icon_to_order.png">
                  <span>订单明细</span>
                  <label v-if="orderStatisticData.statecount0"
                         class="badge-label">{{orderStatisticData.statecount0}}</label>
                </mt-tab-item>
                <mt-tab-item class="item" v-if="level" id="2" @click.native="">
                  <img slot="icon" src="../../assets/img/shouzhi.png">
                  <span>收支明细</span>
                  <label v-if="orderStatisticData.statecount0"
                         class="badge-label">{{orderStatisticData.statecount0}}</label>
                </mt-tab-item>
                <mt-tab-item class="item" v-if="level" id="3" @click.native="">
                  <img slot="icon" src="../../assets/img/khgl.png">
                  <span>客户管理</span>
                  <label v-if="orderStatisticData.statecount0"
                         class="badge-label">{{orderStatisticData.statecount0}}</label>
                </mt-tab-item>
                <mt-tab-item class="item" v-if="level" id="4" @click.native="">
                  <img slot="icon" src="../../assets/img/sjbb.png">
                  <span>数据报表</span>
                  <label v-if="orderStatisticData.statecount0"
                         class="badge-label">{{orderStatisticData.statecount0}}</label>
                </mt-tab-item>
                <mt-tab-item class="item" v-if="level" id="5" @click.native="">
                  <img slot="icon" src="../../assets/img/yqhy.png">
                  <span>邀请好友</span>
                  <label v-if="orderStatisticData.statecount3"
                         class="badge-label">{{orderStatisticData.statecount3}}</label>
                </mt-tab-item>
                <mt-tab-item class="item" v-if="level" id="6" @click.native="">
                  <img slot="icon" src="../../assets/img/sqdl.png">
                  <span>代理授权</span>
                  <label v-if="orderStatisticData.statecount9"
                         class="badge-label">{{orderStatisticData.statecount9}}</label>
                </mt-tab-item>
                <mt-tab-item class="item" v-if="level" id="7" @click.native="">
                  <img slot="icon" src="../../assets/img/zshb.png">
                  <span>专属海报</span>
                  <label v-if="orderStatisticData.statecount9"
                         class="badge-label">{{orderStatisticData.statecount9}}</label>
                </mt-tab-item>
                <mt-tab-item class="item" id="8" @click.native="">
                  <img slot="icon" src="../../assets/img/xttz.png">
                  <span>专属客服</span>
                  <label v-if="orderStatisticData.statecount9"
                         class="badge-label">{{orderStatisticData.statecount9}}</label>
                </mt-tab-item>
                <mt-tab-item class="item" v-if="level" id="9" @click.native="">
                  <img slot="icon" src="../../assets/img/xttz.png">
                  <span>系统通知</span>
                  <label v-if="orderStatisticData.statecount9"
                         class="badge-label">{{orderStatisticData.statecount9}}</label>
                </mt-tab-item>
                <mt-tab-item class="item" v-if="level" id="10" @click.native="">
                  <img slot="icon" src="../../assets/img/pxxy.png">
                  <span>培训学院</span>
                  <label v-if="orderStatisticData.statecount9"
                         class="badge-label">{{orderStatisticData.statecount9}}</label>
                </mt-tab-item>
                <mt-tab-item class="item" v-if="level" id="11" @click.native="">
                  <img slot="icon" src="../../assets/img/bzzx.png">
                  <span>帮助中心</span>
                  <label v-if="orderStatisticData.statecount9"
                         class="badge-label">{{orderStatisticData.statecount9}}</label>
                </mt-tab-item>
                <mt-tab-item class="item" id="12" @click.native="">
                  <img slot="icon" src="../../assets/img/sz.png">
                  <span>设置</span>
                  <label v-if="orderStatisticData.statecount9"
                         class="badge-label">{{orderStatisticData.statecount9}}</label>
                </mt-tab-item>
              </mt-tabbar>
            </div>
          </div>
        </div>
      </section>

      <div style="text-align: center; margin-top: 20px;">
        <p>全国统一客服热线：0755-********</p>
        <p>商务合作：marketing@***.com</p>
        <p>copyright@2019-2020 ***.All Rights Reserved</p>
      </div>
    </div>
    <bottom-menu></bottom-menu>
  </div>
</template>

<script>
  import {MessageBox, Toast} from 'mint-ui'
  import {mapState} from 'vuex'
  import BottomMenu from '@/pages/BottomMenu'
  import BzwDialog from '../../components/dialog/BzwDialog'
  import avater from '../../assets/img/wx-zone.png'

  export default {
    name: 'UserCenter',
    components: {
      BottomMenu,
      BzwDialog
    },
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {},
        identity: state => state.security && state.security.user && state.security.user.identity || {}
      }),
      level() {
        console.log(this.user.level === 1)
        return this.user.level !== 1
      }
    },
    data() {
      return {
        // avater: 'http://7xv6zz.com2.z0.glb.qiniucdn.com/20180104193451',
        avater: avater,
        integrantCount: {
          exchangeCount: 0, // 申请兑换的次数(累计申请兑换的总次数)
          exchangeableCount: '0.00', // 该店铺可兑换商品总数
          integralAccumulate: 0, // 累计获得积分 (总)
          integralAvailable: 0, // 可用积分
          integralFrozen: 0 // 冻结积分(已申请兑换商品所扣除的积分，商家暂未处理的)
        },
        orderStatisticData: {
          statecount0: 0, // 待付款状态订单数量
          statecount1: 0, // 取消状态订单数量
          statecount3: 0, // 待发货状态订单数量
          statecount9: 0, // 待收货状态订单数量
          statecount21: 0, // 已完成状态订单数量
          statecount40: 0// 退货状态订单数量
        },
        // isPartner: true // 是否是合伙人
        userInfo: {}
      }
    },
    methods: {},
    mounted() {
    }
  }
</script>

