<template>
    <div>
        <login>
            <template slot="unsingin">
                <el-col :sm="24" :md="12">
                    <el-card class="animated fadeIn">
                        <div class="grid-content comfortaa center">
                            <h2 class="comfortaa">Chào mừng bạn, đăng nhập để sử dụng ứng dụng.</h2>
                            <el-button style="height: 100px; width: 200px; font-size: 30px" class="animated flipInX" size="large" type="primary" @click="LOGIN">Đăng nhập</el-button>
                            <hr>
                            <i>...</i>
                        </div>
                    </el-card>
                </el-col>
                <el-col :sm="24" :md="12">
                    <div class="grid-content comfortaa">
                        <h4 class="comfortaa">Hướng dẫn</h4>
                        <p>Để trở thành nhà soạn thảo câu hỏi bạn cần thực hiện : </p>
                        <el-steps :space="100" direction="vertical" :active="3" finish-status="success">
                            <el-step title="Liên hệ : cuduy197@gmail.com" description="Bước 1"></el-step>
                            <el-step title="Trao đổi thông tin" description="Bước 2"></el-step>
                            <el-step title="Tham gia soạn thảo câu hỏi" description="Bước 3"></el-step>
                        </el-steps>
                    </div>
                </el-col>
            </template>
            <template slot="singin">
                <el-col :sm="24" :md="24" class="center  animated fadeInUp">
                    <el-card class="box-card">
                        <img :src="user.photoURL" width="100" height="100">
                        <hr>
                        <h4 class="comfortaa">  {{user.email}} </h4>
                        <a v-show="subject='/'" class="w3-bar-item w3-button w3-red" @click="LOGOUT">Đăng xuất</a>
                    </el-card>
                </el-col>
            </template>
        </login>
    </div>
</template>
<script>
import login from './login.vue';
import createQuiz from './tools/createQuiz.vue';

import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
} from 'vuex';


export default {

    computed: {
        ...mapState(['user'])
    },
    methods: {
        ...mapMutations(['LOGIN', 'LOGOUT'])
    },
    components: {
        login,
        createQuiz
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
