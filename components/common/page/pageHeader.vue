<template>
  <section class="pageHeader">
    <h1>{{ title }}</h1>
    <nuxt-link v-if="backLink" :to="backLink" class="btnBack">
      Voltar
    </nuxt-link>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },
    backLink: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  svg {
    width: 2rem;
    height: 2rem;
    fill: inherit;

    &:hover {
      fill: inherit;
    }
  }
</style>
