<script setup>
import { onMounted, reactive, computed, watch } from 'vue'
import axios from 'axios';
import Loader from './shared/Loader.vue'
const APIURL = import.meta.env.VITE_APIURL

const props = defineProps(['expenseDate'])
const data = reactive({
  expense: {},
  loaderShow: true,
  dateFilter: '',
  filteredExpenses: [],
  monthlyExpense: 0
})
const formatAmount = (value) => {
  return value.toLocaleString('vn-vi')
}

const getExpense = function () {
  axios.get(`${APIURL}/expense`).then(response => {
    data.expense = computed(() => {
      return [...response.data.data].reverse('date')
    })
    setTimeout(() => {
      let curMonth = new Date
      data.expense.forEach(e => {
        if (new Date(e.date._seconds * 1000).getMonth() == curMonth.getMonth()) {
          data.monthlyExpense = data.monthlyExpense + e.amount
        }
      });
      data.loaderShow = false
    }, 500);
  })
    .catch(e => {
      console.log(e);
    })
}

onMounted(() => {
  getExpense()
  data.filteredExpenses = computed(() => {
    let e = []
    data.dateFilter != '' ?
      e = data.expense.filter((t) => props.expenseDate(t.date) == data.dateFilter) : e = data.expense
    return e
  })
  $("#dateField").datepicker(
    {
      dateFormat: "dd/mm/yy"
    }
  );
  $("#dateField").on('change', function () {
    data.dateFilter = $(this).val()
  })
})


</script>
<template>
  <spacer-sm />
  <Loader v-show="data.loaderShow" />
  <div class="container">
    <h2>History</h2>
    <hr>
    <label for="dateField">Date</label>
    <div class="filter-container">
      <input type="text" id="dateField" v-model="data.dateFilter"><span class="material-symbols-rounded"
        @click="data.dateFilter = ''">
        cancel
      </span>
    </div>
    <p>This month: <span class="amount">{{ formatAmount(data.monthlyExpense) }}</span></p>
    <hr>
    <ul v-for="item in data.filteredExpenses" id="expense-list">
      <li>
        <span class="date">{{ props.expenseDate(item.date) }}</span> #
        <span class="expense">{{ item.expense }}</span> #
        <span class="amount">{{ formatAmount(item.amount) }}</span>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.filter-container {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.filter-container #dateField {
  margin-bottom: 0px;
}

.filter-container .material-symbols-rounded {
  display: inline-block;
  height: 38px;
  line-height: 38px;
  right: 30px;
  position: absolute;
}

#expense-list li {
  display: flex;
  gap: 10px;
}

#expense-list li .expense {
  width: 30%;
  font-weight: 600;
}

.amount {
  color: rgb(255, 0, 149);
  /* float: right; */
}

hr {
  margin: 15px 0px;
}
</style>