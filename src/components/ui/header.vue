<template>
    <header>
        <div class="w3-top">
            <div class="w3-bar w3-large">
                <div v-if="!singin" class="float-center">
                    <a class="w3-bar-item w3-button" href="#/">Giới thiệu</a>
                </div>
                <div v-if="singin">
                    <a class="w3-bar-item w3-button" href="#/">Trang chủ</a>
                </div>
                <div class="no-mobile">
                    <div class="float-right">
                        <a v-if="singin" class="w3-bar-item w3-button" href="#/toan/">Toán</a>
                        <a v-if="singin" class="w3-bar-item w3-button" href="#/van/">Văn</a>
                        <a v-if="singin" class="w3-bar-item w3-button" href="#/anh/">Anh</a>
                        <a v-if="singin" class="w3-bar-item w3-button" href="#/van/">Lý</a>
                        <a v-if="singin" class="w3-bar-item w3-button" href="#/van/">Hóa</a>
                        <a v-if="singin" class="w3-bar-item w3-button" href="#/van/">Sinh</a>
                        <a v-if="singin" class="w3-bar-item w3-button" href="#/van/">Sử</a>
                        <a v-if="singin" class="w3-bar-item w3-button" href="#/van/">Địa</a>
                    </div>
                </div>
                <div class="w3-dropdown-hover on-mobile float-right" v-if="singin">
                    <button class="w3-bar-item w3-button">
                        Môn học
                        <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="w3-dropdown-content w3-bar-block animated zoomIn bg-indigo white" style="padding-right: 0px">
                        <a v-if="singin" class="w3-bar-item w3-button" href="#/toan/">Toán</a>
                        <a v-if="singin" class="w3-bar-item w3-button" href="#/van/">Văn</a>
                        <a v-if="singin" class="w3-bar-item w3-button" href="#/anh/">Anh</a>
                        <a v-if="singin" class="w3-bar-item w3-button" href="#/van/">Lý</a>
                        <a v-if="singin" class="w3-bar-item w3-button" href="#/van/">Hóa</a>
                        <a v-if="singin" class="w3-bar-item w3-button" href="#/van/">Sinh</a>
                        <a v-if="singin" class="w3-bar-item w3-button" href="#/van/">Sử</a>
                        <a v-if="singin" class="w3-bar-item w3-button" href="#/van/">Địa</a>
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
    .w3-bar-item:hover {
        color: indigo !important;
    }
}
</style>
