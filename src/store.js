import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    reposName: ''
  },
  mutations: {
    changeCurRepos(state, reposName) {
      state.reposName = reposName;
    }
  },
  actions: {
    changeCurRepos({commit}, reposName) {
      commit('changeCurRepos', reposName);
    }
  },
  getters: {
    curReposName: state => state.reposName
  },
  plugins:[createLogger()]
})
