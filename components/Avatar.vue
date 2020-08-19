<template>
  <vs-avatar circle>
    <img :src="uri" :alt="alt" />
  </vs-avatar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Avatar',
  props: {
    uri: {
      required: true,
      type: String,
    },
    alt: {
      required: true,
      type: String,
    },
  },
})
</script>
