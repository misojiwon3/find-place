<template>
  <div id="app">
    <div class="left-container">
      <address-form @enter="receiveQuery"></address-form>
      <category-list
        :list="categories"
        @selected="selectCategory"
      ></category-list>
      <restaurant-list v-bind:results="searchResults"></restaurant-list>
    </div>
    <div class="right-container">
      <map-view></map-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import AddressForm from './components/AddressForm.vue';
import CategoryList from './components/CategoryList.vue';
import RestaurantList from './components/RestaurantList.vue';
import MapView from './components/MapView.vue';

import category_list from './assets/categories.json';
import place_list from './assets/places.json';

export default {
  name: 'App',
  created() {
    this.categories = [
      { code: 0, name: '전체', selected: true },
      ...category_list
    ].map(m => {
      return { ...m, selected: false };
    });
  },
  data() {
    return {
      searchResults: [],
      categories: []
    };
  },
  components: {
    AddressForm,
    CategoryList,
    RestaurantList,
    MapView
  },
  methods: {
    receiveQuery(query) {
      console.log(query);

      this.searchResults = place_list;
    },
    selectCategory(item, index) {
      console.log(item, index);
    },
    getPlaces() {
      const url =
        'https://my-json-server.typicode.com/misojiwon3/my-fake-server/places';
      axios
        .get(url)
        .then(response => {
          const data = response.data;
          console.log(data);
          this.searchResults = data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.left-container,
.right-container {
  position: absolute;
  padding: 0 20px;
}
.left-container {
  width: 70%;
  left: 0;
}
.right-container {
  width: 30%;
  right: 0;
}
</style>
