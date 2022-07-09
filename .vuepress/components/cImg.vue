<template>
  <div class="c-img-container">
    <img :src="src" alt="" class="c-img" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
    },
  },
};
</script>

<style scoped>
.c-img-container {
  text-align: center;
}

.c-img {
  width: 60%;
  min-width: 400px;
  margin: 0 auto;
}
</style>
