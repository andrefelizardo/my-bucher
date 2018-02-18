import Vue from 'vue'
import Vuex from 'Vuex'
import config from '../../config-front'
const api = config.api

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: [],
    loading: false
  },
  mutations: {
    ADD_BOOK (store, obj) {
      store.books.push(obj)
    },
    GET_BOOKS_DB (store, obj) {
      if (store.books.length > 0) {
        store.books = []
      }
      for (let i = 0, len = obj.length; i < len; i++) {
        store.books.push(obj[i])
      }
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
    },
    SET_LOADING (store, status) {
      store.loading = status
    }
  },
  actions: {
    LOAD_BOOKS: function ({ commit }) {
      commit('SET_LOADING', true)
      fetch(`${api}/books`)
      .then((response) => {
        response.json().then((data) => {
          commit('GET_BOOKS_DB', data)
          commit('SET_LOADING', false)
        })
      })
      .catch((error) => {
        console.error('Falha em carregar os livros: ', error)
        commit('SET_LOADING', false)
      })
    }
  }
})
