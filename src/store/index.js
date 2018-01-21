import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: [],
    frieds: []
  },
  mutations: {
    ADD_BOOK (store, obj) {
      store.books.push(obj)
    },
    ADD_FRIEND (store, obj) {
      store.friends.push(obj)
    }
  }
})
