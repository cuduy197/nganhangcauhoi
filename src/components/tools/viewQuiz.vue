<template>
    <div>
        <div class="animated fadeInUp" v-show="!show_quiz">
            <div class="w3-row " style="padding-top: 1em;">
                <div v-for="item, index in data" :key="item.id">
                    <div class="w3-col s12 m6 l4  w3-center comfortaa" style="padding: 0em;">
                        <div class="w3-card-4 w3-white box-card">
                            <div class="w3-container w3-center">
                                <h4 class="indigo no-mobile comfortaa">
                                    <div> {{ item.title }}</div>
                                </h4>
                                <h5 class="indigo on-mobile comfortaa">
                                    <div> {{ item.title }}</div>
                                </h5>
                                <p>Tổng số câu hỏi: {{item.num}} </p>
                                <p>Số câu hỏi bạn đã tạo: {{item.my_num}} </p>
                                <div v-show="item.num >=0" class="animated fadeIn" style="padding-bottom: .5em">
                                    <a @click="getSubjectTitle" :href="'#/toan/create/'+ item.subpath">
                                        <el-button size="" @click="BEFORE_CREATE_QUIZ(item.subpath)" icon="edit">Tạo câu hỏi</el-button>
                                    </a>
                                    <a @click="show_quiz=true" :href="'#/toan/'+ item.subpath">
                                        <el-button size="" @click="VIEW_QUIZ({subpath: item.subpath, begin: 1 ,end:25, view: 'all'})" icon="search">Xem câu hỏi</el-button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="center" v-show="show_quiz">
            <div style="padding-bottom: .1em;" class="">
                <br>
                <el-button @click="show_quiz=false" title="Bấm để trở lại" icon="arrow-left">
                    Trở lại</el-button>
                <el-button @click="VIEW_QUIZ({subpath: subject.subpath, begin: 1,end: 25, view: 'all'})" icon="information" style="margin: 3px" type="primary">
                    Tất cả câu hỏi
                </el-button>
                <el-button @click="VIEW_QUIZ({subpath: subject.subpath, view: 'custom'})" icon="view" style="margin: 3px" type="primary">
                    Số thứ tự
                </el-button>
                <el-button @click="VIEW_QUIZ({subpath: subject.subpath, view: 'author',begin:1, end:25,myquiz: false})" icon="search" style="margin: 3px" type="primary">
                    Soạn giả
                </el-button>
                <el-button @click="VIEW_QUIZ({subpath: subject.subpath, view: 'author',begin:1, end:25,myquiz: true})" icon="edit" type="warning" style="margin: 3px">
                    Sửa câu hỏi của bạn
                </el-button>
            </div>
            <div class="container-card no-mobile " style="padding-bottom: 5em ">
                <h2 class="indigo comfortaa ">[ {{title}} ]</h2>
                <div v-if="quiz.numChildren> 0" class="comfortaa" style="padding: .1em 0em .7em 0em">
                    <el-pagination :page-size="25" :total="quiz.numChildren" @size-change="handleSizeChange" @current-change="viewAll" layout="total,prev, pager, next, jumper">
                    </el-pagination>
                    <hr>
                    <el-checkbox v-model="checked_stt">STT</el-checkbox>
                    <el-checkbox v-model="checked_stt2">STT2</el-checkbox>
                    <el-checkbox v-model="checked_date">Thời gian tạo</el-checkbox>
                    <el-checkbox v-model="checked_author">Soạn giả</el-checkbox>
                    <el-checkbox v-model="checked_answer">Câu trả lời đúng</el-checkbox>
                    <el-checkbox v-model="checked_answer2">Câu trả lời sai 1</el-checkbox>
                    <el-checkbox v-model="checked_answer3">Câu trả lời sai 2</el-checkbox>
                    <el-checkbox v-model="checked_answer4">Câu trả lời sai 3</el-checkbox>
                    <el-checkbox v-model="checked_hint">Gợi ý</el-checkbox>
                    <el-checkbox v-model="checked_slove">Lời giải </el-checkbox>
                </div>
                <el-table ref="singleTable" :data="quiz.val" border>
                    <el-table-column v-if="checked_stt" label="STT" width="70">
                        <template scope="scope">
                            <div title="Số thứ tự câu hỏi trong mục">
                                <p v-html="scope.row.id"> </p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="checked_stt2" label="STT2" width="80">
                        <template scope="scope">
                            <div title="Số thứ tự trong danh sách câu hỏi của soạn giả" width="100%">
                                <p v-html="scope.row.id_in_user"> </p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="checked_date" l property="create_time" label="Thời gian tạo" width="170">
                    </el-table-column>
                    <el-table-column v-if="checked_author" property="author" label="Soạn giả" width="200">
                    </el-table-column>
                    <el-table-column label="Nội dung câu hỏi" width="300">
                        <template scope="scope">
                            <p v-html="scope.row.question"> </p>
                            <img v-if="scope.row.question_image!==''" width="100%" height="100%" :src="scope.row.question_image">
                        </template>
                    </el-table-column>
                    <el-table-column v-if="checked_answer" label="Câu trả lời đúng" width="300">
                        <template scope="scope">
                            <p v-html="scope.row.answer"> </p>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="checked_answer2" label="Câu trả lời sai 1" width="300">
                        <template scope="scope">
                            <p class="animated fadeInDown" v-html="scope.row.answer2"> </p>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="checked_answer3" label="Câu trả lời sai 2" width="300">
                        <template scope="scope">
                            <p class="animated fadeInDown" v-html="scope.row.answer3"> </p>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="checked_answer4" label="Câu trả lời sai 3" width="300">
                        <template scope="scope">
                            <p class="animated fadeInDown" v-html="scope.row.answer4"> </p>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="checked_hint" label="Gợi ý" width="300">
                        <template scope="scope">
                            <div class="animated fadeInDown">
                                <p v-html="scope.row.hint"> </p>
                                <img v-if="scope.row.hint_image!==''" alt="" :src="scope.row.hint_image" width="100%" height="100%">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="checked_slove" label="Lời giải" width="295">
                        <template scope="scope">
                            <p v-html="scope.row.slove"> </p>
                            <img v-if="scope.row.slove_image!==''" :src="scope.row.slove_image" alt="" width="100%" height="100%">
                        </template>
                    </el-table-column>
                    <el-table-column v-if="quiz.author==user.email" fixed="right" label="Tùy chọn" width="120">
                        <template scope="scope">
                            <a @click="getSubjectTitle" :href="'#/toan/edit/'+'cau_hoi_so_'+ scope.row.id">
                                <el-button @click="handleEdit(scope.$index,scope.row)" type="success" size="small">Chỉnh sửa</el-button>
                            </a>
                        </template>
                    </el-table-column>
                    <!--Admin-->
                    <el-table-column v-if="user.email=='cuduy197@gmail.com'" fixed="right" label="Tùy chọn" width="120">
                        <template scope="scope">
                            <a @click="getSubjectTitle" :href="'#/toan/edit/'+'cau_hoi_so_'+ scope.row.id">
                                <el-button @click="handleEdit(scope.$index,scope.row)" type="success" size="small">Chỉnh sửa</el-button>
                            </a>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="on-mobile">
                <el-row :gutter="10" class="animated fadeInUp ">
                    <div class="comfortaa" style="padding: .5em 0em .5em 0em">
                        <el-pagination v-if="quiz.numChildren> 0" :page-size="25" :total="quiz.numChildren" @size-change="handleSizeChange" @current-change="viewAll" layout="prev, pager, next">
                        </el-pagination>
                        <p>
                            <span>Tổng số câu hỏi : [ {{quiz.numChildren}} ]</span>
                        </p>
                    </div>
                    <div @click="mathJax">
                        <el-table :data="quiz.val" style="width: 100%">
                            <el-table-column type="expand">
                                <template scope="props">
                                    <p>Câu hỏi:
                                        <span v-html="props.row.question"></span>
                                    </p>
                                    <img v-if="props.row.question_image!==''" :src="props.row.question_image" width="100" class="img-zoom" height="100">
                                    <p>Đáp án đúng:
                                        <span v-html="props.row.answer"></span>
                                    </p>
                                    <p>Đáp án sai 1 :
                                        <span v-html="props.row.answer"></span>
                                    </p>
                                    <p>Đáp án sai 2 :
                                        <span v-html="props.row.answer"></span>
                                    </p>
                                    <p>Đáp án sai 3 :
                                        <span v-html="props.row.answer"></span>
                                    </p>
                                    <p>Gợi ý:
                                        <span v-html="props.row.hint"></span>
                                    </p>
                                    <img v-if="props.row.hint_image!==''" :src="props.row.hint_image" width="100" class="img-zoom" height="100">
                                    <p>Lời giải :
                                        <span v-html="props.row.slove"></span>
                                    </p>
                                    <br>
                                    <img v-if="props.row.slove_image!==''" :src="props.row.slove_image" width="100" class="img-zoom" height="100">
                                </template>
                            </el-table-column>
                            <el-table-column label="STT" prop="id" width="70">
                            </el-table-column>
                            <el-table-column v-if="quiz.author!=user.email" label="Soạn giả" prop="author">
                            </el-table-column>
                            <el-table-column v-if="quiz.author==user.email" :label="user.email">
                                <template scope="scope">
                                    <a @click="getSubjectTitle" href="#/toan/create/">
                                        <el-button @click="handleEdit(scope.$index,scope.row)" type="success" size="small">Chỉnh sửa</el-button>
                                    </a>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
