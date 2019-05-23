<style lang="scss">
  @import "~@/assets/css/variable.scss";

  .page {
    .mint-tab-item-label {
      &:after {
        background-image: linear-gradient(to right, $color2 -30%, $color3);
      }
    }
  }
</style>
<style lang="scss" scoped>
  @import "~@/assets/css/variable.scss";
  .page {
    ul{
      padding: 10px 0;
      li{
        padding: 10px;
        .time{
          border-radius: 10px;
          background-color: #e4e4e4;
          color: #aaa4b2;
          width: 130px;
          padding: 2px 0;
          margin: 5px auto;
          text-align: center;
        }
        .content{
          border-radius: 10px;
          background: white;
          padding: 20px;
          .lr{
            text-indent: 2em;
          }
          p{
            line-height: 1.3;
          }
          span{
            float: right;
            color: #3eb7f3;
          }
        }
      }
    }
    .load{
      text-align: center;
      padding-bottom: 10px;
      p{
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
</style>
<template>
  <div class="page">
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1">系统消息</mt-tab-item>
      <mt-tab-item id="2">平台公告</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1" style="overflow: auto;">
        <ul>
          <li v-for="val in pageData">
            <div v-if="val.category === 1">
              <p class="time">{{ val.createdDate | timeAuto }}</p>
              <div class="content" style="padding-bottom: 25px">
                <p class="lr" v-html="val.content"></p>
                <div v-if="val.receiverId == user.id" style="border-top: 1px solid #f2f2f2;margin-top: 10px;padding-top: 10px">
                  <span @click="$router.push('/to_author?id='+ val.bizId)">查看详情 ></span>
                </div>
              </div>
            </div>
            <div v-else>
              <p class="time">{{ val.createdDate | timeAuto }}</p>
              <div class="content">
                <p> 您的朋友 [{{ val.senderName }}]光顾了您的微银行，请注意 维护好客户关系，
                  做好服务工作，如有不明白可 咨询系统客服，<br>
                  用户昵称：{{ val.senderName }} <br>
                  加入时间：{{ val.createdDate | timeAuto }}
                </p>
              </div>
            </div>
          </li>
        </ul>
        <div class="no-data-view" v-if="noData">
          <img class="no-data-icon" src="../../assets/img/icon_empty_logo.png">
          <p>暂无数据</p>
        </div>
        <div class="load">
          <p v-if="loadList" @click="load" >加载更多</p>
        </div>
        <p v-if="loadNoData" style="padding: 10px;text-align: center">没有更多数据</p>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="no-data-view">
          <img class="no-data-icon" src="../../assets/img/icon_empty_logo.png">
          <p>暂无公告</p>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import ScrollWrapper from '../../components/scrollWrapper/ScrollWrapper'
  import creditCardAPI from '@/api/creditCardAPI.js'
  import moment from 'moment'
  import {mapState} from 'vuex'


  export default {
    name: 'index',
    components: {
      ScrollWrapper
    },
    data() {
      return {
        noData: false,
        loadNoData: false,
        selected: '1',
        pageData: [],
        fandou: false,
        jiazai: true,
        page: {
          limit: 10,
          pageNum: 1
        },
        loadList: false
      }
    },
    computed: {
      ...mapState({
        user: (state => state.security.user),
        permissions: state => state.user.permissions
      })
    },
    methods: {
      getData(fn) {
        creditCardAPI.findPaged(this.page, (res) => {
          this.pageData.push(...res.data.items)
          this.noData = false
          if (this.page.pageNum === 1 && res.data.items.length === 0) {
            this.noData = true
            this.loadNoData = false
            this.loadList = false
          } else {
            if (res.data.items.length === this.page.limit){
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
        })
      },
      load() {
        // 下一页数据
        this.page.pageNum++
        this.getData()
      }
    },
    mounted() {
      this.getData()
      creditCardAPI.readInfo(()=>{
        this.$store.dispatch('getUnreadInfo')
      })
    },
    filters: {
      timeAuto: function (val) {
        return moment(Number(val)).format('YYYY-MM-DD HH:mm')
      }
    }
  }
</script>

<style scoped>

</style>
