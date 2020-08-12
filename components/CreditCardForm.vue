<template>
  <div class="card-form">
    <div class="card-list">
      <VuePaycard v-if="0" :value-fields="valueFields" />
      <div class="card-form__inner">
        <div class="card-input">
          <label for="cardNumber" class="card-input__label">Card Number</label>
          <input
            :id="inputFields.cardNumber"
            type="tel"
            title="Number"
            class="card-input__input"
            :value="valueFields.cardNumber"
            data-card-field
            autocomplete="off"
            :maxlength="cardNumberMaxLength"
            @input="changeNumber"
          />
        </div>
        <div class="card-input">
          <label for="cardName" class="card-input__label">Card Holder</label>
          <input
            :id="inputFields.cardName"
            v-letter-only
            type="text"
            title="Name"
            class="card-input__input"
            :value="valueFields.cardName"
            data-card-field
            autocomplete="off"
            @input="changeName"
          />
        </div>
        <div class="card-form__row">
          <div class="card-form__col">
            <div class="card-form__group">
              <label
                for="cardMonth"
                class="card-input__label"
                aria-label="Expiration Date"
                >Expiration Date</label
              >
              <select
                :id="inputFields.cardMonth"
                v-model="valueFields.cardMonth"
                class="card-input__input -select"
                aria-label="Card Month"
                title="Month"
                data-card-field
              >
                <option value disabled selected>Month</option>
                <option
                  v-for="n in 12"
                  :key="n"
                  :value="n < 10 ? '0' + n : n"
                  :disabled="n < minCardMonth"
                  >{{ generateMonthValue(n) }}</option
                >
              </select>
              <select
                :id="inputFields.cardYear"
                v-model="valueFields.cardYear"
                class="card-input__input -select"
                aria-label="Card year"
                title="Year"
                data-card-field
              >
                <option value disabled selected>Year</option>
                <option
                  v-for="(n, $index) in 12"
                  :key="n"
                  :value="$index + minCardYear"
                  >{{ $index + minCardYear }}</option
                >
              </select>
            </div>
          </div>
          <div class="card-form__col -cvv">
            <div class="card-input">
              <label
                for="cardCvv"
                class="card-input__label"
                aria-label="Card CVV"
                >CVV</label
              >
              <input
                :id="inputFields.cardCvv"
                v-number-only
                type="tel"
                title="CVV"
                class="card-input__input"
                maxlength="4"
                :value="valueFields.cardCvv"
                data-card-field
                autocomplete="off"
                @input="changeCvv"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreditCardForm',
  directives: {
    'number-only': {
      bind(el) {
        function checkValue(event) {
          event.target.value = event.target.value.replace(/[^0-9]/g, '')
          if (event.charCode >= 48 && event.charCode <= 57) {
            return true
          }
          event.preventDefault()
        }
        el.addEventListener('keypress', checkValue)
      },
    },
    'letter-only': {
      bind(el) {
        function checkValue(event) {
          if (event.charCode >= 48 && event.charCode <= 57) {
            event.preventDefault()
          }
          return true
        }
        el.addEventListener('keypress', checkValue)
      },
    },
  },
  data: () => ({
    minCardYear: new Date().getFullYear(),
    mainCardNumber: '',
    cardNumberMaxLength: 19,
    valueFields: {
      cardName: '',
      cardNumber: '',
      cardMonth: null,
      cardYear: null,
      cardCvv: null,
    },
    inputFields: {
      cardNumber: 'v-card-number',
      cardName: 'v-card-name',
      cardMonth: 'v-card-month',
      cardYear: 'v-card-year',
      cardCvv: 'v-card-cvv',
    },
  }),
  computed: {
    minCardMonth() {
      if (this.valueFields.cardYear === this.minCardYear)
        return new Date().getMonth() + 1
      return 1
    },
  },
  watch: {
    cardYear() {
      if (this.valueFields.cardMonth < this.minCardMonth) {
        this.valueFields.cardMonth = ''
      }
    },
  },
  methods: {
    changeName(e) {
      this.valueFields.cardName = e.target.value
      this.$emit('input-card-name', this.valueFields.cardName)
    },
    changeNumber(e) {
      this.valueFields.cardNumber = e.target.value
      const value = this.valueFields.cardNumber.replace(/\D/g, '')
      // american express, 15 digits
      if (/^3[47]\d{0,13}$/.test(value)) {
        this.valueFields.cardNumber = value
          .replace(/(\d{4})/, '$1 ')
          .replace(/(\d{4}) (\d{6})/, '$1 $2 ')
        this.cardNumberMaxLength = 17
      } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
        // diner's club, 14 digits
        this.valueFields.cardNumber = value
          .replace(/(\d{4})/, '$1 ')
          .replace(/(\d{4}) (\d{6})/, '$1 $2 ')
        this.cardNumberMaxLength = 16
      } else if (/^\d{0,16}$/.test(value)) {
        // regular cc number, 16 digits
        this.valueFields.cardNumber = value
          .replace(/(\d{4})/, '$1 ')
          .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
          .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ')
        this.cardNumberMaxLength = 19
      }
      // eslint-disable-next-line
        if (e.inputType == 'deleteContentBackward') {
        const lastChar = this.valueFields.cardNumber.substring(
          this.valueFields.cardNumber.length,
          this.valueFields.cardNumber.length - 1
        )
        // eslint-disable-next-line
          if (lastChar == ' ') { this.valueFields.cardNumber = this.valueFields.cardNumber.substring(0, this.valueFields.cardNumber.length - 1) }
        }
      this.$emit('input-card-number', this.valueFields.cardNumber)
    },
    changeMonth() {
      this.$emit('input-card-month', this.valueFields.cardMonth)
    },
    changeYear() {
      this.$emit('input-card-year', this.valueFields.cardYear)
    },
    changeCvv(e) {
      this.valueFields.cardCvv = e.target.value
      this.$emit('input-card-cvv', this.valueFields.cardCvv)
    },
    generateMonthValue(n) {
      return n < 10 ? `0${n}` : n
    },
    toggleMask() {
      this.isCardNumberMasked = !this.isCardNumberMasked
      if (this.isCardNumberMasked) {
        this.maskCardNumber()
      } else {
        this.unMaskCardNumber()
      }
    },
    maskCardNumber() {
      this.valueFields.cardNumberNotMask = this.valueFields.cardNumber
      this.mainCardNumber = this.valueFields.cardNumber
      const arr = this.valueFields.cardNumber.split('')
      arr.forEach((element, index) => {
        if (index > 4 && index < 14 && element.trim() !== '') {
          arr[index] = '*'
        }
      })
      this.valueFields.cardNumber = arr.join('')
    },
    unMaskCardNumber() {
      this.valueFields.cardNumber = this.mainCardNumber
    },
  },
}
</script>
