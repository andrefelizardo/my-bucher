<template>
  <div>
      <main class="main">
        <list-empty icon='book' label='Cadastre seu primeiro livro' description='Cadastrando livros você vai poder gerenciá-los, controlar empréstimos e também marcar os já lidos.' text-button='Cadastrar primeiro livro' v-on:goTo='goToAddBook' v-if="allBooks.length < 1"></list-empty>
        <div v-else>
            <div class="md-row">
                <md-field md-inline>
                    <label>nome ou autor</label>
                    <md-input @keyup="searchBooks" v-model.lazy="textSearch"></md-input>
                </md-field>
            </div>
            <div class="md-row">
                <div class="md-layout md-gutter md-alignment-top-center">
                    <div class="md-layout-item md-xsmall-size-100 md-small-size-45 md-medium-size-30 md-size-30" v-for="(book, index) in books">
                        <md-card>
                            <md-card-media-cover md-solid>
                                <md-card-media>
                                    <img :src="book.cover" :alt="book.title">
                                </md-card-media>

                                <md-card-area class="area-custom">
                                <md-card-header>
                                    <span class="md-title">{{ book.title }}</span>
                                    <span class="md-subtitle">{{ book.author }}</span>
                                </md-card-header>

                                <md-card-content>{{ book.description }}</md-card-content>

                                <md-card-actions md-alignment="space-between">
                                    <md-button v-if="!book.loan.status" @click="openDialogPrompt(book._id)">Emprestar</md-button>
                                    <md-button v-else @click="openLoanData(book._id, index)">Emprestado</md-button>
                                    <div>

                                        <md-button class="md-icon-button" v-if="!book.read" @click="(book.read = !book.read, readBook(book._id, book.read))">
                                            <md-tooltip md-direction="top">Marcar livro como lido</md-tooltip>
                                            <md-icon>check_box_outline_blank</md-icon>
                                        </md-button>
                                        <md-button class="md-icon-button" v-else @click="(book.read = !book.read, readBook(book._id, book.read))">
                                            <md-tooltip md-direction="top">Desmarcar livro como lido</md-tooltip>
                                            <md-icon>check_box</md-icon>
                                        </md-button>

                                        <md-button class="md-icon-button" @click="showInfo(index)">
                                            <md-tooltip md-direction="top">Veja as informações do livro</md-tooltip>
                                            <md-icon>info</md-icon>
                                        </md-button>
                                    </div>
                                    
                                </md-card-actions>
                                </md-card-area>
                            </md-card-media-cover>
                        </md-card>
                    </div>
                </div>
            </div>
            <dialog-prompt title='Você emprestou este livro?' confirm-text='Emprestar' max-length='20' placeholder='Digite o nome do amigo ou amiga' :status='openPrompt' v-on:confirmPrompt='lendBook' v-on:cancelPrompt='closePrompt'></dialog-prompt>
            <dialog-custom title='Esse livro está emprestado!' :content='contentLoan' button-primary='Foi devolvido!' button-secondary='Voltar' :status='showDialog' v-on:firstAction='returnBook' v-on:secondAction='closeLoanData'></dialog-custom>

            <md-dialog :md-active.sync="showDialogInfo" v-if="showDialogInfo">
                <md-dialog-title>Informações do livro</md-dialog-title>
                <md-dialog-content>
                    <p><strong>Nome do livro: </strong> {{ book.title }}</p>
                    <p><strong>Autor(a): </strong> {{ book.author }}</p>
                    <p v-if="book.description"><strong>Descrição: </strong> {{ book.description }}</p>
                    <p v-else><strong>Livro sem descrição cadastrada</strong></p>
                    <p><strong>Status: </strong> 
                        <span v-if="book.loan.status">emprestado a {{book.loan.friend}}</span>
                        <span v-else>Livro não emprestado</span>
                    </p>
                    <p><strong>Lido: </strong>
                        <span v-if="book.read">Sim</span>
                        <span v-else>Não</span>
                    </p>
                </md-dialog-content>
                <md-dialog-actions>
                  <md-button @click="editBook()">Editar livro</md-button>
                    <md-button class="md-primary" @click="showDialogInfo = false">Fechar</md-button>
                </md-dialog-actions>
            </md-dialog>

            <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
                <span>{{snackText}}</span>
            </md-snackbar>
        </div>
      </main>
  </div>
