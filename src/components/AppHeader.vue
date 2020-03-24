<template>
  <div class="app-header">
    <div class="logo">
      <img v-bind:src="'./logo.png'" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.logo > img {
  position: absolute;
  top: 5px;
  left: 5px;
  height: 60px;
  float: left;
  cursor: pointer;
}
</style>
