<template>
  <div class="content">
    <!-- Logged In -->
    <Navbar />
    <div v-if="$store.state.auth">
      <section>
        Config
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
// import Logo from '~/components/Logo.vue'
import Navbar from '~/components/common/navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style>
</style>
