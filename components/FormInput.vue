<template>
  <div
    style="
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid grey;
      padding: 0 5px;
      width: 100%;
    "
  >
    <input id="value" v-model="value" type="search" syle="width: 80%;" />
    <label for="value" styl="width: fit-content;">Cardholder name</label>
  </div>
</template>

<script>
export default {
  name: 'FormInput',
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
  color: #7f828b;
  /*flex-grow: 1;*/
}
</style>
