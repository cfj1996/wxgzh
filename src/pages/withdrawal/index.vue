<template>
  <div class="page user-set">
    <ul>
      <li><p>工号</p>
        <div>{{ user.employeeNo }}</div>
      </li>
      <li @click="$router.push('/real_ewm')"><p>微信二维码</p>
        <div>{{ ewm }}<span class="mintui mintui-back"></span></div>
      </li>
      <li @click="$router.push('/real_name')"><p>实名认证</p>
        <div>{{ smrz }} <span class="mintui mintui-back"></span></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'index',
    computed: {
      ...mapState({
        user: state => state.security && state.security.user || {},
        initialized: (state => state.metadata.initialized)
      }),
      ewm() {
        return this.user.weixinQRCode ? '已上传' : '未上传'
      },
      smrz: function () {
        let msg = ''
        switch (this.user.identity.certificatedStatus) {
          case 0:
            msg = '未认证'
            break;
          case 1:
            msg = '审核中'
            break;
          case 2:
            msg = '审核通过'
            break;
          case 3:
            msg = '审核不通过'
            break;
        }
        return msg
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/assets/css/variable.scss";
  @import "~@/assets/css/level.scss";

  .user-set {
    ul {
      li {
        display: flex;
        padding: 15px 0;
        border-top: 1px solid #e4e4e4;
        &:nth-child(1) {
          border-left: none;
        }
        p {
          color: $color1;
          flex: 0 0 100px;
          padding-left: 15px;
        }
        div {
          flex: 1;
          display: flex;
          text-align: left;
          padding: 0 15px;
          justify-content: space-between;
          span {
            display: block;
            transform: rotateZ(-180deg);
          }
        }
      }
    }
  }

</style>
