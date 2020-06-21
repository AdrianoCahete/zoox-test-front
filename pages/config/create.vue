<template>
  <div class="content">
    <!-- Logged In -->
    <Navbar />
    <div v-if="$store.state.auth" class="page pageList">
      <section class="table">
        <h1>Criar</h1>
        <nuxt-link to="/config" class="btnAdd">
          Voltar
        </nuxt-link>
      </section>
    </div>

    <!-- Not logged in -->
    <div v-else>
      <p>Você não tem permissão para acessar esta página.</p>
      <NuxtLink to="/login">
        Clique aqui para fazer login
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="scss" scoped>
</style>
