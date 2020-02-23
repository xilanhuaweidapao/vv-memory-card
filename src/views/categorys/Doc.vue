<template>
  <div class="hello">
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      v-if="content && content.length"
    >
      <swiper-slide v-for="(docList, index) in content" :key="index">
        <el-card class="docCard" v-for="(doc, index) in docList" :key="index">
            <p class="docContent">{{ doc }}</p>
        </el-card>
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
            // console.log('isEnd',this.$refs.mySwiper.swiper.isEnd);
            // 在store里保存一个当前在展示的文档序号
            const isEnd = this.$refs.mySwiper.swiper.isEnd;
            if (isEnd) {
              this.$emit("showEnd");
            }
          }
        },
        autoplay: {
          delay: 60000, // 切换时间开为参数
          disableOnInteraction: false,
          virtual: true
        }
      },
      content: "",

    };
  },
  created() {

  },
  mounted() {
    // .match(/(?<=\()[\w\W]+(?=\))/)
    console.log('this.data', this.data);
    const filterData = this.data.match(/(?<=:::(info|danger|tips|warning|success)\n)[^:]+(?=\n:::)/img);
    const chunkData = chunk(filterData, 3);
    this.content = chunkData;
    // fileHelper.readFile(`${__static}/陌生单词.md`).then((data) => {

    //   const match = data.match(/^-(\s\w+\s[\u4e00-\u9fa5]+)+/mig);
    //   const chunkData = chunk(match,18);
    //   const finalContent = chunkData.map(pageData => {
    //     return pageData.join("\n");
    //   });
    //   this.content = finalContent;
    //   console.log('chunkData',chunkData,finalContent);
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
.docCard {
  margin: 15px;
  .el-card__body {
    padding: 10px
  }
  .docContent {
    font-size: 18px
    margin: 0 10px 0 10px
  }
}
</style>
