<script setup>
import { ref } from 'vue';
import axios from 'axios';
import UpdateExpense from './UpdateExpense.vue';

const updateData = ref({})
const showEdit = ref(false)
const props = defineProps(['data'])
const emit = defineEmits(['expenseDeleted'])
const formatAmount = (value) => {
  return value.toLocaleString('vn-vi')
}
const deleteExpense = function (id) {
  axios.delete(`http://localhost:8080/expense/delete/${id}`).then(response => {
    this.emit('expenseDeleted')
  })
    .catch(e => {
      this.errors.push(e)
    })
}

const updateExpense = function (e) {
  showEdit.value=true
  updateData.value=e
}
</script>
<template>
  <div class="container">
    <ul v-for="item in data" id="expense-list">
      <li>
        <span class="expense">{{ item.expense }}</span> #
        <span class="amount">{{ formatAmount(item.amount) }}</span> #
        <span class="actions">
          <button class="button" @click="updateExpense(item)"><span class="material-symbols-outlined">
              edit
            </span></button>
          <button class="button" @click="deleteExpense(item.expense_id)"><span class="material-symbols-outlined">
              do_not_disturb_on
            </span></button>

        </span>
      </li>
    </ul>
  </div>
  <UpdateExpense :updateData="updateData" v-if="showEdit"/>
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
</style>