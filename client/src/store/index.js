import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allNames: []
  },
  mutations: {
    getAllNames (state, payload) {
      state.allNames = payload
    }
  },
  actions: {
    getAllNames (context) {
      axios({
        url: '/pokemon?limit=1500',
        method: 'get'
      }).then(response => {
        const pokemonNames = response.data.results.map(pokemon => pokemon.name)
        context.commit('getAllNames', pokemonNames)
      }).catch(err => {
        console.log(err.response.data)
      })
    },
    getOnePokemonData (context, pokemonName) {
      return axios({
        url: `/pokemon/${pokemonName}`,
        method: 'get'
      }).then(response => {
        return response.data
      }).catch(err => {
        console.log(err.response.data)
      })
    },
    getOnePokemonSpeciesData (context, speciesUrl) {
      const speciesId = speciesUrl.split('/')[6]
      return axios({
        url: `/pokemon-species/${speciesId}`,
        method: 'get'
      }).then(response => {
        return response.data
      }).catch(err => {
        console.log(err.response.data)
      })
    },
    getOnePokemonEvolutionData (context, evoUrl) {
      const evoId = evoUrl.split('/')[6]
      return axios({
        url: `/evolution-chain/${evoId}`,
        method: 'get'
      }).then(response => {
        return response.data
      }).catch(err => {
        console.log(err.response.data)
      })
    }
  },
  modules: {
  }
})
