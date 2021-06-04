<template>
  <div class="header">
    <div class="sidebarLogo"  :class="{ collapse: collapse }">
      <img src="@/assets/logo.png" v-show="!collapse"/>

      <span></span>
    </div>
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="toggleCollapse" v-if="collapse">
      <i class="icon iconfont icon-suojinindent2"></i>
    </div>
    <div class="collapse-btn" @click="toggleCollapse" v-else>
      <i class="icon iconfont icon-suojinindent3"></i>
    </div>
    <!-- 顶部导航菜单 -->
<!--    <div class="top-menu-list">-->
<!--      <span-->
<!--              v-for="(item, index) in topMenuList"-->
<!--              :key="index"-->

<!--              :class="indexnum == index ? 'on' : ''"-->
<!--      >-->
<!--        {{ item.menuName }}</span-->
<!--      >-->
<!--    </div>-->
    <!--退出等-->
    <div class="admin-btn">
      <div class="user">
        <i class="zhb-icon icon iconfont icon-yonghu1"></i>
        管理员
      </div>
      <div class="layout-btn" @click="logout">
        <i
                class="zhb-icon icon iconfont icon-tuichu"
                style="font-size: 18px; margin-right: 3px"
        ></i>
        登出
      </div>
    </div>
  </div>
</template>
<script>
  import bus from "./bus";
  export default {
    name: "Header",
    data() {
      return {
        adminName: "",
        token: "",
        collapse: false,
        //顶部导航菜单栏
        indexnum: "",
        topMenuList: [
          {menuName:'样本资源管理',frontPath:'/ict_sample_front3.0'},
          {menuName:'资产管理',frontPath:'/ict_assets_front3.0'},
          {menuName:'模型训练',frontPath:'/ict_model_front3.0'},
          {menuName:'工作空间',frontPath:'/ict_workspace_front3.0'},
          {menuName:'个人中心',frontPath:'/ict_personal_front3.0'},
          {menuName:'系统管理',frontPath:'/ict_admin_front3.0'},
          {menuName:'价值评估',frontPath:'/ict_worth_front3.0'},
        ],
      };
    },
    props: ["topUserName"],
    watch: {
      $route() {},
    },
    created() {
      //获取用户信息
      this.adminName = localStorage.getItem("userName");

      //获取头部菜单下标
      this.indexnum = localStorage.getItem("modelIndex") || 0;
    },
    methods: {
      // 侧边栏折叠
      toggleCollapse() {
        this.collapse = !this.collapse;
        bus.$emit("collapse", this.collapse);
      },

      //退出
      logout() {
        //清除token
        window.localStorage.removeItem("token");
        //清除用户名
        window.localStorage.removeItem("userName");
        //跳转登录页
        this.$router.push('/login')
      },


    },
  };
</script>
<style lang="scss">
  .header {
    background-color: $menu-theme-color;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 59px;
    font-size: 22px;
    color: #fff;
    display: flex;
    align-items: center;
    .sidebarLogo{
      width: 220px;
      height: 59px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background: $menu-theme-color;
      /*border-right:1px solid #2E405B;*/
      box-sizing: border-box;
      border-bottom:1px solid #2E405B;
      &.collapse{width: 65px;}
    }
    .sidebarLogo img{
      /*width: 130px;*/
       height: 38px;
      vertical-align: middle;
      margin-left: 22px;
    }
    .sidebarLogo span{
      color: #ffffff;
      font-weight: bold;
      font-size:17px;
      margin-top: 5px;
    }
  }

  .collapse-btn {
    cursor: pointer;
    height: 59px;
    display: flex;
    align-items: center;
    border-right: 1px solid #2e405b;
    border-left: 1px solid #2e405b;
    box-sizing: border-box;
  }

  .collapse-btn i {
    padding: 0 21px;
    display: block;
    font-size: 25px;
    color: #abb0b8;
  }

  .admin-btn {
    position: absolute;
    right: 20px;
    display: flex;
    align-items: center;
  }

  .layout-btn {
    color: #ffffff;
    font-size: 15px;
    cursor: pointer;
  }

  .user {
    color: #ffffff;
    font-size: 15px;
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #8d8d8d;
    cursor: pointer;
  }

  .zhb-icon {
    font-size: 20px;
    margin-right: 5px;
  }
  .top-menu-list {
    margin-left: 15px;
    font-size: 14px;
    span {
      padding: 0 10px;
      color:$el-submenu__title-color;
      display: inline-block;
      line-height: 59px;
      margin: 0 20px 0 0;
      &:hover {
        cursor: pointer;
        color: $el-topmenu__title-color;
        line-height: 49px;
        border-bottom: 5px solid #1d73f6;
      }
      &.on {
        color:  $el-topmenu__title-color;
        line-height: 49px;
        border-bottom: 5px solid #1d73f6;
      }
    }
  }
</style>
