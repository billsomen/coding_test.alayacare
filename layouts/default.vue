<template>
  <div class="main-template">
    <div class="page-header">
      <header-button text="Home">
        <template v-slot:image><Logo /></template>
      </header-button>
      <header-button text="Jessica">
        <template v-slot:image>
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          >
          </el-avatar>
        </template>
      </header-button>
    </div>
    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '~/components/Logo.vue'
import HeaderButton from '~/components/_ui/HeaderButton.vue'
export default Vue.extend({
  components: { Logo, HeaderButton },
})
</script>

<style>
body {
  font-family: Roboto, serif;
}

.vs-button__content {
  padding: 0;
}

.main-template {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.page-header {
  height: 60px;
  width: 95%;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
  margin-top: 20px;
  /*padding: 0 5px 0 5px;*/
  border-radius: 30px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
