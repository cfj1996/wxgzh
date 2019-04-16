/*
 * @class   过滤器
 * @author  行云流水
 * @date    17.06.02
 */

import Vue from 'vue'
import moment from 'moment'
import { moneyHandler } from './util'

const oFilters = {
  // 筛选不允许thousands()无参调用，需要带thousands('')带空字符串，不然会报错
  /*
   * 时间格式化
   * @param value
   * @param formatString
   * @returns {*}
   */
  moment (value, formatString) {
    if (value) {
      value = Number(value)
      formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
      return moment(value).format(formatString)
    } else {
      return ''
    }
  },
  /*
   * 时间格式化 -毫秒转换为天时分秒
   * @param value
   * @param formatString
   * @returns {*}
   */
  formatDuring(mss) {
    let days = parseInt(mss / (1000 * 60 * 60 * 24));
    let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = (mss % (1000 * 60)) / 1000;
    seconds=parseInt(seconds)
    if(days>0)
      return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
    else if(hours>0)
      return hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
      else if(minutes>0)
        return minutes + " 分钟 " + seconds + " 秒 ";
        else if(seconds>0)
          return seconds + " 秒 ";
          else
            return mss + " 毫秒 ";
  },
    /**
   * 金额格式化
   * @param value
   * @param isPenny  value是否分位数，true为是
     * @param unit 单位，是否带分位，默认带两个0 （只针对整数）
   * @returns {string}
   */
  money (value, isPenny, unit = true) {
    return moneyHandler(value, isPenny, unit)
  },
  /**
   * 千分位转换
   * @param value
   * @returns {string}
   */
  thousands(value){
    value += ''
    let pattern = /(?=((?!\b)\d{3})+$)/g
    return value.replace(pattern, ',')
  },

  /**
   * 手机号码隐藏
   * @param value
   * @returns {string}
   */
  phoneHide (value) {
    value += ''
    let iLen = value.length
    return iLen == 11 ? value.substring(0, 3) + "****" + value.substring(iLen - 4, iLen) : value
  },
  /**
   * 银行卡显示后四位
   * @param value
   * @returns {string}
   */
  card4num (value, len) {
    len = len || 4
    let cardNum = value + '',
      cardLen = cardNum.length
    cardNum = cardNum.split('').splice(cardLen - len, len)
    return cardNum.join('')
  },

}

function Filters() {
  Object.keys(oFilters).forEach(function(key, index){
    Vue.filter(key, oFilters[key])
  })
}

//注册过滤器
export default new Filters()
