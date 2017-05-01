<template>
    <div class="create_quiz">
        <el-col :sm="24" :md="13">
            <el-card class="box-card animated fadeIn">
                <el-form label-position="top" class="ruleForm">
                    <el-form-item label="Câu hỏi ❓❓❓">
                        <toolbarQuiz model="question"> </toolbarQuiz>
                        <el-input name="question" @change="reset_mathjax" v-model.lazy="question" :autosize="{ minRows: 6}" type="textarea" placeholder="nhập nội dung"></el-input>
                    </el-form-item>
                    <el-form-item label="Hình ảnh câu hỏi">
                        <el-input @change="reset_mathjax" v-model="question_image" icon="picture" type="text" placeholder="Nhập địa chỉ hình ảnh"></el-input>
                    </el-form-item>
                    <hr>
                    <el-form-item label="Đáp án đúng ✔">
                        <el-input @change="reset_mathjax" v-model="answer" autosize type="textarea" placeholder="nhập nội dung"></el-input>
                    </el-form-item>
                    <el-form-item label="Đáp án sai 1 ❌">
                        <el-input @change="reset_mathjax" v-model="answer2" autosize type="textarea" placeholder="nhập nội dung"></el-input>
                    </el-form-item>
                    <el-form-item label="Đáp án sai 2 ❌">
                        <el-input @change="reset_mathjax" v-model="answer3" autosize type="textarea" placeholder="nhập nội dung"></el-input>
                    </el-form-item>
                    <el-form-item label="Đáp án sai 3 ❌">
                        <el-input @change="reset_mathjax" v-model="answer4" autosize type="textarea" placeholder="nhập nội dung"></el-input>
                    </el-form-item>
                    <hr>
                    <el-form-item label=" Gợi ý 💡">
                        <toolbarQuiz model="hint"> </toolbarQuiz>
                        <el-input name="hint" @change="reset_mathjax" v-model="hint" :autosize="{ minRows: 3}" type="textarea" placeholder="nhập nội dung"></el-input>
                    </el-form-item>
                    <el-form-item label="Hình ảnh gợi ý ">
                        <el-input @change="reset_mathjax" v-model="hint_image" type="text" icon="picture" placeholder="Nhập địa chỉ hình ảnh"></el-input>
                    </el-form-item>
                    <hr>
                    <el-form-item label=" Lời giải 📖">
                        <toolbarQuiz model="slove"> </toolbarQuiz>
                        <el-input name="slove" @change="reset_mathjax" v-model="slove" :autosize="{ minRows: 3}" type="textarea" placeholder="nhập nội dung"></el-input>
                    </el-form-item>
                    <el-form-item label="Hình ảnh lời giải ">
                        <el-input @change="reset_mathjax" v-model="slove_image" type="text" icon="picture" placeholder="Nhập địa chỉ hình ảnh"></el-input>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
        <!--     <el-col :span="6">
        <el-card class="box-card animated fadeIn">
         
                <el-form label-width="150px" label-position="top" class="ruleForm">
                    <el-form-item label=" Lời giải 📖" > 
                        <el-input  :autosize="{ minRows: 15}"  type="textarea"  placeholder="nhập nội dung"></el-input>
                    </el-form-item>
                      <el-form-item label="Hình ảnh gợi ý 🎴" >
                        <el-input type="text"  icon="picture" placeholder="Nhập địa chỉ hình ảnh"></el-input>
                    </el-form-item>
                   </el-form>
         
        </el-card>
    </el-col> -->
        <el-col :sm="24" :md="11">
            <el-card class="box-card animated fadeIn">
                <el-form label-position="top" class="ruleForm">
                    <el-form-item class="center">
                        <el-button @click="CREATE_QUIZ" icon="edit" type="primary">Tạo câu hỏi </el-button>
                        <el-button @click="RESET_INPUT" icon="delete" type="warning">Đặt lại</el-button>
                    </el-form-item>
                </el-form>
                <div class="center">
                    <span>Câu hỏi số: [ {{ quiz.numChildren }} ]</span> trong mục <span>[ {{ title_subpath }} ]</span>
                </div>
                <hr>
                <div class="preview" v-html="input.question">
                </div>
                <br>
                <img v-show="input.question_image.length > 5" :src="input.question_image" alt="image question">
                <hr>
                <el-row :gutter="5">
                    <el-col :span="12">
                        <div class="bg-green center ">
                            <mark class="bg-green white">ĐÁP ÁN ĐÚNG</mark>
                        </div>
                        <div class="preview_answer" v-html="input.answer"> </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="bg-salmon center">
                            <mark class="bg-salmon white">ĐÁP ÁN SAI 1</mark>
                        </div>
                        <div class="preview_answer" v-html="input.answer2"> </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="bg-salmon center">
                            <mark class="bg-salmon white">ĐÁP ÁN SAI 2</mark>
                        </div>
                        <div class="preview_answer" v-html="input.answer3"> </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="bg-salmon center">
                            <mark class="bg-salmon white">ĐÁP ÁN SAI 3</mark>
                        </div>
                        <div class="preview_answer" v-html="input.answer4"> </div>
                    </el-col>
                </el-row>
                <hr>
                <div>Hiển thị gợi ý:</div>
                <div class="preview" v-html="input.hint"> </div>
                <br>
                <img v-show="input.hint_image.length > 5" :src="input.hint_image" alt="image hint">
                <hr>
                <div>Hiển thị lời giải:</div>
                <div class="preview" v-html="input.slove"> </div>
                <br>
                <img v-show="input.slove_image.length > 5" :src="input.slove_image" alt="image slove">
            </el-card>
        </el-col>
    </div>
