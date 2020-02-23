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
      icon="el-icon-setting"
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

export default {
  name: "home",
  components: {
    Display,
    Config
  },
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    openDrawer() {
      this.drawer = true;
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
    right 15px
    top 15px;
    z-index 1000
  .drag-btn
    position absolute
    left 0px
    top 5px
    z-index 1000
    -webkit-app-region: drag
    cursor move
</style>
