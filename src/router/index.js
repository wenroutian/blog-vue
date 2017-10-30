import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

  const routes =  [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            component: resolve => require(['../components/Home.vue'], resolve),
            children:[
                {
                    path: '/account',
                    component: resolve => require(['../components/page/AccountForm.vue'], resolve)
                },
              {
                path: '/baseform',
                component: resolve => require(['../components/page/BaseForm.vue'], resolve)
              },
                {
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve)
                },
                 {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/DragList.vue'], resolve)
                },
              {
                path: '/form',
                component: resolve => require(['../components/form/form.vue'], resolve)
              }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
const router = new Router({
  routes,
  mode: 'hash', //default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {

  let toName = to.name
  // let fromName = from.name
  let is_login = true

  if (!is_login && toName !== 'login') {
    next({
      name: 'login'
    })
  } else {
    if (is_login && toName === 'login') {
      next({
        path: '/home'
      })
    } else {
      next()
    }
  }
})


export default router


