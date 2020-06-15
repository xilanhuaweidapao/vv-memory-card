<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
// 字体的自适应
let html = document.querySelector("html");
html.style.fontSize = window.innerWidth / 40 + "px";
window.onresize = function() {
  let html = document.querySelector("html");
  html.style.fontSize = window.innerWidth / 40 + "px";
};
</script>
<style lang="stylus">
body,html
  height 100%
  margin 0
  padding 0
#app
  font-family: Consolas,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  height 100%
</style>
