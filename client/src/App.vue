<script setup>
import { onMounted, reactive } from 'vue';
import axios from 'axios';

const data= reactive({
  expense:{}
})
onMounted(() => {
  axios.get(`http://localhost:8080/expense`).then(response => {
    data.expense = response.data
  })
    .catch(e => {
      this.errors.push(e)
    })
})
</script>
<template>
  <div class="container">
    <spacer-md></spacer-md>
    <div class="row">
      <ul>
        <li>Unordered list item 1</li>
        <li>Unordered list item 2</li>
      </ul>
    </div>
  </div>
  <button id="fab">
    <span class="material-symbols-outlined fab">
      add
    </span>
  </button>
</template>

<style scoped></style>
