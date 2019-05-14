<style scoped lang="scss">
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .detailed {
    .head {
      color: white;
      text-align: center;
      padding: 20px;
      background: linear-gradient(to top, $color2, $color3);
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
            border-left: 1px solid #ff7777;
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
      .tabbar {
        margin-top: 10px;
        background: white;
        width: 100%;
        .tabbar-content {
          display: flex;
          padding: 0 10px;
          flex-wrap: wrap;
          span {
            width: 60px;
            padding: 3px;
            margin: 5px;
            border-radius: 5px;
            border: 1px solid red;
            display: block;
            text-align: center;
          }
          .active {
            background: linear-gradient(to left, $color2, $color3);;
            color: white;
            border: none;
          }

        }

      }
      position: relative;
      .no-data-icon {
        text-align: center;
        position: relative;
        margin-top: 30px;
        p {
          margin-top: 20px;
          color: $color1;
        }
      }
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
          border-radius: 5px;
          margin-top: 20px;
          &:nth-child(1) {
            margin-top: 10px;
          }
          padding: 10px 10px 0 10px;
          .user-msg {
            border-bottom: 1px solid $fgxian;
            display: flex;
            .user-img {
              flex: 0 0 80px;
              img {
                max-width: 100%;
                height: auto;
                display: block;
                border-radius: 50%;
              }
              p {
                padding: 10px 0;
                color: $gray;
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
            padding: 5px 0;
            justify-content: space-between;
            .img-ku {
              position: relative;
              display: flex;
              justify-content: center;
              flex: 1;
              align-items: center;
              &:before{
                display: block;
                content: ' ';
                position: absolute;
                width: 1px;
                background-color: $fgxian;
                height: 22px;
                right: 0;
                top: 15px;
              }
              .wecher {
                align-items: center;
                border: none;
                background: none;
                display: flex;
                span {
                  line-height: 1.8;
                  display: block;
                  text-align: center;
                }
              }
              a {
                align-items: center;
                display: flex;
                color: black;
                span {
                  line-height: 1.8;
                  display: block;
                  text-align: center;
                }
              }
              img {
                margin: 0 5px;
                width: 16px;
                height: 16px;
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
            height: 0;
            overflow: hidden;
            transition: height .3s;
            display: flex;
            padding-top: 5px;
            color: $gray;
            div {
              &:nth-child(3):before{
                display: none;
              }
              &:before{
                display: block;
                content: ' ';
                position: absolute;
                width: 1px;
                background-color: $fgxian;
                height: 22px;
                right: 0;
                top: 10px;
              }
              text-align: center;
              flex: 1;
              padding: 0 5px;
              position: relative;
              p {
                color: $textColor1;
                line-height: 1.5;
                font-size: 20px;
              }
            }
          }
          .active {
            height: 50px !important;
            border-top: 1px solid $fgxian;
          }
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
        <div v-if="$route.query.level === 5 || $route.query.level === 4">
          <p>团队业绩（个）</p>
          <h2>{{ pageData.orderCount }}</h2>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="search">
        <mt-field placeholder="请输入ID搜索" v-model="retrieve">
          <mt-button size="small" @click="search"> 搜索</mt-button>
        </mt-field>
      </div>
      <div class="tabbar">
        <!--1=信用卡，2=借记卡，3=贷款，4=保险，5=理财-->
        <!--<div class="tabbar-content">-->
        <!--<span @click="bankType('')" :class="type===''?'active': ''">全部</span>-->
        <!--<span @click="bankType('1')" :class="type==='1'?'active': ''">信用卡</span>-->
        <!--<span @click="bankType('2')" :class="type==='2'?'active': ''">借记卡</span>-->
        <!--<span @click="bankType('3')" :class="type==='3'?'active': ''">贷款</span>-->
        <!--<span @click="bankType('4')" :class="type==='4'?'active': ''">保险</span>-->
        <!--<span @click="bankType('5')" :class="type==='5'?'active': ''">理财</span>-->
        <!--</div>-->
      </div>
      <ul>
        <li v-for="(val, key) in pageList">
          <div class="user-msg">
            <div class="user-img">
              <img :src="val.headImgURL || defUserImg" alt="" width="60px" height="60px">
              <p>ID： {{ val.employeeNo}}</p>
            </div>
            <div class="text">
              <p>姓名：{{ val.displayName }} ({{ val.realName|nameXXX }})</p>
              <p>手机：{{ val.mobile | mobileXXX }}</p>
              <p>加入时间：{{ val.createdDate | timeAuto }}</p>
            </div>
            <div v-if="$route.query.level === 2 && val.direct" class="ztui"><span>直推</span></div>
            <div v-if="$route.query.level !== 2" class="ztui"><span>{{ val.actived == 1 ? '活跃':'不活跃' }}</span></div>
          </div>
          <div class="user-lxfs">
            <div class="img-ku">
              <div class="wecher" v-if="val.weixinQRCodeURL || val.weixinAccountNo"
                   @click="openWeCher(val.weixinQRCodeURL, val.weixinAccountNo, val.displayName)">
                <img src="../../assets/img/weixin.png" alt="">
                <span>微信</span>
              </div>
              <div class="wecher" v-else>
                <img src="../../assets/img/weixin_on.png" alt="">
                <span>微信</span>
              </div>
            </div>
            <div class="img-ku">
              <a :href="'tel:'+val.mobile" v-if="val.mobile">
                <img src="../../assets/img/shouji.png" alt="">
                <span>电话</span>
              </a>
              <a href="javascript:void(0);" v-else>
                <img src="../../assets/img/shouji_on.png" alt="">
                <span>电话</span>
              </a>
            </div>
            <template v-if="Number($route.query.level) !== 1">
              <div class="jindu" v-if="inKey === key" @click="inKey = null">
                <p style="padding: 16px 0">收起 <span class="mintui mintui-back"></span></p>
              </div>
              <div class="jindu" v-else @click="inKey = key">
                <p style="padding: 16px 0">{{ Number($route.query.level) === 2? '查看转正进度': '查看团队详情' }} <span
                  class="mintui mintui-back"></span></p>
              </div>
            </template>
          </div>
          <template v-if="Number($route.query.level) !== 1">
            <div v-if="Number($route.query.level) === 2" class="xiala" :class="inKey === key? 'active' : ''">
              <div>转正任务 <p>{{ val.taskCount }}</p></div>
              <div>锁粉数 <p>{{ val.customerCount }}</p></div>
              <div>
                转正进度
                <mt-progress style="height: 5px;margin-top: 5px" :value="Number(val.progress)" :bar-height="5"></mt-progress>
              </div>
            </div>
            <div v-if="Number($route.query.level) > 2" class="xiala" :class="inKey === key? 'active' : ''">
              <div>客户数<p>{{ val.customerCount }}</p></div>
              <div>团队数<p>{{ val.teamCount }}</p></div>
              <div>实习数<p>{{ val.probationCount }}</p></div>
              <div>业务数<p>{{ val.orderCount }}</p></div>
            </div>
          </template>
        </li>
      </ul>
      <div class="no-data-icon" v-if="noData">
        <img src="../../assets/img/icon_empty_logo.png">
        <p>暂无数据</p>
      </div>
      <add-wechat :open="ISopen" :user-name="userName" v-model="ISopen" :weChatImg="weixinQRCodeURL" :weChatName="weixinAccountNo"/>
      <div class="load" v-if="loadList">
        <p @click="load">加载更多</p>
      </div>
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
        userName: '',
        ISopen: false,
        weixinQRCodeURL: '',// 点击当前的item的微信头像
        weixinAccountNo: '', // 点击当前的item的微信名
        loadList: true,
        retrieve: '',
        teamName: '',
        type: '',
        noData: false,
        pageData: {
          customerCount: 0, // 客户数
          monthCount: 0, // 本月新增
          yesterdayCount: 0, // 昨日新增
          taskCount: 0, // 转正任务数
          orderCount: 0 // 团队业绩
        },
        defUserImg: defUserImg,
        pageList: [],
        page: {
          pageNum: 1,
          limit: 10
        },
        inKey: null,
        jindu: false
      }
    },
    methods: {
      getData(fn, search) {
        userAPI.teamFindPaged({category: this.$route.query.level, catalog: this.type}, this.page, (res) => {
          this.pageList.push(...res.data.items)
          if (res.data.items.length === this.page.limit) {
            this.loadList = true
          } else if (res.data.items.length < this.page.limit) {
            this.loadList = false
          }
          if (typeof fn === 'function') {
            fn(res.data.items)
          }
        }, search)
      },
      bankType(type) {
        this.pageList = []
        this.type = type
        this.getData((list) => {
          if (list.length === 0) {
            this.noData = true
          } else {
            this.noData = false
          }
        })
      },
      load() {
        // 下一页数据
        this.page.pageNum++
        this.getData()
      },
      // 搜索
      search() {
        if (!this.retrieve) {
          this.pageList = []
          this.getData()
          this.noData = false
        } else {
          this.page.pageNum = 1
          this.pageList = []
          let a = [{property: '_member.employeeNo', value: this.retrieve}]
          this.getData((list) => {
            if (list.length === 0) {
              this.noData = true
            } else {
              this.noData = false
            }
          }, a)
        }

      },
      openWeCher(url, name, username) {
        this.weixinQRCodeURL = url
        this.weixinAccountNo = name
        this.userName = username
        this.ISopen = true
      }
    },
    filters: {
      timeAuto: function (val) {
        return moment(Number(val)).format('YYYY-MM-DD')
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
    created() {
      JSON.parse(sessionStorage.level).forEach(val => {

      })
      console.log('level', this.$route.query.level)
      JSON.parse(sessionStorage.level).forEach(val => {
        if (val.value === this.$route.query.level) {
          this.teamName = val.label
        }
      })
      userAPI.statsCount({category: this.$route.query.level}, res => {
        this.pageData = res.data
      })
      this.getData((list) => {
        if (list.length === 0) {
          this.noData = true
        } else {
          this.noData = false
        }
      })
    }
  }
</script>

