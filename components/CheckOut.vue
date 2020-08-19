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
      <table class="checkout-table">
        <tbody>
          <tr>
            <td>
              <form-input
                label="Cardholder name"
                :options="{ key: 'text', roles: ['isAddress'] }"
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
                :options="{ key: 'text', roles: ['isAddress'] }"
                label="ADDRESS"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div style="display: flex; margin-bottom: 10px; padding: 0;">
        <vs-button class="action-button">
          PROCEED PAYMENT
        </vs-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import IconLeftArrow from '~/components/icons/LeftArrow'
import FormInput from '~/components/FormInput'

export default {
  name: 'CheckOut',
  components: { IconLeftArrow, FormInput },
  data() {
    return {
      cardNumber: null,
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
    onEditInput(data: any) {
      console.dir(data)
    },
  },
}
</script>

<style>
.vs-select__input {
  max-width: 100%;
  border: 1px solid #e2e2e2;
  background-color: unset;
  border-radius: unset;
}

.vs-select-content {
  max-width: 100%;
}
</style>
