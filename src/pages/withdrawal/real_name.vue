<style lang="scss" scoped>
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .real-name {
    .view {
      position: relative;
      width: 100%;
      height: calc(100% - 54px);
      overflow: auto;
      .img-title {
        margin: 25px auto;
        div {
          width: 96px;
          height: 96px;
          margin: 0 auto;
          background: no-repeat center;
          background-size: contain;
        }
        img {
          display: block;
          margin: auto;
          max-width: 100%;
          height: auto;
        }
        p {
          margin-top: 15px;
          color: $color2;
          text-align: center;
        }
      }
      .content {
        padding: 0 15px;
        p {
          background-color: white;
          border-radius: 10px;
          padding: 10px;
          line-height: 1.5;
          color: $color1;
          span {
            font-size: 18px;
            font-weight: bold;
            color: black;
          }
        }

      }
      .img-upload {
        padding: 15px;
        .sfz-lo {
          margin-top: 10px;
          display: flex;
          align-items: center;
          /*justify-content: space-around;*/
          .img-ku {
            border: 1px solid #d9d9d9;
            height: 90px;
            margin: 0 25px;
            flex: 0 0 140px;
            padding: 5px;
            text-align: center;
            background: no-repeat center;
            background-size: contain;
            /*img {*/
            /*height: 100%;*/
            /*width: 100%;*/
            /*}*/
          }
        }
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
  <div class="page real-name">
    <div class="view">
      <div class="img-title">
        <div :style="{backgroundImage: 'url('+auditStateImg+')'}"></div>
        <p>{{ auditState }}</p>
      </div>
      <div class="content">
        <p>
          <span>注意:</span> <br>
          以下资料已通过平台身份验证并生效。为了确保用户信息的唯一性和安全性，
          保障用户权益，确保帐户资金安全，身份验证一旦通过，将无法进行修改。
        </p>
      </div>
      <div class="img-upload">
        <div class="sfz-lo">
          <p>身份证正面</p>
          <div v-if="upImg.zhm.IDCardFrontPictureURL" class="img-ku"
               :style="{backgroundImage: 'url('+ upImg.zhm.IDCardFrontPictureURL+')'}">
          </div>
          <div v-else class="img-ku" :style="{backgroundImage: 'url('+ sfzZmz+')'}"></div>
          <mt-button v-if="upIsLoad" size="small" @click="upLoad1('身份证正面.jpg')">上传图片</mt-button>
        </div>
        <div class="sfz-lo">
          <p>身份证反面</p>

          <div v-if="upImg.zhm.IDCardFrontPictureURL" class="img-ku"
               :style="{backgroundImage: 'url('+ upImg.zhm.IDCardHandPictureURL+')'}">
          </div>
          <div v-else class="img-ku" :style="{backgroundImage: 'url('+ sfzFmz+')'}"></div>
          <mt-button v-if="upIsLoad" size="small" @click="upLoad2('手持身份证照.jpg')">上传图片</mt-button>
        </div>
      </div>
    </div>
    <div class="foot">
      <mt-button :disabled="isSubmit" class="btn" @click="submitImgData">{{ upState }}</mt-button>
    </div>
  </div>
</template>

<script>
  import weixin from '../../common/weixin'
  import userAPI from '../../api/userAPI'
  import {Toast} from 'mint-ui';
  // import banner1 from '../../assets/img/index_banner/banner-1.jpg'

  import failure from '../../assets/img/real_name/on_yz1.png'
  import successful from '../../assets/img/real_name/yes_yz1.png'

  import dFsfzZmz from '../../assets/img/real_name/on_yz2.png'
  import dFsfzFmz from '../../assets/img/real_name/on_yz3.png'

  export default {
    name: 'real_name',
    data() {
      return {
        upState: '提交申请',
        auditState: '未认证',
        auditStateImg: failure,
        sfzZmz: dFsfzZmz,
        sfzFmz: dFsfzFmz,
        upIsLoad: true,
        isSubmit: false,
        upImg: {
          zhm: {
            id: '',
            IDCardFrontPictureURL: ''
          },
          upImg: {
            id: '',
            IDCardHandPictureURL: ''
          }
        }
      }
    },
    methods: {
      upLoad1(name) {
        weixin.weixinUploadImg(3, name, (res) => {
          this.upImg.zhm.id = res.id
          this.upImg.zhm.IDCardFrontPictureURL = res.url
        })
      },
      upLoad2(name) {
        weixin.weixinUploadImg(3, name, (res) => {
          this.upImg.upImg.id = res.id
          this.upImg.upImg.IDCardHandPictureURL = res.url
        })
      },
      submitImgData() {
        if (this.upImg.zhm.id && this.upImg.upImg.id) {
          this.isSubmit = false
          this.upState = '提交信息'
          userAPI.saveIDCardPicture({
            IDCardFrontPicture: this.upImg.zhm.id,
            IDCardHandPicture: this.upImg.upImg.id
          }, () => {
            Toast({
              message: '提交成功，等待审核',
              position: 'top'
            })
            this.isSubmit = true
            this.upState = '审核中'
            this.$store.dispatch('getUserDetails')
            this.$router.push('/user_set')
          })
        } else {
          Toast({
            message: '请先上传图片',
            position: 'top'
          })
        }
      },
      init() {
        userAPI.getIdentity((res) => {
          let state = res.data.certificatedStatus
          switch (state) {
            case 0:
              // 未认证
              this.upState = '提交申请'
              this.auditState = '未认证'
              this.upIsLoad = true
              break;
            case 1:
              // 审核中
              this.upImg.zhm = res.data
              this.upImg.upImg = res.data
              this.upState = '审核中'
              this.auditState = '审核中'
              this.upIsLoad = false
              this.isSubmit = true
              break;
            case 2:
              // 通过
              this.upImg.zhm = res.data
              this.upImg.upImg = res.data
              this.upState = '审核通过'
              this.auditState = '审核通过'
              this.auditStateImg = successful
              this.upIsLoad = false
              this.isSubmit = true
              break;
            case 3:
              // 不通过
              this.upImg.zhm = res.data
              this.upImg.upImg = res.data
              this.upState = '请重新上传图片'
              this.auditState = '审核不通过'
              this.upIsLoad = true
              this.isSubmit = false
              break;
          }
        })
      }
    },
    created() {
      this.init()
    }
  }
</script>

