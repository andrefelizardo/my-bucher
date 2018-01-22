<template>
    <main class="main">
        <form novalidate class="md-layout-row md-gutter" @submit.prevent="validateBook">
            <md-card class="md-flex-50 md-flex-small-100">
                <md-card-header>
                    <div class="md-title">Preencha os dados do livro</div>
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
                    <md-button type="submit" class="md-primary" :disabled="sending || !isValid">Adicionar livro</md-button>
                </md-card-actions>

            </md-card>
        </form>
        <dialog-custom title='Sucesso!' content='Livro cadastrado com sucesso' button-secondary='Cadastrar mais' button-primary='Ver livros cadastrados' :status='showDialog' v-on:firstAction='goToList' v-on:secondAction='clearForm'></dialog-custom>
    </main>
</template>

<script>
import DialogCustom from './Dialog'

export default {
  data() {
    return {
      sending: false,
      showDialog: false,

      error: {
        title: {
          minlength: false
        },
        author: {
          minlength: false
        }
      },

      form: {
        title: '',
        author: '',
        description: '',
        category: '',
        cover: '',
        loan: {
            status: false,
            friend: ''
        },
        read: false
      }
    };
  },

  components: {
      DialogCustom
  },

  methods: {
    validateBook() {
      this.sending = true;
      const errors = document.querySelectorAll('.md-invalid');
      for (let i = 0, total = errors.length; i < total; i++) {
        errors[i].classList.remove('md-invalid');
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

        this.registerBook()  
    },

    registerBook() {
        this.$store.commit('ADD_BOOK', this.form);
        this.showDialog = true;
        this.sending = false;
    },

    clearForm() {
      this.form = {
        title: '',
        author: '',
        description: '',
        category: '',
        cover: '',
        loan: {
            status: false,
            friend: ''
        },
        read: false
      };

      this.showDialog = false;
    },

    goToList() {
        this.$router.push('/')
    }
  },

  computed: {
    isValid: function() {
      return (
        this.form.title !== '' &&
        this.form.author !== '' &&
        this.form.category !== ''
      );
    }
  }
};
</script>
