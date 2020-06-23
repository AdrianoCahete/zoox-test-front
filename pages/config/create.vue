<template>
  <div class="content pageList">
    <div v-if="$store.state.auth" class="page">
      <pageHeader title="Criar" back-link="/config" />

      <section>
        <section>
          <input id="country" v-model="picked" type="radio" value="country">
          <label for="country">País</label>
        </section>
        <section>
          <input id="city" v-model="picked" type="radio" value="city">
          <label for="city">Cidade</label>
        </section>

        <!-- Add Country -->
        <form v-if="picked === 'country'" method="post" @submit="addCountry(name, iso, today)">
          <section class="sectionForm">
            <section class="input-content">
              <label for="name">Nome</label>
              <input id="name" v-model="name" type="text" placeholder="Nome do país" required>
            </section>

            <section class="input-content">
              <label for="iso">ISO</label>
              <input id="iso" v-model="iso" type="text" placeholder="Código ISO" required>
            </section>
            <input id="today" v-model="today" type="text" hidden>
          </section>

          <section class="buttonBar">
            <button type="button" class="btnPrimary">
              Adicionar País
            </button>
          </section>
        </form>

        <!-- Add City -->
        <form v-if="picked === 'city'" method="post" @submit="addCountry(name, country, lat, lon, today)">
          <!-- @submit="addCountry" -->
          <section class="sectionForm">
            <section class="input-content">
              <label for="name">Nome</label>
              <input id="name" v-model="name" type="text" placeholder="Nome do país" required>
            </section>

            <section class="input-content">
              <label for="iso">ISO</label>
              <input id="iso" v-model="iso" type="text" placeholder="Código ISO" required>
            </section>

            <section class="input-content">
              <label for="lat">Latitude</label>
              <input id="lat" v-model="lat" type="text" placeholder="Latitude" required>
            </section>

            <section class="input-content">
              <label for="lon">Longitude</label>
              <input id="lon" v-model="lon" type="text" placeholder="Longitude" required>
            </section>
            <input id="today" v-model="today" type="text" hidden>
          </section>

          <section class="buttonBar">
            <button type="button" class="btnPrimary">
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
      today: moment().format()
    }
  },

  methods: {
    // eslint-disable-next-line require-await
    async addCountry ({ name, iso, date }) {
      // const countries = await this.$axios.$post(internalAPI.url + '/country/' + countryId + '?_embed=city')
      // eslint-disable-next-line no-console
      console.log(this.name, this.iso, this.date)
      // TODO: Send error messages to Alert Component
    },

    // eslint-disable-next-line require-await
    async addCity ({ name, country, lat, lon, date }) {
      // const countries = await this.$axios.$post(internalAPI.url + '/country/' + countryId + '?_embed=city')
      // eslint-disable-next-line no-console
      console.log(this.name, this.country, this.lat, this.lon, this.date)
      // TODO: Send error messages to Alert Component
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
