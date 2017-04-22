<template lang="pug">
   div(style="text-align: center; color: indigo;")
     div
       h1 Trang bạn truy cập không tồn tại, đang chuyển về trang chủ.
</template>
<script>
export default {
    mounted() {
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    }
}
</script>
