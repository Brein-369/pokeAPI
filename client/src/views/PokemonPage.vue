<template>
  <v-container class="px-5 py-5"
  >
    <v-card class='px-5 py-5'>
      <v-layout row class="my-5 px-5" >

        <v-flex xs12 sm6 md6 lg6 pr-3>
          <v-responsive class="p3">
            <v-img
            :src="pokemonData.sprites.other['official-artwork'].front_default"
            >
            </v-img>
          </v-responsive>
          <h1 class="text-center mb-5"
          :class="{'display-2': $vuetify.breakpoint. smAndDown, 'display-3': $vuetify.breakpoint. mdAndUp}"
          >{{nameCapitalized}}
          </h1>
          <v-card dark color="#013457" class="mb-5 px-15 py-15" justify="center">
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
        <v-flex xs12 sm6 md6 lg6 pl-3>
          <v-row>
            <v-col cols="12">
            <h3>Type</h3>
            </v-col>
            <PokemonTypeBox v-for="type in pokemonData.types" :key="type.type.name"
            :pokemonType="type.type.name"
            >
            </PokemonTypeBox>
          </v-row>
          <v-row>
            <v-col cols="12">
            <h3>Moves</h3>
            </v-col>
            <v-btn x-small class="mx-2 my-2" v-for="move in pokemonData.moves"
            :key= "move"
            >{{move.move.name}}
            </v-btn>
          </v-row>
          <v-row>
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
    pokemonData: null
  }),
  components: {
    PokemonTypeBox
  },
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
    console.log(this.$route.query.pokemon)
    this.computedPokemonData = await this.$store.dispatch('getOnePokemonData', this.$route.query.pokemon)
  }
}
</script>

<style>

</style>
