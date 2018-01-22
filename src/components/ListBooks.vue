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
                                    <md-button v-if="!book.loan.status" @click="openDialogPrompt(index)">Emprestar</md-button>
                                    <md-button v-else>Emprestado</md-button>
                                </md-card-actions>
                                </md-card-area>
                            </md-card-media-cover>
                        </md-card>
                    </div>
                </div>
            </div>
            <dialog-prompt title='Com quem esse livro está?' confirm-text='Emprestar' max-length='20' placeholder='Digite o nome do amigo ou amiga' :status='openPrompt' v-on:confirmPrompt='lendBook'></dialog-prompt>
            <dialog-custom title='Empréstimo!' content='Livro emprestado para fulano de tal' button-primary='Foi devolvido!' :status='showDialog' v-on:firstAction='returnBook'></dialog-custom>
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

      selectedBook: '',
      textSearch: '',
      openPrompt: false,
      showDialog: false
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

    returnBook() {

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
