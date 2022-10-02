<script setup lang="ts">
import { ButtonsCalculator, useCalculatorStore } from '@/stores/calculator';
import CalcButton from '@/components/CalcButton.vue';

// defineProps<{
//   // btnType: ButtonValues
// }>()

const store = useCalculatorStore();
</script>

<template>
  <div style="min-width: 200px; max-width: 400px;">
    <div class="grid-container">
      <input style="grid-area: i; text-align:right" v-model="store.displayText" readonly>
      <input style="grid-area: r; text-align:right" v-model="store.displayResult" readonly>
      <CalcButton v-for="btn in ButtonsCalculator" v-bind:key="btn" :btn-type="btn"></CalcButton>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  column-gap: 6px;
  row-gap: 6px;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "i  i  i  i"
    "r  r  r  r"
    "nC nBO nBC sub"
    "nB div mul sub"
    "n7 n8 n9 add"
    "n4 n5 n6 add"
    "n1 n2 n3 res"
    "n0 n0 nP res"
}
</style>
