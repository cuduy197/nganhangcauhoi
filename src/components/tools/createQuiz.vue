<template>
    <div class="create_quiz">
        <el-col :sm="24" :md="24" style="padding-right: 20px">
            <div class=" animated fadeInUp">
                <el-card class="center">
                    <el-button size="large" style="margin: 4px;" v-if="!quiz.edit && question.length > 0 && answer.length > 0 && answer2.length > 0 && answer3.length > 0 && answer4.length > 0 " @click="CREATE_QUIZ" icon="edit" type="success">Tạo câu hỏi</el-button>
                    <el-button size="large" style="margin: 4px;" v-if="!quiz.edit && question.length ===0 || answer.length === 0 || answer2.length === 0 || answer3.length === 0 || answer4.length === 0 " @click="CREATE_QUIZ" icon="edit" type="primary" disabled>Tạo câu hỏi</el-button>
                    <el-button size="large" style="margin: 4px;" v-if="quiz.edit" @click="CREATE_QUIZ" icon="edit" type="warning">Cập nhật câu hỏi số {{quiz.edit_child}} </el-button>
                </el-card>
                <!--EDITOR-->
                <el-card class="">
                    <el-tabs type="card" v-model="activeName" @tab-click="">
                        <!--    Pop Over-->
                        <el-popover v-show="popshow" ref="pop_question" placement="bottom" :width="width>800?width/2:width-50" trigger="hover" :value="true">
                            <u v-show="question.length > 0" style="cursor: pointer" class="comfortaa">Câu hỏi:</u>
                            <div v-show="question.length > 0" class="preview" id="question" v-html="input.question"></div>
                            <h4 class="center comfortaa" v-show="question.length === 0">Vui lòng nhập nội dung câu hỏi để hiển thị !</h4>
                        </el-popover>
                        <el-popover ref="pop_answer" placement="bottom" :width="width>800?width/2:width-50" trigger="hover">
                            <u v-show="answer.length > 0" class="comfortaa">Đáp án đúng</u>
                            <div v-show="answer.length > 0" class="preview" id="answer" v-html="input.answer"></div>
                            <h4 class="center comfortaa" v-show="answer.length === 0">Vui lòng nhập nội dung đáp án đúng để hiển thị !</h4>
                        </el-popover>
                        <el-popover ref="pop_answer2" placement="bottom" :width="width>800?width/2:width-50" trigger="hover">
                            <u v-show="answer2.length > 0" class="comfortaa">Đáp án sai</u>
                            <div v-show="answer2.length > 0" class="preview" id="answer2" v-html="input.answer2"></div>
                            <h4 class="center comfortaa" v-show="answer.length === 0">Vui lòng nhập nội dung đáp án sai để hiển thị !</h4>
                        </el-popover>
                        <el-popover ref="pop_answer3" placement="bottom" :width="width>800?width/2:width-50" trigger="hover">
                            <u v-show="answer3.length > 0" class="comfortaa">Đáp án sai 2</u>
                            <div v-show="answer3.length > 0" class="preview" id="answer3" v-html="input.answer3"></div>
                            <h4 class="center comfortaa" v-show="answer.length === 0">Vui lòng nhập nội dung đáp án sai 2 để hiển thị !</h4>
                        </el-popover>
    
                        <el-popover ref="pop_answer4" placement="bottom" :width="width>800?width/2:width-50" trigger="hover">
                            <u v-show="answer4.length > 0" class="comfortaa">Đáp án sai 3</u>
                            <div v-show="answer4.length > 0" class="preview" id="answer4" v-html="input.answer4"></div>
                            <h4 class="center comfortaa" v-show="answer.length === 0">Vui lòng nhập nội dung đáp án sai 3 để hiển thị !</h4>
                        </el-popover>
    
                        <el-popover ref="pop_hint" placement="bottom" :width="width>800?width/2:width-50" trigger="hover">
                            <u v-show="answer4.length > 0" class="comfortaa">Gợi ý</u>
                            <div v-show="hint.length > 0" class="preview" id="hint" v-html="input.hint"></div>
                            <h4 class="center comfortaa" v-show="hint.length === 0">Vui lòng nhập nội dung gợi ý để hiển thị !</h4>
                        </el-popover>
                        <el-popover ref="pop_slove" placement="bottom" :width="width>800?width/2:width-50" trigger="hover">
                            <u v-show="slove.length > 0" class="comfortaa">Lời giải</u>
                            <div v-show="slove.length > 0" class="preview" id="slove" v-html="input.slove"></div>
                            <h4 class="center comfortaa" v-show="hint.length === 0">Vui lòng nhập nội dung lời giải để hiển thị !</h4>
                        </el-popover>
    
                        <!--TAB EDITOR-->
                        <el-tab-pane label="Câu hỏi" name="question">
    
                            <div class="center animated fadeInDown ">
                                <el-button v-popover:pop_question style="cursor: pointer; " class="comfortaa " icon="view " type="text ">Xem trước </el-button>
                            </div>
    
                            <vue-html5-editor :content="question" @change="updateQuestion" ref="question" :height="300"></vue-html5-editor>
    
                        </el-tab-pane>
                        <el-tab-pane label="Đáp án đúng" name="answer">
                            <div class="center animated fadeInDown ">
                                <el-button v-popover:pop_answer style="cursor: pointer;  " class="comfortaa" icon="view " type="text ">Xem trước </el-button>
                            </div>
                            <vue-html5-editor :content="answer" @change="updateAnswer" ref="answer" :height="300"></vue-html5-editor>
                        </el-tab-pane>
                        <el-tab-pane label="Đáp án sai" name="answer2">
                            <div class="center animated fadeInDown ">
                                <el-button v-popover:pop_answer2 style="cursor: pointer;  " class="comfortaa" icon="view " type="text ">Xem trước </el-button>
                            </div>
                            <vue-html5-editor :content="answer2" @change="updateAnswer2" ref="answer2" :height="300"></vue-html5-editor>
                        </el-tab-pane>
    
                        <el-tab-pane label="Đáp án sai 2" name="answer3">
                            <div class="center animated fadeInDown ">
                                <el-button v-popover:pop_answer3 style="cursor: pointer;  " class="comfortaa" icon="view " type="text ">Xem trước </el-button>
                            </div>
                            <vue-html5-editor :content="answer3" @change="updateAnswer3" ref="answer3" :height="300"></vue-html5-editor>
                        </el-tab-pane>
    
                        <el-tab-pane label="Đáp án sai 3" name="answer4">
                            <div class="center animated fadeInDown ">
                                <el-button v-popover:pop_answer4 style="cursor: pointer;  " class="comfortaa" icon="view " type="text ">Xem trước </el-button>
                            </div>
                            <vue-html5-editor :content="answer4" @change="updateAnswer4" ref="answer4" :height="300"></vue-html5-editor>
                        </el-tab-pane>
    
                        <el-tab-pane label="Gợi ý" name="hint">
                            <div class="center animated fadeInDown ">
                                <el-button v-popover:pop_hint style="cursor: pointer;  " class="comfortaa" icon="view " type="text ">Xem trước </el-button>
                            </div>
                            <vue-html5-editor :content="hint" @change="updateHint" ref="hint" :height="300"></vue-html5-editor>
                        </el-tab-pane>
    
                        <el-tab-pane label="Lời giải" name="slove">
                            <div class="center animated fadeInDown ">
                                <el-button v-popover:pop_slove style="cursor: pointer;  " class="comfortaa" icon="view " type="text ">Xem trước </el-button>
                            </div>
                            <vue-html5-editor :content="slove" @change="updateSlove" ref="slove" :height="300"></vue-html5-editor>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
    
            </div>
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


