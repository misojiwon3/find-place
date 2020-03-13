<template>
  <div class="results-container">
    <div v-if="results.length">
      <div class="result-item" v-for="(result, i) in results" :key="i">
        <div class="name">{{result.name}}</div>
        <div class="address">{{result.address}}</div>
      </div>
    </div>
    <div v-else>없음</div>
  </div>
</template>

<script>
export default {
  props: {
    results: Array
  }
};
</script>

<style>
.result-item {
  padding: 20px 0;
  border-top: solid 1px rgba(0, 0, 0, .1);
}

.result-item:last-child {
  border-bottom: solid 1px rgba(0, 0, 0, .1);
}

.result-item div {
  position: relative;
  left: 0;
  padding: 0 0 10px 0;
}
</style>