<template>
  <div class="list-item">
    <div class="number">{{ Number(item.index) + 1 }}</div>
    <div class="name">{{ item.name }}</div>
    <div class="category-tel">
      <span class="category">{{ displayCategory }}</span>
      <span> | </span>
      <span class="tel">{{ checkTelNumber }}</span>
    </div>
    <div class="address">{{ item.roadAddress }}</div>
    <!-- <div class="tel">{{ item.tel }}</div> -->
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  computed: {
    displayCategory() {
      let categories = Object.assign([], this.item.category);
      const index = categories.indexOf('음식점');
      if (index >= 0) {
        categories.splice(index, 1);
      }
      return categories[0];
    },
    checkTelNumber() {
      if (this.item.tel) {
        return this.item.tel;
      } else {
        return '-';
      }
    }
  }
};
</script>

<style scoped>
.list-item {
  padding: 20px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  text-align: left;
}
.list-item .name {
  font-weight: bold;
  font-size: 18px;
}

/* .result-item:last-child {
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
} */

.list-item div {
  position: relative;
  left: 0;
  padding: 0 0 2px 0;
}
.number {
  width: 20px;
  display: inline-block;
  position: relative;
}
.category {
  color: #777777;
}
.tel {
  color: #386791;
}
.address {
  color: #969696;
}
</style>
