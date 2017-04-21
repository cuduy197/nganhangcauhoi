<template lang="pug">
div(class="mdl-layout mdl-js-layout mdl-layout--fixed-header")
  top-header(style="background-color: indigo ")
  sidebar
  main(class="mdl-layout__content")
    div(class="page-content")
     view-content
</template>
<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
} from 'vuex';

import topHeader from "../../ui/header.vue";
import sidebar from "../../ui/sidebar.vue";
import viewContent from "./view.vue";


export default {
    name: 'home',
    data() {
        return {

        }
    },
    mounted() {},
    methods: {...mapMutations([])
    },
    computed: {...mapState([])
    },
    watch: {},
    components: {
        topHeader,
        sidebar,
        viewContent
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
