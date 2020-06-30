import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    reposName: 'memory_space',
    userName: 'demaweiliya',
    switchTime: 30,
  },
  mutations: {
    changeRepos(state, reposName) {
      state.reposName = reposName;
    },
    changeUserName(state, userName) {
      state.userName = userName;
    },
    changeSwitchTime(state, time) {
      state.switchTime = time
    }
  },
  actions: {
    changeRepos({commit}, reposName) {
      commit('changeRepos', reposName)
    },
    changeUserName({commit}, userName) {
      commit('changeUserName', userName)
    }
  },
  getters: {
    reposName: state => state.reposName,
    userName: state => state.userName,
    switchTime: state => state.switchTime
  },
  plugins:[createLogger()]
})
