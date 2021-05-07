import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/studyroom',
      name: 'Studyroom',
      component: () => import('@/views/studyroom/index')
    },
    {
      path: '/seat',
      name: 'Seat',
      component: () => import('@/views/seat/index')
    }
  ]
})
