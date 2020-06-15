<template>
  <div>
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      v-if="imageList && imageList.length"
    >
      <swiper-slide v-for="(imageSrc, index) in imageList" :key="index">
        <div class="image-container"><img :src="imageSrc" /></div>
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
import { getArticle } from "@/api/yuque";
import { shuffle } from "@/utils/utils";
import Estore from "electron-store";

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
        height: 600,
        speed: 1000,
        on: {
          slideChange: () => {
            // 在store里保存一个当前在展示的文档序号
            const isEnd = this.$refs.mySwiper.swiper.isEnd;
            let curIndex = this.$refs.mySwiper.swiper.activeIndex;
            if (isEnd || (curIndex >= this.endPage)) {
              this.$emit("showEnd");
            }
          }
        },
        autoplay: {
          delay: 1000, // 切换时间开为参数
          disableOnInteraction: false
          // virtual: true
        }
      },
      content: "",
      imageList: [],
      endPage: -1
    };
  },
  created() {
    this.endPage = this.generateEndPage();
  },
  mounted() {
    getArticle({
      userName: "demaweiliya",
      reposName: "memory_space",
      articleSlug: "puwqy4"
    }).then(res => {
      const imageSrc = res.data.data.body;
      // 匹配image 地址
      const imageSrcList = imageSrc.match(/(?<=\()[^\)]+(?=\))/gim);
      this.imageList = imageSrcList;
    });
  },
  methods: {
    generateEndPage() {
      return 3 + Math.floor(Math.random() * 10);
    }
  }
};
</script>

<style lang="stylus">
// 为什么需要去除scoped???
.image-container {
  width 100%
  height 100%
  img {
    transform scale(1.1)
    width 100%
    height 100%
    object-fit scale-down
  }
}
</style>
