<template>
  <div class="content contentList">
    <!-- Logged In -->
    <div v-if="$store.state.auth" class="page">
      <pageHeader title="Edit" back-link="/config" />
      <section>
        <p v-if="$fetchState.pending">
          Fetching data...
        </p>
        <p v-else-if="$fetchState.error">
          Error while fetching data: {{ $fetchState.error.message }}
        </p>
        <ul v-else>
          <li :key="items.id">
            {{ items }}
          </li>
        </ul>

        Id:{{ itemId }} ItemMode: {{ itemMode }}
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

  mounted () {
  },

  methods: {
    async fillForm () {
      const itemId = this.$route.params.id
      const modeType = this.$route.params.mode

      // eslint-disable-next-line no-console
      console.log(itemId, modeType)

      await this.$axios.$get(internalAPI.url + '/' + modeType + '/' + itemId).then((response) => {
        // eslint-disable-next-line no-console
        console.log(response)
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
