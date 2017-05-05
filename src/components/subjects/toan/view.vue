<template>
    <div>
        <div class="" v-show="!show_quiz" v-on:mouseover="showNum">
            <el-row :gutter="10" class="center animated fadeInUp showlist">
                <div v-for="item in items" :key="item.id">
                    <el-col :sm="24" :md="24" :lg="12">
                        <el-card class="box-card">
                            <h3 class="indigo"> <blockquote> {{ item.title }}</blockquote>  </h3>
                            <p>Tổng số câu hỏi: {{item.num}} </p>
                            <p>Số câu hỏi bạn đã tạo: {{item.my_num}} </p>
                            <hr>
                            <div>
                                <el-button-group>
                                    <a :href="'#/toan/create/'+ item.subpath">
                                        <el-button @click="BEFORE_CREATE_QUIZ(item.subpath)" icon="edit">Tạo câu hỏi</el-button>
                                    </a>
                                    <a @click="show_quiz=true">
                                        <el-button @click="VIEW_QUIZ({subpath: item.subpath, begin: 1 ,end:25, view: 'all'})" icon="search">Xem câu hỏi</el-button>
                                    </a>
                                </el-button-group>
                            </div>
                        </el-card>
                    </el-col>
                </div>
            </el-row>
        </div>
        <div class="center" v-show="show_quiz">
            <div style="padding-bottom: .1em;" class="">
                <br>
                <a @click="show_quiz=false" title="Bấm để trở lại">
                    <el-button type="" icon="arrow-left">Trở lại</el-button>
                </a>
                <el-button @click="VIEW_QUIZ({subpath: subject.subpath, begin: 1,end: 25, view: 'all'})" type="" icon="information" style="margin: 3px">Tất cả câu hỏi</el-button>
                <el-button @click="VIEW_QUIZ({subpath: subject.subpath, view: 'custom'})" icon="view" style="margin: 3px">Số thứ tự</el-button>
                <el-button @click="VIEW_QUIZ({subpath: subject.subpath, view: 'author',begin:1, end:25,myquiz: false})" icon="search" style="margin: 3px">Người soạn câu hỏi</el-button>
                <el-button @click="VIEW_QUIZ({subpath: subject.subpath, view: 'author',begin:1, end:25,myquiz: true})" icon="edit" type="warning" style="margin: 3px">Sửa câu hỏi của bạn </el-button>
            </div>
            <div class="container-card no-mobile " style="padding-bottom: 10em ">
                <h2 class="indigo comfortaa ">{{title}} </h2>
                <mark><span>Tổng số câu hỏi hiện tại là  [ {{quiz.numChildren}} ]</span></mark>
                <div v-if="quiz.numChildren> 0" class="comfortaa" style="padding: .5em 0em .5em 0em">
                    <el-pagination :page-size="25" :total="quiz.numChildren" @size-change="handleSizeChange" @current-change="viewAll" layout="prev, pager, next">
                    </el-pagination>
                </div>
                <el-table v-if="quiz.numChildren > 0" ref="singleTable" :data="quiz.val" border>
                    <el-table-column property="id" label="STT" width="70">
                    </el-table-column>
                    <!--         <el-table-column property="id_in_user" label="STT2" width="80">
                    </el-table-column> -->
                    <el-table-column property="create_time" label="Ngày tạo" width="240">
                    </el-table-column>
                    <el-table-column property="author" label="Người soạn câu hỏi" width="200">
                    </el-table-column>
                    <el-table-column label="Nội dung câu hỏi" width="250">
                        <template scope="scope">
                            <p v-html="scope.row.question"> </p>
                            <img v-if="scope.row.question_image!==''" :src="scope.row.question_image" width="100%" alt="" height="100%">
                        </template>
                    </el-table-column>
                    <el-table-column label="Câu trả lời đúng" width="250">
                        <template scope="scope">
                            <p v-html="scope.row.answer"> </p>
                        </template>
                    </el-table-column>
                    <el-table-column label="Câu trả lời sai 1" width="250">
                        <template scope="scope">
                            <p v-html="scope.row.answer2"> </p>
                        </template>
                    </el-table-column>
                    <el-table-column label="Câu trả lời sai 2" width="250">
                        <template scope="scope">
                            <p v-html="scope.row.answer3"> </p>
                        </template>
                    </el-table-column>
                    <el-table-column label="Câu trả lời sai 3" width="250">
                        <template scope="scope">
                            <p v-html="scope.row.answer4"> </p>
                        </template>
                    </el-table-column>
                    <el-table-column label="Gợi ý" width="250">
                        <template scope="scope">
                            <p v-html="scope.row.hint"> </p>
                            <img v-if="scope.row.hint_image!==''" :src="scope.row.hint_image" width="100%" alt="" height="100%">
                        </template>
                    </el-table-column>
                    <el-table-column label="Lời giải" width="250">
                        <template scope="scope">
                            <p v-html="scope.row.slove"> </p>
                            <img v-if="scope.row.slove_image!==''" :src="scope.row.slove_image" width="100%" alt="" height="100%">
                        </template>
                    </el-table-column>
                    <el-table-column v-if="quiz.author==user.email" fixed="right" label="Tùy chọn" width="120">
                        <template scope="scope">
                            <a :href="'#/toan/edit/'+'cau_hoi_so_'+ scope.row.id">
                                <el-button @click="handleEdit(scope.$index,scope.row)" type="warning" size="small">Chỉnh sửa</el-button>
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
                        <mark><span>Tổng số câu hỏi hiện tại là  [ {{quiz.numChildren}} ]</span></mark>
                    </div>
                    <div @click="showmath">
                        <el-table :data="quiz.val" style="width: 100%">
                            <el-table-column type="expand">
                                <template scope="props">
                                    <p>Câu hỏi: <span v-html="props.row.question"></span> </p>
                                    <img v-if="props.row.question_image!==''" :src="props.row.question_image" width="100" class="img-zoom" height="100">
                                    <p>Đáp án đúng: <span v-html="props.row.answer"></span> </p>
                                    <p>Đáp án sai 1 : <span v-html="props.row.answer"></span> </p>
                                    <p>Đáp án sai 2 : <span v-html="props.row.answer"></span> </p>
                                    <p>Đáp án sai 3 : <span v-html="props.row.answer"></span> </p>
                                    <p>Gợi ý: <span v-html="props.row.hint"></span> </p>
                                    <img v-if="props.row.hint_image!==''" :src="props.row.hint_image" width="100" class="img-zoom" height="100">
                                    <p>Lời giải : <span v-html="props.row.slove"></span></p>
                                    <img v-if="props.row.slove_image!==''" :src="props.row.slove_image" width="100" class="img-zoom" height="100">
                                    <br>
                                    <hr>
                                </template>
                            </el-table-column>
                            <el-table-column label="STT" prop="id" width="70">
                            </el-table-column>
                            <el-table-column v-if="quiz.author!=user.email" label="Người soạn câu hỏi" prop="author">
                            </el-table-column>
                            <el-table-column v-if="quiz.author==user.email" :label="user.email">
                                <template scope="scope">
                                    <a href="#/toan/create/">
                                        <el-button @click="handleEdit(scope.$index,scope.row)" type="warning" size="small">Chỉnh sửa</el-button>
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
    data() {
            return {
                show_quiz: false,
                title: '',
                items: [{
                    title: 'Hàm số và các bài toán liên quan',
                    subpath: 'hamso',
                    num: 0,
                    my_num: 0
                }, {
                    title: 'Mũ và logarit',
                    subpath: 'mu_logarit',
                    num: 0,
                    my_num: 0
                }, {
                    title: 'Nguyên hàm - tích phân và ứng dụng',
                    subpath: 'nguyenham_tichphan',
                    num: 0,
                    my_num: 0
                }, {
                    title: 'Số phức',
                    subpath: 'sophuc',
                    num: 0,
                    my_num: 0
                }, {
                    title: 'Thể tích khối đa diện',
                    subpath: 'khoi_da_dien',
                    num: 0,
                    my_num: 0
                }, {
                    title: 'Khối tròn xoay',
                    subpath: 'khoi_tron_xoay',
                    num: 0,
                    my_num: 0
                }, {
                    title: 'Phương pháp tọa độ không gian',
                    subpath: 'toado_khonggian',
                    num: 0,
                    my_num: 0
                }]
            }
        },
        computed: {
            ...mapState(['quiz', 'subject', 'user'])
        },
        methods: {
            ...mapMutations(['BEFORE_CREATE_QUIZ', 'VIEW_QUIZ']),
            showNum() {
                //  console.log('hover');
                var toan = this.$store.state.subject.toan;
                this.items[0].num = toan.num_hamso;
                this.items[0].my_num = toan.my_num_hamso;

                this.items[1].num = toan.num_mu_logarit;
                this.items[1].my_num = toan.my_num_mu_logarit;

                this.items[2].num = toan.num_nguyenham_tichphan;
                this.items[2].my_num = toan.my_num_nguyenham_tichphan;

                this.items[3].num = toan.num_sophuc;
                this.items[3].my_num = toan.my_num_sophuc;

                this.items[4].num = toan.num_khoi_da_dien;
                this.items[4].my_num = toan.my_num_khoi_da_dien;

                this.items[5].num = toan.my_num_khoi_tron_xoay;
                this.items[5].my_num = toan.my_num_khoi_tron_xoay;

                this.items[6].num = toan.num_toado_khonggian;
                this.items[6].my_num = toan.my_num_toado_khonggian;
            },
            showmath() {
                this.$nextTick(function() {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                });
            },
            handleEdit(index, row) {
                console.log(row.id);
                this.$store.commit('BEFORE_EDIT_QUIZ', {
                    id: row.id,
                    id_in_user: row.id_in_user
                });
            },
            handleSizeChange(val) {
                console.log(`${val} items per page`);
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
                console.log(`current page: ${val-1} --> ${val}`);
                this.$store.commit('VIEW_QUIZ', {
                    subpath: this.$store.state.subject.subpath,
                    begin: begin,
                    end: end,
                    view: 'all'
                })
            }
        },
        created() {
            console.log('created');
            this.$store.watch(
                function(state) {
                    return state.subject;
                },
                function() {
                    console.log('changed');
                    //do something on data change
                }, {
                    deep: true //add this if u need to watch object properties change etc.
                }
            );

        },
        updated() {
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
