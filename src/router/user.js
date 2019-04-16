/*
 * @class   路由-用户中心-入口
 * @author  Dennis Lei
 * @date    19.04.01
 */

// 异步加载调用
const UserCenter = resolve => { require(['@/pages/user/Index'], resolve) }

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
  }
]
