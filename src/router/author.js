// 路由鉴权

import router from './index'

const noLogin = false
router.beforeEach((to, from) => {
  if (noLogin && to.name !== 'login') {
    return {
      name: 'login'
    }
  }
})