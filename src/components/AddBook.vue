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
                            <md-field>
                                <label for="title">Título</label>
                                <md-input name="title" id="title" v-model="form.title" required></md-input>
                                <span class="md-error">Título é obrigatório</span>
                                <span class="md-error" v-if="form.error">Título do livro deve ter pelo menos 4 caracteres</span>
                            </md-field>
                        </div>

                        <div class="md-flex md-flex-small-100">
                            <md-field>
                                <label for="author">Autor</label>
                                <md-input name="author" id="author" v-model="form.author" required></md-input>
                                <span class="md-error">Autor é obrigatório</span>
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
                                <label for="cover">Capa</label>
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

            <md-snackbar>O livro tal foi salvo com sucesso!</md-snackbar>
        </form>
    </main>
</template>

<script>
export default {
  data () {
      return {
          sending: false,

          form: {
              title: '',
              author: '',
              description: '',
              category: '',
              cover: '',
              loan: false,
              read: false
          }
      }
  },

  methods: {
      validateBook: function() {
          if (this.form.title.length < 4)
            this.title.error = true
      }
  },

  computed: {
      isValid: function() {
          return this.form.title !== '' && this.form.author !== '' && this.form.category !== ''
      }
  }
}
</script>

<style scoped>

</style>
