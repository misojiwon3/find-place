<template>
  <div class="map-container">
    <div id="map" style="width:100%;height:100%;">
      지도
    </div>
  </div>
</template>

<script>
let latlng = null;
let marker = null;
let map = null;

export default {
  props: {
    x: String,
    y: String
  },
  created() {
    console.log('created');
  },
  watch: {
    x(value, old) {
      console.log(1, this.x, value, old);
      latlng = new naver.maps.LatLng(this.y, this.x);
      map = new naver.maps.Map('map', {
        center: latlng,
        zoom: 15
      });
      marker = new naver.maps.Marker({
        position: latlng,
        map: map
      });
      console.log('latlng : ' + latlng);
    }
  },
  mounted() {
    console.log('mounted');
    console.log(2, this.y, this.x);
  }
};
</script>

<style></style>
