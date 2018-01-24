import Vue from 'vue'
import Router from 'vue-router'
import ListBooks from '@/components/ListBooks'
import AddBook from '@/components/AddBook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ListBooks',
      component: ListBooks
    },
    {
      path: '/add-book',
      name: 'AddBook',
      component: AddBook
    }
  ]
})
