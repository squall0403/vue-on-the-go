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

const fillDaily = function(e,a,n){
 data.expense=e;
 data.amount=a;
 data.note=n
}

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
    // data.errorShow = true;
    // data.errorMessage = 'New expense is created'
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
   <div id="daily-expense">
    <button class="button button-outline" @click="fillDaily('Cf sáng',20000,'')"><span class="material-symbols-outlined">
      local_cafe
     </span> 20k </button>
    <button class="button button-outline"  @click="fillDaily('Ăn sáng',17000,'Bánh mì')"><span class="material-symbols-outlined">
      bakery_dining
     </span> 17k </button>
    <button class="button button-outline" @click="fillDaily('Ăn sáng',20000,'')"><span class="material-symbols-outlined">
      bakery_dining
     </span> 20k </button>
    <button class="button button-outline" @click="fillDaily('Ăn trưa',40000,'')"><span class="material-symbols-outlined">
      ramen_dining
     </span> 40k </button>
   </div>
  </div>
 </Transition>
</template>

<style>
#daily-expense {
 display: flex;
 gap: 10px;
 flex-wrap: wrap;
}

#daily-expense .button.button-outline {
 color: #E1AA74 !important;
 border-color: #E1AA74 !important;
 display: flex;
 align-items: center;
 padding: 0 15px;
}

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