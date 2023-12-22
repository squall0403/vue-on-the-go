<script setup>
import { reactive } from 'vue'
import axios from 'axios';

const data = reactive({
 expense: '',
 amount: 0,
 note: '',
 errorShow: false,
 errorMessage: ''
})

const submitRecord = function () {
 if (data.expense == '') {
  data.errorShow = true;
  data.errorMessage = 'Expense is required'
 } else {
  if (data.amount == 0) {
   data.errorShow = true;
   data.errorMessage = 'Amount is required'
  } else {
   var postData = {
    expense: data.expense,
    amount: data.amount,
    note: data.note
   }
   axios.post(`http://localhost:8080/expense`, postData).then(function (response) {
    data.errorShow = true;
    data.errorMessage = 'New expense is created'
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
   <h2>New expense record</h2>
   <form>
    <fieldset>
     <label for="expenseField">Expense</label>
     <input type="text" placeholder="Expense" id="expenseField" v-model="data.expense">
     <label for="amountField">Amount</label>
     <input type="number" placeholder="Amount" id="amountField" v-model="data.amount">
     <label for="noteField">Note</label>
     <textarea placeholder="Note" id="noteField" v-model="data.note"></textarea>
     <div class="float-right">
      <button class="button button-outline" @click="this.unmount();">Close</button>
     </div>
     <input class="button-primary" type="button" value="Record" @click="submitRecord()">
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
</style>