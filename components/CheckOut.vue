<template>
  <div style="display: flex; flex-direction: column; margin-top: 20px;">
    <div style="display: flex; justify-content: space-between; width: 60%;">
      <icon-left-arrow :size="15" />
      <span>PAYMENT</span>
    </div>
    <form-wizard step-size="xs" :start-index="2" color="#6757FE">
      <tab-content title="PRODUCTS" icon="''"></tab-content>
      <tab-content title="SHIPPING" icon="''"> </tab-content>
      <tab-content title="CHECKOUT" icon="''"> </tab-content>
      <tab-content title="COMPLETED" icon="''"> </tab-content>
    </form-wizard>
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
                :options="{ key: 'text', address: true, roles: ['isAddress'] }"
              />
            </td>
          </tr>
          <tr>
            <td>
              <form-input
                :options="{
                  key: 'card',
                  cleave: true,
                  creditCard: true,
                  cardType: creditCard,
                  delimiter: ' - ',
                  roles: ['isValidCard'],
                }"
                :type="creditCard"
                label="Card number"
                @onEdit="onEditInput($event)"
              />
            </td>
          </tr>
          <tr>
            <td>
              <form-input
                :options="{
                  key: 'date',
                  cleave: true,
                  date: true,
                  datePattern: ['m', 'y'],
                  delimiter: ' / ',
                  dateMin: '20-01',
                  dateMax: '31-12',
                  roles: ['isDateValid'],
                }"
                label="Expire date"
              />
            </td>
          </tr>
          <tr>
            <td>
              <form-input
                :options="{
                  key: 'text',
                  blocks: [3],
                  cleave: true,
                  cvv: true,
                  roles: ['isValidCVV'],
                  numericOnly: true,
                }"
                label="CVV"
              />
            </td>
          </tr>
          <tr>
            <td>
              <form-input
                :options="{ key: 'text', address: true, roles: ['isAddress'] }"
                label="ADDRESS"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div style="display: flex; margin-bottom: 10px; padding: 0;">
        <button class="action-button" type="submit">
          PROCEED PAYMENT
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import FormInput from './FormInput'
import IconLeftArrow from './icons/LeftArrow'

export default {
  name: 'CheckOut',
  components: { IconLeftArrow, FormInput },
  data() {
    return {
      cardNumber: null,
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
  methods: {
    onEditInput(data) {
      console.dir(data)
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

.wizard-header {
  display: none;
}
.wizard-navigation {
  height: 100px;
}
.vue-form-wizard.xs .wizard-icon-circle {
  border: unset;
  background-color: #6757fe;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 15px;
}
.stepTitle {
  margin-top: 50px;
  font-size: 12px;
}

.wizard-card-footer {
  display: none;
}
</style>
