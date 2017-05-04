<template>
    <el-row :gutter="10" class="center animated fadeInUp showlist">
        <div v-for="item in items" :key="item.id">
            <el-col :span="24">
                <el-card class="box-card ">
                    <h1 class="indigo comfortaa"> {{ item.title }} </h1>
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
</style>
