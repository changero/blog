<template>
    <div contenteditable="true" class="content">
    </div>
</template>

<script>

document.addEventListener("paste",(e)=>{
    console.log(e)
})
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.content {
  height: 200px;
  outline: 0;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  padding: 0.5em;
}

.content:focus {
  border-color: aqua;
}
</style>


