<template>
    <md-dialog :md-active.sync="status" :md-click-outside-to-close='false' :md-close-on-esc='false'>
        <md-dialog-title>{{ title }}</md-dialog-title>
        <md-dialog-content>{{ content }}</md-dialog-content>
        <md-dialog-actions>
            <md-button class="md-secondary" @click="buttonSecondaryAction" v-if="buttonSecondary">{{ buttonSecondary }}</md-button>
            <md-button class="md-primary" @click="buttonPrimaryAction" v-if="buttonPrimary">{{ buttonPrimary }}</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script>
export default {
  name: "Dialog",

  props: ["title", "content", "buttonPrimary", "buttonSecondary", "status"],

  methods: {
    buttonPrimaryAction() {
      this.$emit("firstAction")
    },

    buttonSecondaryAction() {
      this.$emit("secondAction")
    }
  }
};
</script>
