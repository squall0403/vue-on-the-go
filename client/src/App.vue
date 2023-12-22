<script setup>
import { onMounted, reactive, computed, watch, ref } from 'vue';
import axios from 'axios';
import ListView from './components/ListView.vue'
import NewExpense from './components/NewExpense.vue'
import Loader from './components/shared/Loader.vue'

const data = reactive({
  expense: {},
  newForm: false,
  dailyTotal: 0,
  loaderShow: true
})

const curdate = computed(() => {
  let today = new Date
  return today.toLocaleString("vn-vi").split(',')[0]
})
const totalAMount = ref(0)
onMounted(() => {
  axios.get(`http://localhost:8080/expense`).then(response => {
    data.expense = response.data
    setTimeout(() => {
      data.loaderShow = false
    }, 500);
    
  })
    .catch(e => {
      this.errors.push(e)
    })
})

watch(
  () => data.expense,
  (expense) => {
    let sum = 0;
    for (let i = 0; i < expense.length; i++) {
      if (expense[i].date == curdate.value)
        sum += expense[i].amount;
    }
    totalAMount.value = sum.toLocaleString('vn-vi')
  }
)
</script>
<template>
  <Loader v-show="data.loaderShow" />
  <div class="container top-header">
    <spacer-sm></spacer-sm>
    <h6><strong>Today:</strong> {{ curdate }} - <span class="total-amount">{{ totalAMount }}</span></h6>
  </div>
  <hr>
  <ListView :data="data.expense" :curdate="curdate" />
  <NewExpense v-show="data.newForm"></NewExpense>
  <button id="fab" @click="(data.newForm = !data.newForm)">
    <span class="material-symbols-outlined fab">
      add
    </span>
  </button>
</template>

<style scoped>
h6 {
  margin: 0px;
}

hr {
  border-top-width: 3px;
}

.top-header {
  padding-top: 15px;
}

.top-header .total-amount {
  font-weight: bold;
  text-decoration: underline;
  color: rgb(0, 42, 255);
}
</style>
