/*
 * @class   路由-用户中心-入口
 * @author  Dennis Lei
 * @date    19.04.01
 */

// 异步加载调用
const UserCenter = resolve => { require(['@/pages/user/Index'], resolve) }
import authorProxy from '@/pages/user/proxy'

export default[
  {
    path: '/userCenter',
    name: '我的',
    component: UserCenter,
    meta: {
      title: '我的',
      page: 'userCenter',
      requireAuth: true
    }
  },
  {
    // 授权代理
    path: '/author_proxy',
    name: '授权代理',
    component: authorProxy,
    meta: {
      title: '填写申请代理人信息',
      page: 'homePage',
      requireAuth: true
    }
  }
]
