<template>
  <section class="content">
    <!-- Logged In -->
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
        <button type="button" class="btn-Full btnPrimary" @click="getNextWeather('rio de janeiro, br'); getPastWeather('-22.9035','-43.2096')">
          Buscar
        </button>
      </form>
      <section id="weatherNext" class="weatherSection">
        <ul class="weatherList">
          <li v-for="w in weathersNext" :key="w.dt" class="item">
            <weatherCard
              :id="w.dt"
              :date="w.dt_txt"
              :temp="w.main.temp"
              :humidity="w.main.humidity"
              :pressure="w.main.pressure"
              :clouds="w.clouds.all"
              :wind-speed="w.wind.speed"
              :wind-deg="w.wind.deg"
              :weather-desc="w.weather[0].description"
              :weather-status="w.weather[0].main"
            />
          </li>
        </ul>
      </section>
      <section id="weatherPast" class="weatherSection">
        <ul class="weatherList">
          <li v-for="w in weathersPast.slice(0, 1)" :key="w.dt" class="item">
            <weatherCard
              :id="w.dt"
              type="isPast"
              :date="w.dt"
              :temp="w.temp"
              :humidity="w.humidity"
              :pressure="w.pressure"
              :clouds="w.clouds"
              :wind-speed="w.wind_speed"
              :wind-deg="w.wind_deg"
            />
          </li>
        </ul>
      </section>
    </section>
  </section>
</template>

<script>
import moment from 'moment'
import weatherCard from '~/components/common/weather/weatherCard.vue'

const API = {
  internal: process.env.INTERNAL_API_URL || 'http://localhost:3001',
  rapidapi: 'community-open-weather-map.p.rapidapi.com'
}

const internalAPI = {
  url: API.internal,
  city: ''
}

const rapid = {
  nexturl: 'https://' + API.rapidapi + '/forecast?q=',
  pasturl: 'https://' + API.rapidapi + '/onecall/timemachine',
  host: API.rapidapi,
  key: '3c5851de7amsh1226b702e3157f8p1b35e8jsn633cdea0f700', // process.env.RAPIDAPI_KEY, - ¯\_(ツ)_/¯ -- É client-side, não tem como não ser pública
  useQueryString: true
}

export default {
  middleware: 'authenticated',

  components: {
    weatherCard
  },

  // Default City
  data () {
    return {
      locale: 'pt-br',
      city: 'Rio de Janeiro, BR',
      countries: [],
      weathersNext: [],
      weathersPast: []
    }
  },

  // Get all Countries & Cities on page loading
  mounted () {
    this.getCountry(0)
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
    getPrevDates ({ dates }) {
      const d = dates || 1
      const today = moment().unix()
      const res = []

      let i = 0
      for (i; i < d; i++) {
        res.push(Math.round(today - (86400 * i))) // 86400  is a day in Epoch time
      }

      // eslint-disable-next-line no-console
      console.log(res.join(','))
      return res.join(',')
    },

    // Get Weather for the NEXT 5 Days
    async getNextWeather ({ city }) {
      const c = city || 'rio de janeiro, br'
      await this.$axios.$get(
        rapid.nexturl +
        c +
        '&lang=pt_br' +
        '&exclude=hourly' + // TODO: This is a test
        '&units=metric',
        { headers: { 'x-rapidapi-host': rapid.host, 'x-rapidapi-key': rapid.key, useQueryString: rapid.useQueryString } }).then((response) => {
        this.weathersNext = response.list
      })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Error: ' + error)
          // this.Alert.Message = error // TODO: Send error messages to Alert Component
          // this.Alert.Status = error // TODO: Send error messages to Alert Component
        })
    },

    // Get Weather for the PAST X Days (Epoch times needs to be passed in 'dt' key)
    async getPastWeather ({ lat, lon, pastDays }) {
      const latValue = lat || '-22.9035'
      const lonValue = lon || '-43.2096'
      const numDays = pastDays || 1

      // const today = moment().unix() // (Math.round(today.getTime() / 1000))
      const yesterday = moment().subtract(numDays, 'days').unix()

      // const prevDays = this.getPrevDates(numDays)

      // TODO: Use getPrevDates instead
      const pDays = yesterday

      // let i = 0
      // 86400  is a day in Epoch time
      // for (i; i < numDays; i++) {
      //   pDays.push(moment().subtract(i, 'days'))
      //   // TODO: Move API request to here and append to array
      // }

      // pDays.join(',')
      // eslint-disable-next-line no-console
      console.log(pDays)

      await this.$axios.$get(
        rapid.pasturl +
        '?lat=' + latValue +
        '&lon=' + lonValue +
        '&lang=pt_br' +
        '&units=metric' +
        '&exclude=hourly' +
        '&dt=' + pDays,
        { headers: { 'x-rapidapi-host': rapid.host, 'x-rapidapi-key': rapid.key, useQueryString: rapid.useQueryString } }).then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.hourly)
        this.weathersPast = response.hourly // response.current = actual / response.hourly = 3 hourly / response = all
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
