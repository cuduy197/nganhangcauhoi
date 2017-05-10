<template>
    <div>
        <view-quiz :data="subject.toan"></view-quiz>
    </div>
</template>
<script>
import viewQuiz from '../../tools/viewQuiz.vue';
import {
    mapState
} from 'vuex';

export default {
    computed: {
        ...mapState(['subject']),
    },
    components: {
        viewQuiz
    }
}
</script>
