<template>
    <div>
        <login/>
    </div>
</template>
<script>
import login from './login.vue';
import createQuiz from './tools/createQuiz.vue';

import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
} from 'vuex';


export default {

    computed: {
        ...mapState(['user'])
    },
    methods: {
        ...mapMutations(['LOGIN', 'LOGOUT'])
    },
    components: {
        login,
        createQuiz
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
