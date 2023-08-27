<template>
    <div>
        <h1 class="subheading mx-3 my-3">MOVIES APP</h1>
        <h2 class="subheading mx-3 my-3">Search history:</h2>
        <v-container class="my-5">
            <v-layout row wrap>
                    <v-flex xs12 sm6 md4 lg3 class="mx-3 my-3" v-for="movie in sHistory" :key="movie.title">
                        <v-card>
                            <v-card-text>
                                <div class="subheading">{{ movie.title }}</div>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn text color="grey" @click="searchMovie(movie.title)">
                                <v-icon small left>mdi-more</v-icon>
                                <span class="">See more</span>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
            </v-layout>
        </v-container>
        <!-- <ul>
            <router-link to="/movieDescription">
                <li v-for="movie in sHistory" @click="searchMovie(movie.title)">{{ movie.title }}</li>
            </router-link>
        </ul> -->
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'home-movies',

    data: () => ({
        movie : {}
    }),

    methods: {
        searchMovie: async function(title) {
            let exist = 0
            const movieSearch = await axios.get(`http://www.omdbapi.com/?apikey=ee7a4dfd&t=${title}`)
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
            this.$store.state.searchHistory.map((movie) => {
                if (movie.title == this.movie.title) {
                    exist = 1
                }
            })
            if (exist != 1) {
                this.$store.commit('addMovie', this.movie)
            }
            this.$router.push('movieDescription')
        }
    },

    computed:{
        sHistory() {
            return this.$store.state.searchHistory
        },
    }
}
</script>