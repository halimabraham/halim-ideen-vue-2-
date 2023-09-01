import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '',
    movieTitle : 'default',
    movieImg : '',
    releaseDate : '',
    rottenRating : '',
    moviePlot : '',
    searchHistory : [],
    searchHistoryMap : new Map(),
    unexistant: false,
    existant: false
  },
  getters: {
  },
  mutations: {
    addMovietoArray (state, movie) {
      state.searchHistory.push(movie)
    },
    addMovietoMap (state, payload) {
      const {id, movie} = payload
      state.searchHistoryMap.set(id, movie)
    }
  },
  actions: {
    
  },
  modules: {
  }
})
