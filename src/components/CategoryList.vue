<template>
  <div class="category-container">
    <span
      class="category-tag"
      v-for="(item, i) in list"
      :key="i"
      @click="selectCategory(item, i)"
    >{{item.name}}</span>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  methods: {
    selectCategory(item, i) {
      console.log(i, item.name, item.selected, this.list[i].selected);
      this.list[i].selected = !item.selected;
      this.$emit('selected', item, i)
    }
  }
};
</script>

<style scoped>
.category-container {
  margin: 10px 0;
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
</style>