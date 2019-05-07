<style scoped lang="scss">
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .detailed {
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
        div {
          flex: 1;
          h2 {
            padding: 0;
            margin-top: 10px;
            border-left: 1px solid $color1;
          }
          &:nth-child(1) {
            h2 {
              border-left: none;
            }
          }
        }
      }
    }
    .body {
      .search {
        .retrieve {
          align-items: center;
          display: flex;
          background: #ff562f;
          padding: 0 10px;
          .mint-cell {
            flex: 1 0 auto;
          }
        }
      }
      ul {
        padding: 0 10px;
        li {
          background-color: white;
          border-radius: 10px;
          margin-top: 20px;
          padding: 10px 10px 0 10px;
          .user-msg {
            border-bottom: 1px solid $color1;
            display: flex;
            .user-img {
              flex: 0 0 80px;
              img {
                max-width: 100%;
                height: auto;
                display: block;
                border-radius: 50%;
              }
            }
            .text {
              flex: 1;
              padding: 0 5px;
              p {
                padding-bottom: 5px;
                color: $color1;
              }
            }
            .ztui {
              span {
                display: block;
                padding: 2px 15px;
                color: white;
                background: url("../../assets/img/daisq.png") center no-repeat;
                background-size: contain;
              }
            }
          }
          .user-lxfs {
            display: flex;
            padding: 10px 0;
            justify-content: space-between;
            .img-ku {
              display: flex;
              justify-content: center;
              flex: 1;
              align-items: center;
              button{
                border: none;
                background: none;
                display: block;
                span{
                  line-height: 1.8;
                  display: block;
                  text-align: center;
                }
              }
              a{
                display: block;
                color: black;
                span{
                  line-height: 1.8;
                  display: block;
                  text-align: center;
                }
              }
              img {
                margin: 0 5px;
                width: 25px;
                height: 25px;
                display: block;
              }
            }
            .jindu {
              flex: 1;
              color: #26a2ff;
              text-align: center;
              span {
                display: inline-block;
                transform: rotateZ(-180deg);
              }
            }
          }
          .xiala {
            box-sizing: border-box;
            position: relative;
            height: 0px;
            overflow: hidden;
            transition: height .3s;
            display: flex;
            padding-top: 5px;
            div {
              text-align: center;
              flex: 1;
              p {
                line-height: 1.5;
              }
            }
          }
          .active{
            height: 45px!important;
            border-top: 1px solid $color1;
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .detailed {
    .body {
      .search {
        padding: 0 10px;
        background: white;
        display: flex;
        align-items: center;
        a {
          flex: 1;
        }
        button {
          background: linear-gradient(to left, #FF7777, #FF2521);
          padding: 0 20px;
          color: white;
        }
      }
    }
  }
</style>
<template>
  <div class="page detailed">
    <div class="head">
      <p>{{ teamName }}数量（人）</p>
      <h2>{{ pageData.customerCount }}</h2>
      <div class="mx">
        <div>
          <p>本月新增（人）</p>
          <h2>{{ pageData.monthCount }}</h2>
        </div>
        <div>
          <p>昨日新增（个）</p>
          <h2>{{ pageData.yesterdayCount }}</h2>
        </div>
        <div v-if="$route.query.level !== 2">
          <p>团队业绩（个）</p>
          <h2>{{ pageData.orderCount }}</h2>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="search">
        <mt-field placeholder="请输入工号搜索" v-model="search"></mt-field>
        <mt-button size="small"> 搜索</mt-button>
      </div>
      <ul>
        <li v-for="(val, key) in pageLiat">
          <div class="user-msg">
            <div class="user-img">
              <img :src="val.headImgURL || defUserImg" alt="">
            </div>
            <div class="text">
              <p>{{ val.displayName }}</p>
              <p>{{ val.mobile }}</p>
              <p>加入时间：{{ val.createdDate | timeAuto }}</p>
              <p>UID： {{ val.employeeNo}}</p>
            </div>
            <div class="ztui"><span>直推</span></div>
          </div>
          <div class="user-lxfs">
            <div class="img-ku">
              <button  type="button" :class="'copy' + key" :data-clipboard-text="val.weixinAccountNo">
                <img src="../../assets/img/weixin.png" alt="">
                <span>微信</span>
              </button>
            </div>
            <div class="img-ku">
              <a :href="'tel:'+val.mobile">
                <img src="../../assets/img/shouji.png" alt="">
                <span>电话</span>
              </a>
            </div>
            <div class="jindu" v-if="inKey === key" @click="inKey = null">
              <p>收起 <span class="mintui mintui-back"></span></p>
            </div>
            <div class="jindu" v-else @click="inKey = key">
              <p>查看转正进度 <span class="mintui mintui-back"></span></p>
            </div>
          </div>
          <div class="xiala" :class="inKey === key? 'active' : ''">
            <div>转正任务 <p>{{ val.taskCount }}</p></div>
            <div>锁粉数 <p>{{ val.customerCount }}</p></div>
            <div>
              <p>转正进度</p>
              <mt-progress style="height: 5px" :value="Number(val.progress)" :bar-height="5"></mt-progress>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import userAPI from '../../api/userAPI'
  import {Toast} from 'mint-ui'
  import defUserImg from '../../assets/img/new_img/user/iocn/user.png'

  export default {
    name: 'team_detailed',
    data() {
      return {
        teamName: '',
        pageData: {
          customerCount: 0, // 客户数
          monthCount: 0, // 本月新增
          yesterdayCount: 0, // 昨日新增
          taskCount: 0, // 转正任务数
          orderCount: 0 // 团队业绩
        },
        search: '',
        defUserImg: defUserImg,
        pageLiat: [
          {
            id: '1', // 用户Id
            displayName: '王可可', // 微信昵称
            employeeNo: '12563', // 工号
            headImgURL: 'http://thirdwx.qlogo.cn/mmopen/ey4onjt5WiaepYWINm4dn5ib6YkbpHZbWKh5Exia8RFsIEhtLebQNGteRwbSWkxNyuer6RCpC4Xkb1jQVibS4ypx1e8iaCgOsqP3p/132', // 头像
            weixinAccountNo: '48569', // 微信号
            mobile: '123456', // 手机号
            realName: '神将', // 真实名称
            createdDate: '1556850630000', // 加入时间
            taskCount: '2', // 转正任务数
            customerCount: '15', // 客户数/锁粉数
            progress: '65', // 转正进度
            orderCount: '10', // 业务数
            teamCount: '4', // 团队数
            probationCount: '3' // 实习数
          },
          {
            id: '2', // 用户Id
            displayName: '王可可1', // 微信昵称
            employeeNo: '125634', // 工号
            headImgURL: 'http://thirdwx.qlogo.cn/mmopen/ey4onjt5WiaepYWINm4dn5ib6YkbpHZbWKh5Exia8RFsIEhtLebQNGteRwbSWkxNyuer6RCpC4Xkb1jQVibS4ypx1e8iaCgOsqP3p/132', // 头像
            weixinAccountNo: '485695', // 微信号
            mobile: '1234576', // 手机号
            realName: '神将8', // 真实名称
            createdDate: '1556850630000', // 加入时间
            taskCount: '25', // 转正任务数
            customerCount: '156', // 客户数/锁粉数
            progress: '35', // 转正进度
            orderCount: '101', // 业务数
            teamCount: '44', // 团队数
            probationCount: '35' // 实习数
          },
          {
            id: '16', // 用户Id
            displayName: '王可45可', // 微信昵称
            employeeNo: '125643', // 工号
            headImgURL: 'http://thirdwx.qlogo.cn/mmopen/ey4onjt5WiaepYWINm4dn5ib6YkbpHZbWKh5Exia8RFsIEhtLebQNGteRwbSWkxNyuer6RCpC4Xkb1jQVibS4ypx1e8iaCgOsqP3p/132', // 头像
            weixinAccountNo: '468569', // 微信号
            mobile: '1234756', // 手机号
            realName: '神将88', // 真实名称
            createdDate: '1556850630000', // 加入时间
            taskCount: '27', // 转正任务数
            customerCount: '157', // 客户数/锁粉数
            progress: '15', // 转正进度
            orderCount: '104', // 业务数
            teamCount: '45', // 团队数
            probationCount: '36' // 实习数
          },
          {
            id: '11', // 用户Id
            displayName: '王可可57', // 微信昵称
            employeeNo: '1256773', // 工号
            headImgURL: 'http://thirdwx.qlogo.cn/mmopen/ey4onjt5WiaepYWINm4dn5ib6YkbpHZbWKh5Exia8RFsIEhtLebQNGteRwbSWkxNyuer6RCpC4Xkb1jQVibS4ypx1e8iaCgOsqP3p/132', // 头像
            weixinAccountNo: '4788569', // 微信号
            mobile: '12387456', // 手机号
            realName: '神7将', // 真实名称
            createdDate: '1556850630000', // 加入时间
            taskCount: '285', // 转正任务数
            customerCount: '175', // 客户数/锁粉数
            progress: '95', // 转正进度
            orderCount: '104', // 业务数
            teamCount: '4', // 团队数
            probationCount: '3' // 实习数
          }
        ],
        page: {
          pageNum: 1,
          limit: 10
        },
        inKey: null,
        jindu: false
      }
    },
    methods: {
      getData() {
        userAPI.teamFindPaged({category: this.$route.query.level}, this.page, (res) => {
          this.pageLiat.push(...res.data.items)
        })
      }
    },
    filters: {
      timeAuto: function (val) {
        return moment(Number(val)).format('YYYY-MM-DD HH:mm')
      }
    },
    created() {
      JSON.parse(sessionStorage.level).forEach(val => {
        if (val.value === this.$route.query.level) {
          this.teamName = val.label
        }
      })
      userAPI.statsCount({category: this.$route.query.level}, res => {
        this.pageData = res.data
      })
      this.pageLiat.forEach((val, key) => {
        let className = `.copy${key}`
        let clipboard1 = new this.clipboard(className);
        clipboard1.on('success', function (e) {
          Toast({
            message: '已成功复制微信号',
            position: 'top'
          })
          e.clearSelection();
        });
      })

      // this.getData()
    }
  }
</script>

