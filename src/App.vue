<template>
  <div id="app">
    <div class="left-container">
      <address-form @enter="receiveQuery"></address-form>
      <category-list :list="categories" @selected="selectCategory"></category-list>
      <restaurant-list :results="filteredRestaurantList"></restaurant-list>
    </div>
    <div class="right-container">
      <map-view></map-view>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

import AddressForm from './components/AddressForm.vue';
import CategoryList from './components/CategoryList.vue';
import RestaurantList from './components/RestaurantList.vue';
import MapView from './components/MapView.vue';
import { getPlaces, getGc, errorProccessor } from '@/api/api.js';

import category_list from './assets/categories.json';
// import place_list from './assets/places.json';

const defaultCategory = '전체';
const defaultDining = 'DINING_ALL';

export default {
  name: 'App',
  created() {
    this.categories = [{ code: 0, name: defaultCategory, selected: true }, ...category_list].map(
      m => {
        return { ...m, selected: false };
      }
    );
  },
  data() {
    return {
      restaurantList: [],
      filteredRestaurantList: [],
      categories: [],
      currentCategory: defaultCategory
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
      this.requestPlacesList(query);
    },
    selectCategory({ name }) {
      console.log(name);
      console.log(this.restaurantList.length === 0);
      if (this.restaurantList.length === 0) {
        this.getPlaces();
      }
      this.currentCategory = name;
      this.fetchRestauranthList();
    },
    async requestPlacesList(query) {
      try {
        const { data } = await getGc(query);
        console.log(data);
        if (data.totalCount) {
          const x = data.results[0]['x'];
          const y = data.results[0]['y'];
          console.log(x, y);
          // 좌표 계산하여 특정 반경 내의 장소들 불러옴
          const coord = `${x},${y}`;
          const boundary = this.makeBoundary(x, y);
          const response2 = await getPlaces(defaultDining, coord, boundary, 50);
          console.log(response2.data.result.place.list);
          this.restaurantList = response2.data.result.place.list;
          this.filteredRestaurantList = this.restaurantList;
        } else {
          errorProccessor({
            code: 201,
            message: '검색 결과가 없습니다. 정확한 주소를 입력하세요.'
          });
        }
      } catch (error) {
        console.log(error);
        errorProccessor(error.response.data);
      }
    },
    fetchRestauranthList() {
      this.filteredRestaurantList = this.restaurantList.filter(
        r =>
          this.currentCategory === defaultCategory ||
          r.category.join().includes(this.currentCategory)
      );
    },
    makeBoundary(x, y) {
      const difference = 0.004;
      const minX = x - difference;
      const minY = y - difference;
      const maxX = x + difference;
      const maxY = y + difference;

      return `${minX};${minY};${maxX};${maxY}`;
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
