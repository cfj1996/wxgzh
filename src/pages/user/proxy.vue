<style scoped lang="scss">
  .page {
    overflow: hidden;
    .open {
      transform: translateY(0%) !important;
    }
    .foot {
      hr {
        border: 0;
        height: 1px;
        background-color: #7c868c;
      }
      .zhezao {
        transform-origin: bottom;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        background: #000;
        opacity: .5;
      }
      .diji {
        transform: translateY(100%);
        transition: all .5s;
        transform-origin: bottom;
        position: fixed;
        z-index: 9999;
        bottom: 0;
        left: 0;
        height: 50%;
        width: 100%;
        background: #fff;
        .f-title {
          p {
            margin: 0 10px;
            color: red;
            font-size: 18px;
          }
          display: flex;
          align-items: center;
          padding: 5px;
        }
        .f-cont {
          padding: 5px;
          display: flex;
          align-items: center;
          .f-cont-item2 {
            flex: 1 0 auto;
            border-bottom: 1px solid #7c868c;
            padding: 10px;
          }
          .img-bo {
            width: 60px;
            height: 60px;
            overflow: hidden;
            display: flex;
            align-items: center;
            img {
              max-width: 100%;
              height: auto;
              border-radius: 50%;
              display: block;
            }
          }
        }
        .f-yao {
          margin-left: 61px;
          padding: 5px;
          p {
            &:nth-child(1) {
              color: black;
              font-size: 16px;
            }
            margin-top: 5px;
            font-size: 14px;
            color: #6f6f6f;
          }
        ;
        }
        .f-btn {
          position: absolute;
          left: 0;
          padding: 0 10px;
          bottom: 10px;
          width: 100%;
          display: flex;
          text-align: center;
          font-size: 16px;
          line-height: 40px;
          height: 40px;
          div {
            flex: 1;
            border-radius: 5px;
          }
          .btn-out {
            color: #506cff;
            border: 1px solid #506cff;
            border-radius: 5px;

          }
          .btn-shq {
            color: #fff;
            background: linear-gradient(to left, #43B9FF, #525FFF);
          }
        }
      }
    }
    .title {
      padding: 25px 0 10px 0;
      font-size: 16px;
      color: white;
      text-align: center;
      background: linear-gradient(to left, #43B9FF, #525FFF);
    }
    .item {
      li {
        margin-top: 15px;
        background-color: white;
        padding: 10px;
        p {
          margin-top: 5px;
        }
        & > p {
          color: #7c868c;
        }
        .bhao {
          padding-bottom: 5px;
          font-size: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            color: white;
            font-size: 12px;
            width: 70px;
            height: 20px;
            line-height: 23px;
            text-align: center;
            display: block;
            background-size: cover;
          }
        }
        .status1 {
          background: url("../../assets/img/daisq.png") center no-repeat;
        }
        .status2 {
          background: url("../../assets/img/yisq.png") center no-repeat;

        }
        .status3 {

        }
      }
    }
  }
</style>
<style lang="scss">
  .bg-1 {
    background: linear-gradient(to left, #43B9FF, #525FFF);
    padding: 4px 30px;
    color: white;
  }

  .retrieve {
    align-items: center;
    display: flex;
    background: white;
    .mint-cell {
      flex: 1 0 auto;
      padding: 0 20px;
    }
  }
</style>
<template>
  <div class="page">
    <div class="title">带授权的订单 <p style="text-align: center">{{ order }}</p></div>
    <div class="retrieve">
      <mt-field placeholder="请输入工号检索" v-model="retrieve"></mt-field>
      <mt-button class="bg-1" @click="search">搜索</mt-button>
    </div>
    <scroll-wrapper ref="scroll"
                    :scrollbar="scrollbarObj"
                    :pullDownRefresh="pullDownRefreshObj"
                    :pullUpLoad="pullUpLoadObj"
                    :startY="0"
                    @pullingDown="onRefreshPage"
                    @pullingUp="onPullingUp">
      <ul class="item">
        <li v-for="val in dataList" @click="editor(val.id, val.status)">
          <div class="bhao"><p>{{ val.approvalNo }}</p> <span
            :class="'status'+val.status">{{ val.status | isStatus }}</span></div>
          <p>用户昵称: {{ val.displayName }}</p>
          <p>UID: {{ val.employeeNo }}</p>
          <p>申请时间：{{ val.submitDate | timeAuto }}</p>
          <p>授权限状态：{{ val.status | isStatus }}</p>
        </li>
      </ul>
    </scroll-wrapper>
    <div class="foot">
      <div class="zhezao" v-if="open" @click="open= false"></div>
      <div class="diji" :class="open ? 'open': '' ">
        <div class="f-title">
          <img src="../../assets/img/gingao.png" width="36" height="36" alt="">
          <p>你的客户 <b>{{listItem.displayName}}</b> 正在实习中！</p>
        </div>
        <hr>
        <div class="f-cont">
          <div class="img-bo">
            <img :src="listItem.headImgURL" alt="">
          </div>
          <div class="f-cont-item2">
            <p style="padding-bottom: 5px;font-size: 16px">{{listItem.displayName}}</p>
            <i style="font-size: 12px">UID: {{listItem.employeeNo}}</i>
          </div>
        </div>
        <div class="f-yao">
          <p>{{listItem.approvalNo}}</p>
          <p>代理类型:{{listItem.category}}</p>
          <p>授权限状态：{{listItem.status | isStatus}}</p>
          <p>申请时间：{{listItem.submitDate}}</p>
        </div>
        <div class="f-btn">
          <div class="btn-out" @click="open = false">关闭</div>
          <div class="btn-shq" @click="shouquan()">授权</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import proxyApi from '../../api/proxy'
  import ScrollWrapper from '../../components/scrollWrapper/ScrollWrapper'
  import moment from 'moment'
  import {Toast} from 'mint-ui';

  export default {
    name: 'proxy',
    components: {
      ScrollWrapper
    },
    data() {
      return {
        shouquanId: null,
        open: false,
        jiazai: true,
        order: null,
        dataList: [],
        listItem: {
          id: '',
          approvalNo: '',
          submitterId: '',
          displayName: '',
          employeeNo: '',
          weixinAccountNo: '',
          realName: '',
          mobile: '',
          category: 1,
          submitDate: '',
          status: '',
          headImgURL: ''
        },
        retrieve: '',
        fandou: false,
        page: {
          pageNum: 1,
          limit: 10,
          end: false
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
        })
      }
    },
    methods: {
      getData(fn, search) {
        proxyApi.findAgentPaged(this.page, (res) => {
          this.dataList.push(...res.data.items)
          if (typeof fn === 'function') {
            fn(res.data.items)
          }
        }, search)
      },
      onRefreshPage(timeNum) {
        // 模拟更新数据
        this.page.pageNum = 1
        this.dataList = []
        this.getData(() => {
          this.$refs.scroll.forceUpdate(true)
        })
      },
      onPullingUp() {
        // 下一页数据
        if (this.page.end || this.fandou) {
          this.$refs.scroll.forceUpdate(false)
          return
        }
        if (this.jiazai) {
          this.jiazai = false
          this.page.pageNum++
          this.getData((list) => {
            console.log('list', list)
            if (list.length < this.page.limit) {
              this.$refs.scroll.forceUpdate(false) // 显示没有更多
              this.page.end = true
              this.fandou = true
              return
            }
            this.$refs.scroll.forceUpdate(true)
            this.$refs.scroll.forceUpdate()
            this.jiazai = true
          })
        }
      },
      editor(id, stret) {
        if (stret === 2) {
          return
        }
        proxyApi.getAgentDetail({
          id
        }, (res) => {
          this.shouquanId = id
          this.open = true
          this.listItem = res.data
        })
      },
      shouquan() {
        proxyApi.aprvAgent({id: this.shouquanId, status: 2}, () => {
          Toast({
            message: '操作成功'
          });
          this.open = false
          this.onRefreshPage()
        })
      },
      search() {
        this.page.pageNum = 1
        this.dataList = []
        let a = [{ property: '_member.employeeNo', value: this.retrieve }]
        this.getData((list) => {
          if(list.length === 0){
            Toast({
              message: '未找到相关数据'
            })
          }
        }, a)
      }
    },
    filters: {
      isStatus: function (value) {
        if (value === 1) {
          return '待审'
        } else if (value === 2) {
          return '通过'
        }
        return '拒绝'
      },
      timeAuto: function (val) {
        return moment(Number(val)).format('YYYY-MM-DD h:mm')
      }
    },
    created() {
      this.getData()
    }
  }
</script>

