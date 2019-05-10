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
import Invitation from '@/pages/credit_card/Invitation'
import ApplicationGuide from '@/pages/credit_card/ApplicationGuide'
import customer from '@/pages/customer/index'
import posters from '@/pages/posters/index'
import friends from '@/pages/friends/index'
import mylink from '@/pages/friends/myLink'
import waitFor from '@/pages/friends/waitFor'
import mypostrs from '@/pages/friends/posters'
import newpage from '@/pages/luodi/index'
import notice from '@/pages/notice/index'
import applicantUaer from '@/pages/applicant_contact/index'

export default [
  {
    // path: '/:userId/:age?/:storeId?',
    // path: '/:userId?/:age?/:storeId?',
    path: '/',
    name: '主页',
    component: Home,
    meta: {
      title: '淘个卡',
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
    path: '/application_guide',
    name: 'sqzn',
    component: ApplicationGuide,
    meta: {
      title: '信用卡-申请指南',
      page: 'homePage',
      requireAuth: false
    }
  },
  {
    // 普通用户申请办理信用卡（填写个人资料）
    path: '/apply_credit_card_form',
    name: '填写申请人信息',
    component: ApplicantForm,
    meta: {
      title: '填写申请人信息',
      page: 'homePage',
      requireAuth: true
    }
  },
  {
    path: '/applicant_uaer',
    name: '申请成功，等待授权',
    component: applicantUaer,
    meta: {
      title: '申请成功，等待授权',
      page: 'homePage',
      requireAuth: true
    }
  },
  {
    // 申请成为会员（填写个人资料）
    path: '/be_agent_form',
    name: '填写会员信息',
    component: ApplicantForm,
    meta: {
      title: '填写会员信息',
      page: 'homePage',
      requireAuth: true
    }
  },
  {// 银行卡申请
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
    path: '/customer',
    name: '推荐人',
    component: customer,
    meta: {
      title: '推荐人',
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
    path: '/posters',
    name: '专属海报',
    component: posters,
    meta: {
      title: '专属海报',
      page: 'homePage',
      requireAuth: true
    }
  },
  {
    path: '/friends',
    name: '邀请好友',
    component: friends,
    meta: {
      title: '邀请好友',
      page: 'homePage',
      requireAuth: true
    }
  },
  {
    path: '/mylink',
    name: '邀请链接',
    component: mylink,
    meta: {
      title: '邀请链接',
      page: 'homePage',
      requireAuth: true
    }
  },
  {
    path: '/mypostrs',
    name: '邀请海报',
    component: mypostrs,
    meta: {
      title: '邀请海报',
      page: 'homePage',
      requireAuth: true
    }
  },
  {
    path: '/newpage',
    name: '加入淘个卡',
    component: newpage,
    meta: {
      title: '加入淘个卡',
      page: 'newpage',
      requireAuth: true
    }
  },
  {
    path: '/notice',
    name: '系统通知',
    component: notice,
    meta: {
      title: '系统通知',
      page: 'newpage',
      requireAuth: true
    }
  },
  {
    path: '/waitFor',
    name: '通知',
    component: waitFor,
    meta: {
      title: '通知',
      page: 'newpage',
      requireAuth: true
    }
  }
]
