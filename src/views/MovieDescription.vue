<template>
    <div>
        <h1 class="subheading mx-3 my-3">Movie Description</h1>
        <!-- <v-container fill-height fluid>
            <v-row align="center"
                justify="center">
                <v-col>
                    <v-img
                    :alt="title"
                    class="shrink mr-2"
                    contain 
                    :src="img"
                    transition="scale-transition"
                    width="200">
                    </v-img>
                    <p >{{ title }}</p>
                    <p>{{ release }}</p>
                    <p>{{ rotten}}</p>
                    <p>{{ plot }}</p>
                </v-col>
            </v-row>
        </v-container> -->
        <!-- <v-card
            class="d-flex justify-center mb-6"
            :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
            flat
            tile
        >
            <v-img
                :alt="title"
                class="shrink mr-2"
                contain 
                :src="img"
                transition="scale-transition"
                width="200">
            </v-img>
            <p >{{ title }}</p>
            <p>{{ release }}</p>
            <p>{{ rotten}}</p>
            <p>{{ plot }}</p>
        </v-card> -->
        
    </div>
</template>

<script>

export default {
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
        }
    }
}
</script>