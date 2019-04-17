<template>
  <mt-tabbar v-model="selected" fixed>
    <mt-tab-item id="HOME" @click.native="goToPage({path: '/home'})">
      <img slot="icon" :src="selected == 'HOME'? require('../assets/img/100x100.png') : require('../assets/img/100x100.png')">
      主页
    </mt-tab-item>
    <mt-tab-item id="ORDER" @click.native="goToPage({path: '/order'})">
      <img slot="icon" :src="selected == 'ORDER'? require('../assets/img/100x100.png') : require('../assets/img/100x100.png')">
      订单
    </mt-tab-item>
    <mt-tab-item id="FIND" @click.native="goToPage({path: '/find'})">
      <img slot="icon" :src="selected == 'FIND'? require('../assets/img/100x100.png') : require('../assets/img/100x100.png')">
      发现
    </mt-tab-item>
    <mt-tab-item id="ME" @click.native="goToPage({path: '/me'})">
      <img slot="icon" :src="selected == 'ME'? require('../assets/img/100x100.png') : require('../assets/img/100x100.png')">
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
  import { Tabbar, TabItem } from 'mint-ui';

  export default {
    name: 'Bottom',
    data() {
      return {
        selected: ''
      }
    },
    methods: {
      goToPage(path) {
        this.$router.push(path)
      }
    },
    created() {

    },
    mounted() {
      if (sessionStorage.selectedTab) {
        this.selected = sessionStorage.getItem('selectedTab')
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
