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
      endPage: -1,
    };
  },
  computed: {
    switchTime() {
      return this.$store.getters.switchTime;
    },
  },
  watch: {
    switchTime(val) {
        let newObj = {
            delay: val * 1000,
            disableOnInteraction: false
        }
        this.$set(this.swiperOption, 'autoplay', newObj);
        // delay: 60000, // 切换时间开为参数
        // disableOnInteraction: false
        // this.swiperOption.autoplay.delay = val;
    }
  },
  created() {
    this.endPage = this.generateEndPage();
  },
  methods: {
    generateEndPage() {
      return 10 + Math.floor(Math.random() * 10);
    },
  },
};
