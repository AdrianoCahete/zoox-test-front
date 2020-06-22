<template>
  <div class="content">
    <!-- Logged In -->
    <div v-if="$store.state.auth" class="page pageList">
      <section class="table">
        <h1>Criar</h1>
        <nuxt-link to="/config" class="btnAdd">
          Voltar
        </nuxt-link>
      </section>
    </div>

    <!-- Not logged in -->
    <section v-else>
      <goToLogin />
    </section>
  </div>
</template>

<script>
import goToLogin from '~/components/common/auth/goToLogin.vue'

export default {
  components: {
    goToLogin
  }
}
</script>

<style lang="scss" scoped>
</style>
