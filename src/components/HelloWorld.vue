<template>
  <div class="hello">
    <!-- <button type=pri></button> -->
    <el-button type="warning" @click="sendMsg">警告按钮</el-button>
    <h1 class="home" @click="handleClick">我是home</h1>
    <!-- <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
      <swiper-slide>I'm Slide 1</swiper-slide>
      <swiper-slide>I'm Slide 2</swiper-slide>
      <swiper-slide>I'm Slide 3</swiper-slide>
      <swiper-slide>I'm Slide 4</swiper-slide>
      <swiper-slide>I'm Slide 5</swiper-slide>
      <swiper-slide>I'm Slide 6</swiper-slide>
      <swiper-slide>I'm Slide 7</swiper-slide>
    </swiper>-->
    <el-button type="warning" @click.native="sendMsg">警告按钮</el-button>
    <VueShowdown :markdown="content" flavor="github" :options="{ emoji: true }" />
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import "./helloworld.styl";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
const fs = require("fs").promises;
const path = require("path");
const filesPath = `${__static}/test.md`;
import fileHelper from "@/utils/fileHelper";

export default {
  name: "HelloWorld",
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
      content:''
    };
  },
  mounted() {
    // console.log('filepath',filesPath);
    fs.readFile(filesPath,{encoding:'utf-8'}).then(data => {
      console.log('data',data);
      
      this.content = data;
    });
  },
  methods: {
    sendMsg() {
      ipcRenderer.send("add-new-article", 100);
    },
    callback() {},
    handleClick(e) {
      e.stopPropagation();
      console.log("clicked!!!");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
