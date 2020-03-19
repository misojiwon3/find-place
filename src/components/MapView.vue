<template>
  <div class="map-container">
    <div id="map" style="width:100%;height:100%;">
      지도
    </div>
  </div>
</template>

<script>
let HOME_PATH = window.HOME_PATH || '.';
let latlng = null;
let marker = null;
let map = null;

export default {
  props: {
    coord: Object,
    results: Array
  },
  created() {
    console.log('created');
  },
  watch: {
    coord: {
      deep: true,
      handler() {
        latlng = new naver.maps.LatLng(this.coord.y, this.coord.x);
        map = new naver.maps.Map('map', {
          center: latlng,
          zoom: 17
        });
        marker = new naver.maps.Marker({
          position: latlng,
          map: map,
          icon: {
            url: HOME_PATH + '/sam.png',
            size: new naver.maps.Size(50, 52),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(25, 26)
          }
        });
        console.log('latlng : ' + latlng);
      }
    },
    results(value) {
      value.map(r => {
        new naver.maps.Marker({
          position: new naver.maps.LatLng(r.y, r.x),
          map: map
        });
      });
    }
  },
  mounted() {
    console.log('mounted');
  }
};
</script>

<style></style>
