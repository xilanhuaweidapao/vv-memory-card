<template>
  <el-row>
    <el-col>
      <el-dropdown @command="changeRepos">
        <el-button type="primary">
          选择默认仓库
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(repos, index) in reposList" :command="repos.name" :key="index">{{repos.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="账号名称">
    <el-input v-model="userName"></el-input>
  </el-form-item>
  <el-form-item label="默认知识库">
    <el-select v-model="reposName" placeholder="请选择默认知识库">
      <el-option v-for="(repos, index) in reposList" :key="index" :label="repos.name" :value="repos.name"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
    </el-col>
    <el-col>

    </el-col>
    <el-col>
      <el-button @click="saveConfig">save config!</el-button>
    </el-col>
  </el-row>
</template>

<script>
// 默认知识库
// 设置切换时间
// 主题设置
import { getAllRepos } from "@/api/yuque";

export default {
  data() {
    return {
      reposList:[],
      reposName: '',
      userName: '',
      form: {}
    };
  },
  mounted() {
    getAllRepos('demaweiliya').then(res => {
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
  },
  methods: {
    changeRepos(reposName) {
      this.reposName = reposName;
    },
    saveConfig() {
      this.$store.dispatch('changeCurRepos', this.reposName);
    }
  }
};
</script>

<style>
</style>