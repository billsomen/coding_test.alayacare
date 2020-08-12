<template>
  <vs-avatar circle>
    <img :src="uri" alt="user-avatar" />
  </vs-avatar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Avatar',
  data() {
    return {
      uri: '/avatar.svg',
    }
  },
})
</script>

<style scoped></style>
