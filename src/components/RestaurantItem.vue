<template>
  <div class="list-item">
    <div class="name">{{ item.name }}</div>
    <div class="address">{{ item.address }}</div>
    <div class="tel">{{ item.tel }}</div>
    <div>{{ item.category }}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  }
};
</script>

<style scoped>
.list-item {
  padding: 20px 0;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
}

/* .result-item:last-child {
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
} */

.list-item div {
  position: relative;
  left: 0;
  padding: 0 0 10px 0;
}
</style>
