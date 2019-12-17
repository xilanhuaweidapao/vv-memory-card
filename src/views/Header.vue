<template>
  <el-row>
    <el-col :span="2" :offset="22">
      <el-button
        class="setting-btn"
        type="success"
        icon="el-icon-setting"
        @click="openDrawer"
        circle
      ></el-button>
    </el-col>
    <el-drawer
      :append-to-body="false"
      :visible.sync="drawer"
      direction="rtl"
      :show-close="false"
      size="50%"
      :withHeader="false"
    >
      <Config />
    </el-drawer>
  </el-row>
</template>

<script>
import Config from "./Config";

export default {
  components: {
    Config
  },
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    openDrawer() {
      this.drawer = true;
    }
  }
};
</script>

<style lang="stylus" scoped>
.setting-btn {
  margin-top:10px
}
</style>
