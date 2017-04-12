<template>

<div class="mdl-layout__drawer" style="background-color: purple; color: white;">
    <span class="mdl-layout-title">Ngân hàng câu hỏi</span>
    <nav class="mdl-navigation">
        <a v-if="!singin" class="mdl-navigation__link" style="color: white" href="/">Giới thiệu</a>
        <a v-if="singin" class="mdl-navigation__link" style="color: white" href="/">Trang chủ</a>
        <a v-if="singin" class="mdl-navigation__link" style="color: white" href="/toan/">Toán học</a>
        <a v-if="singin" class="mdl-navigation__link" style="color: white" href="/anh/">Tiếng Anh</a>
        <a v-if="singin" class="mdl-navigation__link" style="color: white" href="/van/">Ngữ văn</a>
    </nav>
</div>


</template>
<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
} from 'vuex';
// import Info from './info/info';
export default {
    data() {
            return {}
        },
        methods: {},
        computed: {...mapState(['user', 'singin'])
        },
        watch: {},
        components: {},
        mounted() {},
}
</script>
<style>
</style>
