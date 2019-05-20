/**
* @desc 我的 - 个人中心
* @class   用户主页
* @author  Dennis Lei
* @date    19.04.01
*/

<style lang="scss" scoped rel="stylesheet/scss">
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .page-main.user-center {
    overflow-y: auto;
    height: calc(100% - 53px);
    > section {
      margin-top: 20px;
      &:first-child {
        margin-top: 0;
      }
    }
    .user-info {
      padding: 20px 10px;
      position: relative;
      display: flex;
      flex-wrap: wrap;
      background-color: #ff3f36;
      color: #fff;

      .left-info {
        flex: 0 0 20%;
        position: relative;
        div{
          background: no-repeat center;
          background-size: contain;
          height: 80px;
          width: 80px;
          border-radius: 50%;
        }
        img {
          position: relative;
          display: block;
          width: 80px;
          height: 80px;
          margin: 0 auto;
          top: 50%;
          transform: translateY(-50%);
          background-color: #fff;
          border-radius: 80px;
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
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        p {
          position: relative;
          padding: 6px 6px 6px 30px;
          display: inline-block;
          text-align: center;
          border: 1px solid #e3f5ff;
          border-radius: 16px;
          span {
            position: absolute;
            display: block;
            width: 40px;
            height: 40px;
            left: -10px;
            top: -5px;
          }
        }
      }
      .tidu {
        width: 100%;
        margin-top: 20px;
        position: relative;
        height: 40px;
        .xian {
          position: absolute;
          width: calc(80% - 10px);
          left: calc(10% + 5px);
          height: 1px;
          background-color: white;
          top: 23px;
          z-index: 888;
        }
        ul {
          z-index: 999;
          position: absolute;
          width: 80%;
          left: 10%;
          display: flex;
          justify-content: space-between;
          text-align: center;
          li {
            p {
              font-size: 12px;
              color: #e5e5e5;
            }
            span {
              margin: 0 auto;
              width: 22px;
              height: 22px;
              display: block;
            }
          }
        }
      }
    }
    .vertical-group-nav {
      position: relative;
      padding: 20px 0;
      display: flex;
      flex-wrap: wrap;
      .item {
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
    .my-shru {
      .title {
        padding: 15px 15px 10px 15px;
        font-size: 18px;
      }
    }
    .list {
      padding: 20px 15px;
      background: white;
      display: flex;
      flex-wrap: wrap;
      .ku {
        .bg-img{
          margin: 0 auto;
          width: 42px;
          height: 42px;
          background: no-repeat center;
          background-size: contain;
        }
        .bg1{
          background-image: url("~@/assets/img/new_img/user/iocn/mysq.png");
        }
        .bg2{
          background-image: url("~@/assets/img/new_img/user/iocn/ddmx.png");
        }
        .bg3{
          background-image: url("~@/assets/img/new_img/user/iocn/szmx.png");
        }
        .bg4{
          background-image: url("~@/assets/img/new_img/user/iocn/xttz.png");
        }
        .bg5{
          background-image: url("~@/assets/img/new_img/user/iocn/khgl.png");
        }
        .bg6{
          background-image: url("~@/assets/img/new_img/user/iocn/dlsq.png");
        }
        .bg7{
          background-image: url("~@/assets/img/new_img/user/iocn/yqhy.png");
        }
        .bg8{
          background-image: url("~@/assets/img/new_img/user/iocn/zshb.png");
        }
        .bg9{
           background-image: url("~@/assets/img/new_img/user/iocn/tjr.png");
         }
        .bg10{
           background-image: url("~@/assets/img/new_img/user/iocn/kf.png");
         }
        .bg11{
           background-image: url("~@/assets/img/new_img/user/iocn/hybu.png");
         }
        .bg12{
           background-image: url("~@/assets/img/new_img/user/iocn/help.png");
         }
        .bg13{
           background-image: url("~@/assets/img/new_img/user/iocn/set.png");
         }


        flex: 0 25%;
        position: relative;
        .is-info {
          position: absolute;
          right: 0;
          top: 0;
          color: white;
          display: inline-block;
          height: 15px;
          font-size: 12px;
          transform: scale(0.8);
        }
        img {
          width: 42px;
          height: 42px;
          display: block;
          margin: auto;
        }
        p {
          margin-top: 5px;
          font-size: 14px;
          text-align: center;
        }
        span {
          display: block;
          color: #ff3f36;
          font-size: 16px;
          text-align: center;
        }
      }

    }
  }
</style>

<template>
  <div class="page">
    <div class="page-main user-center">
      <section class="user-info">
        <div class="left-info" @click="$router.push('/inform_set')" v-if="permissions('USER_INFO', 'View')">
          <div :style="{backgroundImage: 'url('+ user.headImgURL || userImg +')'}"></div>
        </div>
        <div class="center-info">
          <p>{{ user.displayName || ''}}</p>
          <p>ID： {{user.employeeNo || ''}}</p>
        </div>
        <div class="right-info">
          <p><span :class="`level${user.level-1}`"></span>{{ userLevel}}</p>
        </div>
        <div class="tidu" v-if="user.level > 1">
          <ul>
            <li v-for="val in grade" v-if="val.value !== 1&&val.value !== 6&&val.value !== 7">
              <p :style="textLevel(val.value)">{{ val.label }}</p>
              <span :class="levelIcon(val.value-1)"></span>
              <div></div>
            </li>
          </ul>
          <div class="xian"></div>
        </div>
      </section>
      <div class="my-shru" v-if="permissions('FUND', 'General')">
        <p class="title">我的收入</p>
        <div class="list">
          <div class="ku" v-if="permissions('FUND', 'General')" @click="$router.push('/income')">
            <div class="bg-img bg1"></div>
            <!--<img src="../../assets/img/new_img/user/iocn/mysq.png" alt="">-->
            <p>我的收入</p>
            <span>￥{{integrantCount.exchangeableCount}}</span>
          </div>
          <div class="ku" v-if="permissions('ORDER', 'List')" @click="$router.push('/order')">
            <div class="bg-img bg2"></div>
            <!--<img src="../../assets/img/new_img/user/iocn/ddmx.png" alt="">-->
            <p>订单明细</p>
          </div>
          <div class="ku" v-if="permissions('FUND', 'General')" @click="$router.push('/income')">
            <div class="bg-img bg3"></div>
            <!--<img src="../../assets/img/new_img/user/iocn/szmx.png" alt="">-->
            <p>收支明细</p>
          </div>
          <div class="ku" v-if="permissions('NOTIFICATION', 'List')" @click="$router.push('/notice')">
            <div class="bg-img bg4"></div>
            <!--<img src="../../assets/img/new_img/user/iocn/xttz.png" alt="">-->
            <mt-badge v-if="Number(read) > 0" class="is-info" type="error" size="small">{{ read }}</mt-badge>
            <p>系统通知</p>
          </div>
        </div>
      </div>
      <div class="my-shru" v-if="permissions('CUSTOMER', 'General')">
        <p class="title">我的团队</p>
        <div class="list">
          <div class="ku" v-if="permissions('CUSTOMER', 'General')" @click="$router.push('/my_team')">
            <div class="bg-img bg5"></div>
            <!--<img src="../../assets/img/new_img/user/iocn/khgl.png" alt="">-->
            <p>客户管理</p>
            <span>{{ userInfo.count }}人</span>
          </div>
          <div class="ku" v-if="permissions('AGENT_AUTHZ', 'List')" @click="$router.push('/author_proxy')">
            <div class="bg-img bg6"></div>
            <!--<img src="../../assets/img/new_img/user/iocn/dlsq.png" alt="">-->
            <p>会员授权</p>
          </div>
        </div>
      </div>
      <div class="my-shru" >
        <p class="title">推广</p>
        <div class="list">
          <div class="ku" v-if="permissions('INVITATION', 'Invite')" @click="$router.push('/friends')">
            <div class="bg-img bg7"></div>
            <!--<img src="../../assets/img/new_img/user/iocn/yqhy.png" alt="">-->
            <p>邀请好友</p>
          </div>
          <div class="ku" v-if="permissions('SELF_POSTER', 'Agent')" @click="$router.push('/posters')">
            <div class="bg-img bg8"></div>
            <!--<img src="../../assets/img/new_img/user/iocn/zshb.png" alt="">-->
            <p>专属海报</p>
          </div>
          <div class="ku" v-if="permissions('RECOMMENDER', 'View')" @click="$router.push('/customer')">
            <div class="bg-img bg9"></div>
            <!--<img src="../../assets/img/new_img/user/iocn/tjr.png" alt="">-->
            <p>推荐人</p>
          </div>
          <div class="ku" v-if="permissions('CUSTOMER_SERVICE', 'View')" @click="$router.push('/mykefu')">
            <div class="bg-img bg10"></div>
            <!--<img src="../../assets/img/new_img/user/iocn/kf.png" alt="">-->
            <p>客服</p>
          </div>
        </div>
      </div>
      <div class="my-shru" v-if="permissions('AGENT_RULE', 'View')">
        <p class="title">资料</p>
        <div class="list">
          <div class="ku" v-if="permissions('AGENT_RULE', 'View')" @click="$router.push('/members_doc')">
            <div class="bg-img bg11"></div>
            <!--<img src="../../assets/img/new_img/user/iocn/hybu.png" alt="">-->
            <p>会员必读</p>
          </div>
          <div class="ku" v-if="permissions('HELP_CENTER', 'List')" @click="$router.push('/help')">
            <div class="bg-img bg12"></div>
            <!--<img src="../../assets/img/new_img/user/iocn/help.png" alt="">-->
            <p>帮助中心</p>
          </div>
          <div class="ku" v-if="permissions('SETTING', 'Weixin')" @click="$router.push('/user_set')">
            <div class="bg-img bg13"></div>
            <!--<img src="../../assets/img/new_img/user/iocn/set.png" alt="">-->
            <p>设置</p>
          </div>
        </div>
      </div>
      <div v-if="false" style="text-align: center; margin-top: 20px;color: #a4a4a4">
        <p>淘个卡</p>
        <br>
        <p>copyright@2019-2020 taogeka.All Rights Reserved</p>
        <br>
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
  import userAPI from '../../api/userAPI'
  import userDefImg from '../../assets/img/new_img/user/iocn/user.png'

  export default {
    name: 'UserCenter',
    components: {
      BottomMenu,
      BzwDialog
    },
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {},
        userPerm: state => state.security && state.security.userPerm || {},
        read: (state => state.security.read),
        identity: state => state.security && state.security.user && state.security.user.identity || {}
      }),
      level() {
        console.log(this.user.level)
        return this.user.level !== 1
      },
      userLevel() {
        let label = null
        this.grade.forEach((val) => {
          if (val.value === this.user.level) {
            label = val.label
          }
        })
        return label
      }
    },
    data() {
      return {
        userImg: userDefImg,
        grade: JSON.parse(sessionStorage.level),
        // avater: 'http://7xv6zz.com2.z0.glb.qiniucdn.com/20180104193451',
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
        userInfo: {
          count: 0
        }
      }
    },
    methods: {
      permissions(name, page) {
        if(this.userPerm[name] && this.userPerm[name][page] === 1){
          return true
        } else {
          return false
        }
      },
      levelIcon(level) {
        if (level !== this.user.level - 1) {
          return `level${level}-nh`
        } else {
          return `level${level}`
        }
      },
      textLevel(level) {
        if (level === this.user.level) {
          return {color: '#fff'}
        }
      }
    },
    mounted() {
      console.dir(this.userPerm)
      userAPI.userIncome((res) => {
        let a = Number(res.data.mineTotal) + Number(res.data.teamTotal)
        this.integrantCount.exchangeableCount = (a / 100).toFixed(2)
      })
      userAPI.userCustomer((res) => {
        this.userInfo.count = res.data.count
      })
    }
  }
</script>

