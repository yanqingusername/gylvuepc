<template>
  <el-container>
      <el-header>
          <div class="header_view">
            <el-aside width="85%"><sidebar class="sidebar-container"></sidebar></el-aside> 
            <header-temp></header-temp>
          </div>
      </el-header>
      <el-container>
          <!-- <el-aside width="200px"><sidebar class="sidebar-container"></sidebar></el-aside> -->
          <el-main><app-main></app-main></el-main>
      </el-container>
  </el-container>
</template>
<script>
import AppMain  from './appMain'      // 页面布局的右侧区域
import sidebar  from './sideBar'      // 页面布局的左侧菜单
import headerTemp from "./headerTemp" // 页面布局的header菜单
export default {
  name: 'layout',
  components: { sidebar, AppMain, headerTemp }
}
</script>
<style>
.el-header{padding: 0!important;margin-left: 0px;height: 80px !important;}
.header_view{
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background: rgb(48, 65, 86);
  height: 80px;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
}
.el-menu {
    border:none !important;
}
</style>