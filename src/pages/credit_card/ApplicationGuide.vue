<style scoped lang="scss">
  @import "../../assets/css/variable";

  .page {
    .title {
      padding: 25px 0;
      font-size: 16px;
      color: white;
      text-align: center;
      background-color: $color3;;
    }
    .iframe{
      width: 100%;
      height: auto;
    }
  }
</style>
<template>
  <div class="page">
    <div class="title">{{ this.$route.query.name }}申请指南</div>
    <iframe id="guideFrame"  frameborder=0 name="guideFrame" scrolling=auto width="100%" height="100%" :src="$route.params.path"></iframe>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'applicationguide',
    data() {
      return {
        html: ''
      }
    },
    created() {
      console.log(this.$route.params.path)
    }
  }
</script>

