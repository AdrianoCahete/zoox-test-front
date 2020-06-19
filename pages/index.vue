<template>
  <div class="content">
    <!-- Logged In -->
    <Navbar />
    <div v-if="$store.state.auth">
      <form method="post">
        <section class="input-content">
          <label for="cidade">Cidade</label>
          <v-select
            id="cidade"
            v-model="city"
            class="input-select"
            :options="['Rio de Janeiro, BR', 'Atlanta, US']"
          />
        </section>
        <button type="button" @click="getWeather">
          Buscar
        </button>
      </form>
      <section>
        <ul>
          <li v-for="weather in weathers" :key="weather.id" class="item">
            <span :id="weather.id">{{ weather.name }}</span>
          </li>
        </ul>
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
  query: '',
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
      id: '1',
      city: 'Rio de Janeiro, BR',
      countries: [],
      weathers: []
    }
  },

  // Get all Countries & Cities on page loading
  mounted () {
    this.getCountry()
  },

  methods: {
    // Get all Countries to list on dropdown
    async getCountry ({ id }) {
      const countries = await this.$axios.$get(internalAPI.url + '/country/' + id + '?_embed=city')
      // const { data } = await this.$axios.$get(internalAPI.url + '/country/' + id + '?_embed=city')
      // eslint-disable-next-line no-console
      console.log(countries)
      // store.commit('setCountry', countries)
    },

    // eslint-disable-next-line require-await
    async getWeather ({ id }) {
      this.$axios.$get(rapidapi.url, { headers: { 'x-rapidapi-host': rapidapi.host, 'x-rapidapi-key': rapidapi.key, useQueryString: rapidapi.useQueryString } }).then((response) => {
        const res = JSON.stringify(response)
        // eslint-disable-next-line no-console
        console.log(res)
        // commit('setWeather', res)
        return { weathers: res }
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
