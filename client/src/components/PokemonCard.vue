<template>
  <v-flex xs12 md4 lg3>
    <v-card>
      <v-responsive class="p3">
        <v-img> </v-img>
      </v-responsive>
    </v-card>
    <p v-if="pokemonData">{{ JSON.stringify(pokemonData) }}</p>
  </v-flex>
</template>

<script>
export default {
  name: 'PokemonCard',
  props: ['pokemonNameProp'],
  data: () => ({
    pokemonData: null
  }),
  computed: {
    // used to make pokemon data reactive after data returned from created
    computedPokemonData: {
      get () {
        return this.pokemonData
      },
      set (newValue) {
        console.log(newValue, '<< new value')
        this.pokemonData = newValue
      }
    }
  },
  async created () {
    this.computedPokemonData = await this.$store.dispatch('getOnePokemonData', this.pokemonNameProp)
  }
}
</script>

<style>
</style>
