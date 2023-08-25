<template>
    <div>
        <h1>MOVIES APP</h1>
        <h3>You've searched:</h3>
        <ul>
            <router-link to="/movieDescription">
                <li v-for="movie in sHistory" @click="searchMovie(movie.title)">{{ movie.title }}</li>
            </router-link>
        </ul>
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
            const movieSearch = await axios.get(`http://www.omdbapi.com/?apikey=ee7a4dfd&t=${title}`)
            this.movie = {
                title: movieSearch.data.Title,
                poster: movieSearch.data.Poster,
                releaseDate: movieSearch.data.Released,
                rottenRating: movieSearch.data.Ratings[1].Value,
                plot: movieSearch.data.Plot
            }
            console.log(movieSearch.data.Ratings[1].Value)

            this.$store.state.movieTitle = this.movie.title
            this.$store.state.movieImg = this.movie.poster
            this.$store.state.releaseDate = this.movie.releaseDate
            this.$store.state.rottenRating = this.movie.rottenRating
            this.$store.state.moviePlot = this.movie.plot
            this.$store.commit('addMovie', this.movie)
        }
    },

    computed:{
        sHistory() {
            return this.$store.state.searchHistory
        },
    }
}
</script>