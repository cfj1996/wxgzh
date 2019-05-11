<style scoped lang="scss">
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .members-doc {
    .foot {
      padding: 0 10px;
      position: relative;
      width: 100%;
      height: 6%;
      .btn {
        color: white;
        background: linear-gradient(to left, $color2, $color3);
        font-size: 18px;
        height: 100%;
        line-height: 35px;
        text-align: center;
        border-radius: 10px;
      }
    }
  }

</style>
<template>
  <div class="page members-doc">
    <xie-yi :isDaili="false"></xie-yi>
    <div class="foot">
      <div class="btn" @click="$router.push('/user_center')">返回</div>
    </div>
  </div>
</template>

<script>
  import XieYi from '../../components/agreement/index'

  export default {
    name: "members_doc",
    components: {
      XieYi
    }
  }
</script>


