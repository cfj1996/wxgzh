<style scoped lang="scss">
  @import "~@/assets/css/variable.scss";
  @import "../../assets/css/common";

  .page {
    .no-data-icon {
      text-align: center;
      position: relative;
      top: 40%;
      transform: translateY(-50%);
      img {
        width: 150px;
        height: 150px;
      }
      p {
        margin-top: 20px;
        color: $color1;
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
    /*overflow: hidden;*/
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
        z-index: 1999;
        bottom: 0;
        left: 0;
        height: calc(40% + 40px);
        width: 100%;
        background: #fff;
        .f-title {
          border-bottom: 1px solid $fgxian;
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
            border-bottom: 1px solid $fgxian;
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
        }
        .foot {
          position: relative;
          width: 100%;
          height: 54px;
          padding: 10px;
          /*margin-top: 35px;*/
          display: flex;
          .btn1 {
            flex: 0 50%;
            color: white;
            background: linear-gradient(to left, $color2, $color3);
            height: 34px;
            font-size: 18px;
            text-align: center;
            line-height: 34px;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
          .btn2 {
            flex: 0 50%;
            color: $color3;
            border: 1px solid $color3;
            height: 34px;
            font-size: 18px;
            text-align: center;
            line-height: 34px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            border-right: none;
          }
        }
      }
    }
    .title {
      padding: 10px 0;
      font-size: 16px;
      color: white;
      text-align: center;
      background: linear-gradient(to top, $color2, $color3);
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
  @import "~@/assets/css/variable.scss";

  .bg-1 {
    background: linear-gradient(to left, $color2, $color3);
    padding: 4px 20px;
    color: white;
  }

  .retrieve {
    align-items: center;
    display: flex;
    background: white;
    padding: 0 10px;
    .mint-cell {
      flex: 1 0 auto;
    }
  }
</style>
<template>
  <div class="page">
    <div class="title">待授权的订单 <p style="text-align: center">{{ order }}</p></div>
    <div class="retrieve">
      <mt-field placeholder="请输入ID检索" v-model="retrieve"></mt-field>
      <mt-button class="bg-1" size="small" @click="search">搜索</mt-button>
    </div>
    <ul class="item" v-if="$route.query.id">
      <li v-for="val in dataList" @click="editor(val.id, val.status)" v-if="$route.query.id == val.submitterId">
        <div class="bhao"><p>{{ val.approvalNo }}</p> <span
          :class="'status'+val.status">{{ val.status | isStatus }}</span></div>
        <p>用户昵称: {{ val.displayName }}</p>
        <p>ID: {{ val.employeeNo }}</p>
        <p>申请时间：{{ val.submitDate | timeAuto }}</p>
        <p>授权限状态：{{ val.status | isStatus }}</p>
      </li>
    </ul>
    <ul class="item" v-else>
      <li v-for="val in dataList" @click="editor(val.id, val.status)">
        <div class="bhao"><p>{{ val.approvalNo }}</p> <span
          :class="'status'+val.status">{{ val.status | isStatus }}</span></div>
        <p>用户昵称: {{ val.displayName }}</p>
        <p>ID: {{ val.employeeNo }}</p>
        <p>申请时间：{{ val.submitDate | timeAuto }}</p>
        <p>授权限状态：{{ val.status | isStatus }}</p>
      </li>
    </ul>
    <div class="no-data-icon" v-if="noData">
      <img class="no-data-icon" src="../../assets/img/icon_empty_logo.png">
      <p>暂无数据</p>
    </div>
    <div class="load">
      <p v-if="loadList" @click="load">加载更多</p>
    </div>
    <p v-if="loadNoData" style="padding: 10px;text-align: center">没有更多数据</p>
    <div class="foot">
      <div class="zhezao" v-if="open" @click="open= false"></div>
      <div class="diji" :class="open ? 'open': '' ">
        <div class="f-title">
          <img src="../../assets/img/gingao.png" width="36" height="36" alt="">
          <p>你的客户 <b>{{listItem.displayName}}</b> 正在实习中！</p>
        </div>
        <div class="f-cont">
          <div class="img-bo">
            <img :src="listItem.headImgURL" alt="">
          </div>
          <div class="f-cont-item2">
            <p style="padding-bottom: 5px;font-size: 16px">{{listItem.displayName}}</p>
            <i style="font-size: 12px">ID: {{listItem.employeeNo}}</i>
          </div>
        </div>
        <div class="f-yao">
          <p>{{listItem.approvalNo}}</p>
          <p>会员等级: 青铜</p>
          <p>授权限状态：{{listItem.status | isStatus}}</p>
          <p>申请时间：{{listItem.submitDate | timeAuto}}</p>
        </div>
        <div class="foot">
          <div class="btn2" @click="open = false">关闭</div>
          <div class="btn1" @click="shouquan()">授权</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import proxyApi from '../../api/proxy'
  import moment from 'moment'
  import {Toast} from 'mint-ui';

  export default {
    name: 'proxy',
    data() {
      return {
        loadList: true,
        loadNoData: false,
        shouquanId: null,
        open: false,
        jiazai: true,
        order: null,
        dataList: [],
        noData: false,
        listItem: {},
        retrieve: '',
        fandou: false,
        page: {
          pageNum: 1,
          limit: 10
        }
      }
    },
    methods: {
      getData(fn, search) {
        proxyApi.findAgentPaged(this.page, (res) => {
          this.dataList.push(...res.data.items)
          this.noData = false
          if (this.page.pageNum === 1 && res.data.items.length === 0) {
            this.noData = true
            this.loadNoData = false
            this.loadList = false
          } else {
            if (res.data.items.length === this.page.limit) {
              this.loadList = true
              this.loadNoData = false
            } else{
              this.loadList = false
              this.loadNoData = true
            }
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
          window.location.reload()
        })
      },
      search() {
        if (!this.retrieve) {
          this.dataList = []
          this.getData()
          this.noData = false
        } else {
          this.page.pageNum = 1
          this.dataList = []
          let a = [{property: '_member.employeeNo', value: this.retrieve}]
          this.getData((list) => {}, a)
        }

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
        return moment(Number(val)).format('YYYY-MM-DD HH:mm')
      }
    },
    created() {
      this.getData()
    }
  }
</script>

