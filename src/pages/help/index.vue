<style lang="scss" scoped>
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .help {
    .body {
      ul {
        padding: 0 10px;
        li {
          display: flex;
          justify-content: space-between;
          padding: 15px;
          border-top: 1px solid $color1;
          &:nth-child(1) {
            border-top: none;
          }
          p {

          }
          .mintui {
            display: block;
            transform: rotateZ(-180deg);
          }
        }
      }

    }
  }
</style>
<template>
  <div class="page help">
    <div class="view">
      <div class="body">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">会员</mt-tab-item>
          <mt-tab-item id="2">信用卡</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <ul>
              <li v-for="val in pageData.daili" @click="$router.push({name: 'helpView',params: val})"><p>
                {{ val.name }}</p> <span class="mintui mintui-back"></span></li>
            </ul>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <ul>
              <li v-for="val in pageData.xyoka" @click="$router.push({name: 'helpView',params: val})"><p>
                {{ val.name }}</p> <span class="mintui mintui-back"></span></li>
            </ul>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>

<script>
  import userAPI from '../../api/userAPI'

  export default {
    name: 'index',
    data() {
      return {
        selected: '1',
        pageData: {
          daili: [],
          xyoka: []
        },
      }
    },
    created() {
      userAPI.help({category: 1}, (res) => {
        this.pageData.xyoka = res.data
      })
      userAPI.help({category: 2}, (res) => {
        this.pageData.daili = res.data
      })
    }
  }
</script>
