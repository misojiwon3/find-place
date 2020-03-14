<template>
  <div class="form-container">
    <input
      type="text"
      v-model="address"
      @keyup.enter.stop.prevent="enterQuery"
      placeholder="주소를 입력하세요."
    />
    <button type="reset" v-if="address.length" @click="resetAddress"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: ''
    };
  },
  methods: {
    enterQuery(e) {
      if (this.address) {
        console.log(e);
        console.log('on key up');
        this.$emit('enter', this.address);
        this.address = '';
      } else {
        console.log('입력값이 없습니다.');
      }
    },
    resetAddress() {
      this.address = '';
    }
  }
};
</script>

<style scoped>
.form-container {
  position: relative;
}
input {
  width: 90%;
  height: 30px;
  padding: 5px 10px;
  margin: 0 0 10px 0;
  font-size: 14px;
}
button {
  position: absolute;
  top: 12px;
  right: 20px;
  border-radius: 50%;
  background-color: #ccc;
  color: white;
  border: none;
  padding: 2px 5px;
  cursor: pointer;
}
button::before {
  content: 'X';
}
</style>
