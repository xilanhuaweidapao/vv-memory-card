<template>
  <div>
    <el-carousel
      :interval="switchTime"
      indicator-position="none"
      @change="handlePageSwitch"
    >
      <el-carousel-item v-for="(imageSrc, index) in imageList" :key="index">
        <div class="image-container"><img :src="imageSrc" /></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
// Todo 在App.vue里面去请求数据
import { ipcRenderer } from "electron";
const path = require("path");
const filesPath = `${__static}/resources`;
import common from "../../components/mixins/common";
import { shuffle } from "@/utils/utils";

export default {
  name: "Display",
  mixins: [common],
  data() {
    return {
      // swiperOption: {
      //   loop: true,
      //   height: 600,
      //   speed: 1000,
      //   on: {
      //     slideChange: () => {
      //       // 在store里保存一个当前在展示的文档序号
      //       const isEnd = this.$refs.mySwiper.swiper.isEnd;
      //       let curIndex = this.$refs.mySwiper.swiper.activeIndex;
      //       if (isEnd || curIndex >= this.endPage) {
      //         this.$emit("showEnd");
      //       }
      //     },
      //   },
      //   autoplay: {
      //     delay: 60000, // 切换时间开为参数
      //     disableOnInteraction: false
      //   },
      // },
      imageList: [],
    };
  },
  mounted() {
    this.updateData();
  },
  methods: {
    updateData() {
      const imageSrc = this.data;
      // 匹配image 地址
      console.log("mounted comp");
      const imageSrcList = imageSrc.match(/(?<=\()[^\)]+(?=\))/gim);
      // 是否打乱也应该是一个配置
      this.imageList = shuffle(imageSrcList);
      this.endPage = this.generateEndPage(this.imageList.length);
    },
  },
};
</script>

<style lang="stylus">
// 为什么需要去除scoped???

.el-carousel {
  height: 100%
  .el-carousel__container {
    height 100%
  }
}

.image-container {
  width 100%
  height 100%
  img {
    transform scale(1)
    width 100%
    height 100%
    object-fit scale-down
  }
}
</style>
