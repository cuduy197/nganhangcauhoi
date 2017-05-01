<template>
    <div class="login" style="">
        <el-row :gutter="20" v-if="!this.$store.state.singin">
            <slot name="unsingin"></slot>
        </el-row>
        <el-row :gutter="20" class="showlist" v-if="this.$store.state.singin">
            <slot name="singin"></slot>
        </el-row>
    </div>
</template>
<script>
</script>
<style scoped>
.login {
    /* text-align: center;*/
    padding: 25px;
}

@media only screen and (max-width: 480px) and (min-width: 320px) {
    .login {
        text-align: center;
        padding: 2px;
    }
}

.grid-content {
    padding: 30px;
    margin: 15px;
    border-radius: 14px;
    min-height: 36px;
}
</style>
