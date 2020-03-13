<template>
  <div class="result-item">
    <div class="name">{{ item.name }}</div>
    <div class="address">{{ item.address }}</div>
    <div class="tel">{{ item.tel }}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  }
};
</script>

<style></style>
