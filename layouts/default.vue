<template>
  <section :class="$nuxt.isOffline ? 'isOffline' : ''">
    <Navbar />
    <nuxt />
    <iconLibrary />
  </section>
</template>

<script>
import Navbar from '~/components/common/navbar.vue'
import iconLibrary from '~/components/common/iconLibrary'

export default {
  components: {
    Navbar,
    iconLibrary
  }
}
</script>

<style lang="scss">
  @import '~assets/styles/index.scss';
</style>
