/**
* @author ZGY
* @date 2018/8/8 0008
* @Description:防多次提交按钮
*使用自动模式，不需要传递disabled的值，适用于只使用一次的按钮
* <mt-button-once size="large" type="danger"  @click="$router.push({path: '/device'})">关闭</mt-button-once>
*使用自定义控制禁用模式，auto传递false，disabled传递true为可用状态，适用于可适用多次，需要控制禁用状态的按钮
*<mt-button-once size="large" type="primary" class="btn-margin" @click.native="regist" :auto="false" :disabled="operatable">登记设备</mt-button-once>
*在data里设置operatable: true,按钮可控状态
*如需要多次使用并不需要控制禁用状态的情况，请使用原来的mt-button控件，防止父子路由缓存状态
*/

<template>
  <mt-button v-if="auto" :plain="plain" :type="type" :size="size" :icon="icon" :disabled="!disabled" @click.native="autoClick">
    <slot>确定</slot>
  </mt-button>
  <mt-button v-else :plain="plain" :type="type" :size="size" :icon="icon" :disabled="!disabled" @click.native="click">
    <slot>确定</slot>
  </mt-button>
</template>

<script>
    export default {
        name: "mt-button-once",
        // 组合其它组件（扩展）
        extends: {},
        // 组件属性、变量
        props: {
          disabled:{default :true},
          plain:{default :false},
          type:{default :'default'},
          size:{default :'normal'},
          icon:{default :''},
          auto:{default :true},
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
          autoClick(){
            this.disabled=false
            console.log('触发自动防提交按钮')
            this.$emit('click')
          },
          click(){
            console.log('触发自定义防提交按钮')
            this.$emit('click')
          },
        },
        // 生命周期函数
        created() {
        },
        mounted() {
        },
    }
</script>
<style scoped>

</style>

