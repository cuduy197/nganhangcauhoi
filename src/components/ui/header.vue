<template>
<header class="mdl-layout__header">
    <div class="mdl-layout__header-row ">
        <!-- Title -->
          <span class="mdl-layout-title">Ngân hàng câu hỏi</span>
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
<style scoped>
img:hover {
    transform: rotate(360deg) scale(1.2, 1.2);
}

.mdl-navigation__link,
.mdl-button {
    font-weight: bold;
    transition: all .25s ease-in-out;
}

.mdl-navigation__link:hover,
.mdl-button:hover {
    text-decoration: underline;
    transform: scale(1.15, 1.15);
}
</style>
