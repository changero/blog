<template> </template>

<script>
function loadWasm(path) {
  return fetch(path, {})
    .then((res) => res.arrayBuffer())
    .then(WebAssembly.instantiate)
    .then((mod) => mod.instance.exports);
}
loadWasm("/program.wasm").then(({ main }) => {
  console.log("main();", main());
});
</script>
