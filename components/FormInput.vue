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
      :id="inputId"
      ref="inputElement"
      v-model="value"
      :options="options"
      required
      name="card"
    ></cleave>
    <label :for="inputId">
      <span v-if="isValid" class="valid">{{ label }}</span>
      <span v-else class="not-valid">{{ label }}</span>
    </label>
  </div>
</template>

<script>
const flags = {
  visa: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/,
  americanExpress: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/,
  masterCard: /^(?:5[1-5][0-9]{14})$/,
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
    // type: {
    //   type: String,
    //   required: true,
    // },
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
      return this.checkCard('visa', fText)
    },
  },
  methods: {
    cc_format(text) {
      const v = text.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
      const matches = v.match(/\d{4,16}/g)
      const match = (matches && matches[0]) || ''
      const parts = []
      for (let i = 0; i < match.length; i += 4) {
        parts.push(match.substring(i, i + 4))
      }
      if (parts.length) {
        return parts.join(' ')
      } else {
        return text
      }
    },
    onClick() {
      console.dir(this.$refs.inputElement.$el.focus())
      // this.$refs.inputElement.focus()
      // this.$nextTick(() => {
      //   this.$refs.inputElement.focus()
      // })
    },
    validate() {
      // CVV, Expire Date, Card_Number, Carholder name : length
    },
    format() {
      // this.value = this.cc_format(this.value)
    },
    checkCard(code = 'visa', text) {
      const flag = flags[code]
      return text.match(flag)
    },
    // validateVisa(input) {
    //   const flag = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
    //   if (input.value.match(flag)) {
    //     return true
    //   } else {
    //     console.dir('Not a valid Visa credit card number!')
    //     return false
    //   }
    // },
    // validateAmericanExpress(input) {
    //   const flag = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
    //   if (input.value.match(flag)) {
    //     return true
    //   } else {
    //     console.dir('Not a valid Amercican Express credit card number!')
    //     return false
    //   }
    // },
    // validateMasterCard(input) {
    //   const flag = /^(?:5[1-5][0-9]{14})$/
    //   if (input.value.match(flag)) {
    //     return true
    //   } else {
    //     console.dir('Not a valid Mastercard number!')
    //     return false
    //   }
    // },
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
  font-weight: bold;
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
