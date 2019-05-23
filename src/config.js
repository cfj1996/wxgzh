/*
 * @class   配置信息
 * @author  Dennis Lei
 * @date    19.04.01
 */

export default {
  isProdEnv: true, // 是否是生产环境

  // 正式环境
  // HOST: 'http://xykvip.winbons.com',
  // LOGIN_HOST: 'http://xykvip.winbons.com',
  // 微信授权URL
  // wxSignHost: 'http://xykviph5.winbons.com', // 微信分享也是用的这个链接
  // REDIRECT_URL: 'http://shop.qdshsh.com/#',
  // SHARE_ADDRESS: 'http://shop.qdshsh.com/#/userId=',

  // 查询进度的图片验证码地址 /m/scheduler/getImageCode
  getImageCodeUrl: '/m/scheduler/getImageCode',

  // 测试环境
  HOST: 'http://devxykvip.isales.tech',
  // 微信授权URL
  wxSignHost: 'http://devxykviph5.isales.tech', // 微信分享也是用的这个链接
  LOGIN_HOST: 'http://120.76.237.100:8080',
  SHARE_ADDRESS: 'http://shoptest.qdshsh.com/#/userId=',

  // ==================  生产与开发通用环境变量  ==============================
  h5AppId: 100, // 应用标识ID（与后端约定）
  appId: 'wx97a3f8c05002bd41', // 微信appId
  qiniuUpUrl: 'http://upload.qiniu.com/', // 上传域名
  qiniuDownUrl: 'https://msresources.winbons.com/', // 七牛文件下载地址
  ROUTE_AUTHORISE_CALLBACK: '/authoriseCallback' // 授权页面
}
