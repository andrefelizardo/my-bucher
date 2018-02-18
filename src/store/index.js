import Vue from 'vue'
import Vuex from 'Vuex'
const config = require('../../config')
const api = config.api

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: []
  },
  mutations: {
    ADD_BOOK (store, obj) {
      store.books.push(obj)
    },
    LEND_BOOK (store, obj) {
      store.books[obj.pos].loan.friend = obj.friend
      store.books[obj.pos].loan.status = true
    },
    RETURN_BOOK (store, pos) {
      store.books[pos].loan.friend = null
      store.books[pos].loan.status = false
    },
    UPDATE_BOOK (store, obj) {
      const pos = obj.pos
      const book = obj.obj
      store.books[pos] = book
    }
  },
  actions: {
    LOAD_BOOKS: function ({ commit }) {
      fetch(`${api}/books`)
      .then((response) => {
        response.json().then((data) => {
          for (let i = 0, len = data.length; i < len; i++) {
            commit('ADD_BOOK', data[i])
          }
        })
      })
      .catch((error) => {
        console.error('Falha em carregar os livros: ', error)
      })
    }
  }
})
