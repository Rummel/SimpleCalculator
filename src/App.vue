<script setup lang="ts">
import SimpleCalculator from './components/SimpleCalculator.vue';
import { ButtonsCalculator, useCalculatorStore } from './stores/calculator';
import CalcHistory  from './components/CalcHistory.vue';

const store = useCalculatorStore();

function handleKeypress(event: KeyboardEvent) {
  // console.log('handleKeypress: ', event.key, event);
  if (event.altKey || event.ctrlKey || event.key == 'F12') return;

  event.preventDefault();
  switch (event.key) {
    case 'Enter':
      store.buttonPressed(ButtonsCalculator.result);
      break;
    case 'Delete':
      store.buttonPressed(ButtonsCalculator.clear);
      break;
    case 'Backspace':
      store.buttonPressed(ButtonsCalculator.back);
      break;
    default: {
      const keyValue = event.key.replace(':', '/').replace(',','.').toUpperCase();
      if (Object.values(ButtonsCalculator).findIndex(i => i === keyValue) >= 0) {
        store.buttonPressed(keyValue as ButtonsCalculator);
      }
      break;
    }
  }
}
document.body.addEventListener('keydown', handleKeypress)
</script>

<template>
  <main class="flex-container">
    <SimpleCalculator />
    <CalcHistory />
  </main>
</template>

<style scoped>
  .flex-container {
  display: flex;
  gap: 6px;
}
</style>
