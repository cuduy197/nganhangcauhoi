<template lang="pug">
div(class="mdl-layout mdl-js-layout mdl-layout--fixed-header")
  top-header(style="background-color: salmon  ")
  sidebar
  main(class="mdl-layout__content")
    div(class="page-content")
     <h1>Văn học</h1>
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
