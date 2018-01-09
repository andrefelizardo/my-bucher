<template>
  <div class="phone-viewport">
    <md-toolbar>
      <h1 class="md-title">{{ title }}</h1>

      <input type="text" v-model="title">
    </md-toolbar>
  </div>
</template>

<script>

export default {
  name: 'app',
  
  data() {
    return {
      title: 'E-commerce :: André Felizardo'
    }
  },

  components: {
    
  }
}
</script>

<style>

</style>
