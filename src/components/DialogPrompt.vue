<template>
  <md-dialog-prompt
      :md-active.sync="status"
      v-model="value"
      :md-title="title"
      :md-input-maxlength="maxLength"
      :md-input-placeholder="placeholder"
      :md-confirm-text="confirmText" />
</template>

<script>
export default {
  name: 'DialogPrompt',

  props: ['title', 'maxLength', 'placeholder', 'confirmText', 'status'],

  data() {
      return {
          value: ''
      }
  }
}
</script>
