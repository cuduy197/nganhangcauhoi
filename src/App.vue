<template>
<div>
  <top-header></top-header>
  <!-- <sidebar></sidebar> -->
  <main style="padding-top: 3.14em">
    <router-view></router-view>
  </main>
</div>
</template>
<script>
import topHeader from "./components/ui/header.vue";

export default {
  name: 'app',
  components: {
    topHeader,
  }
}
</script>
<style>
</style>
