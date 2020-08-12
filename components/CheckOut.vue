<template>
  <vs-tabs style="padding: 20px">
    <vs-tab label="Customer Info">
      <div class="con-tab-ejemplo">
        Customer Info
      </div>
    </vs-tab>
    <vs-tab label="Shipping Info">
      <div class="con-tab-ejemplo">
        Shipping Info
      </div>
    </vs-tab>
    <vs-tab label="Payment">
      <div class="con-tab-ejemplo">
        <div style="display: flex; justify-content: space-around;">
          <div
            style="display: flex; flex-direction: column;"
            class="product-view"
          >
            <div
              style="
                display: flex;
                justify-content: center;
                flex-direction: column;
              "
            >
              <img
                src="data:image/jpeg;base64,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"
                alt=""
              />
              <span>13-inch MacBook Pro - Space Gray</span>
            </div>
            <span>To pay</span>
            <span>1, 799.00 USD</span>
            <span>Intel Core i5 2.3 GHz</span>
            <span>8GB memory</span>
            <span>256GB SSD storage</span>
          </div>
          <div
            style="display: flex; flex-direction: column;"
            class="payment-details"
          >
            <h2>Payment details</h2>
            <span>Fill in the info below to continue.</span>
            <form>
              <credit-card-form />
            </form>
          </div>
        </div>
      </div>
    </vs-tab>
  </vs-tabs>
</template>

<script>
import Vue from 'vue'
import vsTabs from '@bit/lusaxweb.vuesax.vs-tabs'
import CreditCardForm from './CreditCardForm'

Vue.use(vsTabs)

export default {
  name: 'CheckOut',
  components: { CreditCardForm },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://cdn.jsdelivr.net/npm/vuesax/dist/vuesax.css');
</style>
