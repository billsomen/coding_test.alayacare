<template>
  <div
    class="input-wrapper"
    style="
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    "
    @click.prevent="onClick"
  >
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
      :options="options"
      required
      name="card"
    />
    <label :for="inputId">
      <span v-if="isValid" class="valid">{{ label }}</span>
      <span v-else class="not-valid text-error">{{ label }}</span>
    </label>
  </div>
</template>

<script>
import ValidatorObject from '~/static/js/validator'
const Validator = new ValidatorObject()

export default {
  name: 'FormInput',
  props: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cardNumber: null,
      value: '',
      inputId: new Date().getTime(),
    }
  },
  computed: {
    isValid() {
      const input = this.value.replace(' ', '')
      const { key, roles } = this.$props.options
      const flag = Validator.validate({ input, ...this.$props.options }, roles)
      this.$emit('onEdit', { key, flag })
      return flag
    },
  },
  methods: {
    onClick() {
      if (this.$refs.inputElement.$el) {
        this.$refs.inputElement.$el.focus()
      } else {
        this.$refs.inputElement.focus()
      }
    },
  },
}
</script>
