<script setup lang="ts">
import { useCalculatorStore } from '@/stores/calculator';
import { computed } from 'vue';

const store = useCalculatorStore();

function historyClicked(historyIndex: number) {
  console.log('historyClicked', historyIndex);
  store.selectHistory(history.value.length - historyIndex - 1);
}

const history = computed(() => {
  return store.history
})
</script>
  
<template>
  <!-- eslint-disable vue/require-v-for-key -->
  <div class="box">
    <div class="row content" v-for="item, index in history.slice().reverse()"
      @click="historyClicked(index)">
      <div style="font-size: 0.6em;">{{item.input}}</div>
      <em style="font-weight: bold;">{{item.result}}</em>
    </div>
    <div class="row remaining-space">

    </div>
  </div>
</template>
  
<style scoped>
.box {
  min-width: 100px;
  display: inline-flex;
  gap: 0px;
  flex-flow: column;
  font-size: 1em;
  text-align: right;
  line-height: 1.2;
  overflow-y: auto;
  max-height: 242px;
}

.box .row.content {
  flex: 0 1 auto;
  margin-bottom: 2px;
  background-color: var(--vt-c-white); 
}

.box .row.remaining-space {
  flex: 1 1 auto;
}
</style>
  