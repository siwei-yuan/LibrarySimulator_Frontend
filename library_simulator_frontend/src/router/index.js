import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/studyroom',
      name: 'layout',
      component: () => import('@/views/layout'),
      children: [{
        path: '/studyroom',
        name: 'studyroom',
        component: () => import('@/views/studyroom/index')
      },
      {
        path: '/seat',
        name: 'seat',
        component: () => import('@/views/seat/index')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/index')
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index')
    }
  ]
})
