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
  }
</style>
<template>
  <div class="page">
    <div class="title">{{ this.$route.query.name }}申请指南</div>
    <div v-html="">
      <p></p>
      <img src="" alt="">
    </div>
    <div v-html="html"></div>
    <img src="" alt="">
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
      axios.get('/static/guide/' + this.$route.query.plan + '/index.html').then((res) => {
        this.html = res.data
      }).catch((err) => {
        this.html = `<h1><img style="" src='/static/guide/xinyie/img/u1377.png'/></h1>`
      })
    }
  }
</script>

