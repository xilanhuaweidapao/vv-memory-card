<template>
  <div class="hello">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(pageContent,index) in content" :key="index">
        <VueShowdown :markdown="pageContent" flavor="github" :extensions="[...bindings]" />
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
import fileHelper from "@/utils/fileHelper";
import readDirDeep from "../utils/fileReaderLoop";
import chunk from "lodash.chunk";
import { getArticle } from "@/api/article";

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
        speed:500,
        on: {
          slideChange:() => {
            console.log('isEnd',this.$refs.mySwiper.swiper.isEnd);
            // 在store里保存一个当前在展示的文档序号
          }
        },
        autoplay: {
          delay: 2000, // 切换时间开为参数
          disableOnInteraction: false,
          virtual: true
        }
      },
      bindings: {},
      content: ""
    };
  },
  created() {
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
    // 
    // fileHelper.readFile(`${__static}/陌生单词.md`).then((data) => {

    //   const match = data.match(/^-(\s\w+\s[\u4e00-\u9fa5]+)+/mig);
    //   const chunkData = chunk(match,18);
    //   const finalContent = chunkData.map(pageData => {
    //     return pageData.join("\n");
    //   });
    //   this.content = finalContent;
    //   console.log('chunkData',chunkData,finalContent);
    // });
    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "coral"
    });
    getArticle("repos/demaweiliya/memory_space/docs/dc0o1d").then(res => {
      
      let data = res.data.data.body;
     
      data = data.replace(/#{1,6}\s[A-Z]/mig,"").replace(/<a name="\w{5}"><\/a>/img,"");
      let result = data.match(/^-(\s\w+\s[\u4e00-\u9fa5]+)+/mig);
      console.log('data',result);
      // let matchs = data.match(
      //   /(<li>[^<]+<\/li>|<li><span>[^<]+<\/span><\/li>)/g
      // );
      // let result = matchs.map(word => {
      //   return word.replace(/<\/li>/g, "").replace(/<li>/g, "- ");
      // });

      const chunkData = chunk(result, 21);
      const finalContent = chunkData.map(pageData => {
        return pageData.join("\n");
      });
      this.content = finalContent;
      loading.close();
      //根据修改时间
    });
  },
  methods: {
    sendMsg() {
      // ipcRenderer.send("add-new-article", 100);
    },
    handleClick(e) {
      e.stopPropagation();
    }
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
