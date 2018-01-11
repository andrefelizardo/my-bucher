import Vue from 'vue'
import Router from 'vue-router'
import ListBooks from '@/components/ListBooks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ListBooks',
      component: ListBooks
    }
  ]
})
