<template>
  <div class="input-wrapper" @click="onClick">
    <cleave
      v-if="options.cleave"
      :id="inputId"
      ref="inputElement"
      v-model="value"
      :options="options"
      required
      name="card"
    ></cleave>
    <input
      v-else
      :id="inputId"
      ref="inputElement"
      v-model="value"
      type="text"
      required
      name="card"
    />
    <label :for="inputId">
      <span v-if="isValid" class="valid">{{ label }}</span>
      <span v-else class="not-valid text-error">{{ label }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ValidatorObject from '~/static/js/validator'
const Validator = new ValidatorObject()

export default Vue.extend({
  name: 'FormInput',
  props: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: true,
      validator: (prop: Object) => {
        const keys = Object.keys(prop)
        return ['key', 'roles'].every((key) => keys.includes(key))
      },
    },
  },
  data() {
    return {
      value: '',
      inputId: new Date().getTime(),
    }
  },
  computed: {
    isValid(): boolean {
      const input = this.value.replace(' ', '')
      const { key, roles } = this.$props.options
      const flag = Validator.validate({ input, ...this.$props.options }, roles)
      this.$emit('onEdit', { key, flag })
      return flag
    },
  },
  methods: {
    onClick(): void {
      const input: any = this.$refs.inputElement
      if (input.$el) {
        input.$el.focus()
      } else {
        input.focus()
      }
    },
  },
})
</script>

<style>
.input-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
