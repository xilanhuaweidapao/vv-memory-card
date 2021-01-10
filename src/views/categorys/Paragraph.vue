<template>
  <div class="container">
    <el-carousel
      :interval="switchTime"
      indicator-position="none"
      @change="handlePageSwitch"
    >
      <el-carousel-item v-for="(pageContent, index) in content" :key="index">
        <ul class="paragraph-list">
          <li
            class="word-item"
            v-for="(word, index) in pageContent"
            :key="index"
            :title="word"
          >
            {{ word }}
          </li>
        </ul>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
// Todo 在App.vue里面去请求数据
import { ipcRenderer } from "electron";
import chunk from "lodash.chunk";
import { shuffle } from "@/utils/utils";
// 将md 转为html
import common from "../../components/mixins/common";

export default {
  name: "Display",
  mixins: [common],
  data() {
    return {
      content: [],
    };
  },
  mounted() {
    this.updateData();
  },
  methods: {
    updateData() {
      console.log("this.data", this.data);
      let result = this.data.match(/(?<=(-\s))(\w+[^-])+/mig);
    //   console.log('result', result);
      this.content = this.groupData(result ,8);
      this.endPage = this.generateEndPage(this.content.length);
    },
    groupData(result, num) {
        return chunk(shuffle(result), num);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.container {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.el-carousel {
  height: 100%
  .el-carousel__container {
    height 100%
  }
}

.paragraph-list {
  height 100%
  overflow: hidden;
  padding: 20px;
  margin: 0;
  .word-item {
    margin: 20px 0px;
    display: block;
    padding-left: 12px;
    background-color: pink;
    border-radius: 8px;
    font-weight: bold;
    font-size: 0.8rem;
    line-height: 1.5;
    text-align: left;
    cursor: pointer;
  }
}
</style>
