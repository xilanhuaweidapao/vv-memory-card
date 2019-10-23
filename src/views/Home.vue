<template>
  <div class="home">
    <Display msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Display from '@/views/Display.vue'

export default {
  name: 'home',
  components: {
    Display
  }
}
</script>
