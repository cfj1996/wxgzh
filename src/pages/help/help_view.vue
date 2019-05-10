<style scoped lang="scss">
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .help-view {
    .view {
      padding: 0 10px;
      position: relative;
      height: 100%;
      .title {
        text-align: center;
        border-bottom: 1px solid $color1;
        font-weight: 500;
        margin-top: 0;
        padding-top: 10px;
        padding-bottom: 15px;
        font-size: 16px;
      }
      .body {
        position: relative;
        height: calc(100% - 84px) ;
      }
      .foot {
        .time {
          text-align: right;
        }
      }
    }
  }
</style>
<template>
  <div class="page help-view">
    <div class="view">
      <h2 class="title">{{ this.$route.params.name }}</h2>
      <div class="body">
        <!--http://devxykviph5.isales.tech/static/help.html-->
        <iframe id="guideFrame" frameborder=0 name="guideFrame" scrolling=auto width="100%" height="100%"
                src="http://devxykviph5.isales.tech/static/help.html"></iframe>
        <!--<iframe id="guideFrame" frameborder=0 name="guideFrame" scrolling=auto width="100%" height="100%"-->
                <!--:src="$route.params.path"></iframe>-->
      </div>
      <div class="foot">
        <div class="time">最近更新时间 {{ this.$route.params.createdDate | timeAuto }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'help_view',
    created() {
      console.log(this.$route.params)
    },
    filters: {
      timeAuto: function (val) {
        return moment(Number(val)).format('YYYY-MM-DD HH-ss')
      }
    }
  }
</script>
