<template>
  <div class="hello">
    <!-- <button type=pri></button> -->
    <el-button type="warning" @click="sendMsg">警告按钮</el-button>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    sendMsg() {
      ipcRenderer.send('add-new-article',100);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
