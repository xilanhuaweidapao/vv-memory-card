<template>
  <el-row>
    <el-col>
      <el-dropdown>
        <el-button type="primary">
          选择默认仓库
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(repos, index) in reposList" :key="index">{{repos.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
// 默认知识库
// 设置切换时间
// 主题设置
import { getAllRepos } from "@/api/article";

export default {
  data() {
    return {
      reposList:[]
    };
  },
  mounted() {
    getAllRepos().then(res => {
      console.log("res", res);
      if (res.status && res.status === 200) {
        this.reposList = [];
        const data = res.data.data;
        data.forEach(repos => {
          const { name, slug } = repos;
          this.reposList.push({name, slug});
        });
      }
    });
  }
};
</script>

<style>
</style>