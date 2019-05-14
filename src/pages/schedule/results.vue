<style scoped lang="scss">
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .results {
    .view {
      position: relative;
      width: 100%;
      .body {
        padding: 0 10px;
        .banner-img {
          margin: 0 -10px;
          img {
            max-width: 100%;
            height: auto;
            display: block;
          }
        }
        .content {
          background: white;
          padding: 10px 10px 15px 10px;
          border-radius: 10px;
          p {
            font-size: 18px;
            font-weight: bold;
            border-bottom: 1px solid $color1;
            padding: 10px 0;
          }
          .table {
            width: 100%;
            tr {
              display: flex;
              justify-content: space-between;
              &:nth-child(1) {
                td {
                  border: none;
                }
              }
              td {
                padding-top: 10px;
                padding-bottom: 10px;
                border-top: 1px solid $color1;
                text-align: center;
                flex: 1;
              }
            }
          }
          ul {
            li {
              margin-top: 5px;
            }
          }
        }

      }
    }
  }
</style>
<template>
  <div class="page results">
    <div class="view">
      <div class="body">
        <div class="banner-img">
          <img src="../../assets/img/jdbnaner.png" alt="">
        </div>
        <h3 class="title">查询结果</h3>
        <div class="content" v-if="$route.params.data.length === 0">
          <p>未查询到您的申请记录有如下原因：</p>
          <ul>
            <li>1,请确认是否已收到银行下卡的申卡成功短信。</li>
            <li>2,收到短信后是否已等待2个工作日。</li>
            <li>3,查询进度时用的身份证或手机号是否与在银行官网申请所填资料一致。</li>
            <li>4,银行网上数据还未同步，请耐心等待些时日后再查询。</li>
            <li>5,是否有去面签，面签后2-5个工作日后才可查询进度。</li>
          </ul>
        </div>
        <div class="content" v-else>
          <p>查询到您的申请记录以下信息：</p>
          <table class="table">
            <tbody>
            <tr>
              <td>持卡人</td>
              <td>卡名称</td>
              <td>卡种类</td>
              <td>申请日期</td>
              <td>状态</td>
            </tr>
            <tr v-for="val in $route.params.data">
              <td>{{ val.userName }}</td>
              <td>{{ val.cardName }}</td>
              <td>{{ val.categoryName }}</td>
              <td>{{ val.resultDate | timeAuto }}</td>
              <td>{{ val.status | start }}</td>
            </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    filters: {
      timeAuto: function (val) {
        return moment(Number(val)).format('YYYY-MM-DD HH:mm')
      },
      start(val){
        if(Number(val) === 1){
          return '审核中'
        } else if(Number(val) === 2){
          return '已通过'
        } else {
          return '未通过'
        }
      }
    },
    created(){
      console.log(this.$route.params)
    }
  }
</script>
