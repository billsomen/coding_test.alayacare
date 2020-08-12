<template>
  <!--  <vs-button circle icon success flat>-->
  <vs-avatar circle>
    <img :src="logoUri" alt="app-logo-uri" />
  </vs-avatar>
  <!--  </vs-button>-->
  <!--<vs-button primary flat circle icon>
    <vs-avatar circle>
      <img :src="logoUri" alt="app-logo-uri" />
    </vs-avatar>
  </vs-button>-->
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
