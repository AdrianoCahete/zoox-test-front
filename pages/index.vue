<template>
  <div class="content">
    <!-- Logged In -->
    <Navbar />
    <div v-if="$store.state.auth">
      <form method="post">
        <section class="input-content">
          <label for="cidade">Cidade</label>
          <input
            id="cidade"
            v-model="city"
            type="text"
            value="Rio de Janeiro, BR"
          >
        </section>
        <button type="button" @click="getWeather">
          Buscar
        </button>
      </form>
      <section>
        {{ weather }}
      </section>
    </div>

    <!-- Not logged in -->
    <p v-else>
      Por favor
      <NuxtLink to="/login">
        faça login
      </NuxtLink>
    </p>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import Navbar from '~/components/common/navbar.vue'

const internalAPI = {
  url: 'http://localhost:3001',
  city: ''
}

const rapidapi = {
  url: 'https://community-open-weather-map.p.rapidapi.com/forecast?q=rio de janeiro, br',
  host: 'community-open-weather-map.p.rapidapi.com',
  key: '3c5851de7amsh1226b702e3157f8p1b35e8jsn633cdea0f700', // ¯\_(ツ)_/¯ -- É client-side, não tem como não ser pública
  useQueryString: true
}

export default {
  components: {
    Navbar
  },

  // Default City
  data () {
    return {
      city: 'Rio de Janeiro, BR',
      weather: ''
    }
  },

  // Get all Countries & Cities on page loading
  mounted () {
    this.getCountries()
    this.getCities()
  },

  methods: {
    // Get all Countries to list on dropdown
    async getCountries () {
      const countries = await this.$axios.get(internalAPI.url + '/country/')
      return countries
    },

    // Get all Cities to list on dropdown
    async getCities () {
      const cities = await this.$axios.get(internalAPI.url + '/city/')
      return cities
    },

    // eslint-disable-next-line require-await
    async getWeather ({ commit }) {
      this.$axios.$get(rapidapi.url, { headers: { 'x-rapidapi-host': rapidapi.host, 'x-rapidapi-key': rapidapi.key, useQueryString: rapidapi.useQueryString } }).then((response) => {
        const res = JSON.stringify(response)
        // eslint-disable-next-line no-console
        console.log(res)
        return { weather: res }
      })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Error: ' + error)
        })
    }
  }
}
</script>

<style></style>
