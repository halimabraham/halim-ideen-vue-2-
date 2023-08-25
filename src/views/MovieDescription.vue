<template>
    <div>
        <h1>Movie Description</h1>
        <p>{{ title }}</p>
        <p>{{ img }}</p>
        <p>{{ release }}</p>
        <p>{{ rotten}}</p>
        <p>{{ plot }}</p>
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