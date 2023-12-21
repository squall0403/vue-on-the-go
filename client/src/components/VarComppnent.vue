<script setup>
import { ref } from 'vue';
import DataComponentVue from './DataComponent.vue';

const dataOption = ref({})
const dataIsLoaded = (e) => {
  dataOption.value = e
}
</script>
<template>
  <div>
    <p>Something here</p>
    <DataComponentVue @dataLoaded="dataIsLoaded($event)" />

    <p v-for="item in dataOption.items">{{ item.text }}</p>
  </div>
</template>