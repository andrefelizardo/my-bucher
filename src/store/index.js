import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: []
  },
  mutations: {
    ADD_BOOK (store, obj) {
      store.books.push(obj)
    }
  }
})
