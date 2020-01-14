<template>
  <div class="hello">
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      v-if="content && content.length"
    >
      <swiper-slide v-for="(pageContent, index) in content" :key="index">
        <VueShowdown
          :markdown="pageContent"
          flavor="github"
          :extensions="[...bindings]"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// Todo 在App.vue里面去请求数据
import { ipcRenderer } from "electron";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
const path = require("path");
const filesPath = `${__static}/resources`;
const fs = require("fs");
import fileHelper from "@/utils/fileHelper";
import chunk from "lodash.chunk";
import { getArticle } from "@/api/yuque";
import { shuffle } from "@/utils/utils";
import Estore from "electron-store";
// 将md 转为html
import MarkdownIt from "markdown-it";

export default {
  name: "Display",
  components: {
    swiper,
    swiperSlide
  },
  props: {
    msg: String,
    data: {
      type: String
    }
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        speed: 1000,
        on: {
          slideChange: () => {
            console.log('isEnd',this.$refs.mySwiper.swiper.isEnd);
            // 在store里保存一个当前在展示的文档序号
            // 配置可以提到 mixin里
            const isEnd = this.$refs.mySwiper.swiper.isEnd;
            if(isEnd) {
              this.$emit('showEnd');
            }
          }
        },
        autoplay: {
          delay: 30000, // 切换时间开为参数
          disableOnInteraction: false,
          virtual: true
        }
      },
      bindings: {},
      content: ""
    };
  },
  created() {
    // 为标签定义类名
    const classMap = {
      ul: "word-list",
      li: "word-item"
    };
    this.bindings = Object.keys(classMap).map(key => ({
      type: "output",
      regex: new RegExp(`<${key}>`, "g"),
      replace: `<${key} class="${classMap[key]}">`
    }));
  },
  mounted() {
    // 过滤标题与a标签
    const filterData = this.data
      .replace(/#{1,6}\s[A-Z]/gim, "")
      .replace(/<a name="\w{5}"><\/a>/gim, "");
    let result = filterData.match(/^-(\s\w+\s[\u4e00-\u9fa5]+)+/gim);
    const chunkData = chunk(shuffle(result), 24);
    const finalContent = chunkData.map(pageData => {
      return pageData.join("\n");
    });
    this.content = finalContent;
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
// 为什么需要去除scoped???
.hello {
  overflow: hidden;
}

.word-list {
  overflow: hidden;
  padding: 20px;
  padding-left: 30px;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, 31%);
  grid-template-rows: auto auto auto;
  grid-row-gap: 20px;
  grid-column-gap: 20px;

  .word-item {
    display: inline-block;
    padding: 8px;
    background-color: pink;
    border-radius: 8px;
    font-weight: bold;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    cursor: pointer;
  }
}
</style>
