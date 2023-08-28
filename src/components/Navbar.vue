<template>
    <v-app-bar
      app
      color="primary"
      flat
    >
      <div class="d-flex align-center">
        <router-link to="/">
            <v-app-bar-title class="text-uppercase white--text">
                <span class="fint-weight-light">Movies  </span>
                <span class="fint-weight-light">App</span>
            </v-app-bar-title>
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-text-field label="Movie Title" v-model="movieInput" background-color="white" rounded class="mx-2 mt-5" @keyup.enter="searchMovie" clearable></v-text-field>

        <v-btn @click="searchMovie">search</v-btn>
      </div>
    </v-app-bar>
</template>

<script>
import axios from 'axios'

export default {

  name: 'Navbar',

  data: () => ({
    movieInput : '',

    movie : {},

    // sHistory : 
  }),

  methods: {
    searchMovie: async function() {
      let exist = 0
        const movieSearch = await axios.get(`http://www.omdbapi.com/?apikey=ee7a4dfd&t=${this.movieInput}`)
        if (movieSearch.data.Response == "False") {
          this.$store.state.unexistant = true
          this.$store.state.existant = false
        } else {
          this.$store.state.existant = true
          this.$store.state.unexistant = false
          if (movieSearch.data.Ratings.length == 1) {
            this.movie = {
              title: movieSearch.data.Title,
              poster: movieSearch.data.Poster,
              releaseDate: movieSearch.data.Released,
              rottenRating: 'No rating :(',
              plot: movieSearch.data.Plot
            }
          } else {
            this.movie = {
              title: movieSearch.data.Title,
              poster: movieSearch.data.Poster,
              releaseDate: movieSearch.data.Released,
              rottenRating: movieSearch.data.Ratings[1].Value,
              plot: movieSearch.data.Plot
            }
          }
          

          this.$store.state.movieTitle = this.movie.title
          this.$store.state.movieImg = this.movie.poster
          this.$store.state.releaseDate = this.movie.releaseDate
          this.$store.state.rottenRating = this.movie.rottenRating
          this.$store.state.moviePlot = this.movie.plot

          this.$store.state.searchHistory.map((movie) => {
            if (movie.title == this.movie.title) {
              exist = 1
            }
          })
          if (exist != 1) {
            this.$store.commit('addMovie', this.movie)
          }
          this.$router.push('movieDescription').catch(() => {})
        }
    }
  },
};
</script>