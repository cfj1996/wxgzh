/*
 * @class   AJAX方法
 * @author  行云流水
 * @date  2019/04/01
 */
import axios from 'axios'
import {MessageBox, Indicator} from 'mint-ui'
import config from '../config'

// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = true;

export default {
  request: function (url, options) {
    let _url = url;

    let _options = {
      method: 'post',
      data: {},
      header: {
        'X-AnFun-CORS': true
      },
      loading: false, //是否显示加载动画
      requiresAuth: true, //是否需要登陆
      success: function (res) {
      },
      error: function () {
      },
      complete: function () {
      }
    };

    Object.assign(_options, options);

    //查看是否需要token
    if (_options.requiresAuth) {
      let sessionData = sessionStorage.getItem('session');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        _options.header['X-AnFun-Token'] = session.authToken;
      } else {
        console.log('Not Found authToken!');
      }
    }

    if (_options.method == 'get') {
      //把data转换成url传参
      let urlParams = [],
        addParams = function (key, val) {
          val = typeof val == 'function' ? val() : val;
          urlParams[urlParams.length] = encodeURIComponent(key) + "=" + encodeURIComponent(val);
        };
      for (let pKey in _options.data) {
        addParams(pKey, _options.data[pKey])
      }
      _url += '?' + urlParams.join("&");
    }

    if (_options.loading) {
      Indicator.open();// 加载中
    }

    let params = {
      data: _options.data
    }
    if (_options.page) {
      params.page = _options.page
    }
    if (_options.filters) {
      params.filters = _options.filters
    }
    axios({
      url: config.HOST + _url,
      data: params,
      method: _options.method,
      headers: _options.header
    }).then(function (response) {
      if (_options.loading) {
        Indicator.close(); //关闭加载
      }
      if (response.data.success) {
        typeof _options.success === 'function' && _options.success(response.data);
      } else {
        MessageBox('错误', response.data.error);
        typeof _options.error === 'function' && _options.error(response.status, response.data);
      }
      _options.complete();
    }).catch(function (response) {
      if (_options.loading) {
        Indicator.close(); //关闭加载
      }

      if (process.env.NODE_ENV !== 'production') {
        console.info("%c [axios catch error]:", "color:orange", response)
      }

      if (response instanceof Error) {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', response.message);
      } else {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        if (response.data) {
          if (response.data.resultCode === 0) {
            MessageBox('错误', '用户尚未登陆');
          }
          if (([800, 801, 900, 901].indexOf(response.data.resultCode) > -1)) { //如果token过期
            // router.push({path: '/login'})
            MessageBox('错误', '请求不合法');
          }
        }
      }
      _options.error(response.status, response.data);
      _options.complete();
    })
  }
}

