<template>
  <div class="content contentList">
    <!-- Logged In -->
    <div v-if="$store.state.auth" class="page">
      <pageHeader title="Editar" back-link="/config" />
      <section v-if="items">
        <p v-if="$fetchState.pending">
          Obtendo informação, aguarde...
        </p>
        <p v-else-if="$fetchState.error">
          Erro ao obter a informação: {{ $fetchState.error.message }}
        </p>
        <section v-else-if="this.$route.params.mode == 'country'">
          <section :key="items.id" class="cardHeader w-50">
            <section class="itemName">
              {{ items.name }}
              <span class="itemISO">
                ({{ items.iso }})
              </span>
            </section>
            <section>
              {{ $moment(items.date_created).format('YYYY-MM-DD @ HH:MM') }}
            </section>
            <section v-if="($moment(items.date_updated).isValid())">
              {{ $moment(items.date_updated).format('YYYY-MM-DD @ HH:MM') || '-' }}
            </section>
          </section>
          <section>
            <form method="post" @submit="editCountry(items.id, name, iso, today)">
              <!-- <span class="description">
                Edite as informações de <strong>{{ items.name }}</strong>
              </span> -->
              <section class="sectionForm">
                <section class="input-text">
                  <label for="name">Nome</label>
                  <input
                    id="name"
                    :value="items.name"
                    type="text"
                    maxlength="255"
                    placeholder="Nome do país"
                    required
                  >
                </section>

                <section class="input-text">
                  <label for="iso">ISO</label>
                  <input
                    id="iso"
                    :value="items.iso"
                    type="text"
                    maxlength="3"
                    placeholder="Código ISO"
                    required
                  >
                </section>
                <input id="id" :value="items.id" type="text" hidden>
                <input id="today" v-model="today" type="text" hidden>
              </section>

              <section class="buttonBar">
                <button type="button" class="btnPrimary">
                  Editar País
                </button>
              </section>
            </form>
          </section>
        </section>
        <section v-else-if="this.$route.params.mode == 'city'">
          <section :key="items.id" class="cardHeader w-50">
            <section class="itemName">
              {{ items.name }}
            </section>
            <section class="itemLoc">
              <section>
                <label>
                  Latitude:
                </label>
                {{ items.lat }}
              </section>
              <section>
                <label>
                  Longitude:
                </label>
                {{ items.long }}
              </section>
            </section>
            <section class="itemDate">
              <label>
                Criado em:
              </label>
              {{ $moment(items.date_created).format('YYYY-MM-DD @ HH:MM') }}
            </section>
            <section v-if="($moment(items.date_updated).isValid())" class="itemDate">
              <label>
                Atualizado em:
              </label>
              {{ $moment(items.date_updated).format('YYYY-MM-DD @ HH:MM') || '-' }}
            </section>
          </section>
          <section>
            <form method="post" @submit="addCity(name, items.countryId, lat, lon, today)">
              <!-- <span class="description">
                Edite as informações de <strong>{{ items.name }}</strong>
              </span> -->
              <section class="sectionForm">
                <section class="input-text">
                  <label for="name">Nome</label>
                  <input
                    id="name"
                    :value="items.name"
                    type="text"
                    maxlength="255"
                    placeholder="Nome do país"
                    required
                  >
                </section>

                <section class="input-text">
                  <label for="lat">Latitude</label>
                  <input
                    id="lat"
                    :value="items.lat"
                    type="number"
                    placeholder="Latitude"
                    required
                  >
                </section>

                <section class="input-text">
                  <label for="lon">Longitude</label>
                  <input
                    id="lon"
                    :value="items.long"
                    type="number"
                    placeholder="Longitude"
                    required
                  >
                </section>
                <input id="today" v-model="today" type="text" hidden>
                <input id="country" :value="items.countryId" type="text" hidden>
              </section>

              <section class="buttonBar">
                <button type="button" class="btnPrimary">
                  Editar Cidade
                </button>
              </section>
            </form>
          </section>
        </section>

        <!-- <section v-if="isDev">
          Id:{{ itemId }} ItemMode: {{ itemMode }}
        </section> -->
      </section>
      <section v-else>
        Não foi possível carregar as informações, volte à listagem e tente novamente.
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

  fetch () {
    this.fillForm() // this.$route.params.id, this.$route.params.mode
  },

  data () {
    return {
      itemId: this.$route.params.id,
      itemMode: this.$route.params.mode,
      items: [],
      picked: '',
      name: '',
      iso: '',
      lat: '',
      lon: '',
      today: moment().format()
    }
  },

  methods: {
    async fillForm () {
      const itemId = this.$route.params.id
      const modeType = this.$route.params.mode

      await this.$axios.$get(internalAPI.url + '/' + modeType + '/' + itemId).then((response) => {
        this.items = response
      })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Error: ' + error)
        })
    },

    // eslint-disable-next-line require-await
    async editCountry (id, name, iso, date) {
      // const countries = await this.$axios.$post(internalAPI.url + '/country/' + countryId + '?_embed=city')
      // eslint-disable-next-line no-console
      console.log(this.name, this.iso, this.date)
    },

    /* eslint-disable */
    async editCity (name, country, lat, lon, date) {
      const today = moment().format()
      const data = {
        countryId: country,
        name:name,
        lat:lat,
        long:lon,
        date_created:today
      }
      /* eslint-enable */

      await this.$axios.$post(
        internalAPI.url + '/country/',
        data,
        { headers: { 'content-type': 'application/json' } }).then((response) => {
        // this.$router.push('/config/', { params: { name } })
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
.cardHeader {
  background: #f2f2f2;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 2rem;

  .itemName {
    font-size: 2.5rem;
    font-weight: 500;

    .itemISO {
      text-transform: uppercase;
    }
  }

  .itemLoc {
    display: flex;

    > section {
      margin-right: 2rem;

      label {
        font-weight: 500;
      }
    }
  }

  .itemDate {
    display: flex;
    justify-content: space-between;

    label {
      font-weight: 500;
    }
  }
}
</style>
