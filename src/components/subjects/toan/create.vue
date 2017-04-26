<template lang="pug">
    div
     createQuiz
</template>
<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
} from 'vuex';

import createQuiz from '../../tools/createQuiz.vue';

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
        createQuiz
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
