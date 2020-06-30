<template>
  <el-row>
    <el-col>
      <el-form ref="config" :model="config" label-width="100px">
        <el-form-item label="账号名称">
          <el-input v-model="config.userName"></el-input>
        </el-form-item>
        <el-form-item label="默认知识库">
          <el-select
            v-model="config.reposName"
            @focus="getRepos"
            placeholder="请选择默认知识库"
          >
            <el-option
              v-for="(repos, index) in reposList"
              :key="index"
              :label="repos.name"
              :value="repos.slug"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="页面切换时间">
          <el-select
            :value="switchTime"
            @change="changeSwitchTime"
          >
            <el-option
              v-for="(option, index) in timeOptions"
              :key="index"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存配置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
// 默认知识库
// 设置切换时间
// 主题设置
import { getAllRepos, getDetailFromRepos } from "@/api/yuque";
const Store = require("electron-store");
const Estore = new Store();

export default {
  data() {
    return {
      reposList: [],
      config: {
        reposName: "",
        userName: "",
      },
      timeOptions: [
        { label: '5', value: 5 },
        { label: '30', value: 30 },
        { label: '40', value: 40 },
        { label: '50', value: 50 },
        { label: '60', value: 60 }
      ]
    };
  },
  mounted() {
    this.config.userName = this.userName;
    this.config.reposName = this.reposList[0];
  },
  computed: {
    userName() {
      return this.$store.getters.userName;
    },
    switchTime() {
      return this.$store.getters.switchTime;
    }
  },
  methods: {
    changeRepos(reposName) {
      this.reposName = reposName;
    },
    getRepos() {
      !this.reposList.length &&
        this.userName &&
        getAllRepos(this.userName).then((res) => {
          // console.log("res", res);
          if (res.status && res.status === 200) {
            this.reposList = [];
            const data = res.data.data;
            data.forEach((repos) => {
              const { name, slug } = repos;
              this.reposList.push({ name, slug });
            });
          }
        });
    },
    onSubmit() {
      // 保存配置后关闭drawer
      if (!this.config.reposName || !this.config.userName) {
        return;
      }
      this.$store.dispatch("changeRepos", this.config.reposName);

      this.$store.dispatch("changeUserName", this.config.userName);
      // console.log('estore', Estore.store);
      getDetailFromRepos(this.config.userName, this.config.reposName).then(
        (res) => {
          const data = res.data.data;
          // 在Estore里面将仓库名作为key，文档列表数组作为value
          let formatData = [];
          console.log("dat2222", data);
          formatData = data.map((article) => {
            return {
              title: article.title,
              depth: article.depth,
              slug: article.slug,
            };
          });
          if (data && Array.isArray(data)) {
            // Estore.set(this.config.reposName, data);
            Estore.set(this.config.reposName, formatData);
          }
        }
      );
    },
    changeSwitchTime(value) {
      this.$store.commit('changeSwitchTime', value);
    }
  },
};
// [
//               {
//                 title: "记忆截图",
//                 slug: "puwqy4",
//                 depth: 1
//               },
//               {
//                 title: "陌生单词",
//                 slug: "dc0o1d",
//                 depth: 1
//               },
//               {
//                 title: "WebGL",
//                 slug: 'tbi6f6',
//                 depth: 1
//               },
//               {
//                 title: '正则',
//                 slug: 'hkakvp',
//                 depth: 1
//               },
//               {
//                 title: '图形数学常识',
//                 slug: 'gnuy8k',
//                 depth: 1
//               }
//             ]
</script>

<style lang="stylus">
.el-form {
  width: 300px
  margin-top 40px
}
</style>
