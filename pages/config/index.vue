<template>
  <div class="content pageList">
    <!-- Logged In -->
    <div v-if="$store.state.auth" class="page">
      <section>
        <section class="table">
          <!-- TODO: Move to custom Components -->
          <section class="actionBar">
            <span class="title">List</span>
            <nuxt-link to="/config/create" class="button btnAdd">
              <Icon icon="add" />
              <span>Criar</span>
            </nuxt-link>
          </section>
          <table>
            <thead>
              <th>
                País/Cidade
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
              <th class="tableActions">
                Ações
              </th>
            </thead>
            <tbody>
              <template v-for="(c, i) in countryList">
                <tr :key="c.id" class="group">
                  <td colspan="5">
                    {{ c.name }} ({{ c.iso.toUpperCase() }})
                  </td>
                  <td class="tableActions">
                    <button title="Editar" @click="editItem(c.id)">
                      <Icon icon="edit" />
                    </button>
                    <button title="Remover" class="btnDestroy" @click="deleteItem(c.id)">
                      <Icon icon="remove" />
                    </button>
                  </td>
                </tr>
                <template v-for="city in countryList[i].city">
                  <tr :key="c.id+'_'+city.id" :data-test="city.id">
                    <td>
                      {{ city.name }}
                    </td>
                    <td>
                      {{ city.lat }}
                    </td>
                    <td>
                      {{ city.long }}
                    </td>
                    <td>
                      {{ $moment(city.date_created).format('YYYY-MM-DD @ HH:MM') }}
                    </td>
                    <td v-if="($moment(city.date_updated).isValid())">
                      {{ $moment(city.date_updated).format('YYYY-MM-DD @ HH:MM') || '-' }}
                    </td>
                    <td v-else>
                      -
                    </td>
                    <td class="tableActions">
                      <button title="Editar" @click="editItem(city.id)">
                        <Icon icon="edit" />
                      </button>
                      <button type="button" title="Remover" class="btnDestroy" @click="deleteItem(c.id)">
                        <Icon icon="remove" />
                      </button>
                    </td>
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
import Icon from '~/components/common/Icon.vue'

export default {
  middleware: 'authenticated',

  components: {
    Icon
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
      const itemID = this.id
      // const countries = await this.$axios.$get(internalAPI.url + '/country/' + countryId + '?_embed=city')
      // eslint-disable-next-line no-console
      console.log(itemID)
      this.$router.push(`/config/edit/${itemID}`)
      // TODO: Send error messages to Alert Component
    },

    // eslint-disable-next-line require-await
    async deleteItem ({ id }) {
      const itemID = this.id
      // const countries = await this.$axios.$get(internalAPI.url + '/country/' + countryId + '?_embed=city')
      // eslint-disable-next-line no-console
      console.log('Removendo Item: ' + itemID)
      // this.$router.push(`/config/edit/${itemID}`)
      // TODO: Send error messages to Alert Component
    }
  }
}
</script>

<style lang="scss" scoped>
// TODO: Move to Table component
.table {
  .actionBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f2f2f2;
    padding: 1rem;

    .title {
      font-weight: 500;
    }
  }
}

table {
  width: 100%;
  border: 1px solid #ccc;

  thead {
    th {
      padding: 1rem;
      border-bottom: 1px solid #ccc;
    }
  }

  tbody {
    tr {
      td {
        padding: 0 1rem;
      }

      &.group {
        background-color: #f2f2f2;
        font-weight: bold;
      }

      &:not(.group) {
        td:first-of-type {
          padding-left: 2rem;
        }
      }
    }
  }

  .tableActions {
    text-align: center;
  }
}
</style>
