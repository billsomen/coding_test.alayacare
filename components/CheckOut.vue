<template>
  <div style="display: flex; flex-direction: column;">
    <form class="center con-selects" action="#" method="post">
      <div style="display: flex; margin-bottom: 20px;">
        <vs-select
          v-model="creditCard"
          color="danger"
          placeholder="Credit Card"
        >
          <vs-option
            v-for="card in creditCardList"
            :key="card.code"
            :label="card.label"
            :value="card.code"
          >
            {{ card.label }}
          </vs-option>
        </vs-select>
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              <form-input label="Cardholder name" :options="{}" />
            </td>
          </tr>
          <tr>
            <td>
              <form-input
                :options="{
                  creditCard: true,
                  cardType: creditCard,
                  delimiter: ' - ',
                }"
                :type="creditCard"
                label="Card number"
              />
            </td>
          </tr>
          <tr>
            <td>
              <form-input
                :options="{
                  date: true,
                  datePattern: ['m', 'y'],
                  delimiter: ' / ',
                  dateMin: '20-01',
                  dateMax: '31-12',
                }"
                label="Expire date"
              />
            </td>
          </tr>
          <tr>
            <td>
              <form-input
                :options="{ blocks: [3], numericOnly: true }"
                label="CVV"
              />
            </td>
          </tr>
          <tr>
            <td>
              <form-input :options="{}" label="ADDRESS" />
            </td>
          </tr>
        </tbody>
      </table>
      <div style="display: flex; margin-bottom: 10px; padding: 0;">
        <button class="action-button" type="submit" @click="active = 0">
          PROCEED PAYMENT
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import FormInput from './FormInput'

export default {
  name: 'CheckOut',
  components: { FormInput },
  data() {
    return {
      cardNumber: null,
      options: {
        creditCard: true,
        delimiter: '-',
      },
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
  border: 1px solid #e2e2e2;
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
  font-size: 12px;
  background-color: #00cfe4;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;
}

td {
  height: 50px;
  border: 1px solid #e2e2e2;
  padding: 0 5px;
}

td:hover {
  background-color: white;
  /*background-color: rgba(255, 73, 104, 0.29);*/
  padding: 10px 0;
  /*border-radius: 10px;*/
}
td:hover div label {
  color: #ff4767;
}
</style>
