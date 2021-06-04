<template>
<div>
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <!--main-->
    <div class="main-box" :class="{'content-collapse':collapse}">
        <transition name="move" mode="out-in">
            <router-view/>
        </transition>
    </div>

</div>
</template>

<script>
    import vHead from "./Header.vue";
    import vSidebar from "./Sidebar.vue";
    import bus from "./bus";
    export default {
        name: "admin",
        data: function () {
            return {
                collapse:''
            }
        },
        created() {
            bus.$on("collapse", msg => {
                this.collapse = msg;
            });
        },
        methods: {},
        components: {
            vHead,
            vSidebar
        },
    }
</script>

<style lang="scss" scoped>
.main-box{
    position: absolute;
    top:59px;
    left: 220px;
    right:0;
    bottom:0;
    &.content-collapse {
        left: 65px;
    }
}
</style>
