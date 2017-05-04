<template>
    <el-row :gutter="10" class="center animated fadeInUp showlist">
        <el-col :span="24">
            <el-card class="box-card ">
                <h1 class="indigo comfortaa"> Trở về trang chủ ...</h1>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
export default {
    mounted() {
        setTimeout(() => {
            window.location.href = '#/';
        }, 1000);
    }
}
</script>
