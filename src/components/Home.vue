<template>
<div>
    <login>
        <template slot="unsingin">
            <el-col :sm="24" :md="12">
                <el-card class="box-card animated fadeIn">
                    <div class="grid-content center">
                        <h4>Chào mừng bạn, đăng nhập để sử dụng ứng dụng.</h4>
                        <el-button style="height: 100px; width: 200px; font-size: 30px" class="animated flipInX" size="large" type="primary" @click="LOGIN">Đăng nhập</el-button>
                        <hr>
                        <i>...</i>
                    </div>
                </el-card>
            </el-col>
            <el-col :sm="24" :md="12">
                <div class="grid-content ">
                    <h4>Hướng dẫn</h4>
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
<el-col :sm="24" :md="24">
    <div class="grid-content">
        <create-quiz class=""></create-quiz>
    </div>
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
    methods: {
        ...mapMutations(['LOGIN'])
    },
    components: {
        login,
        createQuiz
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.box-card {
    margin: 5px;
    /*    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);*/
}

.box-card:hover {
    box-shadow: 0 0px 30px rgba(0, 0, 0, 0.2);
}
</style>
