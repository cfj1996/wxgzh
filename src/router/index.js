/*
 * @class   主路由
 * @author  Dennis Lei
 * @date    19.04.01
 * @update date    19.04.01
 */
// import config from '../config'
// import userApi from '../api/user'

import userRouter from './user'
import homeRouter from './home'
import orderRouter from './order'

const router = [
  ...homeRouter,
  ...userRouter,
  ...orderRouter
]

export default router