import {
    mapState,
    mapMutations,
} from 'vuex';

export default {
    props: {
        data: Array,
        subject_type: String
    },
    data() {
        return {
            checked_stt: true,
            checked_stt2: false,
            checked_date: true,
            checked_author: true,
            checked_answer: true,
            checked_answer2: false,
            checked_answer3: false,
            checked_answer4: false,
            checked_hint: false,
            checked_slove: true,
            show_quiz: false,
            title: '',
        }
    },
    computed: {
        ...mapState(['quiz', 'subject', 'user'])

    },
    methods: {
        ...mapMutations(['BEFORE_CREATE_QUIZ', 'VIEW_QUIZ']),
        getSubjectTitle() {
            let subpath = this.$store.state.subject.subpath;
            for (let i = 0; i < this.data.length; i++) {
                if (subpath == this.data[i].subpath) {
                    this.title = this.data[i].title;
                    this.$store.state.subject.title = this.title;
                    console.log(this.$store.state.subject.title);
                    break;
                }
            }
        },
        mathJax() {
            this.$nextTick(function () {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            });
        },
        handleSizeChange() {

        },
        handleEdit(index, row) {
            console.log(row.id);
            this.$store.commit('BEFORE_EDIT_QUIZ', {
                id: row.id,
                id_in_user: row.id_in_user
            });
        },
        viewAll(val) {
            let begin, end;
            if (val == 1) {
                begin = 1;
                end = 25;
            } else {
                begin = 25 * (val - 1);
                end = 25 * (val);
            }
            console.log(`current page: ${val - 1} --> ${val}`);
            this.$store.commit('VIEW_QUIZ', {
                subpath: this.$store.state.subject.subpath,
                begin: begin,
                end: end,
                view: 'all'
            })
        }
    },
    updated() {
        this.$nextTick(function () {
            setTimeout(function () {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            }, 1000);
        });
    },
    watch: {
        subject_data(value) {
            console.log('Data changed! ');
        },
        show_quiz(val) {
            let subpath = this.$store.state.subject.subpath;
            for (let i = 0; i < this.data.length; i++) {
                if (subpath == this.data[i].subpath) {
                    this.title = this.data[i].title;
                    this.$store.state.subject.title = this.title;
                    break;
                }
            }
        }
    }
}
</script>
<style scoped>

</style>
