
<style lang="scss" rel="stylesheet/scss" scoped>

  @mixin layout{
    position: absolute;
    top:0;
    bottom:0;
    left: 0;
    right: 0;
  }

  .dialog-wrapper{
    @include layout;
    z-index: 6;

    .mask{
      @include layout;
      background: #333;
      opacity: .3;
    }
    .dialog-container{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      /*bottom:100px;*/
      left: 40px;
      right: 40px;
      border-radius: 10px 10px 0 0;
      overflow: hidden;
      background: #fff;

      .content{
        padding: 10px;
        overflow: auto;
        /*position: absolute;
        bottom:60px;
        left: 0;
        right: 0;
        top: 40px;
        min-height: 300px;
        padding: 10px;
        overflow: auto;*/

        textarea{
          border-color: #dedede;
        }
      }
      >header{
        background: #f2f2f2;
        height: 40px;
        padding: 10px;

        h4{
          margin: 0;
        }
        .close{
          position: absolute;
          top: 10px;
          right: 10px;
          width:20px;
          height:20px;
          background: transparent url("~@/assets/img/close.png") no-repeat 0 0;
          background-size: cover;
        }
      }
      >footer{
        /*position: absolute;
        bottom:0;
        left: 0;
        right: 0;
        height: 60px;
        border-top:1px solid #dedede;*/
        bottom: 0;
        margin-bottom: 10px;
        border-top: 1px solid #dedede;

        .btn-area{
          padding-top:10px;
          width: 100%;
          height:100%;
          display: flex;
          flex-wrap: nowrap; /*nowrap不换行，wrap换行后方向自上往下，wrap-reserver自下往上 */
          align-items: flex-start;
          justify-content: space-around;

          .ensure{
            background-color: #1d9ed7;
            color: #fff;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="dialog-wrapper" :style="wrapperStyObj">
    <div class="mask"></div>
    <div class="dialog-container">
      <header>
        <h4>{{title}}</h4>
        <i class="close" @click="cancel"></i>
      </header>

      <section class="content">
        <slot name="content"></slot>
      </section>
      <footer>
        <slot name="footBtn">
          <div class="btn-area">
            <mt-button size="small"  @click.native="cancel" plain  >关闭</mt-button>
            <mt-button size="small"   @click.native="ensure" type="primary">继续观看</mt-button>
          </div>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
  import oPub from '@/common/util'
  export default {
    name: 'zgy-dialog',
    data () {
      return {
        isShow: false,
        wrapperStyObj: {

          fontSize: '14px'
        }
      }
    },
    props:{
      title: {
        default: '确认框',
        type: String
      },
      cancelCallFn: [Function, Boolean],
      ensureCallFn: [Function, Boolean]
    },
    computed:{

    },
    methods:{
      cancel(){
        this.isShow = false
        oPub.isFunction(this.cancelCallFn) && this.cancelCallFn()
      },
      ensure(){
        oPub.isFunction(this.ensureCallFn) && this.ensureCallFn()
      }
    },
    created(){
      console.log('this.isShow ', this.isShow)
    },
    mounted(){

    }

  }
</script>
