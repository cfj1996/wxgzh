/*
* @class   登录页面
* @author  Dennis Lei
* @date    18.04.26
*/


<style lang="scss" scoped rel="stylesheet/scss">
  @import "~@/assets/css/px2rem.scss";
  .page-main.login-main{
    top:0;
    height: 100%;
    position: relative;
    background-size: inherit;

    .login-form{
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      /*vertical-align: middle;*/

      .logo{
        position: absolute;
        width: 62px;
        top: px2rem(-220);
        left: 50%;
        margin-left: -31px;
      }
    }
  }
</style>

<template>

  <div class="page" v-bind:style="{height: minH}">

    <mt-header class="page-header" fixed title="账号密码登录">
      <a @click="$router.back" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>

    <div class="page-main login-main">
      <div class="login-form">
        <img src="~@/assets/img/splash.png" class="logo">
        <div class="page-login">
          <mt-field class="phone-txt-box"
                    label="手机号"
                    placeholder="请输入手机号"
                    :attr="{maxlength: 13}"
                    type="tel"
                    id="mobile"
                    @keyup.native="phoneSplit"

                    v-model="mobileShow">
            <!--<span class="mobile-show" v-bind:class="{placeholder: !mobile}">{{mobileShow}}</span>-->
          </mt-field>
          <mt-field placeholder="请输入密码"
                    label="密码"
                    :attr="{maxlength: 20}"
                    :type="passwordType ? 'text' : 'password'"
                    v-model="password">
          <span class="password-close" @click="togglePassword">
            <i class="hby-icon "
               :class = "{'hby-icon-eye-close': !passwordType, 'hby-icon-eye': passwordType}"></i>
          </span>
          </mt-field>
        </div>
        <div class="page-login-btn" style="padding-top: .2rem;">
          <div class="page-login-tools">
            <router-link class="el-menu-item" to="/register">注册</router-link>
            <router-link class="el-menu-item login-tools-btn" to="./resetpwd" >忘记密码</router-link>
          </div>
          <mt-button size="large" class="login-btn" type="danger" @click="login">登录</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MessageBox, Toast } from 'mint-ui'
  import { md5 } from '../../common/md5.min'

  let toPath = ''
  export default {
    name: 'login',
    data () {
      return {
        minH: '100%',
        passwordType: false,
        password: '',
        mobileShow: ''
      }
    },
    computed: {
      mobile: {
        get: function () {
          return this.mobileShow.replace(/-/g, '')
        }
      }
    },
    methods: {
      togglePassword () {
        this.passwordType = !this.passwordType
      },
      login () {
        let that = this,
          openId = this.$route.query.openId || localStorage.openId,
          requiredKey = {
            mobile: '手机号',
            password: '密码'
          }

        // 验证
        if (this.public.checkRequired(that, requiredKey)) return
        if (this.public.checkMobile(this.mobile)) return
        this.$store.dispatch('login', {
          phone: that.mobile,
          password: md5(that.password)
        }).then(function (res) {
          if (that.public.isSuccess(res.code)) {
            if (toPath && toPath != '/') {
              that.$router.back()
            } else {
              that.$router.push({ path: '/userId=' + (localStorage.getItem('BZW_USER_ID') || '')
              })
            }
          }
        })
      },
      phoneSplit(e) {
        let sVal = this.mobile.substring(0, 11)
        if (sVal.length >= 11) {
          this.mobileShow = sVal.replace(/(^\d{3}|\d{4}\B)/g, '$1-')
        }
      }
    },
    created () {
      let height = document.documentElement.clientHeight;
      height && (this.minH = height + 'px')
    },
    beforeRouteEnter (to, from, next) {
      console.log('to: ', to)
      console.log('from: ', from)
      if (['/login', '/register', '/resetpwd', '/pageNotFound'].indexOf(from.fullPath) != -1) {
        // 跳转到主页
        toPath = '/'
      } else {
        toPath = from.fullPath
      }
      console.log('toPath ', toPath)
      next(vm => {
        // 通过 `vm` 访问组件实例
      })
    }
  }

</script>

