<template>
  <v-flex xs12 md4 lg3 mx-3 my-2>
    <v-card primary class='px-5 py-5 mx-10 my-5'
    @click.prevent="goToPokemonPage"
    >
      <v-responsive class="p3">
        <v-img
        :src="pokemonData.sprites.other['official-artwork'].front_default"
        >
        </v-img>
      </v-responsive>
      <h2 class="text-center">{{nameCapitalized}}</h2>
    </v-card>
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
    },
    nameCapitalized () {
      return `${this.pokemonData.name[0].toUpperCase()}${this.pokemonData.name.slice(1)}`
    }
  },
  methods: {
    goToPokemonPage () {
      this.$router.push({ path: '/pokemon', query: { pokemon: this.pokemonNameProp } })
    }
  },
  async created () {
    this.computedPokemonData = await this.$store.dispatch('getOnePokemonData', this.pokemonNameProp)
  }
}
</script>

<style scoped>
h2 {
  padding-bottom: 20px;
}
</style>
