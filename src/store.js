import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    reposName: 'memory_space',
    userName: 'demaweiliya',
    switchTime: 40000,
    playMode: 'mix' // options: mix order
  },
  // 是否应该有一个配置文件，初始化读取进行store 初始化？
  mutations: {
    changeRepos(state, reposName) {
      state.reposName = reposName;
    },
    changeUserName(state, userName) {
      state.userName = userName;
    },
    changeSwitchTime(state, time) {
      state.switchTime = time
    },
    changePlayMode(state, mode) {
      state.playMode = mode;
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
    switchTime: state => state.switchTime,
    playMode: state => state.playMode
  },
  plugins:[createLogger()]
})
