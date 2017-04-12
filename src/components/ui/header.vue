<template>
    <header > 
        <el-menu theme="dark"  :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect">
             <el-menu-item index="1">NGÂN HÀNG CÂU HỎI</el-menu-item>
</el-menu>
</header>
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
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        computed: {},
        watch: {},
        components: {},
        mounted() {},
}
</script>
<style>
header:hover {
    box-shadow: 0 0px 30px rgba(0, 0, 0, 0.2);
}
</style>
