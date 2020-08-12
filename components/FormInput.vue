<template>
  <div
    style="
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    "
  >
    <input id="value" v-model="value" type="search" syle="width: 80%;" />
    <label for="value">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      value: '',
    }
  },
}
</script>

<style scoped>
input {
  /*width: 80%;*/
  flex-grow: 4;
  height: 30px;
  padding: 0 5px;
  border: none;
}
label {
  text-transform: uppercase;
  color: #e2e2e2;
  font-size: small;
  /*flex-grow: 1;*/
}
</style>
