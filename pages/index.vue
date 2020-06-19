<template>
  <div class="container">
    <!-- Logged In -->
    <Navbar />
    <div v-if="$store.state.auth">
      <p>
        You are authenticated.
      </p>
    </div>

    <!-- Not logged in -->
    <p v-else>
      Please
      <NuxtLink to="/login">
        login
      </NuxtLink>.
    </p>
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
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
}
</style>
