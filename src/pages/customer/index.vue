<style lang="scss" scoped>
  .page {
    padding-top: 20px;
    .title {
      span {
        display: block;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        margin: 0 auto;
        overflow: hidden;
        img{
          max-width: 100%;
          height: auto;
          display: block;
        }
      }
    }
    .text{
      margin-top: 20px;
      text-align: center;
      line-height: 1.2;
    }
    .icon{
      width: 75%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item{
        div{
          width: 55px;
          height: 55px;
          margin: 0 auto;
          img{
            border-radius: 50%;
            overflow: hidden;
            width: 100%;
            height: 100%;
            height: auto;
            display: block;
          }
        }
        p{
          padding: 10px 15px ;
          margin-top: 10px;
          background: #f2f2f2;
        }
      }
    }
  }
</style>
<template>
  <div class="page">
    <div class="title"><span><img v-if="pageData.headImgURL" :src="pageData.headImgURL" alt=""></span>
    <p class="text">{{pageData.displayName}} <br> UID:{{pageData.employeeNo}}</p>
    </div>
    <div class="icon">
      <div class="item">
        <a :href="`tel:${ pageData.mobile }`">
          <div><img src="../../assets/img/shouji.png" alt=""></div>
          <p>给我打电话</p>
        </a>
      </div>
      <div class="item" v-if="pageData.weixinAccountNo">
        <a href="javascript: void(0) ">
          <div><img src="../../assets/img/weixin.png" alt=""></div>
          <button type="button" class="copy btn-copy" :data-clipboard-text="pageData.weixinAccountNo">加我微信</button>
        </a>
      </div>
    </div>
    <p style="padding: 50px 10%;line-height: 1.5;font-size: 16px">专属服务经理是XXX面对用户的第一责任人，在享有XXX相关权益的同时，也肩负指导、培训和为用户排疑解惑的责任与义务。</p>
  </div>
</template>

<script>
  import orderApi from '../../api/orderAPI'
  import {Toast} from 'mint-ui'

  export default {
    name: 'index',
    data() {
      return {
        pageData: {
          id: '1',
          employeeNo: '1756',	// 工号
          displayName: '张飞',	// 微信昵称
          headImgURL: 'http://thirdwx.qlogo.cn/mmopen/ey4onjt5WiaepYWINm4dn5ib6YkbpHZbWKh5Exia8RFsIEhtLebQNGteRwbSWkxNyuer6RCpC4Xkb1jQVibS4ypx1e8iaCgOsqP3p/132',	// 微信头像
          weixinAccountNo: 'ai youxi ',	// 微信号
          mobile: '15115634774'
        }
      }
    },
    methods: {
      daMonile() {},
      addWeixin() {
        let clipboard = new this.clipboard('.copy');
        let _this = this
        clipboard.on('success', function (e) {
          Toast({
            message: '已成功复制微信号',
            position: 'top'
          })
          e.clearSelection();
        });
      }
    },
    mounted() {
      this.addWeixin()
      orderApi.getCustomerService((res) => {
        console.log(res)
        this.pageData = res.data
      })
    }
  }
</script>

