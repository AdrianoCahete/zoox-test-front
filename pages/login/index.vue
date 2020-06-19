<template>
  <section class="container">
    <p v-if="errors">
      <b>Erro</b>
    </p>
    <section class="loginBox">
      <section>
        Logo
      </section>
      <form method="post" @submit="userLogin">
        <section>
          <label for="email">Email</label>
          <input id="email" v-model="login.email" type="text">
        </section>
        <section>
          <label for="pass">Password</label>
          <input id="pass" v-model="login.password" type="password">
        </section>
        <button type="submit">
          Login
        </button>
      </form>
      <footer>
        <span>v0.1</span>
        <span>by Zoox</span>
      </footer>
    </section>
  </section>
</template>

<script>
// import Logo from '~/components/Logo.vue'

// const strategy = process.env.NODE_ENV ? 'local' : 'github'
// const strategy = 'local'

export default {
  components: {
    // Logo
  },

  layout: 'portal',

  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async userLogin () {
      try {
        const response = await this.$axios.$post('/login', { email: this.data.login.email, password: this.data.login.password }) // use 'local' for testing, 'github' for deploy -- TODO: Move to if based on ENV flag
        // eslint-disable-next-line no-console
        console.log(response)
        this.$router.push(this.localePath({ name: 'dashboard' }))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        // this.$toast.error('Error!')
      }
    },

    async userLogout () { await this.$auth.logout() }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
  font-size: 1.6rem;
}

.loginBox {
  border: 1px solid #ccc;
}
</style>
