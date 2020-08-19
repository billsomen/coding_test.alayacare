<template>
  <vs-button danger flat class="header-button">
    <div class="header-button-content">
      <slot name="image"></slot>
      <span v-if="text" class="text-view">
        {{ text }}
      </span>
    </div>
  </vs-button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'HeaderButton',
  props: {
    text: {
      required: false,
      type: String,
      default: () => null,
    },
  },
  data: () => ({
    active: 0,
  }),
})
</script>
