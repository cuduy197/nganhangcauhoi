<template lang="pug">
   div(style="text-align: center; color: black;")
     div
       h1 Đang chuyển về trang chủ.
</template>
<script>
export default {
    mounted() {
        setTimeout(() => {
            window.location.href = '/';
        }, 1000);
    }
}
</script>
