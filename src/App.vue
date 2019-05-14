<template>
  <div id="app">
    <router-view></router-view>
  </div>

  <!-- 用vue自带的动画实现了淡入淡出的效果 -->
  <!--
  <div>
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
  -->
</template>

<style lang="scss" rel="stylesheet/scss">
  .btn-copy {
    display: block;
    background: none;
    border: none;
  }

  @import "./assets/css/common.scss";

  .child-view {
    position: absolute;
    width: 100%;
    transition: all .4s cubic-bezier(.55, 0, .1, 1);
  }

  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }

  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }

  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }

  .s1 {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .s2 {
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: .5;
    }
    .s3 {
      position: fixed;
      width: 100%;
      img {
        width: 150px;
        height: 150px;
        display: block;
        margin: 50px auto;
      }
    }
  }

  .level {
    width: 25px;
    height: 25px;
    position: relative;
    top: 1px;
    display: inline-block;
  }

  .liao {
    border: 1px solid;
    border-radius: 20px;
    padding: 3px 10px;
    img {
      width: 24px!important;
      height: 24px!important;
    }
  }

  .bo-wei {
    border-color: #1AAD19;
    span {
      color: #1AAD19 !important;
    }
  }

  .bo-dha {
    border-color: #32b3ec;
    span {
      color: #32b3ec !important;
    }
  }
  .xiye-out{
    background-image: linear-gradient(to bottom, $color2 -30%, $color3);
    border-radius: 10px;
    color: white;
    font-size: 16px;
    line-height: 34px;
  }
</style>

<script>
  export default {
    name: 'App'
  }
</script>
