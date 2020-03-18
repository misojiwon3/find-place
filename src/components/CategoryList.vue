<template>
  <div class="category-container">
    <span
      class="category-tag"
      :class="{ selected: item.selected }"
      v-for="(item, i) in list"
      :key="i"
      @click="selectCategory(item, i)"
      >{{ item.name }}</span
    >
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  methods: {
    selectCategory(item, index) {
      this.$emit('selected', item, index);
    }
  }
};
</script>

<style scoped>
.category-container {
  padding: 10px 0;
  height: 100px;
}
.category-tag {
  display: inline-block;
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 0 12px;
  margin: 0 5px 5px 0;
  line-height: 28px;
  color: #333;
  cursor: pointer;
}
.category-tag.selected {
  background-color: #0475f4;
  color: white;
}
</style>
