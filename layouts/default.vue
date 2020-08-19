<template>
  <div class="main-template">
    <div class="page-header">
      <header-button>
        <template v-slot:image>
          <avatar :uri="logoUri" alt="logo-icon" />
        </template>
      </header-button>
      <header-button>
        <template v-slot:image>
          <avatar :uri="userUri" alt="user-icon" />
        </template>
      </header-button>
    </div>
    <nuxt class="page-container" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Avatar from '~/components/Avatar.vue'
import HeaderButton from '~/components/_ui/HeaderButton.vue'

export default Vue.extend({
  components: { Avatar, HeaderButton },
  data() {
    return {
      userUri: '/avatar.svg',
      logoUri: '/alayacare.logo.jpg',
    }
  },
})
</script>
