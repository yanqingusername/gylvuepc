<template>
  <el-menu
    mode="vertical"
    unique-opened
    :default-active="$route.path"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#409EFF"
  >
    <sidebar-item :routes="routes"></sidebar-item>
  </el-menu>
</template>

<script>
import sidebarItem from "./sidebarItem";

export default {
  components: { sidebarItem },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
  },
};
</script>
<style scoped>
.sidebar-container {
  transition: width 0.28s;
  /* width: 180px !important; */
  height: 80px;
  display: flex;
  align-items: center;
  margin-left: 20px;
  /* position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001; */
}
.sidebar-container a {
  display: inline-block;
  width: 100%;
}
.sidebar-container .svg-icon {
  margin-right: 16px;
}
.sidebar-container .el-menu {
  border: none !important;
  width: 100%;
  border-right: none !important;
}
</style>
<style>
a{text-decoration: none;}
</style>