/**
* @author ZGY
* @date 2018/7/23 0023
* @Description: 带箭头的field 自定义样式
* 以下是两种引用的例子 value是实现v-model的双向绑定功能  需要扩展attr实现自定义属性
<!--*
<mt-field-arrow selects="address" title="详细地址"  placeholder="请输入详细地址"  @imgClick="showMap"  :value="paramsData.address" @input="value => { paramsData.address = value }" ></mt-fiel>
<mt-field-arrow title="签约人"  placeholder="请输入签约人" @click.native='showSearchUserPopup'  :value="signedUser" @input="value => { signedUser = value }" ></mt-field-arrow>
-->
*/

<template>
  <mt-cell v-if="selects=='cell'" class="form-label" :title="title"  @input="handleInput"  is-link>
    <span  :style="value==''?('color: #888'):('color: black')">{{value?value:placeholder}}</span>
  </mt-cell>
  <a v-else class="mint-cell mint-field" :class=selects>
    <div class="mint-cell-left"></div>
    <div class="mint-cell-wrapper">
      <div class="mint-cell-title">
        <span class="mint-cell-text">{{title}}</span>
      </div>
      <div v-if="selects=='dropDownList'" class="mint-cell-value" @click.native="click">
        <input :placeholder=placeholder :value="value" @input="handleInput"   type="text" class="mint-field-core"  maxlength="50" :attr=attr>
        <div class="mask-layer" ></div>
      </div>
      <div v-else class="mint-cell-value">
        <input :placeholder=placeholder :value="value" @input="handleInput"   type="text" class="mint-field-core" :attr=attr>
          <div class="mint-field-clear" style="display: none;">
            <i class="mintui mintui-field-error"></i>
          </div>
          <div class="mint-field-other">
            <img  @click="clickImg" class="address-icon" src="~@/assets/img/location.png" width="20" height="20">
          </div>
      </div>
    </div>
    <i v-if="selects=='dropDownList'" class="mint-cell-allow-right"></i>
  </a>
</template>

<script>
    export default {
        name: "mt-field-arrow",
        // 组合其它组件（扩展）
        extends: {},
        // 组件属性、变量
        props: {
          selects:{default :'dropDownList'},//dropDownList，address 两个模式可选
          value:{required :true},
          title:{default :'标题'},
          placeholder:{default :'请选择'},
          attr:{}
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
          handleInput(event) {
            // 2、手动触发父组件的input事件并将值传给父组件
            let value = event.target.value
            this.$emit('input', val);
          },
          click(){
            console.log('触发click')
             this.$emit('click')
          },
          clickImg(){
            console.log('触发clickImg')
            this.$emit('imgClick')
          },
        },
        // 生命周期函数
        beforeCreate() {
        },
        created() {
          console.log('触发mt-field-arrow')
        },
        mounted() {
        },
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .dropDownList{
  .mint-cell-title{
    flex: none;
    width: 105px;
  }

  .mint-cell-value{
    position: relative;
  }

  .mask-layer{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  }
  .mask-layer{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .address{

    input[class="mint-field-core"]{
      flex: none;
      width: 90%;
    }
    .mint-field-other{
      position: absolute;
      top: 16px;
      right: 14px;
    }
  }
</style>

