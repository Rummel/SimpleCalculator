<script setup lang="ts">
import { ButtonsCalculator, useCalculatorStore } from '@/stores/calculator';
import { computed } from 'vue';

const props = defineProps<{
  btnType: ButtonsCalculator
}>()

const store = useCalculatorStore();

function buttonPressed(btnValue: ButtonsCalculator) {
  store.buttonPressed(btnValue);
}

const getBtnText = computed(() => {
  switch (props.btnType) {
    case ButtonsCalculator.back:
      return '←'; // &ShortLeftArrow;
    default:
      return props.btnType
  }
})

const getStyleGridArea = computed(() => {
  const gridArea = 'grid-area: ';
  switch (props.btnType) {
    case ButtonsCalculator.div:
      return gridArea + 'div';
    case ButtonsCalculator.mul:
      return gridArea + 'mul';
    case ButtonsCalculator.add:
      return gridArea + 'add';
    case ButtonsCalculator.sub:
      return gridArea + 'sub';
    case ButtonsCalculator.result:
      return gridArea + 'res';
    case ButtonsCalculator.point:
      return gridArea + 'nP';
    case ButtonsCalculator.back:
      return gridArea + 'nB';
    case ButtonsCalculator.bracketOpen:
      return gridArea + 'nBO';
    case ButtonsCalculator.bracketClose:
      return gridArea + 'nBC';
    default:
      return gridArea + 'n' + props.btnType;
  }
})
</script>

<template>
  <button :style="getStyleGridArea" @click="buttonPressed(btnType)">
    {{ getBtnText }}
  </button>
</template>

<style scoped>

</style>