export default {
    data() {
        return {
            popshow: false,
            width: window.innerWidth,
            activeName: 'question'
        }
    },
    methods: {
        ...mapMutations(['RESET_INPUT', 'CREATE_QUIZ']),
        updateQuestion: function (data) {
            this.$store.state.input.question = data;
            this.reset_mathjax();
        }, updateAnswer: function (data) {
            this.$store.state.input.answer = data;
            this.reset_mathjax();
        },
        updateAnswer2: function (data) {
            this.$store.state.input.answer2 = data;
            this.reset_mathjax();
        }, updateAnswer3: function (data) {
            this.$store.state.input.answer3 = data;
            this.reset_mathjax();
        }, updateAnswer4: function (data) {
            this.$store.state.input.answer4 = data;
            this.reset_mathjax();
        }, updateHint: function (data) {
            this.$store.state.input.hint = data;
            this.reset_mathjax();
        }, updateSlove: function (data) {
            this.$store.state.input.slove = data;
            this.reset_mathjax();
        },
        onEditorBlur() {
            // console.log('editor blur!', editor)
        },
        onEditorFocus() {
            // console.log('editor focus!', editor)
        },
        onEditorReady() {
            // console.log('editor ready!', editor)
        },
        reset_mathjax() {
            this.$nextTick(function () {
                //  MathJax.Hub.Queue(["Typeset", MathJax.Hub, "MathJax"]);
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, "question"]);
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, "answer"]);
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, "answer2"]);
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, "answer3"]);
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, "answer4"]);
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, "hint"]);
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, "slove"]);
            });
        }
    },
    computed: {
        ...mapState(['input', 'singin', 'user', 'quiz', 'subject']),
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
        setTimeout(function () {
            this.popshow = true;
        }, 1000);
    },
    components: {
    }
}
</script>
<style scoped>
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
    width: 100%;
    word-wrap: break-word;
    padding: 5px 0px 5px 5px;
    border: solid 1px;
    border-radius: 5px;
    text-align: left;
}

.preview_answer {
    word-wrap: break-word;
    padding: 15px 0px 15px 5px;
    border: solid 1px;
}
</style>
