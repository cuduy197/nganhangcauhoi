<template>

<div class="mdl-layout__drawer" style="background-color: purple; color: white;">
    <span class="mdl-layout-title">Ngân hàng câu hỏi</span>

    <nav class="mdl-navigation" style="text-align: center;">
        <!--  <img  v-if="singin" :title="user.email" class="" :src="user.photoURL" height="210"  style="border-radius: 0%; border: solid 3px; transition: all .4s ease-in-out;"> -->
    <p>{{user.email}}</p>
      <button @click="LOGOUT" v-if="singin" class="mdl-button mdl-js-button mdl-button--raised mdl-js mdl-button--accent">
            Đăng xuất
        </button>
    <hr>
        <a v-if="!singin" class="mdl-navigation__link" style="color: white" href="/">Giới thiệu</a>
        <a v-if="singin" class="mdl-navigation__link" style="color: white" href="/">Trang chủ</a>
        <a v-if="singin" class="mdl-navigation__link" style="color: white" href="/toan/">Toán học</a>
        <a v-if="singin" class="mdl-navigation__link" style="color: white" href="/anh/">Tiếng Anh</a>
        <a v-if="singin" class="mdl-navigation__link" style="color: white" href="/van/">Ngữ văn</a>
         <hr>
        <br>
       
       
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
        methods: {...mapMutations(['LOGOUT'])
        },
        computed: {...mapState(['user', 'singin'])
        },
        watch: {},
        components: {},
        mounted() {},
}
</script>
<style>
</style>
