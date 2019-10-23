<template>
  <div class="hello">
    <!-- <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
      <swiper-slide>I'm Slide 1</swiper-slide>
      <swiper-slide>I'm Slide 2</swiper-slide>
      <swiper-slide>I'm Slide 3</swiper-slide>
      <swiper-slide>I'm Slide 4</swiper-slide>
      <swiper-slide>I'm Slide 5</swiper-slide>
      <swiper-slide>I'm Slide 6</swiper-slide>
      <swiper-slide>I'm Slide 7</swiper-slide>
    </swiper>-->
    <VueShowdown :markdown="content" flavor="github" :extensions="[...bindings]"/>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
const path = require("path");
const filesPath = `${__static}/resources`;
import fileHelper from "@/utils/fileHelper";
import readDirDeep from "../utils/fileReaderLoop";

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
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      },
      bindings: {},
      content: ''
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
    // const classMap = {
    //   ul: "word-list",
    //   li: "word-item"
    // };

    // this.bindings = Object.keys(classMap).map(key => ({
    //   type: "output",
    //   regex: new RegExp(`<${key}>`, "g"),
    //   replace: `<${key} class="${classMap[key]}">`
    // }));

    // this.content = readDirDeep(filesPath);
    // console.log('content',this.content);
    fileHelper.readFile(`${__static}/陌生单词.md`).then((data) => {
      this.content = data;
      console.log(this.content);
      
    })
  },
  methods: {
    sendMsg() {
      // ipcRenderer.send("add-new-article", 100);
    },
    callback() {},
    handleClick(e) {
      e.stopPropagation();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
//为什么需要去除scoped???
.hello
  overflow hidden
.word-list
  overflow hidden
  padding 20px
  margin 0
  display: grid;
  grid-template-columns: repeat(3, 30%)
  grid-template-rows: auto auto auto
  grid-row-gap: 20px
  grid-column-gap: 20px
  .word-item
      display: inline-block;
      padding: 8px;
      background-color: pink;
      border-radius: 8px;
      font-weight: bold;
      font-size: 18px;
      p
        margin 0
</style>
