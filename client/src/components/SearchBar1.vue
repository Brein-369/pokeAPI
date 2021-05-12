<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" v-if="searchInput">
        <v-img
          :src="'http://pngimg.com/uploads/pokeball/small/pokeball_PNG7.png'"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
      <v-col cols="12" v-else>
        <v-img
          :src="'https://i.imgur.com/SUXO2Px.png'"
          class="my-3"
          contain
          height="300"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">PokemonDex</h1>

        <p class="subheading font-weight-regular">Find any pokemon you love</p>
      </v-col>

      <v-col class="mb-5" cols="12">
        <v-autocomplete
          auto-select-first
          clearable
          filled
          rounded
          hide-no-data
          multiple
          small-chips
          deletable-chips
          solo
          :items="allNames"
          v-model="searchInput"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-layout row wrap>
      <PokemonCard v-for="eachPokemonName in searchInput"
      :key= 'eachPokemonName'
      :pokemonNameProp= 'eachPokemonName'
      >
      </PokemonCard>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import PokemonCard from '../components/PokemonCard'
export default {
  name: 'SearchBar1',
  components: {
    PokemonCard
  },
  data: () => ({
    searchInput: []
    // temporarySearchList: [],
    // seachList: []
  }),
  computed: {
    ...mapState({
      allNames: 'allNames'
    })
    // findAllPokemonDataFromInput (searchInput) {
    //   this.$store.dispatch('findAllPokemonInput', searchInput)
    // }
  },
  methods: {},
  watched: {},
  created () {
    this.$store.dispatch('getAllNames')
  }
}
</script>
