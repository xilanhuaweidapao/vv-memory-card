<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <Header/>
    <router-view/>
  </div>
</template>
<script>
import Header from './views/Header';
export default {
  components: {
    Header
  }
}
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
  text-align center
  color #2c3e50
  background #f5f5d5
  height 100%
</style>
