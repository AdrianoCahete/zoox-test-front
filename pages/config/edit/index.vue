<template>
  <div class="content pageList">
    <!-- Logged In -->
    <div v-if="$store.state.auth" class="page">
      <pageHeader title="Edit" back-link="/config" />
    </div>
  </div>
</template>

<script>
import pageHeader from '~/components/common/page/pageHeader.vue'

export default {
  middleware: 'authenticated',

  components: {
    pageHeader
  },

  mounted () {
    // eslint-disable-next-line no-console
    console.log(this.$router.currentRoute.query.id)
  }
}
</script>

<style lang="scss" scoped>
</style>
