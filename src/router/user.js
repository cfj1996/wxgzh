/*
 * @class   路由-用户中心-入口
 * @author  Dennis Lei
 * @date    19.04.01
 */

// 异步加载调用
const UserCenter = resolve => {
  require(['@/pages/user/Index'], resolve)
}
import authorProxy from '@/pages/user/proxy'
import income from '@/pages/income'
import mineTotal from '../pages/income/mine_total'
import teamTotal from '../pages/income/team_total'
import realName from '../pages/withdrawal/real_name'
import userSet from '../pages/withdrawal/index'
import realErwm from '../pages/withdrawal/wechet_ewm'

export default [
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
  },
  {
    // 提现实名
    path: '/real_ewm',
    name: '上传微信二维码',
    component: realErwm,
    meta: {
      title: '上传微信二维码',
      page: 'homePage',
      requireAuth: true
    }
  },
  {
    path: '/user_set',
    name: '设置',
    component: userSet,
    meta: {
      title: '设置',
      page: 'homePage',
      requireAuth: true
    }
  },
  {
    path: '/my_team',
    name: '我的团队',
    component: () => import('../pages/my_team/index'),
    meta: {
      title: '我的团队',
      page: 'homePage',
      requireAuth: true
    }
  },
  {
    path: '/team_detailed',
    name: '团队成员详细',
    component: () => import('../pages/my_team/team_detailed'),
    meta: {
      title: '团队成员详细',
      page: 'homePage',
      requireAuth: true
    }
  }
]
