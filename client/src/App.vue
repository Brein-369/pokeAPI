<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Pokemon Logo"
          class="shrink mr-2"
          src="https://freepngimg.com/thumb/pokemon/2-2-pokemon-png-pic.png"
          width="120"
          @click.prevent="goToHome"
        />
        <h2>Dex</h2>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        text
        :to="{name: 'About'}"
      >
        <span class="mr-2">About</span>
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
  methods: {
    goToHome () {
      this.$router.push('/')
    }
  }
}
</script>
