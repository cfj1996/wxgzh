<style lang="scss">
  @import "~@/assets/css/variable.scss";

  .page {
    .mint-tab-container{
      height: 100%;
      .mint-tab-container-wrap{
        position: relative;
        height: 100%;
      }
    }
    .mint-tab-item-label {
      &:after {
        background-image: linear-gradient(to right, $color2 -30%, $color3);
      }
    }
  }
</style>
<style lang="scss" scoped>
  .page {
    ul{
      li{
        margin-top: 30px;
        padding: 0 10px;
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

  }
</style>
<template>
  <div class="page">
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1">系统消息</mt-tab-item>
      <mt-tab-item id="2">平台公告</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <scroll-wrapper ref="scroll"
                          :scrollbar="scrollbarObj"
                          :pullDownRefresh="pullDownRefreshObj"
                          :pullUpLoad="pullUpLoadObj"
                          :startY="0"
                          @pullingDown="onRefreshPage"
                          @pullingUp="onPullingUp">
            <ul>
              <li v-for="val in pageData">
                <div v-if="val.category === 1">
                  <p class="time">{{ val.createdDate | timeAuto }}</p>
                  <div class="content">
                    <p>亲爱的{{ val.receiverName }}代理商:</p>
                    <p class="lr" v-html="val.content"></p>
                    <hr>
                    <span @click="$router.push('/author_proxy')">查看详情 ></span>

                  </div>
                </div>
                <div v-else>
                  <p class="time">{{ val.createdDate | timeAuto }}</p>
                  <div class="content">
                    <p>   您的朋友 [{{ val.senderName }}]光顾了您的微银行，请注意 维护好客户关系，
                      做好服务工作，如有不明白可 咨询系统客服，
                      联系电话：0755-********，或是 在公众号中留言。<br>
                      会员编号：{{ val.senderName }} <br>
                      加入时间：{{ val.createdDate | timeAuto }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </scroll-wrapper>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        无消息
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import ScrollWrapper from '../../components/scrollWrapper/ScrollWrapper'
  import creditCardAPI from '@/api/creditCardAPI.js'
  import moment from 'moment'

  export default {
    name: 'index',
    components: {
      ScrollWrapper
    },
    data() {
      return {
        selected: '1',
        pageData: [],
        fandou: false,
        jiazai: true,
        page: {
          limit: 5,
          pageNum: 1,
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
      getData(fn) {
        creditCardAPI.findPaged(this.page, (res) => {
          this.pageData.push(...res.data.items)
          if (typeof fn === 'function') {
            fn(res.data.items)
          }
        })
      },
      onRefreshPage(timeNum) {
        // 模拟更新数据
        this.pageData = []
        this.getData(() => {
          this.$refs.scroll.forceUpdate(true)
        })
      },
      onPullingUp() {
        // 下一页数据
        this.$refs.scroll.forceUpdate(false)
        if (this.page.end || this.fandou) {
          this.$refs.scroll.forceUpdate(false)
          console.log(1)
          return
        }
        if (this.jiazai) {
          console.log(2)
          this.jiazai = false
          this.page.pageNum++
          this.getData((list) => {
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
      }
    },
    mounted() {
      this.getData()
    },
    filters: {
      timeAuto: function (val) {
        return moment(Number(val)).format('YYYY-MM-DD h:mm')
      }
    }
  }
</script>

<style scoped>

</style>
