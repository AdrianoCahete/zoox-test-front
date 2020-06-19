<template>
  <div class="container">
    <div v-if="$store.state.auth">
      <p>
        You are authenticated. You can see the
        <NuxtLink to="/secret">
          secret page
        </NuxtLink>!
      </p>
      <button @click="logoutUser">
        Logout
      </button>
    </div>

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

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  components: {
  },

  methods: {
    logoutUser () {
      Cookie.remove('auth')
      this.$store.commit('setAuth', null)
    }
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
