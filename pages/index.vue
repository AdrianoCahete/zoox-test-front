<template>
  <div class="content">
    <!-- Logged In -->
    <Navbar />
    <div v-if="$store.state.auth" class="page">
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
        <button type="button" class="btn-Full btnPrimary" @click="getNextWeather">
          Buscar
        </button>
      </form>
      <section id="weatherNext">
        <h1>Proximos</h1>
        <ul class="weatherList">
          <li v-for="weather in weathersNext" :key="weather.cod" class="item">
            <div :id="weather.cod">
              <!-- <p>dt: {{ weather.dt }}</p> -->
              <p>data: {{ weather.dt_txt }}</p>
              <p>temp: {{ weather.main.temp }}</p>
              <p>umidade: {{ weather.main.humidity }}</p>
              <p>pressao: {{ weather.main.pressure }}</p>
              <p>nuvens: {{ weather.clouds.all }}</p>
              <p>vento: {{ weather.wind.speed }} @ {{ weather.wind.deg }}º</p>
              <p>clima: {{ weather.weather[0].main }}</p>
            </div>
          </li>
        </ul>
      </section>
      <!-- <section id="weatherPast" class="isHidden">
        <h1>Anteriores</h1>
        <ul class="weatherList">
          <li v-for="weather in weathersPast" :key="weather.cod" class="item">
            <div :id="weather.cod">
              <p>dt: {{ weather.dt }}</p>
              <p>data: {{ weather.dt_txt }}</p>
              <p>temp: {{ weather.dt_txt }}</p>
              <p>umidade: {{ weather.dt_txt }}</p>
              <p>pressao: {{ weather.dt_txt }}</p>
              <p>nuvens: {{ weather.dt_txt }}</p>
              <p>vento: {{ weather.dt_txt }}</p>
              <p>clima: {{ weather.dt_txt }}</p>
            </div>
          </li>
        </ul>
      </section> -->
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
import Navbar from '~/components/common/navbar.vue'

const internalAPI = {
  url: process.env.INTERNAL_API_URL || 'http://localhost:3001',
  city: ''
}

const rapidapi = {
  nexturl: 'https://community-open-weather-map.p.rapidapi.com/forecast?q=',
  query: 'rio de janeiro, br',
  host: 'community-open-weather-map.p.rapidapi.com',
  key: '3c5851de7amsh1226b702e3157f8p1b35e8jsn633cdea0f700', // process.env.RAPIDAPI_KEY, - ¯\_(ツ)_/¯ -- É client-side, não tem como não ser pública
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
      weathersNext: []
      // weathersPast: []
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
    async getNextWeather ({ id }) {
      this.$axios.$get(rapidapi.nexturl + rapidapi.query, { headers: { 'x-rapidapi-host': rapidapi.host, 'x-rapidapi-key': rapidapi.key, useQueryString: rapidapi.useQueryString } }).then((response) => {
        // commit('setWeather', res)
        this.weathersNext = response.list
      })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Error: ' + error)
        })
    }

    // // eslint-disable-next-line require-await
    // async getPastWeather ({ id }) {
    //   this.$axios.$get(rapidapi.url + rapidapi.query, { headers: { 'x-rapidapi-host': rapidapi.host, 'x-rapidapi-key': rapidapi.key, useQueryString: rapidapi.useQueryString } }).then((response) => {
    //     // commit('setWeather', res)
    //     this.weathersPast = response.list
    //   })
    //     .catch((error) => {
    //       // eslint-disable-next-line no-console
    //       console.log('Error: ' + error)
    //     })
    // }
  }
}
</script>

<style lang="scss" scoped>
.page {
  > form {
    margin: 0 auto;
    width: 50vw;
    max-width: 300px;
  }
}

.weatherList {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  overflow-x: auto;
  overflow-y: hidden;
  max-height: 50vh;
  padding: 0;

  .item {
    list-style: none;
    margin: 0;
    padding: 0 2rem;
    background: #f2f2f2;
    margin: 0 1rem;
    min-width: 200px;
  }
}
</style>
