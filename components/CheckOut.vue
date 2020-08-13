<template>
  <div style="display: flex; flex-direction: column;">
    <span>PAYMENT</span>
    <div id="status-buttons" class="text-center">
      <a href="#/form/regalo" class="active"><span>1</span> Step 1</a>
      <a href="#/form/tusdatos"><span>2</span> Step 2</a>
    </div>
    <div class="elements">
      <div
        v-for="i in 2"
        :key="i"
        style="
          margin: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        "
      >
        <span class="dot"></span>
        PRODUCTS
      </div>
    </div>
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
              <form-input
                label="Cardholder name"
                :options="{ address: true }"
              />
            </td>
          </tr>
          <tr>
            <td>
              <form-input
                :options="{
                  cleave: true,
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
                  cleave: true,
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
                :options="{
                  blocks: [3],
                  cleave: true,
                  cvv: true,
                  numericOnly: true,
                }"
                label="CVV"
              />
            </td>
          </tr>
          <tr>
            <td>
              <form-input :options="{ address: true }" label="ADDRESS" />
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
.elements {
  display: flex;
}
.elements:after {
  height: 1px;
  content: '';
  background: #c00;
  width: 100%;
  display: block;
}

.dot {
  height: 10px;
  width: 10px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}

#status-buttons {
  position: relative; /* 1 */
  display: inline-block; /* 2 */
}
#status-buttons::after {
  /* 3 */
  content: '';
  position: absolute;
  width: 50%;
  z-index: -1; /* 4 */
  top: 35%;
  left: 25%;
  border: 3px solid #accf5b;
}
#status-buttons a {
  color: black;
  display: inline-block;
  font-size: 17px;
  font-weight: normal;
  margin-right: 0;
  text-align: center;
  text-transform: uppercase;
  min-width: 150px;
  text-decoration: none;
}
#status-buttons a:hover {
  text-decoration: none;
}
#status-buttons a.active span {
  color: white;
  background: #accf5b;
  box-shadow: rgba(0, 0, 0, 0.792157) 3px 3px 3px 0;
}
#status-buttons span {
  color: white;
  background: #22bacb;
  display: block;
  height: 45px;
  margin: 0 auto 10px;
  padding-top: 20px;
  width: 60px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.792157) 3px 3px 3px 0;
}
</style>
