<template>
  <div class="container">
    <Item v-for="item in list" :data="item" />
  </div>
</template>

<script>
import Item from "./nav-item";
export default {
  data: () => {
    return {
      list: [],
    };
  },
  mounted() {
    fetch("https://nav.bianqu.cf")
      .then((res) => res.json())
      .then((data) => {
        this.list = data;
      });
  },
  components: {
    Item,
  },
};
</script>

<style>
.container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
</style>
