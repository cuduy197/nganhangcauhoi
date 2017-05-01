<template>
    <el-row :gutter="10" class="center animated fadeInUp showlist">
        <div v-for="item in items" :key="item.id">
            <el-col :span="24">
                <el-card class="box-card ">
                    <h3 class="textHeader"> {{ item.title }} </h3>
                    <hr>
                    <el-button-group>
                        <a href="#/van/create/" title="Bấm để tạo câu hỏi">
                            <el-button @click="BEFORE_CREATE_QUIZ(item.subpath)" icon="edit">Tạo câu hỏi</el-button>
                        </a>
                        <a href="#" title="Bấm để xem hỏi">
                            <el-button icon="search">Xem câu hỏi</el-button>
                        </a>
                    </el-button-group>
                </el-card>
            </el-col>
        </div>
    </el-row>
</template>
<script>
import {
    mapState,
    mapMutations,
} from 'vuex';
export default {
    data() {
            return {
                items: [{
                    title: 'Đang cập nhật',
                    subpath: '1'
                }]
            }
        },
        methods: {
            ...mapMutations(['BEFORE_CREATE_QUIZ'])
        }
}
</script>
<style scoped>
.textHeader {
    color: indigo;
}

.box-card {
    transition: all .3s ease-in-out;
}

.box-card:hover {
    text-decoration: underline;
    transform: scale(1.2, 1.2);
}

@media only screen and (max-width: 800px) and (min-width: 320px) {
    .box-card:hover {
        transform: scale(1, 1);
    }
}
</style>
