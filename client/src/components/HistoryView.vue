<script setup>
import { onMounted, reactive, computed, watch } from 'vue'
import Loader from './shared/Loader.vue'

const props = defineProps(['expenseDate', 'expense'])
const data = reactive({
  expense: {},
  loaderShow: true,
  dateFilter: '',
  filteredExpenses: [],
  monthlyExpense:0
})
const formatAmount = (value) => {
  return value.toLocaleString('vn-vi')
}

const getExpense = function () {
  data.expense = computed(() => {
    return [...props.expense].reverse('date')
  })
  setTimeout(() => {
    /* let curMonth = new Date
    data.expense.forEach(e => {
      if (new Date(e.date.seconds * 1000).getMonth() == curMonth.getMonth()) {
        data.monthlyExpense += e.amount
      }
    }); */
    data.loaderShow = false
  }, 500);

}

onMounted(() => {
  getExpense()
  data.filteredExpenses = computed(() => {
    let e = []
    data.dateFilter != '' ?
      e = data.expense.filter((t) => props.expenseDate(t.date) == data.dateFilter) : e = data.expense
    return e
  })
  data.dailyAmount = computed(() => {
    let s = 0
    for (const e of data.filteredExpenses) {
      s = s + e.amount
    }
    return formatAmount(s)
  });
  data.monthlyAmount = computed(() => {
    let s = 0
    if (data.dateFilter != '') {
      data.curMonth = data.dateFilter.split('/')[1]
    } else {
      data.curMonth = new Date
      data.curMonth = data.curMonth.getMonth() + 1
    }
    for (const e of data.expense) {
      if (props.expenseDate(e.date).split('/')[1] == data.curMonth) {
        s = s + e.amount
      }
    }
    return formatAmount(s)
  });
  $("#dateField").datepicker(
    {
      dateFormat: "dd/mm/yy",
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
    <strong>This month:</strong> {{ data.monthlyAmount }}
    <hr>
    <ul id="expense-list">
      <li v-for="item in data.filteredExpenses">
        <span class="date">{{ props.expenseDate(item.date) }}</span> #
        <span class="expense">{{ item.expense }}</span> #
        <span class="amount">{{ formatAmount(item.amount) }}</span>
      </li>
    </ul>
  </div>
</template>
<style>
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

.ui-state-highlight,
.ui-widget-content .ui-state-highlight,
.ui-widget-header .ui-state-highlight {
  border-color: rgb(255, 0, 149);
  background-color: rgb(255, 0, 149) !important;
  color: #fff;
}
</style>