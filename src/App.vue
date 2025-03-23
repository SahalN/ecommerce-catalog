<!-- @format -->

<template>
  <div id="app">
    <ProductViewer />
  </div>
</template>

<script>
import ProductViewer from "./components/ProductViewer.vue";

export default {
  components: {
    ProductViewer,
  },
};
</script>

<style>
:root {
  --men-bg: #d6e6ff;
  --women-bg: #fde2ff;
  --unavailable-bg: #f3f4f6;
  --men-theme-color: #002772;
  --women-theme-color: #720060;
}
</style>
