<template>
  <div id="app">
    <div class="left-container">
      <div class="container-wrapper">
        <address-form @enter="receiveQuery"></address-form>
        <category-list :list="categories" @selected="selectCategory"></category-list>
        <restaurant-list :results="filteredRestaurantList"></restaurant-list>
      </div>
    </div>
    <div class="right-container">
      <map-view :x="currentCoordinate.x" :y="currentCoordinate.y"></map-view>
    </div>
  </div>
</template>

<script>
import AddressForm from './components/AddressForm.vue';
import CategoryList from './components/CategoryList.vue';
import RestaurantList from './components/RestaurantList.vue';
import MapView from './components/MapView.vue';
import { getPlaces, getGc, errorProccessor } from '@/api/api.js';

import category_list from './assets/categories.json';

const defaultCategory = '전체';

export default {
  name: 'App',
  created() {
    this.categories = category_list.map(c => {
      return { ...c, selected: c.name === defaultCategory };
    });
    navigator.geolocation.getCurrentPosition(p => {
      this.currentCoordinate.x = p.coords.longitude.toString();
      this.currentCoordinate.y = p.coords.latitude.toString();
      this.requestPlaceList();
    });
  },
  data() {
    return {
      restaurantList: [],
      filteredRestaurantList: [],
      categories: [],
      currentCoordinate: { x: '0', y: '0' }
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
      this.requestGc(query);
    },
    selectCategory(category, i) {
      this.arrangeCategories(i);
      this.requestPlaceList();
    },
    arrangeCategories(index) {
      if (index === 0) {
        this.categories = this.categories.map(c => {
          c.selected = c.name === defaultCategory;
          return c;
        });
      } else {
        this.categories[index].selected = !this.categories[index].selected;
        const tempCategories = this.categories.slice(1, this.categories.length);
        // '전체'를 제외한 카테고리 중 하나라도 true면 '전체'는 false
        this.categories[0].selected = !tempCategories.some(c => c.selected);
      }
    },
    async requestGc(query) {
      try {
        const { data } = await getGc(query);
        if (data.totalCount) {
          this.currentCoordinate.x = data.results[0]['x'];
          this.currentCoordinate.y = data.results[0]['y'];
          this.requestPlaceList();
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
    async requestPlaceList() {
      // 좌표 계산하여 특정 반경 내의 장소들 불러옴
      const query = this.categories
        .filter(c => c.selected)
        .map(c => c.query)
        .join(':');
      console.log('query : ' + query);
      console.log(this.currentCoordinate.x, this.currentCoordinate.y);
      const coord = `${this.currentCoordinate.x},${this.currentCoordinate.y}`;
      const boundary = this.makeBoundary(this.currentCoordinate.x, this.currentCoordinate.y);
      const response = await getPlaces(query, coord, boundary, 50);
      this.restaurantList = response.data.result.place.list;
      this.filteredRestaurantList = this.restaurantList;
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
}
.left-container {
  width: 350px;
  height: calc(100% - 60px);
  left: 0;
}
.container-wrapper {
  height: 100%;
}
.list-container {
  height: calc(100% - 170px);
  overflow: scroll;
}
.right-container {
  width: calc(100% - 350px);
  height: calc(100% - 60px);
  right: 0;
}
.map-container {
  border: solid 1px rgba(0, 0, 0, 0.1);
  height: 100%;
}
</style>
