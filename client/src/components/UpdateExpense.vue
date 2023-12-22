<script setup>
import { reactive,onMounted } from 'vue'
import axios from 'axios';

const props = defineProps(['updateData'])

const data = reactive({
  errorShow: false,
  errorMessage: '',
})

const submitRecord = function () {
  if (props.updateData.expense == '') {
    data.errorShow = true;
    data.errorMessage = 'Expense is required'
  } else {
    if (props.updateData.amount == 0) {
      data.errorShow = true;
      data.errorMessage = 'Amount is required'
    } else {
      var postData = {
        expense: props.updateData.expense,
        amount: props.updateData.amount,
        note: props.updateData.note
      }
      axios.patch(`http://localhost:8080/expense`, postData).then(function (response) {
        // data.errorShow = true;
        // data.errorMessage = 'Expense is update'
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
}

</script>
<template>
  <Transition>
    <div class="container" id="newExpense">
      <h2>Update expense record</h2>
      <form>
        <fieldset>
          <label for="expenseField">Expense</label>
          <input type="text" placeholder="Expense" id="expenseField" v-model="props.updateData.expense">
          <label for="amountField">Amount</label>
          <input type="number" placeholder="Amount" id="amountField" v-model="props.updateData.amount">
          <label for="noteField">Note</label>
          <textarea placeholder="Note" id="noteField" v-model="props.updateData.note"></textarea>
          <div class="float-right">
            <button class="button button-outline" @click="this.unmount();">Close</button>
          </div>
          <input class="button-primary" type="button" value="Update" @click="submitRecord()">
        </fieldset>
      </form>
      <div id="errorMessage" v-show="data.errorShow" @click="data.errorShow = !data.errorShow">
        <div class="message_container">
          <p>{{ data.errorMessage }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#newExpense {
  display: block;
  position: absolute;
  background-color: white;
  height: 100vh;
  top: 0px;
  padding-top: 2rem;
}

#newExpense #errorMessage {
  display: flex;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.573);
  align-items: center;
  justify-content: center;
}

#newExpense #errorMessage .message_container {
  width: 90%;
  background-color: #fff;
  text-align: center;
  padding: 3rem 1rem;
  border-radius: 3px;
  -webkit-box-shadow: 1.5px 1.5px 10px 0 #535353;
  -moz-box-shadow: 1.5px 1.5px 10px 0 #535353;
  box-shadow: 1.5px 1.5px 10px 0 #535353;
}

#newExpense #errorMessage .message_container p {
  margin-bottom: 0px;
}
</style>