<template lang="pug">
div(class="mdl-layout mdl-js-layout mdl-layout--fixed-header" )
  top-header(style="background-color: plum")
  sidebar
  main(class="mdl-layout__content")
    div(class="page-content")
     div(style="text-align: center;")
       h1 Trang bạn truy cập không tồn tại
        br
        a(href="/")
         button(style="background-color: orange;"  class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent") Trang chủ
</template>
<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
} from 'vuex';


import topHeader from "./ui/header.vue";
import sidebar from "./ui/sidebar.vue";


export default {
    name: 'home',
    data() {
        return {}
    },
    mounted() {},
    methods: {...mapMutations([])
    },
    computed: {...mapState([])
    },
    watch: {},
    components: {
        topHeader,
        sidebar
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
