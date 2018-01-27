import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: []
  },
  mutations: {
    ADD_BOOK (store, obj) {
      const id = store.books.length + 1
      obj.id = id

      store.books.push(obj)
    },
    LEND_BOOK (store, obj) {
      store.books[obj.pos].loan.friend = obj.friend
      store.books[obj.pos].loan.status = true
    },
    RETURN_BOOK (store, pos) {
      store.books[pos].loan.friend = null
      store.books[pos].loan.status = false
    }
  }
})
