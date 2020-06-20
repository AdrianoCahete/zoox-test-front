<template>
  <section :class="$nuxt.isOffline ? 'isOffline' : ''">
    <nuxt />
    <iconLibrary />
  </section>
</template>

<script>
import iconLibrary from '~/components/common/iconLibrary'

export default {
  components: {
    iconLibrary
  }
}
</script>

<style lang="scss">
  @import '~assets/styles/index.scss';
</style>
