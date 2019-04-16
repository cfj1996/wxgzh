/**
* @author ZGY
* @date 2019/1/12 0012
* @Description: 下拉加载列表，调用了mint的infinite-scroll
*/

<!--<loadList :listLength="approvalList.length" :loading="loading" :noMore="noMore" :firstLoad="firstLoad" :theme="'list-wrapper mint-cell-not-border nav-box'">
内容
</loadList>
-->
*可以默认使用样式list-wrapper，并根据需求修改该样式
*/

<template>
  <div :class="theme" v-if="listLength">
    <slot></slot>
    <div class="noMore" v-show="loading">
      <span>加载中...</span>
    </div>
    <div class="noMore" v-show="noMore && !firstLoad">
      <span>无更多数据</span>
    </div>
  </div>
  <div class="no-data" v-show="!loading" v-else>
    <span>暂无数据</span>
  </div>
</template>

<script>
  export default {
    name: "loadList",
    // 组合其它组件（扩展）
    extends: {},
    // 组件属性、变量
    props: {
      listLength:{required :true},
      loading:{default :false},
      noMore:{default :false},
      firstLoad:{default :true},
      theme:{default :''},
    },
    // 变量
    data() {
      return {}
    },
    //计算
    computed: {},
    // 使用其它组件
    components: {},
    // 监控导航变化
    watch: {},
    // 方法
    methods: {
      toDetail(item){
        console.log('触发click')
        this.$emit('click',item)
      },
    },
    // 生命周期函数
    beforeCreate() {
    },
    created() {
    },
    mounted() {
    },
  }
</script>
<style  lang="scss" rel="stylesheet/scss" scoped>
  .no-data{
    position: absolute;
    top: 50%;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    transform: translateY(-50%);
  }
  .list-wrapper{
    padding: 0 10px;
    position: absolute;
    left: 0;
    right: 0;
    top: 90px;
    bottom: 0;
    background-color: #fff;
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    ul{
      padding: 0;
      margin: 0;
      li{
        border-bottom: 1px solid #dedede;
        padding: 5px 0;
      }
      .bold{
        font-weight:bold
      }
      .clear{
        clear: both;
        &::after{
          content:"";
          clear:both;/*清除浮动*/
          display:block;/*确保该元素是一个块级元素*/
        }
        p{
          margin:5px 0;
        }
      }
      .float-l{
        float: left;
      }
      .float-r{
        float: right;
        text-align: right;
      }
      .font13{
        font-size: 13px;
        line-height: 18px;
      }
      .font18{
        font-size: 18px;
        line-height: 18px;
      }
    }
  }

