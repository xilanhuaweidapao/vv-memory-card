import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import VueShowdown from 'vue-showdown';
import 'element-ui/lib/theme-chalk/index.css';

// import Store from 'electron-store';

// const storeList = new Store();

// storeList.set('name','weidapao');

// console.log(storeList.get('name'));

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(VueShowdown, {
  // 设置 showdown 默认 flavor
  flavor: 'github',
  // 设置 showdown 默认 options （会覆盖上面 flavor 的 options）
  options: {
    emoji: false
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    this.$router.push('/');
  }
}).$mount('#app');
