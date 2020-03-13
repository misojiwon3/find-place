<template>
  <div class="results-container">
    <div v-if="results.length">
      <restaurant-item
        v-for="(result, i) in results"
        :key="i"
        :item="result"
      ></restaurant-item>
    </div>
    <div v-else>없음</div>
  </div>
</template>

<script>
import RestaurantItem from '@/components/RestaurantItem.vue';

export default {
  props: {
    results: Array
  },
  components: {
    RestaurantItem
  }
};
</script>

<style>
.result-item {
  padding: 20px 0;
  border-top: solid 1px rgba(0, 0, 0, 0.1);
}

.result-item:last-child {
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
}

.result-item div {
  position: relative;
  left: 0;
  padding: 0 0 10px 0;
}
</style>
