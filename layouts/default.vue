<template>
  <section :class="$nuxt.isOffline ? 'isOffline' : ''">
    <!-- <Alert :message="Message" :status="Status" /> --> <!-- TODO: Move to layout master page -->
    <Navbar />
    <nuxt />
    <iconLibrary />
  </section>
</template>

<script>
import Navbar from '~/components/common/navbar.vue'
import iconLibrary from '~/components/common/iconLibrary'
// import Alert from '~/components/common/alert.vue'

export default {
  components: {
    Navbar,
    iconLibrary
    // Alert
  }
}
</script>

<style lang="scss">
  @import '~assets/styles/index.scss';
</style>
