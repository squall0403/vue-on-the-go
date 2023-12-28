<script setup>
import { onMounted, reactive, computed, watch, ref } from 'vue';
import axios from 'axios';
import ListView from './components/ListView.vue'
import NewExpense from './components/NewExpense.vue'
import Loader from './components/shared/Loader.vue'
import Passcode from './components/shared/Passcode.vue';
import HistoryView from './components/HistoryView.vue';

const APIURL = import.meta.env.VITE_APIURL
const totalAMount = ref(0)
const dailyExpense = ref([])
const sum = ref(0)
const navState = ref('daily')
const codeFrame = ref(true);

const data = reactive({
  expense: {},
  dailyTotal: 0,
  loaderShow: true
})

const curdate = computed(() => {
  let today = new Date
  let date = today.getDate()
  let month = today.getMonth() + 1
  let year = today.getFullYear()
  return `${date}/${month}/${year}`
})

const getExpense = function () {
  axios.get(`${APIURL}/expense`).then(response => {
    data.expense = response.data.data
    setTimeout(() => {
      data.loaderShow = false
    }, 500);

  })
    .catch(e => {
      console.log(e);
    })
}

const handleCode = () => {
  localStorage.setItem('codeFrame', false)
  codeFrame.value = false
}

const expenseDate = (e) => {
  e = new Date(e._seconds * 1000)
  e = e.getDate() + '/' + (e.getMonth() + 1) + '/' + e.getFullYear()
  return e
}
onMounted(() => {
  if (localStorage.getItem('codeFrame') == 'false') {
    codeFrame.value = false
  }
  getExpense()
})

watch(
  () => data.expense,
  (expense) => {
    for (let i = 0; i < expense.length; i++) {
      if (expenseDate(expense[i].date) == curdate.value) {
        dailyExpense.value.push(expense[i])
        sum.value += expense[i].amount;
      }
    }
    totalAMount.value = sum.value.toLocaleString('vn-vi')
  }
)
</script>
<template>
  <Loader v-show="data.loaderShow" />
  <Passcode @passcodeEntered="handleCode()" v-if="codeFrame"></Passcode>
  <div class="container top-header" v-if="navState == 'daily'">
    <spacer-sm></spacer-sm>
    <h6><strong>Today:</strong> {{ curdate }} - <span class="total-amount">{{ totalAMount }}</span></h6>
  </div>
  <ListView v-if="!data.loaderShow && navState == 'daily'" :data="dailyExpense"/>
  <NewExpense v-if="navState == 'new'"></NewExpense>
  <HistoryView v-if="navState == 'history'" :expenseDate="expenseDate" />
  <div class="bottom-bar-container">
    <div>
      <span :class="(['material-symbols-outlined', (navState == 'daily') && ('active')])" @click="navState = 'daily'">
        calendar_today
      </span>
      <span :class="(['material-symbols-rounded', (navState == 'new') && ('active')])" @click="navState = 'new'">
        add_circle
      </span>
      <span :class="(['material-symbols-outlined', (navState == 'history') && ('active')])" @click="navState = 'history'">
        receipt_long
      </span>
    </div>

  </div>
</template>

<style scoped>
.bottom-bar-container {
  padding: 10px 10px 0px 10px;
  position: fixed;
  bottom: 0px;
  width: 100%;
  background-color: #fff;
}

.bottom-bar-container div {
  padding: 20px;
  border-radius: 20px 20px 25% 25% / 20px 20px 0% 0%;
  -webkit-box-shadow: 1px 1px 10px 1px #dddddd;
  -moz-box-shadow: 1px 1px 10px 1px #dddddd;
  box-shadow: 1px 1px 10px 1px #dddddd;
  display: flex;
  justify-content: space-around;
}

.bottom-bar-container>div>span {
  font-size: 35px;
}

.material-symbols-rounded.active,
.material-symbols-outlined.active {
  color: #9b4dca;
  font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
}

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