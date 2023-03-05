// 路由鉴权

import router from './index'


router.beforeEach((to, from) => {
  const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo")) || {};
  const {
    userName
  } = loginInfo;
  const noLogin = userName ? false : true
  if (noLogin && to.name !== 'login') {
    return {
      name: 'login'
    }
  }

})