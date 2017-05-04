<template>
    <div>
        <div class="toolbar" style="padding-bottom: 5px;">
            <el-button type="primary" style="margin-right: 10px;" class="no-mobile" v-if="model=='question'">Câu hỏi ❓❓❓ </el-button type="text" style="padding-right: 30px">
            <el-button type="primary" style="margin-right: 10px" class="no-mobile" v-if="model=='hint'">Gợi ý 💡</el-button type="text" style="padding-right: 30px">
            <el-button type="primary" style="margin-right: 10px" class="no-mobile" v-if="model=='slove'">Lời giải 📖</el-button type="text" style="padding-right: 30px">
            <el-button type="success" style="margin-right: 30px" class="no-mobile" v-if="model=='answer'">Đáp án đúng ✔ </el-button type="text" style="padding-right: 30px">
            <el-button type="danger" style="margin-right: 30px" class="no-mobile" v-if="model=='answer2'">Đáp án sai 1 ❌ </el-button type="text" style="padding-right: 30px">
            <el-button type="danger" style="margin-right: 30px" class="no-mobile" v-if="model=='answer3'">Đáp án sai 2 ❌ </el-button type="text" style="padding-right: 30px">
            <el-button type="danger" style="margin-right: 30px" class="no-mobile" v-if="model=='answer4'">Đáp án sai 3 ❌ </el-button type="text" style="padding-right: 30px">
            <span class="on-mobile" v-if="model=='question'">Câu hỏi ❓❓❓ </span>
            <span class="on-mobile" v-if="model=='hint'">Gợi ý 💡 </span>
            <span class="on-mobile" v-if="model=='slove'">Lời giải 📖 </span>
            <span class="on-mobile" v-if="model=='answer'">Đáp án đúng ✔ </span>
            <span class="on-mobile" v-if="model=='answer2'">Đáp án sai 2 ❌ </span>
            <span class="on-mobile" v-if="model=='answer3'">Đáp án sai 3 ❌ </span>
            <span class="on-mobile" v-if="model=='answer4'">Đáp án sai 4 ❌ </span>
            <el-tooltip content="Chèn chữ đậm" placement="top" effect="light">
                <el-button @click="customInput('b')"><b>B</b></el-button>
            </el-tooltip>
            <el-tooltip content="Chèn chữ nghiêng" placement="top" effect="light">
                <el-button @click="customInput('i')"><i>I</i></el-button>
            </el-tooltip>
            <el-tooltip content="Chèn chữ gạch chân" placement="top" effect="light">
                <el-button @click="customInput('u')"><u>U</u></el-button>
            </el-tooltip>
            <el-tooltip content="Chèn biểu thức toán" placement="top" effect="light">
                <el-button @click="customInput('math')">fx</el-button>
            </el-tooltip>
            <!--  <el-tooltip v-show="subject.path== 'toan' " content="Khởi tạo câu hỏi từ các mẫu có sẵn" placement="top" effect="light">
                <el-cascader filterable label="OK" placeholder="Chọn mẫu câu hỏi" :options="toan" v-model="selectedOptions" @change="handleChange">
                </el-cascader>
            </el-tooltip> -->
            <el-tooltip v-if="model=='question'" content="Bấm để hiển thị hướng dấn nhập câu hỏi." placement="top" effect="light">
                <el-button class="no-mobile" @click="customInput('help')">?</el-button>
            </el-tooltip>
            <el-tooltip v-if="model=='question'" content="Bấm để xóa tất cả các mục vừa nhập" placement="top" effect="light">
                <el-button @click="RESET_INPUT" icon="" type="" style="margin-left: 5px" v-if="model=='question'"> Xóa </el-button>
            </el-tooltip>
        </div>
    </div>
</template>
<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
} from 'vuex';
import {
    Notification
} from 'element-ui';
import {
    Message
} from 'element-ui';

