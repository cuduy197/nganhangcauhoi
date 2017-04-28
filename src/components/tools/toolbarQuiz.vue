<template>
    <div>
        <div class="toolbar" style="padding-bottom: 5px;">
            <el-tooltip content="Chèn chữ đậm" placement="top" effect="light">
                <el-button @click.native="customInput('b')"><b>B</b></el-button>
            </el-tooltip>
            <el-tooltip content="Chèn chữ nghiêng" placement="top" effect="light">
                <el-button @click="customInput('i')"><i>I</i></el-button>
            </el-tooltip>
            <el-tooltip content="Chèn chữ gạch chân" placement="top" effect="light">
                <el-button @click="customInput('u')"><u>U</u></el-button>
            </el-tooltip>
            <el-tooltip content="Chèn biểu thức toán" placement="top" effect="light">
                <el-button @click="customInput('math')">f(x)</el-button>
            </el-tooltip>
            <el-tooltip v-if="showTemplate" content="Khởi tạo câu hỏi từ các mẫu có sẵn" placement="top" effect="light">
                <el-cascader label="OK" placeholder="Chọn mẫu câu hỏi" :options="options" v-model="selectedOptions" @change="handleChange">
                </el-cascader>
            </el-tooltip>
            <el-tooltip content="Bấm để hiển thị hướng dấn nhập câu hỏi." placement="top" effect="light">
                <el-button @click="customInput('help')">?</el-button>
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
// import Info from './info/info';
export default {
    props: {
        model: {
            type: String
        },
        showTemplate: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            options: [{
                value: 'guide',
                label: 'Đạo hàm',
                children: [{
                    value: 'Đơn điệu',
                    label: 'Tính đơn điệu'
                }, {
                    value: 'đồ thị',
                    label: 'Feedback'
                }, {
                    value: 'efficiency',
                    label: 'Efficiency'
                }, {
                    value: 'controllability',
                    label: 'Controllability'
                }]

            }, {
                value: 'guide2',
                label: 'Đạo hàm 2',
                children: [{
                    value: 'Đơn điệu 2',
                    label: 'Tính đơn điệu2'
                }, {
                    value: 'đồ thị',
                    label: 'Feedback'
                }, {
                    value: 'efficiency',
                    label: 'Efficiency'
                }, {
                    value: 'controllability',
                    label: 'Controllability'
                }]

            }],
            selectedOptions: [],
        }
    },
    methods: {
        handleChange(value) {
            console.log(value[1]);
            if (value.length > 1) {
                console.log('ok')
            }
        },
        customInput(val) {
            input = "";
            console.log(this.model);
            let input = this.$store.state.input[this.model];

            function getTextFieldSelection(textField) {
                return textField.value.substring(textField.selectionStart, textField.selectionEnd);
            }
            let selectText;
            if (this.model == 'question') {
                selectText = getTextFieldSelection(document.getElementsByTagName("textarea")[0]);
            }
            if (this.model == 'hint') {
                console.log(document.getElementsByTagName("textarea"));
                selectText = getTextFieldSelection(document.getElementsByTagName("textarea")[5]);
            }
            if (this.model == 'slove') {
                selectText = getTextFieldSelection(document.getElementsByTagName("textarea")[6]);
            }
            if (val === "b") {
                input =
                    input.replace(selectText, "<b>" + selectText + "</b>");
            }
            if (val === "i") {
                input =
                    input.replace(selectText, "<i>" + selectText + "</i>");
            }
            if (val === "u") {
                input =
                    input.replace(selectText, "<u>" + selectText + "</u>");
            }
            if (val === "math") {
                input = input + "`fx`"
            }
            if (val === "help") {
                alert("Trợ gíup")
            }
            this.$store.state.input[this.model] = input;
            this.$nextTick(function() {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            });
        }
    },
    computed: {},
    watch: {},
    components: {},
    mounted() {},
}
</script>
<style>
</style>
