<template>
  <section>
    <!-- Not logged in -->
    <p>{{ message }}</p>
    <NuxtLink to="/portal">
      Clique aqui para fazer login
    </NuxtLink>
  </section>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
      default: 'Você não tem permissão para acessar esta página.'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
