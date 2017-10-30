import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            component: resolve => require(['../components/Home.vue'], resolve),
            children:[
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/AccountForm.vue'], resolve)
                },
                {
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve)
                },
                 {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/DragList.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
