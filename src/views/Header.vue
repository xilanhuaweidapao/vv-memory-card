<template>
  <el-row>
    <el-col :span="24">
      <div class="setting-bar">
        <el-button-group>
          <el-button
            type="danger"
            size="medium"
            icon="el-icon-setting"
            circle
            @click="switchRouter('config')"
          ></el-button>
          <el-button type="warning" size="medium" icon="el-icon-menu" circle @click="switchRouter('home')"></el-button>
        </el-button-group>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    switchRouter(compName) {
      if(compName) {
        this.$router.push({ name: compName });
      }else {
        this.$router.push({ name: 'home' });
      }
    }
  }
};
</script>

<style lang="stylus">
.setting-bar {
  width: 10%;
  margin-top: 10px;
  margin-left: 25px;
}
</style>