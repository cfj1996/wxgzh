/*
 * @class   路由-用户中心-入口
 * @author  Dennis Lei
 * @date    19.04.01
 */

// 异步加载调用
const UserCenter = resolve => { require(['@/pages/user/Index'], resolve) }
import authorProxy from '@/pages/user/proxy'
import income from '@/pages/income'
import mineTotal from '../pages/income/mine_total'
import teamTotal from '../pages/income/team_total'
import realName from '../pages/withdrawal/real_name'

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
      title: '授权代理',
      page: 'homePage',
      requireAuth: true
    }
  },
  {
    // 我的收入
    path: '/income',
    name: '我的收入',
    component: income,
    meta: {
      title: '我的收入',
      page: 'homePage',
      requireAuth: true
    }
  },
  {
    // 直推
    path: '/mine_total',
    name: '直推业务奖励',
    component: mineTotal,
    meta: {
      title: '直推业务奖励',
      page: 'homePage',
      requireAuth: true
    }
  },
  {
    // 团队
    path: '/team_total',
    name: '团队业务奖励',
    component: teamTotal,
    meta: {
      title: '团队业务奖励',
      page: 'homePage',
      requireAuth: true
    }
  },
  {
    // 提现实名
    path: '/real_name',
    name: '实名认证',
    component: realName,
    meta: {
      title: '实名认证',
      page: 'homePage',
      requireAuth: true
    }
  }
]
