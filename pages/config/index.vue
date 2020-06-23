<template>
  <div class="content pageList">
    <!-- Logged In -->
    <div v-if="$store.state.auth" class="page">
      <section>
        <section class="table">
          <pageHeader title="Lista" />
          <!-- TODO: Move to custom Components -->
          <section class="tableActions">
            <nuxt-link to="/config/create" class="btnAdd">
              Criar
            </nuxt-link>
          </section>
          <table>
            <thead>
              <th>
                Cidade
              </th>
              <th>
                Latitude
              </th>
              <th>
                Longitude
              </th>
              <th>
                Criado em
              </th>
              <th>
                Atualizado em
              </th>
              <th>
                Ações
              </th>
            </thead>
            <tbody>
              <!-- <tr>
                <td>
                  Atlanta
                </td>
                <td>
                  -
                </td>
                <td>
                  -
                </td>
                <td>
                  2020-06-20
                </td>
                <td>
                  -
                </td>
                <td>
                  <span>
                    Edit
                  </span>
                  <span>
                    Delete
                  </span>
                </td>
              </tr> -->
              <template v-for="c in countryList">
                <tr :key="c.id" class="group">
                  <td colspan="5">
                    {{ c.name }} ({{ c.iso.toUpperCase() }})
                  </td>
                  <td class="btnAction">
                    <button @click="editItem(c.id)">
                      Edit
                    </button>
                    <span>
                      Delete
                    </span>
                  </td>
                </tr>
                <template v-for="city in countryList.city">
                  <tr :key="c.id+'_'+city.id">
                    {{ city.name }}
                  </tr>
                </template>
              </template>
            </tbody>
          </table>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line node/no-deprecated-api
import { internalAPI } from '~/constants/'
import pageHeader from '~/components/common/page/pageHeader.vue'

export default {
  middleware: 'authenticated',

  components: {
    pageHeader
  },

  data () {
    return {
      countryList: []
    }
  },

  mounted () {
    this.getCountry(0)
  },

  methods: {
    // Get all Countries in Internal API to list on dropdown
    async getCountry ({ id }) {
      const countryId = this.id || '0' // '0' lists everything
      await this.$axios.$get(internalAPI.url + '/country/' + countryId + '?_embed=city').then((response) => {
        // eslint-disable-next-line no-console
        console.log(response)
        this.countryList = response
        // TODO: Send error messages to Alert Component
      })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Error: ' + error)
          // this.Alert.Message = error // TODO: Send error messages to Alert Component
          // this.Alert.Status = error // TODO: Send error messages to Alert Component
        })
    },

    // eslint-disable-next-line require-await
    async editItem ({ id }) {
      const itemID = this.id || '' // Empty value lists everything
      // const countries = await this.$axios.$get(internalAPI.url + '/country/' + countryId + '?_embed=city')
      // eslint-disable-next-line no-console
      console.log(itemID)
      this.$router.push(`/config/edit/${itemID}`)
      // TODO: Send error messages to Alert Component
    }
  }
}
</script>

<style lang="scss" scoped>
// TODO: Move to Table component
table {
  width: 100%;
  border: 1px solid #ccc;

  thead th {
    border-bottom: 1px solid #ccc;
  }

  tbody {
    .group {
      background-color: #f2f2f2;
      font-weight: bold;
    }
  }

  .btnAction {
    > button {
      border: 1px solid #000;
    }
  }
}
</style>
