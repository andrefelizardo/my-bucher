<template>
  <md-empty-state
      md-icon="book"
      md-label="Cadastre seu primeiro livro"
      md-description="Cadastrando livros você vai poder gerenciá-los, controlar empréstimos e também marcar os já lidos.">
      <md-button class="md-primary md-raised" @click="goToAddBook">Cadastrar primeiro livro</md-button>
    </md-empty-state>
</template>

<script>
export default {
  name: 'ListEmpty',

  methods: {
      goToAddBook () {
          this.$router.push('add-book')
      }
  }
}
</script>

<style>

</style>
