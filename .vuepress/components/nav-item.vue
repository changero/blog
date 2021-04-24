<template>
  <a :href="data.url" target="__blank">
    <div class="item-wrapper">
      <div class="img-wrapper">
        <img :src="data.favicon" alt="" class="item-img" />
      </div>
      <div class="name">{{ data.name }}</div>
    </div>
  </a>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style>
.item-wrapper {
  padding: 20px;
}
.img-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
.name {
  text-align: center;
  margin-top: 14px;
}
</style>
