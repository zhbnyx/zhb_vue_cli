<template>
  <div class="sidebar">
    <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#313335"
            text-color="rgba(255,255,255,.7)"
            active-text-color="#fff"
            unique-opened
            router
            :class="{ collapse: collapse }"
    >
      <template v-for="item in menuData">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i class="icon iconfont" :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                        v-for="(threeItem,i) in subItem.subs"
                        :key="i"
                        :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i class="icon iconfont" :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import bus from "./bus";
  export default {
    data() {
      return {
        collapse: false,
        menuItems: [],
        menuData: [
          {
            icon: "icon-shouye2",
            index: "index",
            title: "系统首页"
          },
          {
            icon: "icon-renyuanguanli1",
            index: "user",
            title: "用户管理"
          },
          {
            icon: "icon-902caidan_shezhi_xitong",
            index: "3",
            title: "系统管理",
            subs: [
              {
                index: "portal",
                title: "门户管理"
              },
              {
                index: "3-2",
                title: "三级菜单",
                subs: [
                  {
                    index: "edit",
                    title: "富文本编辑器"
                  }
                ]
              }
            ]
          },
        ]
      };
    },
    created() {
      bus.$on("collapse", msg => {
        this.collapse = msg;
      });
    },
    methods: {

    },
    computed: {
      onRoutes() {
        return this.$route.path.replace("/", "");
      }
    }
  };
</script>

<style lang="scss" scoped>
  $BgColor:$menu-theme-color;//设置左侧菜单背景色
  $menuActiveTextColor:$menu-theme-active-color;//菜单点击字体
  $menuActiveBgColor:$menu-theme-active-bg-color;//菜单点击背景
  .sidebar {
    width: 220px;
    display: block;
    position: absolute;
    left: 0;
    top: 59px;
    bottom: 0;
    overflow-y: scroll;
  }
  .sidebar::-webkit-scrollbar {
    width: 0;
  }
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 100%;

  }
  .sidebar-el-menu{
  &.collapse{
    width: 65px;
  }
  }
  .sidebar > ul {
    height: 100%;
  }

</style>
<style lang="scss">
  $BgColor:$menu-theme-color;//设置左侧菜单背景色
  $menuActiveTextColor:$menu-theme-active-color;//菜单点击字体
  $menuActiveBgColor:$menu-theme-active-bg-color;//菜单点击背景
 .sidebar{
   .el-menu{
     .el-menu-item{
       text-align: left!important;
       border-left:4px solid transparent !important;
       &:hover{
         color: $menuActiveTextColor !important;
         background-color: $menuActiveBgColor !important;
         border-left:4px solid $menuActiveTextColor !important;
       }
       &.is-active {
         color: $menuActiveTextColor !important;
         background-color: $menuActiveBgColor !important;
         border-left:4px solid $menuActiveTextColor !important;
       }
     }

     .el-submenu{
       .el-submenu__title{
         text-align: left!important;
         border-left:4px solid transparent !important;
         &:hover{
           color: $menuActiveTextColor !important;
           background-color: $menuActiveBgColor !important;
           border-left:4px solid $menuActiveTextColor !important;
         }
       }

     }


     .el-scrollbar__bar.is-horizontal{
       display: none!important;
     }
   }
   .el-menu-item i,.el-submenu__title i{
     margin-right: 10px;
   }
 }

</style>
