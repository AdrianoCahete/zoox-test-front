<template>
  <div class="content contentList">
    <!-- Logged In -->
    <div v-if="$store.state.auth" class="page">
      <section>
        <section class="table">
          <!-- TODO: Move to custom Components -->
          <section class="actionBar">
            <span class="title">Lista</span>
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
                    <button title="Editar" @click="editItem(c.id,'country')">
                      <Icon icon="edit" />
                    </button>
                    <button title="Remover" class="btnDestroy" @click="deleteItem(c.id,'country')">
                      <Icon icon="remove" />
                    </button>
                  </td>
                </tr>
                <template v-for="city in countryList[i].city">
                  <tr :key="c.id+'_'+city.id" :data-city="city.id">
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
                      <button title="Editar" @click="editItem(city.id,'city')">
                        <Icon icon="edit" />
                      </button>
                      <button type="button" title="Remover" class="btnDestroy" @click="deleteItem(city.id,'city')">
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
        this.countryList = response
      })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('Error: ' + error)
        })
    },

    // eslint-disable-next-line require-await
    async editItem (id, mode) {
      this.$router.push('/config/edit/' + mode + '/' + id, { params: { id, mode } })
    },

    // eslint-disable-next-line require-await
    async deleteItem (id, mode) {
      // const countries = await this.$axios.$get(internalAPI.url + '/country/' + countryId + '?_embed=city')
      // eslint-disable-next-line no-console
      console.log('Removendo: ' + id + ' ' + mode)
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