</template>

<script>
import ListEmpty from './ListEmpty'
import DialogPrompt from './DialogPrompt'
import DialogCustom from './Dialog'

export default {
  name: 'ListBooks',

  mounted () {
    this.$store.dispatch('LOAD_BOOKS_DB')
  },

  data () {
    return {
      books: this.$store.state.books,

      book: null,
      selectedBook: null,
      indexBook: null,
      textSearch: null,
      contentLoan: null,
      openPrompt: false,
      showDialog: false,
      showDialogInfo: false,
      snackText: null,
      showSnackbar: false
    }
  },

  methods: {
    searchBooks: function () {
      const text = this.textSearch.toLowerCase()
      const allBooks = this.allBooks

      const newBooks = allBooks.filter(
        book =>
          book.title.toLowerCase().includes(text) ||
          book.author.toLowerCase().includes(text)
      )

      this.books = newBooks
    },

    goToAddBook: function () {
      this.$router.push('book')
    },

    openDialogPrompt (id) {
      this.selectedBook = id
      this.openPrompt = true
    },

    lendBook (name) {
      const loan = {
        friend: name,
        status: true,
        id: this.selectedBook
      }

      this.$store.dispatch('LEND_BOOK_DB', loan)
      .then(response => {
        this.$store.commit('LEND_BOOK', loan)
        this.snackText = `Livro emprestado para ${loan.friend}`
        this.showSnackbar = true
        this.closePrompt()
      }, error => {
        console.log(error)
        this.snackText = 'Erro ao emprestar livro. Tente novamente mais tarde.'
        this.showSnackbar = true
        this.closePrompt()
      })

      this.closePrompt()
    },

    openLoanData (id, index) {
      this.showDialog = true
      this.selectedBook = id
      this.indexBook = index
      const friendName = this.allBooks[index].loan.friend
      this.contentLoan = `Livro emprestado para ${friendName}.`
    },

    closeLoanData () {
      this.showDialog = false
    },

    closePrompt () {
      this.openPrompt = false
    },

    returnBook () {
      const loan = {
        name: null,
        status: false,
        id: this.selectedBook
      }
      this.$store.dispatch('LEND_BOOK_DB', loan)
      .then(response => {
        this.$store.commit('RETURN_BOOK', this.indexBook)
        this.snackText = 'Livro devolvido com sucesso. Que amigo legal você tem!'
        this.showSnackbar = true
        this.closeLoanData()
      }, error => {
        console.log(error)
        this.snackText = 'Erro ao devolver livro, tente novamente mais tarde.'
        this.showSnackbar = true
        this.closeLoanData()
      })
    },

    showInfo (index) {
      this.book = this.$store.state.books[index]
      this.showDialogInfo = true
    },

    editBook () {
      this.$router.push({ name: 'EditBook', params: { id: this.book._id } })
    },

    updateBooks () {
      this.books = this.$store.state.books
    },

    readBook (id, status) {
      const obj = {
        id: id,
        status: status
      }
      this.$store.dispatch('MARK_READ', obj)
    }
  },

  components: {
    ListEmpty,
    DialogPrompt,
    DialogCustom
  },

  computed: {
    allBooks () {
      this.updateBooks()
      return this.$store.state.books
    }
  }
}
</script>

<style scoped>
.md-card-media-cover {
  min-height: 400px;
}
.md-layout-item {
  margin-bottom: 2em;
}
.md-card-area.area-custom {
  background: rgba(0, 0, 0, 0.75) !important;
}
</style>
