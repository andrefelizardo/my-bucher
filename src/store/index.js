import Vue from 'vue'
import Vuex from 'Vuex'
import config from '../../config-front'
import axios from 'axios'
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
      for (let i = 0, total = store.books.length; i < total; i++) {
        if (store.books[i]._id === obj.id) {
          store.books[i].loan = {
            friend: obj.friend,
            status: true
          }
        }
      }
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
    LOAD_BOOKS_DB ({ commit }) {
      commit('SET_LOADING', true)
      axios.get(`${api}/books`, {crossdomain: true})
      .then((response) => {
        commit('GET_BOOKS_DB', response.data)
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        console.error('Falha em carregar os livros: ', error)
        commit('SET_LOADING', false)
      })
    },
    ADD_BOOK_DB ({ commit }, book) {
      return new Promise((resolve, reject) => {
        commit('SET_LOADING', true)
        axios.post(`${api}/books`, {
          title: book.title,
          author: book.author,
          category: book.category,
          cover: book.cover
        })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          commit('SET_LOADING', false)
          reject(error)
        })
      })
    },
    UPDATE_BOOK_DB ({ commit }, book) {
      return new Promise((resolve, reject) => {
        commit('SET_LOADING', true)
        axios.put(`${api}/books/${book._id}`, {
          title: book.title,
          author: book.author,
          category: book.category,
          cover: book.cover,
          loan: book.loan
        })
        .then((response) => {
          resolve(response)
          commit('SET_LOADING', false)
        })
        .catch((error) => {
          commit('SET_LOADING', false)
          reject(error)
        })
      })
    },
    LEND_BOOK_DB ({ commit }, loan) {
      return new Promise((resolve, reject) => {
        commit('SET_LOADING', true)
        axios.put(`${api}/books/loan/${loan.id}`, {
          loan: {
            status: loan.status,
            friend: loan.friend
          }
        })
        .then((response) => {
          resolve(response)
          commit('SET_LOADING', false)
        })
        .catch((error) => {
          commit('SET_LOADING', false)
          reject(error)
        })
      })
    },
    MARK_READ ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit('SET_LOADING', true)
        axios.put(`${api}/books/read/${obj.id}`, {
          status: obj.status
        })
        .then((response) => {
          resolve(response)
          commit('SET_LOADING', false)
        })
        .catch((error) => {
          reject(error)
          commit('SET_LOADING', false)
        })
      })
    }
  }
})
