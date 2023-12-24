<script setup>
import { ref } from 'vue';
import axios from 'axios';
import UpdateExpense from './UpdateExpense.vue';

const APIURL = import.meta.env.VITE_APIURL
const updateData = ref({})
const showEdit = ref(false)
const showDelete = ref(false)
const idToDelete = ref(0)
const props = defineProps(['data'])

const emit = defineEmits(['expenseDeleted'])
const formatAmount = (value) => {
  return value.toLocaleString('vn-vi')
}
const deleteExpense = function (id) {
  axios.delete(`${APIURL}/expense/delete/${id}`).then(response => {
    // this.emit('expenseDeleted')
    location.reload()
  })
    .catch(e => {
      console.log(e);
    })
}

const updateExpense = function (e) {
  showEdit.value = true
  updateData.value = e
}
</script>
<template>
  <hr>
  <div class="container">
    <ul v-for="item in data" id="expense-list">
      <li>
        <span class="expense">{{ item.expense }}</span> #
        <span class="amount">{{ formatAmount(item.amount) }}</span> #
        <span class="actions">
          <button class="button" @click="updateExpense(item)"><span class="material-symbols-outlined">
              edit
            </span></button>
          <button class="button"
            @click="idToDelete = item.expense_id; data.errorMessage = `Do you want to delete ${item.expense}`; showDelete = true"><span
              class="material-symbols-outlined">
              do_not_disturb_on
            </span></button>

        </span>
      </li>
    </ul>
    <div id="confirm-box" v-show="showDelete">
      <div class="message_container">
        <p>{{ data.errorMessage }}</p>
        <div class="button-container">
          <button class="button" @click="deleteExpense(idToDelete)">Delete</button>
          <button class="button button-outline" @click="showDelete = false">Close</button>
        </div>
      </div>
    </div>
  </div>
  <UpdateExpense :updateData="updateData" v-if="showEdit" />
</template>

<style scoped>
#expense-list li {
  display: flex;
  justify-content: space-between;
}

#expense-list .expense {
  font-weight: 600;
}

#expense-list .amount {
  color: rgb(255, 0, 149);
  /* float: right; */
}

#expense-list .actions {
  display: flex;
  gap: 5px;
}

#expense-list .actions .button {
  display: flex;
  align-items: center;
  padding: 0 5px;
  width: 38px;
  justify-content: center;
}

#confirm-box {
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

#confirm-box .message_container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 90%;
  background-color: #fff;
  text-align: center;
  padding: 3rem 1rem;
  border-radius: 3px;
  -webkit-box-shadow: 1.5px 1.5px 10px 0 #535353;
  -moz-box-shadow: 1.5px 1.5px 10px 0 #535353;
  box-shadow: 1.5px 1.5px 10px 0 #535353;
}

#confirm-box .message_container p {
  margin-bottom: 0px;
}

#confirm-box .button-container {
  display: flex;
  justify-content: space-around;
}
</style>