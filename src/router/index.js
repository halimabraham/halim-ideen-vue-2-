import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeMovies from '../views/HomeMovies.vue'
import MovieDescription from '../views/MovieDescription.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeMovies
  },
  {
    path: '/movieDescription',
    name: 'movie-des',
    component: MovieDescription
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