// import Info from './info/info';
export default {
    props: {
        model: {
            type: String
        }
    },
    data() {
        return {
            toan: [{
                value: 'guide',
                label: 'Hàm số và các bài toán liên quan',
                children: [{
                    value: '1',
                    label: 'Bảng biến thiên'
                }, {
                    value: '2',
                    label: 'Cực trị của hàm số'
                }, {
                    value: '3',
                    label: 'Phương trình tiếp tuyến'
                }]
            }, {
                value: 'guide2',
                label: 'Mũ và Lôgarit',
                children: [{
                    value: '1',
                    label: 'Tính đạo hàm'
                }, {
                    value: '2',
                    label: 'Giá trị lớn nhất/nhỏ nhất của hàm số'
                }, ]

            }, {
                value: 'guide3',
                label: 'Nguyên hàm - tích phân',
                children: [{
                    value: '1',
                    label: 'Tìm nguyên hàm của hàm số'
                }, {
                    value: '2',
                    label: 'Tính tích phân'
                }]

            }, {
                value: 'guide4',
                label: 'Số phức ',
                children: [{
                    value: '1',
                    label: 'Tìm mô-đun của số phức'
                }, {
                    value: '2',
                    label: 'Số phức liên hợp'
                }, {
                    value: '3',
                    label: 'Tìm phần thực, phần ảo'
                }]

            }, {
                value: 'guide5',
                label: 'Thể tích khối đa diện',
                children: [{
                    value: '1',
                    label: 'Tính thể tích hình chóp'
                }]

            }, {
                value: 'guide6',
                label: 'Khối tròn xoay',
                children: [{
                    value: '1',
                    label: 'Thể tích khối tròn xoay'
                }]

            }, {
                value: 'guide7',
                label: 'Phương pháp tọa độ trong không gian',
                children: [{
                    value: '1',
                    label: 'Tọa độ điểm và vector'
                }]

            }],
            selectedOptions: [],
        }
    },
    methods: {
        ...mapMutations(['RESET_INPUT']),
        handleChange(value) {
            console.log(value[1]);
            if (value.length > 1) {
                console.log('ok')
            }
        },
        customInput(val) {
            input = "";
            let input = this.$store.state.input[this.model];

            function getTextFieldSelection(textField) {
                return textField.value.substring(textField.selectionStart, textField.selectionEnd);
            }
            let selectText = '';
            if (this.model == 'question') {
                selectText = getTextFieldSelection(document.getElementsByName("question")[0]);
            }
            if (this.model == 'hint') {
                selectText = getTextFieldSelection(document.getElementsByName("hint")[0]);
            }
            if (this.model == 'slove') {
                selectText = getTextFieldSelection(document.getElementsByName("slove")[0]);
            }

            if (this.model == 'answer') {
                selectText = getTextFieldSelection(document.getElementsByName("answer")[0]);
            }
            if (this.model == 'answer2') {
                selectText = getTextFieldSelection(document.getElementsByName("answer2")[0]);
            }
            if (this.model == 'answer3') {
                selectText = getTextFieldSelection(document.getElementsByName("answer3")[0]);
            }
            if (this.model == 'answer4') {
                selectText = getTextFieldSelection(document.getElementsByName("answer4")[0]);
            }
            if (val === "b") {

                if (selectText == '') {
                    Message({
                        message: 'Chèn nội dung vào giữa thẻ để hiển thị in đậm. Ví dụ: <b>Chữ đậm</b>',
                        type: 'info'
                    });
                    input = input + "<b></b> ";
                } else {
                    input =
                        input.replace(String(selectText), "<b>" + String(selectText) + "</b>")
                };
            }
            if (val === "i") {

                if (selectText == '') {
                    Message({
                        message: 'Chèn nội dung vào giữa thẻ để hiển thị chữ nghiêng. Ví dụ: <i>Chữ nghiêng</i>',
                        type: 'info'
                    });
                    input = input + "<i></i> ";
                } else {
                    input =
                        input.replace(String(selectText), "<i>" + String(selectText) + "</i>");
                };

            }
            if (val === "u") {

                if (selectText == '') {
                    Message({
                        message: 'Chèn nội dung vào giữa thẻ để hiển thị chữ gạch chân. Ví dụ: <u>Gạch chân</u>',
                        type: 'info'
                    });
                    input = input + " <u></u> ";
                } else {
                    input =
                        input.replace(String(selectText), "<u>" + String(selectText) + "</u>");
                };

            }
            if (val === "math") {
                input = input + "`fx`"
            }
            if (val === "help") {
                Notification({
                    message: 'Tính năng sắp được cập nhật!',
                    type: 'info'
                });
            }
            this.$store.state.input[this.model] = input;
            this.$nextTick(function() {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            });
        }
    },
    computed: {...mapState(['subject'])
    },
    watch: {},
    components: {},
    mounted() {},
}
</script>
<style>
</style>
