<template>
  <section class="container">
    <section class="loginBox">
      <section>
        Logo
      </section>
      <form method="post" @submit="fakeUserLogin">
        <section>
          <label for="email">Email</label>
          <input id="email" v-model="email" type="text" required>
        </section>
        <section>
          <label for="pass">Password</label>
          <input id="pass" v-model="password" type="password" required>
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

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  components: {

  },
  middleware: 'notAuthenticated',
  layout: 'portal',

  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    fakeUserLogin () {
      const auth = {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAem9veC5hZHJpYW5vY2FoZXRlLmRldiIsImlhdCI6MTU5MjUyNDk0MiwiZXhwIjoxNTkyNTI4NTQyLCJzdWIiOiIxIn0.Co9FlZGS0ULafcMob_oBOncdeDkTafAJ34MyWRrX6gM'
      }
      this.$store.commit('setAuth', auth)
      Cookie.set('auth', auth)
      this.$router.push('/')
    },

    async userLogin () {
      try {
        const response = await this.$axios.$post('/login', { email: this.data.login.email, password: this.data.login.password })
        // eslint-disable-next-line no-console
        console.log(response)
        this.$router.push(this.localePath({ name: 'dashboard' }))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        // this.$toast.error('Error!')
      }
    },

    async userLogout () {
      await this.$auth.logout()
      this.$store.commit('setAuth', null)
    }
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
