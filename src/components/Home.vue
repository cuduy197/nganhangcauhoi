<template>
    <div>
        <login>
            <template slot="unsingin">
                <el-col :sm="24" :md="12">
                    <el-card class="box-card">
                        <div class="grid-content comfortaa center">
                            <h2 class="comfortaa">Đăng nhập để sử dụng ứng dụng.</h2>
                            <el-button title="Bấm để đăng nhập" style="height: 100px; width: 200px; font-size: 30px" class="animated flipInX" size="large" type="primary" @click="LOGIN">Đăng nhập</el-button>
                            <hr>
                            <i>Chúc bạn một ngày tốt lành ^.^</i>
                        </div>
                    </el-card>
                </el-col>
                <el-col :sm="24" :md="12">
                    <div class="grid-content comfortaa">
                        <h4 class="comfortaa">Hướng dẫn</h4>
                        <p>Để trở thành nhà soạn thảo câu hỏi bạn cần thực hiện : </p>
                        <el-steps :space="100" direction="vertical" :active="3" finish-status="success">
                            <el-step title="Liên hệ với quản trị viên" description="Bước 1"></el-step>
                            <el-step title="Trao đổi thông tin, lựa chọn môn" description="Bước 2"></el-step>
                            <el-step title="Tham gia soạn thảo câu hỏi" description="Bước 3"></el-step>
                        </el-steps>
                    </div>
                </el-col>
            </template>
            <template slot="singin">
                <el-col :sm="24" :md="24" class="center animated fadeInDown">
                    <el-card class="bg">
                        <img :src="user.photoURL" width="100" height="100">
                        <h4 class="comfortaa"> {{user.email}} </h4>
                        <el-button @click="LOGOUT" title="Bấm để đăng xuất tài khoản">Đăng xuất</el-button>
    
                        <div>
                            <br>
                            <h1 class="comfortaa"> Soạn giả môn :
                                <a href="#/toan" class="neon2">
                                    Toán
                                </a>
                            </h1>
                            <h1 class="comfortaa"> Đã soạn :
                                <b class="neon3"> {{user.totalQuiz}} </b> câu hỏi </h1>
                            <h1 class="comfortaa">
                                <el-button size="large" type="success" icon="search">
                                    Hướng dẫn soạn thảo
                                </el-button>
                            </h1>
                        </div>
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
img {}



.neon1 {
    color: #fff;
    -webkit-animation: neon1 1.5s ease-in-out infinite alternate;
    -moz-animation: neon1 1.5s ease-in-out infinite alternate;
    animation: neon1 1.5s ease-in-out infinite alternate;
}


.neon2 {
    color: blue;
}

.neon2:hover {
    color: blue;
    -webkit-animation: neon2 1.5s ease-in-out infinite alternate;
    -moz-animation: neon2 1.5s ease-in-out infinite alternate;
    animation: neon2 1.5s ease-in-out infinite alternate;
}


.neon3 {
    color: #FFDD1B;
    -webkit-animation: neon3 1.5s ease-in-out infinite alternate;
    -moz-animation: neon3 1.5s ease-in-out infinite alternate;
    animation: neon3 1.5s ease-in-out infinite alternate;
}

.neon4 {
    color: #B6FF00;

    -webkit-animation: neon4 1.5s ease-in-out infinite alternate;
    -moz-animation: neon4 1.5s ease-in-out infinite alternate;
    animation: neon4 1.5s ease-in-out infinite alternate;
}

.neon5 {
    color: #FF9900;
    -webkit-animation: neon5 1.5s ease-in-out infinite alternate;
    -moz-animation: neon5 1.5s ease-in-out infinite alternate;
    animation: neon5 1.5s ease-in-out infinite alternate;
}

.neon6 {
    color: #BA01FF;
    -webkit-animation: neon6 1.5s ease-in-out infinite alternate;
    -moz-animation: neon6 1.5s ease-in-out infinite alternate;
    animation: neon6 1.5s ease-in-out infinite alternate;
}



@keyframes neon1 {
    from {
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #FF1177, 0 0 70px #FF1177, 0 0 80px #FF1177, 0 0 100px #FF1177, 0 0 150px #FF1177;
    }
    to {
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #FF1177, 0 0 35px #FF1177, 0 0 40px #FF1177, 0 0 50px #FF1177, 0 0 75px #FF1177;
    }
}

@keyframes neon2 {
    from {
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #228DFF;
    }
    to {
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #228DFF;
    }
}

@keyframes neon3 {
    from {
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #FFDD1B, 0 0 70px #FFDD1B, 0 0 80px #FFDD1B, 0 0 100px #FFDD1B, 0 0 150px #FFDD1B;
    }
    to {
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #FFDD1B, 0 0 35px #FFDD1B, 0 0 40px #FFDD1B, 0 0 50px #FFDD1B, 0 0 75px #FFDD1B;
    }
}

@keyframes neon4 {
    from {
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #B6FF00, 0 0 70px #B6FF00, 0 0 80px #B6FF00, 0 0 100px #B6FF00, 0 0 150px #B6FF00;
    }
    to {
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #B6FF00, 0 0 35px #B6FF00, 0 0 40px #B6FF00, 0 0 50px #B6FF00, 0 0 75px #B6FF00;
    }
}

@keyframes neon5 {
    from {
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #FF9900, 0 0 70px #FF9900, 0 0 80px #FF9900, 0 0 100px #FF9900, 0 0 150px #FF9900;
    }
    to {
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #FF9900, 0 0 35px #FF9900, 0 0 40px #FF9900, 0 0 50px #FF9900, 0 0 75px #FF9900;
    }
}

@keyframes neon6 {
    from {
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de;
    }
    to {
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00de, 0 0 35px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 75px #ff00de;
    }
}
</style>
