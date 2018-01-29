<template>
    <main class="main">
        <form novalidate class="md-layout-row md-gutter" @submit.prevent="validateBook">
            <md-card class="md-flex-50 md-flex-small-100">
                <md-card-header>
                    <div class="md-title" v-if="!isEdit">Preencha os dados do livro</div>
                    <div class="md-title" v-else>Deseja mudar alguma informação do livro?</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout-row md-layout-wrap md-gutter">
                        <div class="md-flex md-flex-small-100">
                            <md-field :class="{ 'md-invalid': error.title.minlength }">
                                <label for="title">Título</label>
                                <md-input name="title" id="title" v-model="form.title" required></md-input>
                                <span class="md-error" v-show="error.title.minlength">Título do livro deve ter pelo menos 4 caracteres</span>
                            </md-field>
                        </div>

                        <div class="md-flex md-flex-small-100">
                            <md-field :class="{ 'md-invalid': error.author.minlength }">
                                <label for="author">Autor</label>
                                <md-input name="author" id="author" v-model="form.author" required></md-input>
                                <span class="md-error">O nome do autor deve ter pelo menos 4 caracteres</span>
                            </md-field>
                        </div>

                        <div class="md-flex md-flex-small-100">
                            <md-field>
                                <label for="description">Descrição</label>
                                <md-input maxlength="100" v-model="form.description"></md-input>
                            </md-field>
                        </div>

                        <div class="md-flex md-flex-small-100">
                            <md-field>
                                <label for="category">Categoria</label>
                                <md-select name="category" id="category" v-model="form.category" required>
                                    <md-option value="administration">Administração</md-option>
                                    <md-option value="art">Arte</md-option>
                                    <md-option value="self-help">Autoajuda</md-option>
                                    <md-option value="computing">Computação</md-option>
                                    <md-option value="novel">Romance</md-option>
                                </md-select>
                            </md-field>
                        </div>

                        <div class="md-flex md-flex-small-100">
                            <md-field>
                                <label for="cover">Capa (URL)</label>
                                <md-input type="url" v-model="form.cover"></md-input>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending" />

                <md-card-actions>
                    <md-button class="md-secondary" v-if="isEdit" @click="goToList">Cancelar</md-button>

                    <md-button type="submit" class="md-primary" :disabled="sending || !isValid" v-if="!isEdit">Adicionar livro</md-button>
                    <md-button type="submit" class="md-primary" :disabled="sending || !isValid" v-else>Editar livro</md-button>
                </md-card-actions>

            </md-card>
        </form>
        <dialog-custom title='Sucesso!' content='Livro cadastrado com sucesso' button-secondary='Cadastrar mais' button-primary='Ver livros cadastrados' :status='showDialog' v-on:firstAction='goToList' v-on:secondAction='clearForm'></dialog-custom>

            <md-snackbar md-position="center" :md-duration="3000" :md-active.sync="showSnackbar" md-persistent>
                <span>Livro editado com sucesso. Você será redirecionado para a lista de livros.</span>
            </md-snackbar>
    </main>
</template>

<script>
import DialogCustom from "./Dialog";

export default {
  data() {
    return {
      sending: false,
      showDialog: false,
      showSnackbar: false,

      error: {
        title: {
          minlength: false
        },
        author: {
          minlength: false
        }
      },

      form: {
        title: "",
        author: "",
        description: "",
        category: "",
        cover: "",
        loan: {
          status: false,
          friend: ""
        },
        read: false
      },

      posBook: null
    };
  },

  components: {
    DialogCustom
  },

  mounted: function() {
    const id = this.$route.params.id;

    if (id) {
      const books = this.$store.state.books;
      const bookToEdit = books.filter(book => {
        return book.id == id;
      });

      this.form = bookToEdit[0];

      const findPos = function(book) {
        if (book.id == bookToEdit[0].id) {
          return index;
        }
      };

      const bookId = bookToEdit[0].id;
      this.posBook = books.findIndex(elem => elem.id == bookId);
    }
  },

  methods: {
    validateBook() {
      this.sending = true;
      const errors = document.querySelectorAll(".md-invalid");
      for (let i = 0, total = errors.length; i < total; i++) {
        errors[i].classList.remove("md-invalid");
      }

      if (this.form.title.length < 4) {
        this.error.title.minlength = true;
        return;
      } else {
        this.error.title.minlength = false;
      }

      if (this.form.author.length < 4) {
        this.error.author.minlength = true;
        return;
      } else {
        this.error.author.minlength = false;
      }

      this.registerBook();
    },

    registerBook() {
      if (!this.isEdit) {
        this.$store.commit("ADD_BOOK", this.form);
        this.showDialog = true;
        this.sending = false;
        return;
      }

      const payload = {
        pos: this.posBook,
        obj: this.form
      };

      this.$store.commit("UPDATE_BOOK", payload);
      this.sending = false;
      this.showSnackbar = true;
      window.setTimeout(() => this.goToList(), 3000);
    },

    clearForm() {
      this.form = {
        title: "",
        author: "",
        description: "",
        category: "",
        cover: "",
        loan: {
          status: false,
          friend: ""
        },
        read: false
      };

      this.showDialog = false;
    },

    goToList() {
      this.$router.push("/");
    }
  },

  computed: {
    isValid: function() {
      return (
        this.form.title !== "" &&
        this.form.author !== "" &&
        this.form.category !== ""
      );
    },

    isEdit: function() {
      return this.$route.params.id;
    }
  }
};
</script>
