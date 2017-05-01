<!-- <template>
    <div class="mdl-layout__drawer" style="background-color: purple; color: white;">
        <span class="mdl-layout-title">Ngân hàng câu hỏi</span>
        <nav class="mdl-navigation" style="text-align: center;">
            <p>{{user.email}}</p>
            <button @click="LOGOUT" v-if="singin" class="mdl-button mdl-js-button mdl-button--raised mdl-js mdl-button--accent">
                Đăng xuất
            </button>
            <br>
            <a v-if="!singin" class="mdl-navigation__link" style="color: white" href="#/">Giới thiệu</a>
            <a v-if="singin" class="mdl-navigation__link" style="color: white" href="#/">Trang chủ</a>
            <a v-if="singin" class="mdl-navigation__link" style="color: white" href="#/toan/">Toán học</a>
            <a v-if="singin" class="mdl-navigation__link" style="color: white" href="#/anh/">Tiếng Anh</a>
            <a v-if="singin" class="mdl-navigation__link" style="color: white" href="#/van/">Ngữ văn</a>
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
 -->
