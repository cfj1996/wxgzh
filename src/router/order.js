/*
 * @class   路由-订单-入口
 * @author  Dennis Lei
 * @date    19.04.12
 */

// 异步加载调用
const OrderIndex = resolve => { require(['@/pages/order/Index'], resolve) }

export default[
  {
    path: '/order',
    name: '订单',
    component: OrderIndex,
    meta: {
      title: '订单',
      page: 'order',
      requireAuth: true
    }
  }
]
