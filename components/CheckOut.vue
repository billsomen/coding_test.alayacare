<template>
  <div style="display: flex; flex-direction: column; margin-top: 20px;">
    <div style="display: flex; justify-content: space-between; width: 60%;">
      <icon-left-arrow :size="15" />
      <span>PAYMENT</span>
    </div>
    <!--    this form wizards is not functional. -->
    <form-wizard step-size="xs" :start-index="2" color="#6757FE" hide-buttons>
      <tab-content title="PRODUCTS" icon="''"></tab-content>
      <tab-content title="SHIPPING" icon="''"> </tab-content>
      <tab-content title="CHECKOUT" icon="''"> </tab-content>
      <tab-content title="COMPLETED" icon="''"> </tab-content>
    </form-wizard>

    <form class="center con-selects" action="#" method="post">
      <div class="select-wrapper">
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
          <tr v-for="(item, key) in formParams" :key="key">
            <td>
              <form-input
                :label="item.label"
                :options="getOptions(key)"
                @onEdit="onEditInput($event)"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="submit-wrapper">
        <vs-button class="action-button" @click="onSubmit">
          PROCEED PAYMENT
        </vs-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IconLeftArrow from '~/components/icons/LeftArrow.vue'
import FormInput from '~/components/FormInput.vue'

export default Vue.extend({
  name: 'CheckOut',
  components: { IconLeftArrow, FormInput },
  data() {
    return {
      creditCard: 'visa',
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
      form: {
        cardholderName: '',
        cardNumber: '',
        expireDate: '',
        cvv: '',
        address: '',
      } as any,
      formFlags: {} as any,
      formParams: {
        cardholderName: {
          options: { key: 'text', roles: ['isAddress'] },
          label: 'Cardholder name',
        },
        cardNumber: {
          options: {
            key: 'card',
            cleave: true,
            creditCard: true,
            // cardType: this.creditCard,
            delimiter: ' - ',
            roles: ['isValidCard'],
          },
          label: 'Card number',
        },
        expireDate: {
          options: {
            key: 'date',
            cleave: true,
            date: true,
            datePattern: ['m', 'y'],
            delimiter: ' / ',
            dateMin: '20-01',
            dateMax: '31-12',
            roles: ['isDateValid'],
          },
          label: 'Expire date',
        },
        cvv: {
          options: {
            key: 'text',
            blocks: [3],
            cleave: true,
            roles: ['isValidCVV'],
            numericOnly: true,
          },
          label: 'CVV',
        },
        address: {
          options: { key: 'text', roles: ['isAddress'] },
          label: 'ADDRESS',
        },
      } as any,
    }
  },
  methods: {
    onEditInput(data: any) {
      if ('flag' in data) {
        const { flag, value, name } = data
        this.formFlags[name] = flag.all
        this.form[name] = value
      }
    },
    getOptions(name: string): any {
      const options: any = this.formParams[name].options
      options.name = name
      if (name === 'cardNumber') {
        options.cardType = this.creditCard
      }
      return options
    },
    onSubmit() {
      const isValid = Object.values(this.formFlags).every((flag) => flag)
      if (isValid) {
        alert('Posting data')
      } else {
        alert('The form is not valid. Check the fields for precise error')
      }
    },
  },
})
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

.select-wrapper {
  display: flex;
  margin-bottom: 20px;
}
.submit-wrapper {
  display: flex;
  margin-bottom: 10px;
  padding: 0;
}
</style>
