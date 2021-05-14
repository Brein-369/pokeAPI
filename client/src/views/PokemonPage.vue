<template>
  <v-container class="px-5 py-5"
  >
    <v-card class='px-5 py-5'>
      <v-layout row class="my-5 px-5" >
        <!--left side of large view-->
        <v-flex xs12 sm6 md6 lg6 pr-3>
          <v-responsive class="p3">
            <v-img
            :src="pokemonData.sprites.other['official-artwork'].front_default"
            >
            </v-img>
          </v-responsive>
          <h1 class="text-center mb-5"
          :class="{'display-2': $vuetify.breakpoint. smAndDown, 'display-3': $vuetify.breakpoint. mdAndUp}"
          ><v-icon
            x-large
            color="#0c5487"
            >mdi-pokeball
          </v-icon>{{nameCapitalized}}
          <v-icon
            x-large
            color="#0c5487"
            >mdi-pokeball
          </v-icon>
          </h1>
          <!--EVOLUTION PART-->
          <v-layout row wrap class="mt-10">
            <v-flex xs12 sm12 md4 lg4 v-for="evo in pokemonEvolutionNamesAndId" :key="evo.id" @click.prevent="goToPokemonPage(evo.name)">
              <v-col class="d-flex justify-center">
                <v-avatar
                size="130"
                color="#c2e3f2"
                >
                  <img
                    :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+evo.id+'.png'"
                    :alt="'evopic '+evo.id"
                  >
                </v-avatar>
              </v-col>
              <v-col class="d-flex justify-center">
                <h3>{{evo.name[0].toUpperCase()+evo.name.slice(1)}}</h3>
              </v-col>
            </v-flex>
          </v-layout>
          <!--MINI INFO BLUE CARD PART-->
          <v-card dark color="#0c5487" class="my-5 px-15 py-15 rounded-card" justify="center" rounded="30">
            <v-row justify="center">
              <v-col class="d-flex justify-center">
                <v-icon
                large
                color="white"
                >mdi-human-male-height-variant
                </v-icon>
              </v-col>
              <v-col class="d-flex justify-center">
                <v-icon
                large
                color="white"
                >mdi-weight
                </v-icon>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col class="d-flex justify-center"><v-text :class="{'display-1': $vuetify.breakpoint. smAndDown, 'display-2': $vuetify.breakpoint. mdAndUp}">{{pokemonData.height}}</v-text>inch</v-col>
              <v-col class="d-flex justify-center"><v-text :class="{'display-1': $vuetify.breakpoint. smAndDown, 'display-2': $vuetify.breakpoint. mdAndUp}">{{pokemonData.weight}}</v-text>lb</v-col>
            </v-row>
            <v-row>
              <v-col cols='12' class="mt-5 d-flex justify-center">
                <v-icon
                x-large
                color="white"
                >mdi-fencing
                </v-icon>
              </v-col>
                <v-btn small class="mx-2 my-2" v-for="ability in pokemonData['abilities']"
                :key= "ability.ability.name"
                >{{ability.ability.name}}
                </v-btn>
            </v-row>
          </v-card>
        </v-flex>
        <!--right side of large view-->
        <v-flex xs12 sm6 md6 lg6 pl-3>
          <!--TYPE-->
          <v-row>
            <v-col cols="12">
            <h3>Type</h3>
            </v-col>
            <PokemonTypeBox v-for="type in pokemonData.types" :key="type.type.name"
            :pokemonType="type.type.name"
            >
            </PokemonTypeBox>
          </v-row>
          <!--MOVES-->
          <v-row class="mt-10">
            <v-col cols="12">
              <h3>Moves</h3>
            </v-col>
            <v-btn x-small class="mx-2 my-2" v-for="move in pokemonData.moves"
            :key= "move"
            >{{move.move.name}}
            </v-btn>
          </v-row>
          <!--STATS-->
          <v-row class="mt-10">
            <v-col cols="12">
              <h3>Stats</h3>
            </v-col>
            <v-sparkline
            :value="chartValue"
            :labels="labelsValue"
            :label-size="'10'"
            :gradient="['#ffd200', '#1feaea']"
            :smooth="'3'"
            :padding="'15'"
            :line-width="'50'"
            :stroke-linecap="'round'"
            :gradient-direction="'bottom'"
            :auto-line-width="'true'"
            auto-draw
            :type="'bar'"
            >
            </v-sparkline>
          </v-row>
        </v-flex>
      </v-layout>
      </v-card>
  </v-container>
</template>

<script>
import PokemonTypeBox from '../components/PokemonTypeBox'

export default {
  data: () => ({
    pokemonData: null,
    pokemonSpeciesData: null,
    pokemonEvolutionChainData: null,
    pokemonEvolutionNamesAndId: null
  }),
  components: {
    PokemonTypeBox
  },
  methods: {
    goToPokemonPage (pokemonName) {
      this.$router.push({ path: '/pokemon', query: { pokemon: pokemonName } })
    }
  },
  watch: {
    $route (to, from) {
      if (to !== from) {
        location.reload()
      }
    }
  },
  computed: {
    // used to make pokemon data reactive after data returned from created
    computedPokemonData: {
      get () {
        return this.pokemonData
      },
      set (newValue) {
        this.pokemonData = newValue
      }
    },
    computedPokemonSpeciesData: {
      get () {
        return this.pokemonSpeciesData
      },
      set (newValue) {
        this.pokemonSpeciesData = newValue
      }
    },
    computedPokemonEvolutionChainData: {
      get () {
        return this.pokemonEvolutionNamesAndId
      },
      set (newValue) {
        this.pokemonEvolutionChainData = newValue
        const evoNamesAndId = []
        function checkEvolve (pokemon) {
          if (!pokemon.evolves_to.length) {
            // adding name and id pokemon
            const obj = {
              id: pokemon.species.url.split('/')[6],
              name: pokemon.species.name
            }
            evoNamesAndId.push(obj)
          } else {
            // adding name and id pokemon
            const obj = {
              id: pokemon.species.url.split('/')[6],
              name: pokemon.species.name
            }
            evoNamesAndId.push(obj)
            checkEvolve(pokemon.evolves_to[0])
          }
        }
        checkEvolve(this.pokemonEvolutionChainData.chain)
        this.pokemonEvolutionNamesAndId = evoNamesAndId
      }
    },
    nameCapitalized () {
      return `${this.pokemonData.name[0].toUpperCase()}${this.pokemonData.name.slice(1)}`
    },
    chartValue () {
      return this.pokemonData.stats.map(stat => stat.base_stat)
    },
    labelsValue () {
      return this.pokemonData.stats.map(stat => {
        if (stat.stat.name.split('-')[0] === 'special') {
          return `sp. ${stat.stat.name.split('-').slice(1)}`
        } else {
          return stat.stat.name
        }
      })
    }
  },
  async created () {
    this.computedPokemonData = await this.$store.dispatch('getOnePokemonData', this.$route.query.pokemon)
    this.computedPokemonSpeciesData = await this.$store.dispatch('getOnePokemonSpeciesData', this.pokemonData.species.url)
    this.computedPokemonEvolutionChainData = await this.$store.dispatch('getOnePokemonEvolutionData', this.pokemonSpeciesData.evolution_chain.url)
  }
}
</script>

<style>

</style>
