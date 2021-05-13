<template>
  <v-col cols='2' class="mb-3 mx-3">
    <v-btn small
    :color="typeColors[pokemonType]"
    >
        {{pokemonType}}
    </v-btn>
  </v-col>
</template>

<script>
export default {
  props: ['pokemonType'],
  data: () => ({
    typeColors: {
      normal: '#A8A77A',
      fire: '#EE8130',
      water: '#6390F0',
      electric: '#F7D02C',
      grass: '#7AC74C',
      ice: '#96D9D6',
      fighting: '#C22E28',
      poison: '#A33EA1',
      ground: '#E2BF65',
      flying: '#A98FF3',
      psychic: '#F95587',
      bug: '#A6B91A',
      rock: '#B6A136',
      ghost: '#735797',
      dragon: '#6F35FC',
      dark: '#705746',
      steel: '#B7B7CE',
      fairy: '#D685AD'
    }
  })
}
</script>

<style scoped>
</style>
