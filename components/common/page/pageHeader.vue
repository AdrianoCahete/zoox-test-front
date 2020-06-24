<template>
  <section class="pageHeader">
    <h1>{{ title }}</h1>
    <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
    <nuxt-link v-if="backLink" :to="backLink" class="btnBack">Voltar</nuxt-link>
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
  .pageHeader {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 2rem;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(228, 228, 228, .8); // TODO: Move to vars
    fill: inherit;

    .btnBack {
      &:before {
        display: inline-block;
        content: "<";
        margin-right: .5rem;
        text-decoration: none;
        transition: margin .3s ease-in-out;
      }

      &:hover {
        &:before {
          margin-right: 1rem;
          transition: margin .3s ease-in-out;
        }
      }
    }
  }
</style>
