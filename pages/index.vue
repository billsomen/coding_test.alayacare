<template>
  <div style="width: 90%;">
    <check-out />
    <!--    <vue-paycard :value-fields="valueFields" />-->
    <!--    <credit-card-form />-->
  </div>
</template>

<script>
import CreditCardForm from '../components/CreditCardForm'
import CheckOut from '../components/CheckOut'
export default {
  components: { CheckOut, CreditCardForm },
  data: () => ({
    valueFields: {
      cardName: 'VISA',
      cardNumber: '42424242424242424242',
      cardMonth: '',
      cardYear: '',
      cardCvv: '454',
    },
  }),
}
</script>

<style></style>
