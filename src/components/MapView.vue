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
          map: map,
          icon: {
            content:
              `<div class="marker">
              <img src="./marker.png" style="width:40px;height:40px;z-index=10;position:absolute;">
              <div class="marker-background" style="background-color:white;width:20px;height:20px;position:absolute;top:5px;left:10px;z-index:0;border-radius:20px;"></div>
              <span class="marker-number" style="position:absolute;width:40px;top:7px;font-weight:900;text-align:center;">` +
              (Number(r.index) + 1) +
              `</span>
            </div>`,
            size: new naver.maps.Size(38, 58),
            anchor: new naver.maps.Point(19, 58)
          }
        });
      });
    }
  },
  mounted() {
    console.log('mounted');
  }
};
</script>

<style scoped>
.marker-number {
  position: absolute;
  left: 0;
  top: 5px;
}
</style>
