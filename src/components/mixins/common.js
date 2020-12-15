import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Estore from "electron-store";

export default {
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    data: {
      type: String,
    },
  },
  data() {
    return {
      endPage: -1
    };
  },
  computed: {
    switchTime() {
      return this.$store.getters.switchTime;
    },
  },
  watch:{
    data() {
      this.updateData();
    }
  },
  methods: {
    generateEndPage(limit) {
      let res = 6 + Math.floor(Math.random() * 6);
      if ( limit <= 6) {
        return limit - 1;
      }
      if (limit && res >= limit) {
        return this.generateEndPage(limit);
      }
      return res;
    },
    handlePageSwitch(index) {
      console.log('page switch', index, this.endPage);
      if (index >= this.endPage) {
        this.$emit('showEnd');
      }
    }
  },
};
