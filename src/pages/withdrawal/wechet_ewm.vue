<style scoped lang="scss">
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .wecher-ewm {
    .view {
      position: relative;
      width: 100%;
      height: calc(100% - 54px);
      overflow: auto;
      h2 {
        text-align: center;
        font-weight: 500;
      }
      .img-ku {
        background: no-repeat center;
        background-size: contain;
        width: 200px;
        height: 200px;
        margin: 50px auto;
        img {
          max-width: 100%;
          height: auto;
          display: block;
        }
      }
      .btn-ku {
        text-align: center;
      }
    }
    .foot {
      position: relative;
      width: 100%;
      height: 54px;
      padding: 10px;
      display: flex;
      .btn {
        flex: 1;
        color: white;
        background: linear-gradient(to left, $color2, $color3);
        height: 34px;
        font-size: 18px;
        text-align: center;
        line-height: 34px;
        border-radius: 10px;
      }
    }
  }
</style>

<template>
  <div class="page wecher-ewm">
    <div class="view">
      <h2>我的微信二维码</h2>
      <div class="img-ku" :style="{backgroundImage: `url(${img})`}">
      </div>
      <div class="btn-ku">
        <mt-button size="small" @click="upLoad('微信二维码.jpg')">上传二维码</mt-button>
      </div>
    </div>
    <div class="foot">
      <div class="btn" size="small" @click="onSubmit">保存</div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import userAPI from '../../api/userAPI'
  import imgj from '../../assets/img/addwecher.png'
  import weixin from '../../common/weixin';
  import {Toast} from 'mint-ui';

  export default {
    name: 'index',
    data() {
      return {
        img: imgj,
        imgData: {}
      }
    },
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {}
      })
    },
    methods: {
      upLoad(name) {
        weixin.weixinUploadImg(3, name, (res) => {
          this.imgData = res
          this.img = res.url
        })
      },
      onSubmit() {
        if (this.imgData.id) {
          userAPI.severwm({weixinQRCode: this.imgData.id}, () => {
            Toast({
              message: '保存成功',
              position: 'top'
            })
            this.$store.dispatch('getUserDetails')
            this.$router.push('/user_set')
          })
        }

      }
    },
    created() {
      if (this.user.weixinQRCodeURL) {
        this.img = this.user.weixinQRCodeURL
      }
    }
  }
</script>

