<template>
    <div>
        <div class="" v-show="!show_quiz">
            <el-row :gutter="10" class="center animated fadeInUp showlist">
                <div v-for="item in items" :key="item.id">
                    <el-col :span="24">
                        <el-card class="box-card">
                            <h3 class="textHeader"> <blockquote> {{ item.title }}</blockquote>  </h3>
                            <hr>
                            <div>
                                <el-button-group>
                                    <a href="#/toan/create/">
                                        <el-button @click="BEFORE_CREATE_QUIZ(item.subpath)" type="" icon="edit">Tạo câu hỏi</el-button>
                                    </a>
                                    <a @click="show_quiz=true">
                                        <el-button @click="VIEW_QUIZ(item.subpath)" type="" icon="search">Xem câu hỏi</el-button>
                                    </a>
                                </el-button-group>
                            </div>
                        </el-card>
                    </el-col>
                </div>
            </el-row>
        </div>
        <div class="center" v-show="show_quiz">
            <div style="padding-bottom: 2em;" class="animated fadeIn">
                <br>
                <a @click="show_quiz=false" title="Bấm để trở lại">
                    <el-button type="" icon="search">Trở lại</el-button>
                    <el-button type="" icon="">{{title}}</el-button>
                </a>
            </div>
            <!--    <div class="container-card">
                <el-table ref="singleTable" :data="quiz.val" border>
                    <el-table-column type="index" width="50">
                    </el-table-column>
                    <el-table-column sortable property="create_time" label="Ngày tạo" width="250">
                    </el-table-column>
                    <el-table-column property="author" label="Người soạn câu hỏi" width="250">
                    </el-table-column>
                    <el-table-column property="question" label="Nội dung câu hỏi">
                    </el-table-column>
                    <el-table-column property="answer" label="Câu trả lời đúng">
                    </el-table-column>
                </el-table>
            </div> -->
            <el-row :gutter="10" class="animated fadeInUp ">
                <div v-show="quiz.numChildren === 0" class="container-card">
                    <el-card class="box-card">
                        <h3 class="textHeader">Chưa có câu hỏi nào trong ngân hàng câu hỏi<br>bạn hãy là người đầu tiên tạo câu hỏi ^^</h3>
                    </el-card>
                </div>
                <div v-for="quiz,index in quiz.val" :key="quiz.id">
                    <el-col :span="24">
                        <div class="container-card" @click="showmath">
                            <el-card class="box-card">
                                <mark title="Số thứ tự câu hỏi"> [ {{++index}} ]</mark>
                                <span title="Tác giả"> [ {{quiz.author}} ] </span>
                                <p title="Thời gian soạn câu hỏi"> {{quiz.create_time}}</p>
                                <span>[Câu hỏi] : </span> <span class="textHeader" v-html="quiz.question"> </span>
                                <p class="container-card">[Đáp án đúng] : {{ quiz.answer }} </p>
                            </el-card>
                        </div>
                    </el-col>
                </div>
            </el-row>
        </div>
    </div>
</template>
<script>
import {
    mapState,
    mapMutations,
} from 'vuex';
export default {
    data() {
            return {
                show_quiz: false,
                title: '',
                items: [{
                    title: 'Hàm số và các bài toán liên quan',
                    subpath: 'hamso'
                }, {
                    title: 'Mũ và logarit',
                    subpath: 'mu_logarit'
                }, {
                    title: 'Nguyên hàm - tích phân và ứng dụng',
                    subpath: 'nguyenham_tichphan'
                }, {
                    title: 'Số phức',
                    subpath: 'sophuc'
                }, {
                    title: 'Thể tích khối đa diện',
                    subpath: 'khoi_da_dien'
                }, {
                    title: 'Khối tròn xoay',
                    subpath: 'khoi_tron_xoay'
                }, {
                    title: 'Phương pháp tọa độ không gian',
                    subpath: 'toado_khonggian'
                }]
            }
        },
        computed: {
            ...mapState(['quiz'])
        },
        methods: {
            ...mapMutations(['BEFORE_CREATE_QUIZ', 'VIEW_QUIZ']),
            showmath() {
                this.$nextTick(function() {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                });
            }
        },
        updated() {
            console.info('updated!')
            this.$nextTick(function() {
                setTimeout(function() {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                }, 1000);
            });
        },
        watch: {
            show_quiz(val) {
                let subpath = this.$store.state.subject.subpath;
                for (let i = 0; i < this.items.length; i++) {
                    if (subpath == this.items[i].subpath) {
                        this.title = this.items[i].title;
                        break;
                    }
                }


            }
        }
}
</script>
<style scoped>
.textHeader {
    color: indigo;
    font-family: 'Comfortaa', cursive;
}

.textHeader:hover {}

.box-card {
    transition: all .3s ease-in-out;
}

.box-card:hover {
    transform: scale(1.1, 1.1);
    border: solid;
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.2);
}

@media only screen and (max-width: 800px) and (min-width: 320px) {
    .box-card:hover {
        transform: scale(1, 1);
    }
}

.box-card:focus {
    transform: rotateX(90deg);
}
</style>
