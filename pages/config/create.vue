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
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',

  components: {
  }
}
</script>

<style lang="scss" scoped>
</style>
