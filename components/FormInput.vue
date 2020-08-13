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
      <span v-else class="not-valid">{{ label }}</span>
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
      const { creditCard, date, cvv, address } = this.$props.options

      if (creditCard) {
        const { cardType } = this.$props.options
        return this.checkCard(cardType, fText)
      }

      if (date) {
        const { dateMin, dateMax } = this.$props.options
        const flagLen = fText.length === 4
        const flagMin = dateMin.split('-').reverse().join('') <= fText
        const flagMax = dateMax.split('-').reverse().join('') >= fText

        return flagLen && flagMin && flagMax
      }

      if (cvv) {
        const { blocks } = this.$props.options
        const flagNumeric = +this.value
        const flagLen = blocks && fText.length === blocks[0]

        return flagLen && flagNumeric
      }

      if (address) {
        return fText.length > 5
      }
      return false
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
    validate() {
      // CVV, Expire Date, Card_Number, Carholder name : length
    },
    checkCard(code = 'visa', text) {
      const flag = flags[code]
      return text.match(flag)
    },
  },
}
</script>

<style scoped>
.valid {
  color: green;
  font-weight: bold;
}
.not-valid {
  color: #ff4767;
  font-weight: bold;
}
input {
  /*width: 80%;*/
  flex-grow: 4;
  background-color: transparent;
  height: 30px;
  padding: 0 5px;
  border: none;
  /*font-weight: bold;*/
}
label span {
  text-transform: uppercase;
  color: #e2e2e2;
  font-size: 10px;
  /*flex-grow: 1;*/
}

label:hover {
  /*color: #ff4767;*/
}
</style>
