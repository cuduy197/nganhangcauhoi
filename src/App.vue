<template>
<div>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <top-header style="background-color: purple"></top-header>
        <sidebar></sidebar>
        <main class="mdl-layout__content">
            <div class="page-content">
                <router-view></router-view>
            </div>
        </main>
    </div>
</div>
</template>
<script>
import topHeader from "./components/ui/header.vue";
import sidebar from "./components/ui/sidebar.vue";

export default {
    name: 'app',
    components: {
        topHeader,
        sidebar
    }
}
</script>
