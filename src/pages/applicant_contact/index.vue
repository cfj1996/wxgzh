<template>
  <div class="page applicant">
    <div class="head">
      <div class="img-ku"><img src="../../assets/img/sqok.png" alt=""></div>
      <p>申请成功等待审核</p>
    </div>
    <p class="text">请联系您的专属客服授权，尽快完成实习任务（直接推荐客户或是自己成功办理两笔业务，或是招募的实习专员有3名成为正式专员）成为XXX正式代理商。</p>
    <div class="content">
      <div class="img-ku"><img v-if="pageData.headImgURL" :src="pageData.headImgURL" alt=""></div>
      <div>
        <div class="name">{{ pageData.displayName }}(昵称： {{pageData.weixinAccountNo}})</div>
        <div class="gonh">工号：{{ pageData.employeeNo }}</div>
        <div class="zhiw">职务：{{ pageData.level | setLevel }}</div>
      </div>
    </div>
    <div class="lt">
      <button type="button" class="tiem copy btn-copy" :data-clipboard-text="pageData.weixinAccountNo">
        <img src="../../assets/img/weixin.png" alt=""> <span>微信聊</span>
      </button>
      <a class="tiem" :href="`tel:${ pageData.mobile }`"><img src="../../assets/img/shouji.png"
                                                              alt=""><span>电话聊</span></a>
    </div>
  </div>
</template>

<script>
  import orderAPI from '@/api/orderAPI'
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
          mobile: '15115634774',
          realName: '',
          level: null
        }
      }
    },
    filters: {
      setLevel: function (i) {
        let level = JSON.parse(sessionStorage.level)
        let a = ''
        level.forEach((val) => {
          if (val.value === +i) {
            a = val.label
          }
        })
        return a
      }
    },
    mounted() {
      orderAPI.getCustomerService((res) => {
        this.pageData = res.data
      })
      let clipboard1 = new this.clipboard('.copy');
      clipboard1.on('success', function (e) {
        Toast({
          message: '已成功复制微信号',
          position: 'top'
        })
        e.clearSelection();
      });
    }
  }
</script>

<style scoped lang="scss">
  .applicant {
    .head {
      text-align: center;
      padding: 50px 0;
      background: #dedede;
      .img-ku {
        img {
          width: 50px;
          height: 50px;
        }
        padding: 10px;
      }
    }
    .text {
      padding: 15px 10px;
      line-height: 1.5;
      border-bottom: 1px solid #eeeeee;
    }
    .content{
      padding: 10px;
      display: flex;
      align-items: center;
      .name{
        font-size: 16px;
      }
      .gonh{
        color: #b7c5cd;
        margin-top: 5px;
        font-size: 12px;
      }
      .zhiw{
        color: #b7c5cd;
        margin-top: 5px;
        font-size: 12px;
      }
      .img-ku{
        margin-right: 20px;
        width: 60px;
        height: 60px;
        img{
          max-width: 100%;
          height: auto;
          display: block;
          margin: 0 auto;
          border-radius: 50%;
        }
      }
    }
    .lt {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: space-around;

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .tiem {
        display: flex;
        align-items: center;
        span {
          padding: 0 10px;
          color: #000;
        }
      }
    }
  }

</style>
