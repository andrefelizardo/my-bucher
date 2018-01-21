<template>
  <md-empty-state
      :md-icon='icon'
      :md-label='label'
      :md-description='description'>
      <md-button class="md-primary md-raised" @click="callToAction" v-if="textButton">{{ textButton }}</md-button>
    </md-empty-state>
</template>

<script>
export default {
  name: 'ListEmpty',

  props: ['icon', 'label', 'description', 'textButton'],

  methods: {
      callToAction() {
          this.$emit('goTo')
      }
  }
}
</script>

<style>

</style>
