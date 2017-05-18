<template>
    <header>
        <div class="w3-top">
            <div class="w3-bar w3-large">
                <div v-if="!singin" class="float-center">
                    <router-link class="w3-bar-item w3-button" to="/">Giới thiệu</router-link>
                </div>
                <div v-if="singin">
                    <router-link class="w3-bar-item w3-button" to="/">Trang chủ</router-link>
                </div>
                <div class="no-mobile">
                    <div class="float-right">
                        <router-link v-if="singin" class="w3-bar-item w3-button" to="/toan/">Toán</router-link>
                        <router-link v-if="singin" class="w3-bar-item w3-button" to="/van/">Văn</router-link>
                        <router-link v-if="singin" class="w3-bar-item w3-button" to="/anh/">Anh</router-link>
                        <router-link v-if="singin" class="w3-bar-item w3-button" to="/van/">Lý</router-link>
                        <router-link v-if="singin" class="w3-bar-item w3-button" to="/van/">Hóa</router-link>
                        <router-link v-if="singin" class="w3-bar-item w3-button" to="/van/">Sinh</router-link>
                        <router-link v-if="singin" class="w3-bar-item w3-button" to="/van/">Sử</router-link>
                        <router-link v-if="singin" class="w3-bar-item w3-button" to="/van/">Địa</router-link>
                    </div>
                </div>
                <div class="w3-dropdown-hover on-mobile float-right" v-if="singin">
                    <button class="w3-bar-item w3-button">
                        Môn học
                        <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="w3-dropdown-content w3-bar-block animated zoomIn bg-purple white" style="padding-right: 0px">
                        <router-link v-if="singin" class="w3-bar-item w3-button" to="/toan/">Toán học</router-link>
                        <router-link v-if="singin" class="w3-bar-item w3-button" to="/van/">Ngữ văn</router-link>
                        <router-link v-if="singin" class="w3-bar-item w3-button" to="/anh/">Tiếng Anh</router-link>
                        <router-link v-if="singin" class="w3-bar-item w3-button" to="/van/">Vật Lý</router-link>
                        <router-link v-if="singin" class="w3-bar-item w3-button" to="/van/">Hóa học</router-link>
                        <router-link v-if="singin" class="w3-bar-item w3-button" to="/van/">Sinh học</router-link>
                        <router-link v-if="singin" class="w3-bar-item w3-button" to="/van/">Lịch sử</router-link>
                        <router-link v-if="singin" class="w3-bar-item w3-button" to="/van/">Địa lý</router-link>
                    </div>
                </div>
            </div>
        </div>
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

export default {
    data() {
        return {};
    },
    methods: {
        ...mapMutations(['LOGOUT']),
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        myFunction() {
            var x = document.getElementById("demo");
            if (x.className.indexOf("w3-show") == -1) {
                x.className += " w3-show";
            } else {
                x.className = x.className.replace(" w3-show", "");
            }
        }
    },
    computed: {
        ...mapState(['user', 'singin', 'subject'])
    },
    watch: {},
    components: {},
    mounted() { },
}
</script>
<style scoped>
.w3-top {
    z-index: 100;
}


.w3-dropdown-hover {
    display: none;
}

.w3-bar {
    color: white;
    font-family: 'Comfortaa', cursive;
    background-color: rgba(103, 58, 183, .8) !important;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
}

.w3-bar:hover {
    box-shadow: 0 0px 30px rgba(0, 0, 0, 0.2);
    color: white !important;
    font-family: 'Comfortaa', cursive;
    background-color: rgba(94, 53, 177, .8) !important
}

.w3-bar-item {
    font-size: 1.35em;
}

.w3-bar-item:hover {
    color: white !important;
    text-decoration: underline;
    background-color: rgba(0, 0, 0, 0) !important;
}

.float-center {
    margin: 0 auto;
    float: center !important;
}

@media only screen and (max-width: 800px) and (min-width: 320px) {
    .float-right {
        display: block;
        float: right;
    }
    .w3-bar-item {
        font-size: 1.35em;
    }
    .w3-bar-item:hover {}
}
</style>
