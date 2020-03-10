<template>
  <div class="container">
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      v-if="content && content.length"
    >
      <swiper-slide v-for="(docList, index) in result" :key="index">
        <el-card class="docCard" v-for="(doc, index) in docList" :key="index">
          <h4 class="title" v-if="doc.title">{{ doc.title[0] }}</h4>
          <ul class="list" v-if="doc.list">
            <li v-for="(item, index) in doc.list" :key="index">{{ item }}</li>
          </ul>
          <ul class="list" v-if="doc.slist">
            <li v-for="(item, index) in doc.slist" :key="index">{{ item }}</li>
          </ul>
          <div v-if="doc.paragraph">
            <p
              class="paragraph"
              v-for="(item, index) in doc.paragraph"
              :key="index"
            >
              {{ item }}
            </p>
          </div>
          <div class="image-container" v-if="doc.img">
            <img :src="doc.img" />
          </div>
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
import { shuffle, matchList, matchTitle, matchParagraph } from "@/utils/utils";
import Estore from "electron-store";
// 不能使用相对路径？？？
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
      rawData: this.data,
      content: [],
      result: null
    };
  },
  created() {},
  mounted() {
    // .match(/(?<=\()[\w\W]+(?=\))/)
    // console.log('this.data', this.data);
    // 替换掉a标签
    console.log("this.rawData", this.rawData);
    this.rawData = this.rawData.replace(/<a name="(\w+)"><\/a>/gim, "");
    this.imageSrcList = this.rawData.match(
      /(?<=\()(http|https)[^\)]+(?=\))/gim
    );
    console.log("this.imageSrcList", this.imageSrcList);
    let filterData = this.rawData.match(
      /(?<=:::(info|danger|tips|warning|success)\n)[^:]+(?=:::)/gim
    );
    console.log("filterData", filterData);
    filterData.forEach((data, index) => {
      this.content.push(this.formatData(data));
    });
    this.imageSrcList.forEach(imgSrc => {
      this.content.push({
        img: imgSrc
      });
    });
    this.result = chunk(this.content, 1);
    // this.content = chunkData;
    console.log("chunkData", this.result);
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
  },
  methods: {
    formatData(content) {
      return {
        title: matchTitle(content),
        slist: matchList(content, true),
        list: matchList(content),
        paragraph: matchParagraph(content)
      };
    }
  }
};
</script>

<style lang="stylus">
.container {
  background #f5f5d5
  .image-container {
  width 100%;
  height 100%;
  img {
    height 100%
    width 100%
    background-repeat no-repeat
    background-size cover
  }
}
  .list {
    padding 0
    li {
      background  #ffc0cb
      list-style none
      padding 5px
      margin-bottom 10px
      border-radius 5px
    }
    margin 4px
  }
  .docCard {
    .paragraph {
    background  #ffc0cb
    margin 0 0 15px 0
    padding 5px
    border-radius 5px
  }
  .title {
    margin 0
  }
  margin: 15px;
  .el-card__body {
    padding: 10px
  }
  .docContent {
    font-size: 18px
    margin: 0 10px 0 10px
  }
}
}
</style>
