<template>
  <vs-avatar circle>
    <img :src="logoUri" alt="app-logo-uri" />
  </vs-avatar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Logo',
  data() {
    return {
      logoUri: '/alayacare.logo.jpg',
    }
  },
})
</script>

<style scoped></style>
