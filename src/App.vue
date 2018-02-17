<template>
  <div id="app">
    <header-main></header-main>
    <router-view/>
  </div>
</template>

<script>
import HeaderMain from '@/components/HeaderMain'

export default {
  name: 'app',

  components: {
    HeaderMain
  },

  data () {
    return {}
  },

  methods: {}
}
</script>

<style>
.menu-icon {
  margin-right: 25px;
}

.main {
  margin: 50px 80px 0;
}
@media screen and (max-width: 950px) {
  .main {
    margin-left: 30px;
    margin-right: 30px;
  }
}
</style>
