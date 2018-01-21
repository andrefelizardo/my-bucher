import Vue from 'vue'
import Router from 'vue-router'
import ListBooks from '@/components/ListBooks'
import AddBook from '@/components/AddBook'
import ListFriends from '@/components/ListFriends'

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
    },
    {
      path: '/list-friends',
      name: 'ListFriends',
      component: ListFriends
    }
  ]
})
