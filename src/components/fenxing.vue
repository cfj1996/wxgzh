<template>
  <div class="zijia" v-if="show">
    <div class="zhezao"></div>
    <div class="img-ku"><img src="../assets/img/fenxiang.png" alt=""></div>
  </div>
</template>

<script>
  export default {
    name: 'fenxing',
    props: {
      show: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="scss">
.zijia{
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
  .zhezao{
    background-color: #7c868c;
    opacity: 0.5;
    position: absolute;
    z-index: 99;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .img-ku{
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    img{
      float: right;
      max-width: 100%;
      height: auto;
      display: block;
    }
  }
}
</style>
