<template>
  <div>
    <div v-if="!isValid" style="position: relative; top: 0;">
      <i
        v-for="(message, key) in generateErrorMessage(validatorFlags.flag)"
        :key="key"
        style="color: red; font-size: 10px;"
        class="text-error"
      >
        {{ message }}
      </i>
    </div>
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
        <!--        <span>{{ label }}</span>-->
        <span v-if="isValid" class="valid">{{ label }}</span>
        <span v-else class="not-valid text-error">{{ label }}</span>
      </label>
    </div>
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
    validatorFlags(): any {
      const input = this.value.replace(' ', '')
      const { key, roles, name } = this.$props.options
      const flag = Validator.validate({ input, ...this.$props.options }, roles)
      return { flag, key, name }
    },
    isValid(): boolean {
      if (this.validatorFlags) {
        const { key, flag, name } = this.validatorFlags
        this.$emit('onEdit', { key, flag, name, value: this.value })
        return flag.all
      }
      return false
      // this.$emit('onEdit', { key, flag })
      // return this.validatorFlags.flag.all
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
    generateErrorMessage(flags): string[] {
      return Validator.errorMessages(flags)
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
