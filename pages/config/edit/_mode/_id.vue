<template>
  <div class="content contentList">
    <!-- Logged In -->
    <div v-if="$store.state.auth" class="page">
      <pageHeader title="Edit" back-link="/config" />
      Id: {{ this.$route.params.id }} {{ this.$route.params.mode }}
      <section>
        <li v-for="item in items" :key="item.id" class="item">
          {{ item.name }}
        </li>
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
    this.fillForm(this.$route.params.id, this.$route.params.mode)
  },

  data () {
    return {
      id: this.$route.params.id,
      mode: this.$route.params.mode
    }
  },

  mounted () {
  },

  methods: {
    async fillForm (id, mode) {
      const { data } = await this.$axios.$get(internalAPI.url + '/' + mode + '/' + id)
      // eslint-disable-next-line no-console
      // console.log(data)
      return { items: data }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
