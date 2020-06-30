<template>
  <div class="home">
    <el-button
      class="setting-btn"
      type="danger"
      icon="el-icon-setting"
      @click="openDrawer"
      circle
    ></el-button>
    <el-button
      class="drag-btn"
      type="success"
      icon="el-icon-rank"
      circle
    ></el-button>
    <el-button
      @click="openAllScreen"
      class="all-screen-btn"
      type="warning"
      icon="el-icon-full-screen"
      circle
    ></el-button>
    <Display />
    <el-drawer
      :append-to-body="true"
      :visible.sync="drawer"
      direction="rtl"
      :show-close="false"
      size="50%"
      :withHeader="false"
    >
      <Config />
    </el-drawer>
  </div>
</template>

<script>
import Display from "@/views/Display.vue";
import Config from "@/views/Config.vue";
import { ipcRenderer } from "electron";

export default {
  name: "home",
  components: {
    Display,
    Config
  },
  data() {
    return {
      drawer: false,
      isAllScreen: false
    };
  },
  methods: {
    openDrawer() {
      this.drawer = true;
    },
    // 全屏
    openAllScreen() {
      this.isAllScreen = !this.isAllScreen;
      ipcRenderer.send('ALL_SCREEN', this.isAllScreen)
    }
  }
};
</script>

<style lang="stylus">
.home
  position relative
  height 100%
.setting-btn
  position absolute
  right 5px
  top 20px;
  z-index 1000
.drag-btn
  position absolute
  right 5px
  top 60px;
  z-index 1000
  -webkit-app-region: drag
  cursor move
.all-screen-btn
  position absolute
  right 5px
  top 100px;
  z-index 1000
</style>
