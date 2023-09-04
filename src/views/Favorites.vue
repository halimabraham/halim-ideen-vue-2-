<template>
    <div>
        <h1 class="subheading mx-3 my-3 text-center">List of your Favorite movies :)</h1>
        <v-container class="my-5">
            <v-layout row wrap class="d-flex justify-center">
                    <v-flex xs12 sm6 md4 lg3 class="mx-3 my-3" v-for="movie in favorites" :key="movie.title">
                        <v-card elevation="1" class="mb-3" max-height="2000">
                            <v-row>
                                <v-col
                                    cols="7">
                                    <v-card-title>
                                        <div class="subheading">{{ movie.title }}</div>
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-btn text color="grey" @click="searchMovie(movie.title)">
                                            <v-icon small left>mdi-more</v-icon>
                                            <span class="">See more</span>
                                        </v-btn>
                                    </v-card-actions>
                                    <v-card-actions>
                                        <v-btn text :color="(movie.favorite ? 'red' : 'grey')" @click="addFavorite(movie)">
                                            <v-icon small left>mdi-heart</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-col>
                                <v-col
                                    cols="5">
                                    <v-img
                                        :alt="movie.title"
                                        class="shrink mr-2"
                                        contain 
                                        :src="movie.poster"
                                        transition="scale-transition"
                                        height="200"
                                        width="200"
                                    >
                                    </v-img>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>

import axios from 'axios'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/db'

export default {

    methods : {
        searchMovie: async function(title) {
            this.$store.state.unexistant = false
            this.$store.state.existant = true
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
            this.$router.push('movieDescription')
        },
        addFavorite: async function(movie) {
            const q = doc(db, 'movies', movie.id)
            const updateData = {
                id: movie.id,
                title: movie.title,
                img: movie.poster,
                releas: movie.releaseDate,
                rating: movie.rottenRating,
                plot: movie.plot,
                date: movie.date,
                favorite: !movie.favorite
            }
            await updateDoc(q, updateData);
        }
    },  

    computed:{
        favorites() {
            return this.$store.state.favorites
        },
    }
}
</script>