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
      position: relative;
      .no-data-icon{
        text-align: center;
        position: relative;
        margin-top: 30px;
        img{
          width: 150px;
          height: 150px;
        }
        p{
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
              button {
                border: none;
                background: none;
                display: block;
                span {
                  line-height: 1.8;
                  display: block;
                  text-align: center;
                }
              }
              a {
                display: block;
                color: black;
                span {
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
          .active {
            height: 45px !important;
            border-top: 1px solid $color1;
          }
        }
      }
      .load {
        text-align: center;
        padding-bottom: 10px;
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
        <div v-if="$route.query.level !== 1 && $route.query.level !== 2 && $route.query.level !== 3">
          <p>团队业绩（个）</p>
          <h2>{{ pageData.orderCount }}</h2>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="search">
        <mt-field placeholder="请输入工号搜索" v-model="retrieve"></mt-field>
        <mt-button size="small" @click="search"> 搜索</mt-button>
      </div>
      <ul>
        <li v-for="(val, key) in pageList">
          <div class="user-msg">
            <div class="user-img">
              <img :src="val.headImgURL || defUserImg" alt="">
            </div>
            <div class="text">
              <p>姓名：{{ val.displayName }}</p>
              <p>手机：{{ val.mobile }}</p>
              <p>加入时间：{{ val.createdDate | timeAuto }}</p>
              <p>UID： {{ val.employeeNo}}</p>
            </div>
            <div v-if="$route.query.level == 2 && val.direct" class="ztui"><span>直推</span></div>
            <div v-if="$route.query.level !== 2" class="ztui"><span>{{ val.actived == 1 ? '活跃':'不活跃' }}</span></div>
          </div>
          <div class="user-lxfs">
            <div class="img-ku">
              <button type="button" :class="'copy' + key" :data-clipboard-text="val.weixinAccountNo">
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
            <template v-if="$route.query.level !== 1">
            <div class="jindu" v-if="inKey === key" @click="inKey = null">
              <p style="padding: 16px 0">收起 <span class="mintui mintui-back"></span></p>
            </div>
            <div class="jindu" v-else @click="inKey = key">
              <p style="padding: 16px 0">{{ $route.query.level === '2'? '查看转正进度': '查看团队详情' }} <span class="mintui mintui-back"></span></p>
            </div></template>
          </div>
          <template v-if="$route.query.level !== 1">
          <div v-if="$route.query.level == 2" class="xiala" :class="inKey === key? 'active' : ''">
              <div>转正任务 <p>{{ val.taskCount }}</p></div>
              <div>锁粉数 <p>{{ val.customerCount }}</p></div>
              <div>
                <p>转正进度</p>
                <mt-progress style="height: 5px" :value="Number(val.progress)" :bar-height="5"></mt-progress>
              </div>
          </div>
          <div v-else class="xiala" :class="inKey === key? 'active' : ''">
            <div><p>客户数</p><span>{{ val.customerCount }}</span></div>
            <div><p>团队数</p><span>{{ val.teamCount }}</span></div>
            <div><p>实习数</p><span>{{ val.probationCount }}</span></div>
            <div><p>业务数</p><span>{{ val.orderCount }}</span></div>
          </div>
          </template>
        </li>
      </ul>
      <div class="no-data-icon" v-if="noData">
        <img src="../../assets/img/icon_empty_logo.png">
        <p>暂无数据</p>
      </div>
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
        loadList: true,
        retrieve: '',
        teamName: '',
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
          limit: 3
        },
        inKey: null,
        jindu: false
      }
    },
    methods: {
      getData(fn, search) {
        userAPI.teamFindPaged({category: this.$route.query.level}, this.page, (res) => {
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

      }
    },
    filters: {
      timeAuto: function (val) {
        return moment(Number(val)).format('YYYY-MM-DD')
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
      this.getData((list) => {
        if (list.length === 0) {
          this.noData = true
        } else {
          this.noData = false
        }
        this.pageList.forEach((val, key) => {
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
      })
    }
  }
</script>

