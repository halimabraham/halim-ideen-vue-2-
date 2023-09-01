<template>
    <div>
        <div v-if="unexistant">
            <v-alert
                dense
                outlined
                type="error"
                >
                I <strong>couldn't</strong> find the movie you were looking for :(
            </v-alert>
        </div>
        <div v-if="existant">
            <v-container>
                <v-row no-gutters align="center" justify="center">
                    <v-col
                        cols="12">
                        <h1 >Movie Description</h1>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-img
                            :alt="title"
                            class="shrink mr-2"
                            contain 
                            :src="img"
                            transition="scale-transition"
                            height="500"
                            >
                        </v-img>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <template>
                            <v-row no-gutters>
                                <v-col 
                                    cols="12">
                                    <h3 class="subheading mx-3 my-3">Movie title:</h3>
                                    <p >{{ title }}</p>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col 
                                    cols="12">
                                    <h3 class="subheading mx-3 my-3">Release Date:</h3>
                                    <p >{{ release }}</p>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col 
                                    cols="12">
                                    <h3 class="subheading mx-3 my-3">Rotten Tomatoes Rating:</h3>
                                    <p >{{ rotten }}</p>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col 
                                    cols="12">
                                    <h3 class="subheading mx-3 my-3">Movie plot:</h3>
                                    <p >{{ plot }}</p>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col 
                                    cols="12">
                                    <v-btn text color="grey" @click="deleteMovie">
                                        <v-icon small left>mdi-delete</v-icon>
                                        <span class="">Delete from history</span>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </template>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
import { query, collection, where, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase/db'

export default {

    methods : {
        deleteMovie : async function () {
            const q = query(collection(db, 'movies'), where('title', '==', this.$store.state.movieTitle))
            const querySnapshot = await getDocs(q);
            if (querySnapshot.docs.length > 0) {
                const foundDocument = querySnapshot.docs[0]
                const documentId = foundDocument.id

                await deleteDoc(doc(db, 'movies', documentId))
                this.$router.push('/')
            }
        }
    },

    computed:{
        title() {
            return this.$store.state.movieTitle
        },
        img() {
            return this.$store.state.movieImg
        },
        release() {
            return this.$store.state.releaseDate
        },
        rotten() {
            return this.$store.state.rottenRating
            
        },
        plot() {
            return this.$store.state.moviePlot
        },
        unexistant() {
            return this.$store.state.unexistant
        },
        existant() {

            return this.$store.state.existant
        }
    }
}
</script>