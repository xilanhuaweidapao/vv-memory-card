<template>
  <div class="container">
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      v-if="content && content.length"
    >
      <swiper-slide v-for="(pageContent, index) in content" :key="index">
          <ul class="word-list">
            <li class="word-item" v-for="(word, index) in pageContent" :key="index">
              {{ word }}
            </li>
          </ul>
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
const fs = require("fs");
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
            // 在store里保存一个当前在展示的文档序号
            // 配置可以提到 mixin里
            const isEnd = this.$refs.mySwiper.swiper.isEnd;
            let curIndex = this.$refs.mySwiper.swiper.activeIndex;
            if(isEnd || (curIndex >= this.endPage)) {
              this.$emit('showEnd');
            }
          }
        },
        autoplay: {
          delay: 1000, // 切换时间开为参数
          disableOnInteraction: false,
          virtual: true
        }
      },
      content: "",
      endPage: -1
    };
  },
  created() {
    this.endPage = this.generateEndPage();
  },
  mounted() {
    // 过滤标题与a标签
    const filterData = this.data
      .replace(/#{1,6}\s[A-Z]/gim, "")
      .replace(/<a name="\w{5}"><\/a>/gim, "");
    let result = filterData.match(/(?<=-\s)[^-]+/img); // 将md字符串匹配成内容数组
    const chunkData = chunk(shuffle(result), 24); // 随机分组
    // console.log('finalContent', chunkData);
    this.content = chunkData;
  },
  methods: {
    generateEndPage() {
      return 3 + Math.floor(Math.random() * 10);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
// 为什么需要去除scoped???
.container {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.swiper-container {
  height: 100%
}

.word-list {
  height 100%
  overflow: hidden;
  padding: 20px;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, 31%);
  grid-template-rows: repeat(8, 9%);
  grid-row-gap: 3%;
  grid-column-gap: 3%;

  .word-item {
    display: inline-block;
    padding-left: 12px;
    background-color: pink;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    line-height: 2.6
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    cursor: pointer;
  }
}
</style>
