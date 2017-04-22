<template>
<div class="login" style="">
    <el-row :gutter="20" v-if="!singin">
        <el-col  :sm="24" :md="12">
            <el-card class="box-card animated fadeIn">
                <div class="grid-content">
                    <h4>Chào mừng bạn,vui lòng đăng nhập để sử dụng ứng dụng.</h4>
                    <el-button style="height: 100px; width: 200px; font-size: 30px" class="animated flipInX" size="large" type="primary" @click="LOGIN">Đăng nhập</el-button>
                </div>
            </el-card>
        </el-col>
        <el-col :sm="24" :md="12">
            <div class="grid-content ">
                <h4>Hướng dẫn</h4>
                <p>Để trở thành nhà soạn thảo câu hỏi bạn cần thực hiện : </p>
              <el-steps :space="100"  direction="vertical"  :active="3" finish-status="success">
                    <el-step title="Liên hệ : cuduy197@gmail.com" description="Bước 1"></el-step>
                    <el-step title="Trao đổi thông tin" description="Bước 2" ></el-step>
                    <el-step title="Tham gia soạn thảo câu hỏi" description="Bước 3"></el-step>
                </el-steps>
            </div>
        </el-col>
    </el-row>
        <el-row :gutter="20" v-if="singin">
        <el-col  :sm="24" :md="24">
            <el-card class="box-card animated fadeIn">
                <div class="grid-content">
                    <h4>Chào mừng {{user.email}}</h4>
                </div>
            </el-card>
        </el-col>

          <el-col  :sm="24" :md="24">
            <el-card class="box-card animated fadeIn">
                <div class="grid-content">
                    <h4>Toán học</h4>
                </div>
            </el-card>
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
        methods: {...mapMutations(['LOGIN', 'LOGOUT'])
        },
        computed: {...mapState(['user', 'singin'])
        },
        watch: {},
        components: {},
        mounted() {},
}
</script>
<style scoped>
.box-card {
    margin: 10px;
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
