<script>
// Todo 在App.vue里面去请求数据
import { ipcRenderer } from "electron";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
const path = require("path");
const fs = require("fs");
import fileHelper from "@/utils/fileHelper";
import chunk from "lodash.chunk";
import { getArticle } from "@/api/yuque";
import { shuffle } from "@/utils/utils";
// 为什么提mixin?
import Store from "electron-store";
const Estore = new Store();

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
      resData: null,
      contentType: null
    };
  },
  computed: {
    currentReposName() {
      return this.$store.getters.reposName;
    },
    currentUserName() {
      return this.$store.getters.userName;
    }
  },
  created() {
    // 从Estore获取第一个文档 并请求数据
    this.changeDisplayDoc();
    // if (Estore.has(this.currentReposName)) {
    //   const { slug } = Estore.get(this.currentReposName)[2];
    //   getArticle({
    //     userName: this.currentUserName,
    //     reposName: this.currentReposName,
    //     articleSlug: slug
    //   }).then(res => {
    //     this.resData = res.data.data.body;
    //     this.contentType = res.data.data.custom_description;
    //   });
    // }
  },
  mounted() {
    this.loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "coral"
    });
    // .match(/(?<=\()[\w\W]+(?=\))/)
    // console.log("estore", Estore.store);
    // getArticle({
    //   userName: "demaweiliya",
    //   reposName: "memory_space",
    //   articleSlug: "puwqy4"
    // }).then(res => {
    //   // console.log("res from display !!!", res, res.data.data.body);
    //   const imageSrc = res.data.data.body;
    //   // 匹配image 地址
    //   const imageSrcList = imageSrc.match(/(?<=\()[^\)]+(?=\))/gim);
    //   console.log("imageSrcList ddd", imageSrcList);
    //   this.imageList = imageSrcList;
    // });

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
  },
  methods: {
    endAndChange() {
      this.changeDisplayDoc();
    },
    // 设置后应进行更新！！！
    changeDisplayDoc() {
      if (Estore.has(this.currentReposName)) {
        const { slug } = Estore.get(this.currentReposName)[Math.floor(Math.random() * 3)];
        getArticle({
          userName: this.currentUserName,
          reposName: this.currentReposName,
          articleSlug: slug
        }).then(res => {
          this.resData = res.data.data.body;
          this.contentType = res.data.data.custom_description;
        });
      }
    }
  },
  render(h) {
    if (this.contentType && this.resData) {
      const docName =
        this.contentType.charAt(0).toUpperCase() + this.contentType.slice(1);
      this.loading.close();
      return h(require(`./categorys/${docName}.vue`).default, {
        props: {
          data: this.resData
        },
        on: {
          showEnd: this.endAndChange
        }
      });
    }
    return;
  }
};
</script>
