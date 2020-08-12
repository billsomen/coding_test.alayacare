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

<style scoped>
.header-button {
  border-radius: 25px;
  padding: 5px;
  height: 50px;
}

.header-button-content {
  display: flex;
  align-items: center;
  width: fit-content;
  justify-content: space-between;
}
.text-view {
  margin-left: 5px;
  color: #7f828b;
}
</style>
