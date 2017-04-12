<template>
<div class="login" style="">
    <el-row :gutter="20">
        <el-col :sm="24" :md="12">
            <el-card class="box-card animated fadeIn">
                <div class="grid-content">
                    <h2>Đăng nhập</h2>
                    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm">
                        <el-form-item prop="email" label="Email">
                            <el-input v-model="dynamicValidateForm.email"></el-input>
                        </el-form-item>
                        <el-form-item prop="pass" label="Mật khẩu">
                            <el-input type="password" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button class="animated flipInX" size="large" type="primary">Đăng nhập</el-button>
                </div>
            </el-card>
        </el-col>
        <el-col :sm="24" :md="12">

            <div class="grid-content " >
                <h4><mark>Lưu ý</mark> </h4>
                <p>Để trở thành nhà soạn thảo câu hỏi bạn cần thực hiện theo các bước sau : </p>

              <el-steps :space="100"  direction="vertical"  :active="3" finish-status="success">
                    <el-step title="Bước 1" description="Liên hệ cuduy197@gmail.com"></el-step>
                    <el-step title="Bước 2" description="Trao đổi thông tin" ></el-step>
                    <el-step title="Bước 3" description="Tham gia soạn thảo câu hỏi"></el-step>
                </el-steps>
            </div>
        </el-col>
    </el-row>
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
            return {
                dynamicValidateForm: {
                    email: '',
                    password: ''
                }
            };
        },
        methods: {

        },
        computed: {},
        watch: {},
        components: {},
        mounted() {},
}
</script>
<style scoped>
.box-card {
    border-radius: 12px;
    padding: 5px;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
}

.box-card:hover {
    border-radius: 12px;
    padding: 5px;
    box-shadow: 0 0px 30px rgba(0, 0, 0, 0.2);
}

.login {
    text-align: center;
    padding: 25px;
}

@media only screen and (max-width: 480px) and (min-width: 320px) {
    .login {
        text-align: center;
        padding: 2px;
    }
}

.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    padding: 30px;
    border-radius: 14px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