</template>
<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
} from 'vuex';

import toolbarQuiz from './toolbarQuiz.vue';

export default {
    data() {
            return {
                title_subpath: '',
                title_toan: {
                    hamso: 'Hàm số và các bài toán liên quan',
                    mu_logarit: 'Mũ và logarit',
                    nguyenham_tichphan: 'Nguyên hàm - tích phân và ứng dụng',
                    sophuc: 'Số phức',
                    khoi_da_dien: 'Thể tích khối đa diện',
                    khoi_tron_xoay: 'Khối tròn xoay',
                    toado_khonggian: 'Phương pháp tọa độ không gian'
                }
            }
        },
        methods: {
            ...mapMutations(['RESET_INPUT', 'CREATE_QUIZ']),
            reset_mathjax() {
                this.$nextTick(function() {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                });
            }
        },
        computed: {
            ...mapState(['input', 'singin', 'user', 'quiz']),
            question: {
                get() {
                    return this.$store.state.input.question
                },
                set(value) {
                    this.$store.commit('updateQuestion', value)
                }
            },
            question_image: {
                get() {
                    return this.$store.state.input.question_image
                },
                set(value) {
                    this.$store.commit('updateQuestion_image', value)
                }
            },
            answer: {
                get() {
                    return this.$store.state.input.answer
                },
                set(value) {
                    this.$store.commit('updateAnswer', value)
                }
            },
            answer2: {
                get() {
                    return this.$store.state.input.answer2
                },
                set(value) {
                    this.$store.commit('updateAnswer2', value)
                }
            },
            answer3: {
                get() {
                    return this.$store.state.input.answer3
                },
                set(value) {
                    this.$store.commit('updateAnswer3', value)
                }
            },
            answer4: {
                get() {
                    return this.$store.state.input.answer4
                },
                set(value) {
                    this.$store.commit('updateAnswer4', value)
                }
            },
            hint: {
                get() {
                    return this.$store.state.input.hint
                },
                set(value) {
                    this.$store.commit('updateHint', value)
                }
            },
            hint_image: {
                get() {
                    return this.$store.state.input.hint_image
                },
                set(value) {
                    this.$store.commit('updateHint_image', value)
                }
            },
            slove: {
                get() {
                    return this.$store.state.input.slove
                },
                set(value) {
                    this.$store.commit('updateSlove', value)
                }
            },
            slove_image: {
                get() {
                    return this.$store.state.input.slove_image
                },
                set(value) {
                    this.$store.commit('updateSlove_image', value)
                }
            },
        },
        mounted() {
            let subpath = this.$store.state.subject.subpath;
            if (subpath == 'hamso') {
                this.title_subpath = this.title_toan[subpath]
            }
            if (subpath == 'mu_logarit') {
                this.title_subpath = this.title_toan[subpath]
            }
            if (subpath == 'nguyenham_tichphan') {
                this.title_subpath = this.title_toan[subpath]
            }
            if (subpath == 'sophuc') {
                this.title_subpath = this.title_toan[subpath]
            }
            if (subpath == 'khoi_da_dien') {
                this.title_subpath = this.title_toan[subpath]
            }
            if (subpath == 'khoi_tron_xoay') {
                this.title_subpath = this.title_toan[subpath]
            }

            if (subpath == 'toado_khonggian') {
                this.title_subpath = this.title_toan[subpath]
            }

        },
        components: {
            toolbarQuiz
        }
}
</script>
<style scoped>
.ruleForm {}

.create_quiz {
    padding: 1em 10px 3em 10px;
}

img {
    border: groove;
    border-radius: 5px;
    display: block;
    margin: 0 auto;
}

.preview {
    word-wrap: break-word;
    padding: 15px 0px 15px 5px;
    border: solid 1px;
    border-radius: 5px;
}

.preview_answer {
    word-wrap: break-word;
    padding: 15px 0px 15px 5px;
    border: solid 1px;
}
</style>
