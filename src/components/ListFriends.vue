<template>
    <div>
        <main class="main">
            <list-empty icon='wc' label='Cadastre seu primeiro amigo' description='Que tal cadastrar amigos e controlar pra quem você emprestou aquele livro?' text-button='Cadastrar amigo' v-on:goTo='goToAddFriend'></list-empty>
        </main>
    </div>
</template>

<script>
import ListEmpty from "./ListEmpty";

export default {
  name: "ListFriends",

  components: {
    ListEmpty
  },

  methods: {
    goToAddFriend() {
        this.$router.push('add-friend')
    }
  }
};
</script>
