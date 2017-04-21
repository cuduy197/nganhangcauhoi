<template>
<div>
<flash-card  imgFront="https://lh3.googleusercontent.com/-Y8wdEU1eHbE/AAAAAAAAAAI/AAAAAAAAALs/tIB2IAKV7fs/photo.jpg" back="Back" colorFront="blue"> </flash-card>
</div>
</template>
<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
} from 'vuex';
import flashCard from 'vue-flashcard';
export default {
    data() {
            return {
                Cauhoi: 'Ok'
            }
        },
        methods: {},
        computed: {},
        watch: {},
        components: {
            flashCard
        },
        mounted() {},
}
</script>
<style>
</style>
