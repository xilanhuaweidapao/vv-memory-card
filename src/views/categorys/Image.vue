<template>
  <div class="container">
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      v-if="imageList && imageList.length"
    >
      <swiper-slide v-for="(imageSrc, index) in imageList" :key="index">
        <div class="image-container"><img :src="imageSrc" alt="" /></div>
        <!-- <VueShowdown :markdown="pageContent" flavor="github" :extensions="[...bindings]" /> -->
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
    msg: String
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        speed: 1000,
        on: {
          slideChange: () => {
            // console.log('isEnd',this.$refs.mySwiper.swiper.isEnd);
            // 在store里保存一个当前在展示的文档序号
            const isEnd = this.$refs.mySwiper.swiper.isEnd;
            if (isEnd) {
              this.$emit("showEnd");
            }
          }
        },
        autoplay: {
          delay: 1000, // 切换时间开为参数
          disableOnInteraction: false,
          virtual: true
        }
      },
      bindings: {},
      content: "",
      imageList: []
    };
  },
  created() {
  },
  mounted() {
    // .match(/(?<=\()[\w\W]+(?=\))/)

    getArticle({
      userName: "demaweiliya",
      reposName: "memory_space",
      articleSlug: "puwqy4"
    }).then(res => {
      const imageSrc = res.data.data.body;
      // 匹配image 地址
      const imageSrcList = imageSrc.match(/(?<=\()[^\)]+(?=\))/gim);
      console.log("imageSrcList ddd", imageSrcList);
      this.imageList = imageSrcList;
    });

    // fileHelper.readFile(`${__static}/陌生单词.md`).then((data) => {

    //   const match = data.match(/^-(\s\w+\s[\u4e00-\u9fa5]+)+/mig);
    //   const chunkData = chunk(match,18);
    //   const finalContent = chunkData.map(pageData => {
    //     return pageData.join("\n");
    //   });
    //   this.content = finalContent;
    //   console.log('chunkData',chunkData,finalContent);
    // });
    // const loading = this.$loading({
    //   lock: true,
    //   text: "Loading",
    //   spinner: "el-icon-loading",
    //   background: "coral"
    // });
    // getArticle({userName: 'demaweiliya', reposName: 'memory_space', articleSlug: 'dc0o1d'}).then(res => {
    //   let data = res.data.data.body;
    //   let fileName = res.data.data.title;
    //   // 过滤标题与a标签
    //   data = data.replace(/#{1,6}\s[A-Z]/mig,"").replace(/<a name="\w{5}"><\/a>/img,"");
    //   // fs.readFileSync(`${__static}/${fileName}.md`);
    //   let result = data.match(/^-(\s\w+\s[\u4e00-\u9fa5]+)+/mig);
    //   // let matchs = data.match(
    //   //   /(<li>[^<]+<\/li>|<li><span>[^<]+<\/span><\/li>)/g
    //   // );
    //   // let result = matchs.map(word => {
    //   //   return word.replace(/<\/li>/g, "").replace(/<li>/g, "- ");
    //   // });

    //   const chunkData = chunk(shuffle(result), 21);
    //   const finalContent = chunkData.map(pageData => {
    //     return pageData.join("\n");
    //   });
    //   // console.log('finalContent', finalContent);
    //   this.content = finalContent;
    //   loading.close();
    //   //根据修改时间
    // });

    // this.content = resultlalala;
  },
  methods: {}
};
</script>

<style lang="stylus">
// 为什么需要去除scoped???
.container {
  overflow: hidden;
  background #f5f5d5
}

.image-container {
  width 100%;
  height 500px;
  img {
    height 100%
    width 100%
    background-repeat no-repeat
    background-size contain
  }
}
</style>
