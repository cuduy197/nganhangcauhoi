<template>
    <div>
        <createQuiz />
    </div>
</template>
<script>
import createQuiz from '../../tools/createQuiz.vue';
export default {
    components: {
        createQuiz
    },
    mounted() {
        this.$store.state.subject.path = location.hash.split('/')[1];
        if (this.$store.state.subject.subpath == "") {
            location.hash = '#/' + this.$store.state.subject.path;
        }
    }
}
</script>
