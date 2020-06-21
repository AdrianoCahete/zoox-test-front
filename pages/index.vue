<template>
  <section class="content">
    <!-- Logged In -->
    <Navbar />
    <!-- <Alert :message="Message" :status="Status" /> --> <!-- TODO: Move to layout master page -->
    <section v-if="$store.state.auth" class="page">
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
        <button type="button" class="btn-Full btnPrimary" @click="getPastWeather('-22.9035','-43.2096')">
          <!-- <button type="button" class="btn-Full btnPrimary" @click="getNextWeather('rio de janeiro, br'); getPastWeather('-22.9035','-43.2096')"> -->
          Buscar
        </button>
      </form>
      <section v-if="weathersNext <= 0 ? '': 'isHidden'" id="weatherNext" class="weatherSection">
        <h1>Proximos 5 dias</h1>
        <ul class="weatherList">
          <li v-for="weather in weathersNext" :key="weather.dt" class="item">
            <weatherCard
              :id="weather.dt"
              :date="weather.dt_txt"
              :temp="weather.main.temp"
              :humidity="weather.main.humidity"
              :pressure="weather.main.pressure"
              :clouds="weather.clouds.all"
              :wind-speed="weather.wind.speed"
              :wind-deg="weather.wind.deg"
              :weather-desc="weather.weather[0].main"
            />
          </li>
        </ul>
      </section>
      <section v-if="weathersPast <= 0 ? '': 'isHidden'" id="weatherPast" class="weatherSection">
        <h1>Últimos 5 Dias</h1>
        <ul class="weatherList">
          <li v-for="weather in weathersPast.hourly" :key="weather.dt" class="item">
            <weatherCard
              :id="weather.dt"
              type="isPast"
              :date="weather.dt"
              :temp="weather.temp"
              :humidity="weather.humidity"
              :pressure="weather.pressure"
              :clouds="weather.clouds"
              :wind-speed="weather.wind_speed"
              :wind-deg="weather.wind_deg"
              :weather-desc="weather.weather.description"
            />
          </li>
        </ul>
      </section>
    </section>

    <!-- Not logged in -->
    <p v-else>
      Por favor
      <NuxtLink to="/login">
        faça login
      </NuxtLink>
    </p>
  </section>
</template>

<script>
import moment from 'moment'
import Navbar from '~/components/common/navbar.vue'
// import Alert from '~/components/common/alert.vue'
import weatherCard from '~/components/common/weather/weatherCard.vue'

const internalAPI = {
  url: process.env.INTERNAL_API_URL || 'http://localhost:3001',
  city: ''
}

const rapidapi = {
  nexturl: 'https://community-open-weather-map.p.rapidapi.com/forecast?q=',
  pasturl: 'https://community-open-weather-map.p.rapidapi.com/onecall/timemachine',
  host: 'community-open-weather-map.p.rapidapi.com',
  key: '3c5851de7amsh1226b702e3157f8p1b35e8jsn633cdea0f700', // process.env.RAPIDAPI_KEY, - ¯\_(ツ)_/¯ -- É client-side, não tem como não ser pública
  useQueryString: true
}

export default {
  components: {
    Navbar,
    weatherCard
    // Alert
  },

  // Default City
  data () {
    return {
      city: 'Rio de Janeiro, BR',
      countries: [],
      weathersNext: [],
      weathersPast: []
    }
  },

  // Get all Countries & Cities on page loading
  mounted () {
    this.getCountry(0)
    this.getPrevDates(5)
  },

  methods: {
    // Get all Countries in Internal API to list on dropdown
    async getCountry ({ id }) {
      const countryId = this.id || '' // Empty value lists everything
      const countries = await this.$axios.$get(internalAPI.url + '/country/' + countryId + '?_embed=city')
      // eslint-disable-next-line no-console
      console.log(countries)
      // TODO: Send error messages to Alert Component
    },

    // Get Past X days in Epoch
    // eslint-disable-next-line require-await
    async getPrevDates ({ dates }) {
      const d = dates
      const today = new Date()
      // eslint-disable-next-line no-unused-vars
      let res = ''

      let i = 0
      for (i; i < d; i++) {
        res += moment(today).subtract(d, 'days').calendar()
      }
      // eslint-disable-next-line no-console
      console.log(res)
    },

    // Get Weather for the next 5 Days
    // eslint-disable-next-line require-await
    async getNextWeather ({ city }) {
      const c = city || 'rio de janeiro, br'
      this.$axios.$get(
        rapidapi.nexturl +
        c +
        '&lang=pt' +
        '&units=metric',
        { headers: { 'x-rapidapi-host': rapidapi.host, 'x-rapidapi-key': rapidapi.key, useQueryString: rapidapi.useQueryString } }).then((response) => {
        this.weathersNext = response.list
      })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Error: ' + error)
          // this.Alert.Message = error // TODO: Send error messages to Alert Component
          // this.Alert.Status = error // TODO: Send error messages to Alert Component
        })
    },

    // Get Weather for the last X Days (Epoch times needs to be passed in 'dt' key)
    // eslint-disable-next-line require-await
    async getPastWeather ({ lat, lon }) {
      const latValue = lat || '-22.9035'
      const lonValue = lon || '-43.2096'
      const today = new Date()

      this.$axios.$get(
        rapidapi.pasturl +
        '?&lat=' + latValue +
        '&lon=' + lonValue +
        '&lang=pt' +
        '&units=metric' +
        '&dt=' + (Math.round(today.getTime() / 1000)) + ',' +
        (Math.round(today.getTime() / 1000)), // TODO: Move to getPrevDates function
        { headers: { 'x-rapidapi-host': rapidapi.host, 'x-rapidapi-key': rapidapi.key, useQueryString: rapidapi.useQueryString } }).then((response) => {
        this.weathersPast = response
        // eslint-disable-next-line no-console
        console.log(response)
      })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Error: ' + error) // TODO: Send error messages to Alert Component
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  > form {
    margin: 0 auto;  // TODO Move to global style
    width: 50vw; // TODO Move to global style
    max-width: 300px;  // TODO Move to global style
  }
}

.weatherSection {
  margin-top: 2rem;
  border: 1px solid #f2f2f2; // TODO: Get from Vars

  > h1 {
    background-color: #f2f2f2; // TODO: Get from Vars
  }
}

.weatherList {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  overflow-x: auto;
  overflow-y: hidden;
  max-height: 50vh;
  padding: 1rem;

  .item {
    list-style: none;
    margin: 0 1rem;
    min-width: 200px;
  }
}
</style>
