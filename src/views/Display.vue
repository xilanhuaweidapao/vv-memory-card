<script>
// Todo 在App.vue里面去请求数据
import { ipcRenderer } from "electron";
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
  data() {
    return {
      resData: null,
      contentType: null,
      docTitle: null,
      compIndex: 0,
      articleIndex: 0
    };
  },
  computed: {
    currentReposName() {
      return this.$store.getters.reposName;
    },
    currentUserName() {
      return this.$store.getters.userName;
    },
    playMode() {
      return this.$store.getters.playMode;
    }
  },
  created() {
    // 从Estore获取第一个文档 并请求数据
    this.changeDisplayDoc();
  },
  mounted() {
    this.loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "coral",
    });
    console.log("estore", Estore.store);
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
        const { slug } = Estore.get(this.currentReposName)[
          this.generateRandomArticleIndex(this.playMode)
        ];
        // this.generateRandomArticleIndex()
        console.log("slug", slug);
        getArticle({
          userName: this.currentUserName,
          reposName: this.currentReposName,
          articleSlug: slug,
        }).then((res) => {
          this.docTitle = res.data.data.title;
          this.resData = res.data.data.body;
          this.contentType = res.data.data.custom_description;
          // 在本地写入文章数据
          // if (!fs.existsSync(`${__static}/resources/${this.docTitle}.md`)) {
          //   fileHelper.writeFile(
          //     `${__static}/resources/${this.docTitle}.md`,
          //     this.resData
          //   );
          // }
        }).catch((e) => {
          // 网络未连接时的处理！
          // 无法测试
          this.changeDisplayDoc();
        })
      }
    },
    // 获取对象，生成随机文章 index
    generateRandomArticleIndex(mode) {
      let len = Object.keys(Estore.get(this.currentReposName)).length;
      if (mode === 'mix') {
        return Math.floor(Math.random() * len);
      }
      if (this.articleIndex++ >= len) {
        this.articleIndex = 0;
      }
      return this.articleIndex;
    },
  },
  render(h) {
    if (this.contentType && this.resData) {
      const docName =
        this.contentType.charAt(0).toUpperCase() + this.contentType.slice(1);
      console.log("docName", docName);
      this.loading.close();
      // 对错误的处理？
      // 没有触发组件的重新渲染？
      let content = h(require(`./categorys/${docName}.vue`).default, {
        props: {
          // 请求回来的数据
          data: this.resData,
        },
        attrs: {
          class: "container",
          index: this.docTitle
        },
        on: {
          showEnd: this.endAndChange,
        },
      });
      return content;
    }
    return;
  },
};
</script>

<style lang="stylus">
.container {
  background #f5f5d5
  height 100%
  .swiper-container {
    height 100%
  }
}
</style>
