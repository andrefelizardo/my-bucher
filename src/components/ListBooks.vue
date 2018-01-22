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
                    <div class="md-layout-item md-xsmall-size-100 md-small-size-45 md-large-size-25" v-for="(book, index) in books">
                        <md-card>
                            <md-card-media-cover md-solid>
                                <md-card-media>
                                    <img :src="book.cover" :alt="book.title">
                                </md-card-media>

                                <md-card-area>
                                <md-card-header>
                                    <span class="md-title">{{ book.title }}</span>
                                    <span class="md-subtitle">{{ book.author }}</span>
                                </md-card-header>

                                <md-card-content>{{ book.description }}</md-card-content>

                                <md-card-actions>
                                    <md-speed-dial class="md-bottom-right" md-direction="top" md-event="click">
                                        <md-speed-dial-target class="md-primary">
                                            <md-icon class="md-morph-initial">add</md-icon>
                                            <md-icon class="md-morph-final">close</md-icon>
                                        </md-speed-dial-target>

                                        <md-speed-dial-content>
                                            <md-button class="md-icon-button">
                                            <md-icon>directions</md-icon>
                                            </md-button>

                                            <md-button class="md-icon-button">
                                            <md-icon>streetview</md-icon>
                                            </md-button>
                                        </md-speed-dial-content>
                                    </md-speed-dial>
                                    <!-- <md-button v-if="!book.loan.status" @click="openDialogPrompt(index)">Emprestar</md-button> -->
                                    <!-- <md-button v-else @click="openLoanData(index)">Emprestado</md-button> -->
                                </md-card-actions>
                                </md-card-area>
                            </md-card-media-cover>
                        </md-card>
                    </div>
                </div>
            </div>
            <dialog-prompt title='Você emprestou este livro?' confirm-text='Emprestar' max-length='20' placeholder='Digite o nome do amigo ou amiga' :status='openPrompt' v-on:confirmPrompt='lendBook'></dialog-prompt>
            <dialog-custom title='Esse livro está emprestado!' :content='contentLoan' button-primary='Foi devolvido!' button-secondary='Voltar' :status='showDialog' v-on:firstAction='returnBook' v-on:secondAction='closeLoanData'></dialog-custom>

            <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
                <span>Livro devolvido com sucesso. Que amigo legal você tem!</span>
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

  data() {
    return {
      books: this.$store.state.books,

      selectedBook: null,
      textSearch: null,
      contentLoan: null,
      openPrompt: false,
      showDialog: false,
      showSnackbar: false
    };
  },

  methods: {
    searchBooks: function() {
      const text = this.textSearch.toLowerCase()
      const books = this.books
      const allBooks = this.allBooks

      const newBooks = allBooks.filter(
        book =>
          book.title.toLowerCase().includes(text) ||
          book.author.toLowerCase().includes(text)
      );

      this.books = newBooks
    },

    goToAddBook: function() {
      this.$router.push("add-book")
    },

    openDialogPrompt(index) {
        this.selectedBook = index
        this.openPrompt = true
    },

    lendBook(name) {
        const loan = {
            friend: name,
            pos: this.selectedBook
        }

        this.$store.commit('LEND_BOOK', loan)

        this.openPrompt = false
    },

    openLoanData(index) {
        this.showDialog = true
        this.selectedBook = index
        const friendName = this.allBooks[index].loan.friend
        this.contentLoan = `Livro emprestado para ${friendName}.`
    },

    closeLoanData() {
        this.showDialog = false
    },

    returnBook() {
        this.$store.commit('RETURN_BOOK', this.selectedBook)
        this.showSnackbar = true

        this.closeLoanData()
    }
  },

  components: {
    ListEmpty,
    DialogPrompt,
    DialogCustom
  },

  computed: {
    allBooks() {
      return this.$store.state.books
    }
  }
};
</script>

<style scoped>
.md-card-media img {
  min-height: 400px;
}
.md-card-content {
  max-height: 80px;
}
.md-layout-item {
    margin-bottom: 2em;
}
</style>
