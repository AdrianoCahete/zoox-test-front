<template>
  <div class="content contentList">
    <div v-if="$store.state.auth" class="page pageForm">
      <pageHeader title="Criar" back-link="/config" />

      <section class="w-50">
        <fieldset class="fieldset-radio">
          <section class="input-radio">
            <input id="country" v-model="picked" type="radio" value="country">
            <label for="country">País</label>
          </section>
          <section class="input-radio">
            <input id="city" v-model="picked" type="radio" value="city">
            <label for="city">Cidade</label>
          </section>
        </fieldset>

        <!-- Add Country -->
        <form v-if="picked === 'country'" class="card">
          <span class="description">
            Adicione as informações do <strong>País</strong>
          </span>
          <section class="sectionForm">
            <section class="input-text">
              <label for="name">Nome</label>
              <input id="name" v-model="name" type="text" placeholder="Nome do país" required>
            </section>

            <section class="input-text">
              <label for="iso">ISO</label>
              <input id="iso" v-model="iso" type="text" placeholder="Código ISO" required>
            </section>
            <input id="today" v-model="today" type="text" hidden>
          </section>

          <section class="buttonBar">
            <button type="button" class="btnCreate" @click="addCountry(name, iso, today)">
              Adicionar País
            </button>
          </section>
        </form>

        <!-- Add City -->
        <form v-if="picked === 'city'">
          <span class="description">
            Adicione as informações da <strong>Cidade</strong>
          </span>
          <section class="sectionForm">
            <section class="input-text">
              <label for="name">Nome</label>
              <input id="name" v-model="name" type="text" placeholder="Nome da Cidade" required>
            </section>

            <section class="input-text">
              <label for="country">País</label>
              <multiselect
                id="country"
                v-model="countrySelected"
                label="name"
                placeholder="Selecione um país"
                class="input-select"
                track-by="name"
                :options="countryOptions"
                :close-on-select="true"
              >
                <template slot="singleLabel">
                  {{ countrySelected.name }} ({{ countrySelected.iso }})
                </template>
              </multiselect>
              <!-- <span>{{ countrySelected.name }}, {{ countrySelected.iso }}</span> -->
            </section>

            <section class="input-text">
              <label for="lat">Latitude</label>
              <input id="lat" v-model="lat" type="text" placeholder="Latitude" required>
            </section>

            <section class="input-text">
              <label for="lon">Longitude</label>
              <input id="lon" v-model="lon" type="text" placeholder="Longitude" required>
            </section>
            <input id="today" v-model="today" type="text" hidden>
          </section>

          <section class="buttonBar">
            <button type="button" class="btnCreate" @click="addCity(name, countrySelected.id, lat, lon, today)">
              Adicionar Cidade
            </button>
          </section>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { internalAPI } from '~/constants/'
import pageHeader from '~/components/common/page/pageHeader.vue'

export default {
  middleware: 'authenticated',

  components: {
    pageHeader
  },

  data () {
    return {
      picked: '',
      name: '',
      iso: '',
      lat: '',
      lon: '',
      country: '',
      today: moment().format(),
      countrySelected: {
        name: 'Brasil', iso: 'BR', id: 1
      },
      countryOptions: [
        { name: 'Brasil', iso: 'BR', id: 1 },
        { name: 'Estados Unidos', iso: 'US', id: 2 }
      ]
    }
  },

  methods: {
    /* eslint-disable */
    async addCountry (name, iso, date) {
      const today = moment().format()
      const data = {
        name: name,
        iso: iso,
        date_created: today
      }
      /* eslint-enable */

      await this.$axios.$post(
        internalAPI.url + '/country/',
        data,
        { headers: { 'content-type': 'application/json' } }).then((response) => {
        this.$router.push('/config/', { params: { name } })
      })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Error: ' + error)
        })
    },

    /* eslint-disable */
    async addCity (name, country, lat, lon, date) {
      const today = moment().format()
      const data = {
        countryId: country,
        name: name,
        lat: lat,
        long: lon,
        date_created: today
      }
      /* eslint-enable */

      await this.$axios.$post(
        internalAPI.url + '/city/',
        data,
        { headers: { 'content-type': 'application/json' } }).then((response) => {
        this.$router.push('/config/', { params: { name } })
        // eslint-disable-next-line no-console
        console.log('Item adicionado: ' + name, country, lat, lon, date)
      })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Error: ' + error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.sectionForm {
  min-width: 300px;
  width: 50%;
}
</style>
