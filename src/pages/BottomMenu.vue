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
<style lang="scss" scoped>
  .bottom-nav{
    .nev-icon{
      &.active{
        .text{
          display: block;
          text-align: center;
          padding-top: 5px;
          color: #bf0916;
        }
        .home{
          background: url("../assets/img/new_img/home/home-hover.png") no-repeat center;
          background-size: contain;
        }
        .discover{
          background: url("../assets/img/new_img/home/discover-hover.png") no-repeat center;
          background-size: contain;
        }
        .information{
          background: url("../assets/img/new_img/home/information-hover.png") no-repeat center;
          background-size: contain;
        }
        .my{
          background: url("../assets/img/new_img/home/my-hover.png") no-repeat center;
          background-size: contain;
        }
      }
      .icon{
        margin: 0 auto;
        width: 25px;
        height: 25px;
      }
      .text{
        display: block;
        text-align: center;
        padding-top: 5px;
        color: #bfbfbf;
      }
      .home{
        background: url("../assets/img/new_img/home/home.png") no-repeat center;
        background-size: contain;
      }
      .discover{
        background: url("../assets/img/new_img/home/discover.png") no-repeat center;
        background-size: contain;
      }
      .information{
        background: url("../assets/img/new_img/home/information.png") no-repeat center;
        background-size: contain;
      }
      .my{
        background: url("../assets/img/new_img/home/my.png") no-repeat center;
        background-size: contain;
      }
    }
  }

</style>
<template>
  <mt-tabbar class="bottom-nav" fixed v-model="selected">
    <mt-tab-item id="homePage" @click.native="$router.push({path: '/'})" class="normal">
      <!--<img slot="icon" :src="selected == 'homePage'? require('../assets/img/bottomIcon/icon_discovery_pressed.png'): require('../assets/img/bottomIcon/icon_discovery_normal.png')">-->
      <!--<span v-if="selected=='homePage'" class="colc30911">首页</span>-->
      <!--<span v-else class="colbfbfbf">首页</span>-->
      <div class="nev-icon" :class="$route.path === '/'?'active':''">
        <div class="icon home"></div>
        <span class="text">首页</span>
      </div>
    </mt-tab-item>
    <mt-tab-item id="discover" @click.native="" class="normal">
      <!--<img slot="icon" :src="selected == 'discover'? require('../assets/img/bottomIcon/icon_classify_pressed.png'): require('../assets/img/bottomIcon/icon_classify_normal.png')" >-->
      <!--<span v-if="selected=='discover'" class="colc30911">发现</span>-->
      <!--<span v-else class="colbfbfbf">发现</span>-->
      <div class="nev-icon" :class="$route.path === '/discover'?'active':''">
        <div class="icon discover"></div>
        <span class="text">发现</span>
      </div>
      </mt-tab-item>
    <mt-tab-item id="shoppingCart" @click.native="" class="normal">
      <!--<img class="icon-2" slot="icon" :src="selected == 'shoppingCart'? require('../assets/img/bottomIcon/icon_cart_pressed.png'): require('../assets/img/bottomIcon/icon_cart_normal.png')">-->
      <!--<span v-if="selected=='shoppingCart'" class="colc30911">资讯</span>-->
      <!--<span v-else class="colbfbfbf">资讯</span>-->
      <div class="nev-icon" :class="$route.path === '/information'?'active':''">
        <div class="icon information"></div>
        <span class="text">资讯</span>
      </div>
    </mt-tab-item>
    <mt-tab-item id="userCenter" @click.native="$router.push({path: '/userCenter'})" class="normal">
      <!--<img slot="icon" :src="selected == 'userCenter'? require('../assets/img/bottomIcon/icon_mine_pressed.png'): require('../assets/img/bottomIcon/icon_mine_normal.png')">-->
      <!--<span v-if="selected=='userCenter'" class="colc30911">我的</span>-->
      <!--<span v-else class="colbfbfbf">我的</span>-->
      <div class="nev-icon" :class="$route.path === '/userCenter'?'active':''">
        <div class="icon my"></div>
        <span class="text">我的</span>
      </div>
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
    mounted() {
      if (localStorage.activedPage) {
        this.selected = localStorage.activedPage
      }
    }
  }
</script>
