<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import Navbar from './components/Navbar.vue'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/firebase/db'

export default {

  name: 'App',

  components: {
    Navbar
  },

  data: () => ({
    //
  }),

  beforeCreate() {
    onSnapshot(collection(db, 'movies'), (querySnapshot) => {
      this.$store.state.searchHistory = []
      this.$store.state.searchHistoryMap.clear()
      let exist = 0
      querySnapshot.forEach((doc) => {
        const movie = {
          id: doc.id,
          title: doc.data().title,
          poster: doc.data().img,
          releaseDate: doc.data().release,
          rottenRating: doc.data().rating,
          plot: doc.data().plot,
          date: doc.data().date,
          favorite: doc.data().favorite
        }
        this.$store.commit('addMovietoArray', movie)
        this.$store.commit('addMovietoMap', {id: movie.title, movie: movie})
      })
    }),
    onSnapshot(query(collection(db, 'movies'), where('favorite', '==', true)), (querySnapshot) => {
      this.$store.state.favorites = []
      this.$store.state.favoritesMap.clear()
      querySnapshot.forEach((doc) => {
        const movie = {
          id: doc.id,
          title: doc.data().title,
          poster: doc.data().img,
          releaseDate: doc.data().release,
          rottenRating: doc.data().rating,
          plot: doc.data().plot,
          date: doc.data().date,
          favorite: doc.data().favorite
        }
        this.$store.commit('addMovietoFavorites', movie)
        this.$store.commit('addFavoritetoMap', {id: movie.title, movie: movie})
      })
    })
  },

};
</script>

<style>
body {
  color: 'primary';
}
</style>