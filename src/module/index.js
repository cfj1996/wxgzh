/**
 * @author ZGY
 * @date 2018/7/23 0023
 * @Description: 注册自定义组件
 */
import fieldArrow from './fieldArrow'
import btnOnce from './btnOnce'
import loadList from './loadList'
import dialog from './dialog'
const ZgyComponent={
  install(Vue){ //核心部分，在我们使用Vue.use()时，自动调用的是install，而install导出的必须是的组件
    Vue.component(fieldArrow.name,fieldArrow);
    Vue.component(btnOnce.name,btnOnce);
    Vue.component(loadList.name,loadList);
    Vue.component(dialog.name,dialog);
  }
};
export default ZgyComponent
