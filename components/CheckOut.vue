<template>
  <div>
    <vs-tabs>
      <vs-tab label="Home">
        <div class="con-tab-ejemplo">
          Home
        </div>
      </vs-tab>
      <vs-tab label="Service">
        <div class="con-tab-ejemplo">
          Service
        </div>
      </vs-tab>
      <vs-tab label="login">
        <div class="con-tab-ejemplo">
          login
        </div>
      </vs-tab>
      <vs-tab disabled label="Disabled">
        <div class="con-tab-ejemplo">
          Disabled
        </div>
      </vs-tab>
      <vs-tab label="Lorem ipsum dolor sit amet">
        <div class="con-tab-ejemplo">
          Lorem ipsum dolor sit amet
        </div>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import vsTabs from '@bit/lusaxweb.vuesax.vs-tabs'

Vue.use(vsTabs)

export default {
  name: 'CheckOut',
}
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
  @import url("https://cdn.jsdelivr.net/npm/vuesax/dist/vuesax.css");
</style>
