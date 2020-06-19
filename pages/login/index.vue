<template>
  <section class="container">
    <section class="loginBox">
      <section>
        Logo
      </section>
      <form @submit="userLogin">
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

export default {
  components: {
    // Logo
  },

  layout: 'portal',

  data () {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async userLogin () {
      try {
        const response = await this.$auth.loginWith('local', { data: this.login })
        // eslint-disable-next-line no-console
        console.log(response)
        // this.$toast.success('Logged In!')
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
}

.loginBox {
  border: 1px solid #ccc;
}
</style>
