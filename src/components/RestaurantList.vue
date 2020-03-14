<template>
  <div class="list-container">
    <div v-if="results.length">
      <restaurant-item v-for="(result, i) in results" :key="i" :item="result"></restaurant-item>
    </div>
    <div v-else>현재 위치를 파악할 수 없습니다. 주소를 입력하세요</div>
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
.list-container {
  border-top: solid 1px rgba(0, 0, 0, 0.1);
}
</style>
