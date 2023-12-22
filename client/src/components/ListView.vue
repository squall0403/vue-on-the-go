<script setup>
const props = defineProps(['data'])
const formatAmount = (value) => {
 return value.toLocaleString('vn-vi')
}
</script>
<template>
 <div class="container">
  <table id="expense">
   <thead>
    <tr>
     <th>Date</th>
     <th>Expense</th>
     <th>Amount</th>
     <th>Note</th>
    </tr>
   </thead>
   <tbody>
    <tr v-for="item in data">
     <td>{{ item.date }}</td>
     <td>{{ item.expense }}</td>
     <td>{{ formatAmount(item.amount) }}</td>
     <td>{{ item.note }}</td>
    </tr>
   </tbody>
  </table>
 </div>
</template>

<style scoped>
thead{
 background-color: #4caf50;
 color: #fff;
}
</style>