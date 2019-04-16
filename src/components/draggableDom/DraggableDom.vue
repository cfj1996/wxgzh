<style lang="scss" rel="stylesheet/scss">
  @import "~@/assets/css/px2rem.scss";
  .xuanfu {
    height: 50px;
    width: 50px;
    z-index: 1000;
    position: fixed;
    top: 60px;
    right: 5px;
    border-radius: 30px;
    background-color: rgba(0, 0, 0, 0.55);
  }
  .yuanqiu {
    height: 40px;
    width: 40px;
    border: 1px solid rgba(140, 136, 136, 0.5);
    margin: 5px auto;
    color: #000000;
    font-size: 12px;
    line-height: 40px;
    text-align: center;
    border-radius: 100%;
    background-color: #ffffff;
  }
  .unselectable{
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;

    /*
      Introduced in IE 10.
      See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
    */
    -ms-user-select: none;
    user-select: none;
  }
</style>
<template>
  <div class="unselectable">
    <!-- 悬浮的HTML -->
    <div v-if="!isShow" class="xuanfu unselectable" id="moveDiv" :style="{opacity: flags?'1': '.8'}"
         @mousedown="down" @touchstart="down"
         @mousemove="move" @touchmove="move"
         @mouseup="end" @touchend="end"
    >
      <div class="yuanqiu unselectable">
        分享
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DraggableDom',
    data() {
      return {
        isShow: false,
        flags: false,
        position: {
          x: 0,
          y: 0
        },
        nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
        screenWidth: 0,
        screenHeight: 0
      }
    },
    methods: {
      // 实现移动端拖拽
      down() {
        this.flags = true;
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.position.x = touch.clientX;
        this.position.y = touch.clientY;
        this.dx = moveDiv.offsetLeft;
        this.dy = moveDiv.offsetTop;
      },
      move(ev) {
        if (this.flags) {
          ev.stopPropagation()
          ev.preventDefault()

          let touch;
          if (event.touches) {
            touch = event.touches[0];
          } else {
            touch = event;
          }
          this.nx = touch.clientX - this.position.x;
          this.ny = touch.clientY - this.position.y;

          this.xPum = this.dx + this.nx;
          this.yPum = this.dy + this.ny;

          if (this.xPum <= 0) {
            this.xPum = 10
          } else if (this.xPum >= this.screenWidth - 50) {
            this.xPum = this.screenWidth - 55
          }
          if (this.yPum <= 0) {
            this.yPum = 5
          } else if (this.yPum >= this.screenHeight - 50) {
            this.yPum = this.screenHeight - 55
          }
          moveDiv.style.left = this.xPum + 'px';
          moveDiv.style.top = this.yPum + 'px';
          // 阻止页面的滑动默认事件(有问题，会阻止整个页面的滑动)
          /* document.addEventListener("touchmove",function(){
            event.stopPropagation()
            event.preventDefault()
          },false);*/
        }
      },
      // 鼠标释放时候的函数
      end() {
        this.flags = false;
      }
    },
    mounted() {
      let clientRect = document.documentElement.getBoundingClientRect()
      this.screenWidth = clientRect.width
      this.screenHeight = clientRect.height
    }
  }
</script>
