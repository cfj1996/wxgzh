/*
* @class   底部菜单
* @author  Dennis Lei
* @date    19.04.01
*/
<style lang="scss" rel="stylesheet/scss">
  @import "~@/assets/css/px2rem.scss";
  .bottom-nav{
    background-color: #fff;

    .mint-tab-item.is-selected{
      background-color: transparent;
    }
    .mint-tab-item-icon{
      width: 25px;
      height: 25px;
    }
  }
</style>

<template>
  <mt-tabbar class="bottom-nav" fixed v-model="selected">
    <mt-tab-item id="homePage"
                 @click.native="toIndex"
                 class="normal">
      <img slot="icon" :src="selected == 'homePage'? require('../assets/img/bottomIcon/icon_discovery_pressed.png'): require('../assets/img/bottomIcon/icon_discovery_normal.png')">
      <span v-if="selected=='homePage'" class="colc30911">首页</span>
      <span v-else class="colbfbfbf">首页</span>
    </mt-tab-item>
    <mt-tab-item id="discover"
                 @click.native="$router.push({path: '/discover'})"
                 class="normal">
      <img slot="icon" :src="selected == 'discover'? require('../assets/img/bottomIcon/icon_classify_pressed.png'): require('../assets/img/bottomIcon/icon_classify_normal.png')" >
      <span v-if="selected=='discover'" class="colc30911">发现</span>
      <span v-else class="colbfbfbf">发现</span>
      </mt-tab-item>
    <mt-tab-item id="shoppingCart"
                 @click.native="$router.push({path: '/shoppingCart'})"
                 class="normal">
      <img class="icon-2" slot="icon" :src="selected == 'shoppingCart'? require('../assets/img/bottomIcon/icon_cart_pressed.png'): require('../assets/img/bottomIcon/icon_cart_normal.png')">
      <span v-if="selected=='shoppingCart'" class="colc30911">资讯</span>
      <span v-else class="colbfbfbf">资讯</span>
    </mt-tab-item>
    <mt-tab-item id="userCenter"
                 @click.native="$router.push({path: '/userCenter'})"
                 class="normal">
      <img slot="icon" :src="selected == 'userCenter'? require('../assets/img/bottomIcon/icon_mine_pressed.png'): require('../assets/img/bottomIcon/icon_mine_normal.png')">
      <span v-if="selected=='userCenter'" class="colc30911">我的</span>
      <span v-else class="colbfbfbf">我的</span>
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
  export default {
    name: 'BottomMenu',
    data () {
      return {
        selected: ''
      }
    },
    computed: {
    },
    methods: {
      toIndex() {
        this.$router.push({
          path: '/'
        })
      }
    },
    created() {
    },
    mounted() {
      if (localStorage.activedPage) {
        this.selected = localStorage.activedPage
      }
    }
  }
</script>
