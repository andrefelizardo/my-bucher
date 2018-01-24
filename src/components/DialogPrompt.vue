<template>
  <md-dialog-prompt
      :md-active.sync="status"
      v-model="value"
      :md-title="title"
      :md-input-maxlength="maxLength"
      :md-input-placeholder="placeholder"
      :md-confirm-text="confirmText"
      @md-confirm="confirmAction()"
      @md-cancel="cancelAction()" />
</template>

<script>
export default {
  name: 'DialogPrompt',

  props: ['title', 'maxLength', 'placeholder', 'confirmText', 'status'],

  data() {
      return {
          value: null
      }
  },

  methods: {
      confirmAction() {
          this.$emit('confirmPrompt', this.value)
          this.value = null
      },

      cancelAction() {
          this.value = null
          this.$emit('cancelPrompt')
      }
  }
}
</script>
