<script setup>
import { ref } from 'vue';

const emit = defineEmits(['passcodeEnter'])
const code = ref('')
const message = ref('')
function entercode() {
 if (code.value == 'dxa') {
  emit('passcodeEntered')
 } else {
  message.value = 'Not correct'
 }
}
</script>
<template>
 <div class="container" id="passCode">
  <input type="password" placeholder="#" id="code" v-model="code">
  <a class="button" href="#" @click="entercode()">Access</a>
  {{ message }}
 </div>
</template>
<style scoped>
#passCode {
 display: flex;
 position: absolute;
 background-color: white;
 height: 100vh;
 top: 0px;
 padding-top: 2rem;
 width: 100%;
 z-index: 99;
 align-items: center;
 justify-content: center;
 flex-direction: column;
}

#code {
 text-align: center;
}
</style>