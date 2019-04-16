/*
* @class   主页
* @author  行云流水
* @date    17.08.17
*/
<script>
  import {mapState} from 'vuex'
  import {Toast,MessageBox} from 'mint-ui'
  export default {
    name: 'Home',
    data() {
      return {
      }
    },
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {},
        initialized: (state => state.metadata.initialized)
      })
    },
    watch: {
      deviceInit: {
        handler(val) {
          console.log('deviceInit change: ', val)
          // Toast(`deviceInit initialized:${val.initialized}--deviceId:${val.deviceId}`)
          if(val.initialized === true){
            this.prepayOrderId && this.getPrepayOrder(this.prepayOrderId, ()=> this.goToPage())
            this.orderId && this.getOrder(this.orderId, ()=> this.goToPage())
            if (val.deviceId != ''&&val.deviceId != 'nullStr') {
              this.goToPage()
            }
          }
        },
        deep: true,
        immediate:true
      }
    },
    methods: {

    },
    created() {
      let that = this
      this.$eventHub.$on('EVENT_GET_CHONGDIAN', (data) => {
        console.log("接收到事件值: ", data)
      })
    },
    // It's good to clean up event listeners before a component is destroyed.
    beforeDestroy() {
      this.$eventHub.$off('EVENT_GET_CHONGDIAN')
    }
  }
</script>
