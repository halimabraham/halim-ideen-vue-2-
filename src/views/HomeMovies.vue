<template>
    <div>
        <h1 class="subheading mx-3 my-3 text-center">SEARCH YOUR FAVORITE MOVIE :) !</h1>
        <h2 class="subheading mx-3 my-3 text-center grey--text">Search history:</h2>
        <div class="d-flex justify-center">
            <v-btn class="mx-3 my-3" @click="orderLast">
                <v-icon small left>mdi-arrow-up-box</v-icon>
                <span class="">Last search</span>
            </v-btn>
            <v-btn class="mx-3 my-3" @click="orderFirst">
                <v-icon small left>mdi-arrow-down-box</v-icon>
                <span class="">First search</span>
            </v-btn>
            <v-btn class="red mx-3 my-3" @click="deleteAll">
                <v-icon small left>mdi-delete</v-icon>
                <span class="">Delete All</span>
            </v-btn>
            <router-link to="/favorites">
                <v-btn class="primary mx-3 my-3">
                    <v-icon small left>mdi-star</v-icon>
                    <span class="">Favorites</span>
                </v-btn>
            </router-link>
        </div>
        <v-container class="my-5">
            <v-layout row wrap class="d-flex justify-center">
                    <v-flex xs12 sm6 md4 lg3 class="mx-3 my-3" v-for="movie in sHistory" :key="movie.title">
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
                                        <v-btn text color="grey" @click="deleteMovie(movie.id)">
                                            <v-icon small left>mdi-delete</v-icon>
                                            <span class="">Delete</span>
                                        </v-btn>
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
import { doc, deleteDoc, collection, query, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/db'

export default {
    name: 'home-movies',

    data: () => ({
        movie : {}
    }),

    methods: {
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
        deleteMovie: function(id) {
            let docRef = ''
            docRef = doc(db, 'movies', id)
            deleteDoc(docRef)
        },
        orderFirst: function() {
            this.sHistory.sort((a, b) => a.date.seconds - b.date.seconds)
        },
        orderLast: function() {
            this.sHistory.sort((a, b) => b.date.seconds - a.date.seconds)
        },
        deleteAll: async function() {
            const movies = collection(db, 'movies')
            const q = query(movies)
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
        },
        addFavorite: async function(movie) {
            const q = doc(db, 'movies', movie.id)
            const updateData = {
                favorite: !movie.favorite
            }
            await updateDoc(q, updateData);
        }
    },

    computed:{
        sHistory() {
            return this.$store.state.searchHistory
        }
    }
}
</script>