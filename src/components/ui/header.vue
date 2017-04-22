<template>
<header class="mdl-layout__header">
    <div class="mdl-layout__header-row ">
        <!-- Title -->
        <img v-if="singin" :title="user.email" class="" :src="user.photoURL" width="42" style="border-radius: 50%; border: solid 3px; margin: 15px;">
        <span v-if="!singin" class="mdl-layout-title">Ngân hàng câu hỏi</span>
        <button @click="LOGOUT" v-if="singin" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            Đăng xuất
        </button>
        <!-- Add spacer, to align navigation to the right -->
        <div class="mdl-layout-spacer"></div> 
        <!-- Navigation. We hide it in small screens. -->
        <nav class="mdl-navigation mdl-layout--large-screen-only">
            <a v-if="!singin"  class="mdl-navigation__link" href="/">Giới thiệu</a>
            <a v-if="singin"  class="mdl-navigation__link" href="/">Trang chủ</a>
            <a v-if="singin"  class="mdl-navigation__link" href="/toan/">Toán học</a>
            <a v-if="singin"  class="mdl-navigation__link" href="/anh/">Tiếng Anh</a>
            <a v-if="singin"  class="mdl-navigation__link" href="/van/">Ngữ văn</a>
        </nav>
    </div>
</header>
</template>
<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
} from 'vuex';
import sidebar from './sidebar';
export default {
    data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {...mapMutations(['LOGOUT']),
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        computed: {...mapState(['user', 'singin'])
        },
        watch: {},
        components: {
            sidebar
        },
        mounted() {},
}
</script>
<style>
</style>
