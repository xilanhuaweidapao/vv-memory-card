import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Store from 'electron-store';

const storeList = new Store();

storeList.set('name','weidapao');

console.log(storeList.get('name'));

Vue.use(ElementUI,{ size: 'small', zIndex: 3000 });

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
