<template lang="pug">
div
  top-header
  login
</template>
<script>
import login from './login.vue';
import topHeader from "./ui/header.vue";


export default {
    name: 'home',
    data() {
        return {}
    },
    components: {
        login,
        topHeader,
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
