<template>
  <div class="content contentList">
    <!-- Logged In -->
    <div v-if="$store.state.auth" class="page">
      <pageHeader title="Edit" back-link="/config" />
      <section v-if="items">
        <p v-if="$fetchState.pending">
          Obtendo informação, aguarde...
        </p>
        <p v-else-if="$fetchState.error">
          Erro ao obter a informação: {{ $fetchState.error.message }}
        </p>
        <section v-else-if="this.$route.params.mode == 'country'">
          <section :key="items.id" class="cardHeader">
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
            <form>
              PAÍS!
            </form>
          </section>
        </section>
        <section v-else-if="this.$route.params.mode == 'city'">
          <section :key="items.id" class="cardHeader">
            <section>
              {{ items.name }}
            </section>
            <section>
              {{ items.lat }}
            </section>
            <section>
              {{ items.long }}
            </section>
            <section>
              {{ $moment(items.date_created).format('YYYY-MM-DD @ HH:MM') }}
            </section>
            <section v-if="($moment(items.date_updated).isValid())">
              {{ $moment(items.date_updated).format('YYYY-MM-DD @ HH:MM') || '-' }}
            </section>
          </section>
          <section>
            <form>
              CIDADE!
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
      items: []
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
