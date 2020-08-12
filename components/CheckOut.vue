<template>
  <div style="display: flex; flex-direction: column;">
    <div class="center con-selects">
      <div style="display: flex; margin-bottom: 20px;">
        <vs-select
          v-model="creditCard"
          color="danger"
          placeholder="Credit Card"
        >
          <!-- TODO: LATER          https://stackoverflow.com/questions/2965971/how-to-add-images-in-select-list-->
          <!-- TODO: Logo          https://toppng.com/uploads/preview/unionpay-requires-a-valid-chinese-id-visa-logo-vector-black-and-white-11562993135qcvnxx6eoc.png-->
          <vs-option
            v-for="card in creditCardList"
            :key="card.code"
            :label="card.label"
            :value="card.code"
          >
            <img
              v-if="0"
              src="https://seeklogo.net/wp-content/uploads/2013/06/visa-black-vector-logo-400x400.png"
              alt=""
              height="30"
            />
            {{ card.label }}
          </vs-option>
        </vs-select>
      </div>
      <table>
        <tbody>
          <tr>
            <td><form-input label="Cardholder name" /></td>
          </tr>
          <tr>
            <td><form-input label="Card number" /></td>
          </tr>
          <tr>
            <td><form-input label="Expire date" /></td>
          </tr>
          <tr>
            <td><form-input label="CVV" /></td>
          </tr>
          <tr>
            <td><form-input label="ADDRESS" /></td>
          </tr>
        </tbody>
      </table>
      <div style="display: flex; margin-bottom: 10px; padding: 0;">
        <button class="action-button" @click="active = 0">
          PROCEED PAYMENT
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import vsTabs from '@bit/lusaxweb.vuesax.vs-tabs'
import { CatCarousel } from 'vue-cat-carousel'
import CreditCardForm from './CreditCardForm'
import FormInput from './FormInput'
Vue.use(vsTabs)

export default {
  name: 'CheckOut',
  components: { FormInput, CreditCardForm, CatCarousel },
  data() {
    return {
      active: 1,
      creditCard: 'visa',
      value: '',
      hasVisiblePassword: true,
      creditCardList: [
        {
          code: 'visa',
          label: 'VISA',
        },
        {
          code: 'mastercard',
          label: 'MASTERCARD',
        },
        {
          code: 'amex',
          label: 'AMERICAN EXPRESS',
        },
      ],
    }
  },
  computed: {
    getProgress() {
      let progress = 0

      // at least one number

      if (/\d/.test(this.value)) {
        progress += 20
      }

      // at least one capital letter

      if (/(.*[A-Z].*)/.test(this.value)) {
        progress += 20
      }

      // at menons a lowercase

      if (/(.*[a-z].*)/.test(this.value)) {
        progress += 20
      }

      // more than 5 digits

      if (this.value.length >= 6) {
        progress += 20
      }

      // at least one special character

      if (/[^A-Za-z0-9]/.test(this.value)) {
        progress += 20
      }

      return progress
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://cdn.jsdelivr.net/npm/vuesax/dist/vuesax.css');
.vs-select__input {
  max-width: 100%;
  border: 1px solid grey;
  background-color: unset;
  border-radius: unset;
}

.vs-select-content {
  max-width: 100%;
}
.action-button {
  width: 100%;
  color: white;
  height: 50px;
  border: unset;
  padding: 5px;
  max-width: 100%;
  border-radius: unset;
  background-color: #00cfe4;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;
}

td {
  height: 50px;
  border: 1px solid grey;
  padding: 0 5px;
}
</style>
