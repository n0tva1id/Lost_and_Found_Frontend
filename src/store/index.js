import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);
const path_title_array = [['/', '沙邮失物招领'], ['/publish', '发布'], ['/person', '个人中心'], ['/content', '物品详情'], ['/login', '登录'],['/user', '用户信息']];
const state = {
  //这是总体的api页面所在。
  // 目前在使用反代，故此处暂时不用
  // 更改api地址时请去config/index.js中修改反代的路径
  // svrUrl: 'http://drivers.bupt.cf:4000/api',
  titleMap: new Map(path_title_array),
  tabValue: '首页',
  TypeValue: ''
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
