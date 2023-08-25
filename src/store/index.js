import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movieTitle : 'default',
    movieImg : '',
    releaseDate : '',
    rottenRating : '',
    moviePlot : '',
    searchHistory : []
  },
  getters: {
  },
  mutations: {
    addMovie (state, movie) {
      state.searchHistory.push(movie)
    }
  },
  actions: {
  },
  modules: {
  }
})
