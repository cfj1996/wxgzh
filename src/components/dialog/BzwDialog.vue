<style lang="scss" rel="stylesheet/scss">
  .dialog-enter-to,
  .dialog-leave-to{transition:opacity .3s;}
  .dialog-enter,
  .dialog-leave-to{opacity:0;}
  .dialog-enter>.dialog-box,
  .dialog-leave-to>.dialog-box{transform:translateY(-50%) scaleZ(1);}
  .dialog-enter-to>.dialog-box,
  .dialog-leave-to>.dialog-box{transition:all .3s;}

  .dialog-cover{display:flex;justify-content:center;align-items:center;position:fixed;left:0;top:0;z-index:900;width:100%;height:100%;background:rgba(0,0,0,.4);}
  .dialog-box{position:relative;width:30%;min-width:300px;margin:0 auto;background:#FFF;border-radius: 10px}
  .dialog-close-btn{position:absolute;top:0;right:0;width:2em;height:2em;opacity:.7;background:url(data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtZmxhdC0yMDAzMDExNC5kdGQiPgo8c3ZnIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiI+CjxsaW5lIHgxPSI1IiB5MT0iNSIgeDI9IjI1IiB5Mj0iMjUiIC8+CjxsaW5lIHgxPSIyNSIgeTE9IjUiIHgyPSI1IiB5Mj0iMjUiIC8+CjwvZz4KPC9zdmc+) no-repeat 50% 50%;background-size:50%;cursor:pointer;}
  .dialog-close-btn:hover{opacity:1;}
  .dialog-body{min-height:40px;}
  .dialog-header{
    border-bottom: 1px solid #eee;
    line-height: 30px;
    min-height:40px;
    padding-left: 10px;
  }
  .dialog-content{
    padding: 12px 10px;
  }
  .dialog-footer{text-align:right;min-height: 40px;line-height: 40px;}
  .dialog-btn{
    margin: 0 20px;
    font-size: 14px;
  }
  .dialog-btn:last-child{
    margin-right: 0;
  }
  .dialog-ok-btn{color:#c30911}
  .dialog-tip-cover{background:transparent;pointer-events:none;}
  .dialog-tip-cover>.dialog-box>.dialog-body{border-radius:3px;color:#FFF;background:rgba(0,0,0,.8);}
</style>
<template>
  <transition name="dialog">
    <div :class="['dialog-cover',className]" @click.stop="onClick($event)" v-if="show">
      <div class="dialog-box" :style="getCssStyle()">
        <header class="dialog-header" v-if="showHeader">
          <slot name="header">
            {{title}}
          </slot>
        </header>
        <i class="dialog-close-btn dialog-close" v-if="showCloseButton"></i>
        <div class="dialog-body">
          <div class="dialog-content">
            <slot>{{content}}</slot>
          </div>
        </div>
        <footer class="dialog-footer" v-if="showFooter">
          <slot name="footer">
            <div style="padding: 0 20px;">
              <label class="dialog-btn dialog-close" v-if="showCancelButton">{{cancelText}}</label>
              <label class="dialog-btn dialog-ok-btn" @click.stop="ok" v-if="showOkButton">{{okText}}</label>
            </div>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'bzw-dialog',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '提示'
      },
      content: {
        type: String,
        default: ''
      },

      width: {
        type: String,
        default: ''
      },
      height: {
        type: String,
        default: ''
      },
      className: {
        type: String,
        default: ''
      },

      showHeader: {
        type: Boolean,
        default: true
      },
      showFooter: {
        type: Boolean,
        default: true
      },
      showCloseButton: {
        type: Boolean,
        default: true
      },
      showCancelButton: {
        type: Boolean,
        default: true
      },
      showOkButton: {
        type: Boolean,
        default: true
      },

      cancelText: {
        type: String,
        default: '取消'
      },
      okText: {
        type: String,
        default: '确定'
      },

      enableCoverClick: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        show: this.value
      }
    },
    methods: {
      onClick(e) {
        var t = e.target,
          ct = e.currentTarget;
        if (t === ct) {
          this.enableCoverClick && (this.show = false);
          return;
        }

        while (t && t !== ct) {
          if (t.classList.contains('dialog-close')) {
            this.show = false;
            break;
          }
          t = t.parentNode;
        }
      },
      ok() {
        this.$emit('ok', this);
      },
      getCssStyle() {
        var style = {};
        this.width && (style.width = this.width);
        this.height && (style.height = this.height);
        return style;
      }
    },
    watch: {
      value() {
        this.show = this.value;
      },
      show() {
        this.$emit('input', this.show);
        if (this.show) {
          this.$nextTick(() => {
            this.$emit('open', this.$el)
          })
        } else {
          this.$emit('close', this.$el);
        }
      }
    },
    updated() {
      if (this._context && this.$el.nodeType === 8) {
        this._context.removeChild(this.$el);
      }
    }
  }
</script>
