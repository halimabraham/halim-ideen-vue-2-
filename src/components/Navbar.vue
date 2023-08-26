<template>
    <v-app-bar
      app
      color="primary"
      flat
    >
      <div class="d-flex align-center">
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
        <router-link to="/">
            <v-app-bar-title class="text-uppercase white--text">
                <span class="fint-weight-light">Movies  </span>
                <span class="fint-weight-light">App</span>
            </v-app-bar-title>
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-text-field label="movie Title" v-model="movieInput" background-color="white" rounded class="mx-2 mt-5"></v-text-field>

        <router-link to="/movieDescription">
            <v-btn @click="searchMovie">search</v-btn>
        </router-link>
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
        this.movie = {
            title: movieSearch.data.Title,
            poster: movieSearch.data.Poster,
            releaseDate: movieSearch.data.Released,
            rottenRating: movieSearch.data.Ratings[1].Value,
            plot: movieSearch.data.Plot
        }

        this.$store.state.movieTitle = this.movie.title
        this.$store.state.movieImg = this.movie.poster
        this.$store.state.releaseDate = this.movie.releaseDate
        this.$store.state.rottenRating = this.movie.rottenRating
        this.$store.state.moviePlot = this.movie.plot
/*         if (this.$store.state.searchHistory.length === 0) {
          this.$store.commit('addMovie', this.movie)
        } else { */
        this.$store.state.searchHistory.map((movie) => {
          if (movie.title == this.movie.title) {
            exist = 1
          }
        })
        // }
        if (exist != 1) {
          this.$store.commit('addMovie', this.movie)
        }
        /* if (this.$store.state.searchHistory.length === 0) {
          this.$store.commit('addMovie', this.movie)
        } else { */
          /* this.$store.state.searchHistory.map((movie) => {
            console.log('+++')
            console.log(movie.title)
            console.log(this.movie.title)
            if (movie.title == this.movie.title) {
                return
            } else {
              this.$store.commit('addMovie', this.movie)
            }
        }) */
        /* this.$store.state.searchHistory.forEach((movie) => {
            if(movie.movietTitle != this.movie.title) {
                this.$store.commit('addMovie', this.movie)
            }
        }) */
        // }
    }
  },
};
</script>