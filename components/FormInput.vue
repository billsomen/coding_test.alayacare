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
const flags = {
  visa: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/,
  mastercard: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
  amex: /^3[47][0-9]{13}$/,
}

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
      const fText = this.value.replace(' ', '')
      const { creditCard, date, cvv, address, key } = this.$props.options
      let flag = false

      if (creditCard) {
        const { cardType } = this.$props.options
        flag = this.checkCard(cardType, this.value)
      }

      if (date) {
        const { dateMin, dateMax } = this.$props.options
        const flagLen = fText.length === 4
        const flagMin = dateMin.split('-').reverse().join('') <= fText
        const flagMax = dateMax.split('-').reverse().join('') >= fText

        flag = flagLen && flagMin && flagMax
      }

      if (cvv) {
        const { blocks } = this.$props.options
        const flagNumeric = +this.value
        const flagLen = blocks && fText.length === blocks[0]

        flag = flagLen && flagNumeric
      }

      if (address) {
        flag = fText.length > 5
      }
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
    validators() {
      // CVV, Expire Date, Card_Number, Carholder name : length
    },
    checkCard(code = 'visa', text) {
      const flag = flags[code]
      return flag.test(text)
    },
  },
}
</script>
