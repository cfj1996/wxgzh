/*
 * @class   主页路由
 * @author  Dennis Lei
 * @date    19.04.01
 */
import Home from '@/pages/Home'
import CreditCardIndex from '@/pages/credit_card/Index'
import ApplicantForm from '@/pages/credit_card/ApplicantForm'
import ConfirmApplicantInfo from '@/pages/credit_card/ConfirmApplicantInfo'
import BankCardDetail from '@/pages/bank_card/BankCardDetail'
import CreditPromotion from '@/pages/credit_card/CreditPromotion'
import AgentAuthorization from '@/pages/credit_card/AgentAuthorization'
import Invitation from '@/pages/credit_card/Invitation'

export default[
  {
    // path: '/:userId/:age?/:storeId?',
    // path: '/:userId?/:age?/:storeId?',
    path: '/',
    name: '主页',
    component: Home,
    meta: {
      title: '小猪办卡',
      page: 'homePage',
      requireAuth: false
    }
  },
  {
    path: '/credit_card',
    name: '信用卡',
    component: CreditCardIndex,
    meta: {
      title: '信用卡',
      page: 'homePage',
      requireAuth: false
    }
  },
  {
    // 普通用户申请办理信用卡（填写个人资料）
    path: '/apply_credit_card_form',
    name: '填写申请信息',
    component: ApplicantForm,
    meta: {
      title: '填写申请信息',
      page: 'homePage',
      requireAuth: true
    }
  },
  {
    // 申请成为代理商（填写个人资料）
    path: '/be_agent_form',
    name: '填写申请代理人信息',
    component: ApplicantForm,
    meta: {
      title: '填写申请代理人信息',
      page: 'homePage',
      requireAuth: true
    }
  },
  {
    path: '/confirm_applicant_info',
    name: '确认申请人信息',
    component: ConfirmApplicantInfo,
    meta: {
      title: '确认申请人信息',
      page: 'homePage',
      requireAuth: true
    }
  },
  {
    path: '/bank_card_info',
    name: '银行信用卡详情',
    component: BankCardDetail,
    meta: {
      title: '银行信用卡详情',
      page: 'homePage',
      requireAuth: true
    }
  },
  {
    path: '/credit_promotion',
    name: '我要推广',
    component: CreditPromotion,
    meta: {
      title: '我要推广',
      page: 'homePage',
      requireAuth: true
    }
  },
  {
    path: '/agentAuthorization',
    name: '代理授权',
    component: AgentAuthorization,
    meta: {
      title: '代理授权',
      page: 'homePage',
      requireAuth: true
    }
  },
  {
    path: '/invitation',
    name: '邀请好友',
    component: Invitation,
    meta: {
      title: '邀请好友',
      page: 'homePage',
      requireAuth: true
    }
  }
]