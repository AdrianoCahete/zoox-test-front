<template>
  <section class="content">
    <section class="loginBox">
      <section class="brand" title="Zoox Smart">
        <Brand />
      </section>
      <form method="post" @submit="fakeUserLogin">
        <section class="input-content">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="user@email.com"
            required
          >
        </section>
        <section class="input-content">
          <label for="pass">Senha</label>
          <input id="pass" v-model="password" type="password" placeholder="Senha" required>
        </section>
        <button type="submit" class="btnPrimary">
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
import Brand from '~/components/Logo.vue'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  components: {
    Brand
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
        const response = await this.$axios.$post('/portal', { email: this.data.login.email, password: this.data.login.password })
        // eslint-disable-next-line no-console
        console.log(response)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        // this.$toast.error('Error!')
      }
    },

    async userLogout () {
      await this.$auth.logout()
      this.$store.commit('setAuth', null)
      this.$router.push('/portal')
    }
  }
}
</script>

<style lang="scss" scoped>
.brand {
  height: 5rem;
}

.loginBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40vh;
  max-height: 70%;
  width: 300px;
  max-width: 100%;
  opacity: 0;
  animation: 2s fadeIn;
  animation-fill-mode: forwards;
  background-color: var(--bgColor);
  border: 1px solid #ccc; // TODO: Move to vars
  padding-top: 2rem; // TODO: Move to vars
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, .1);

  form {
    display: flex;
    flex-direction: column;
    padding: 0 2rem; // TODO: Get to vars

    > section {
      display: flex;
      flex-direction: column;
      text-align: left;
    }
  }
}
footer {
  display: flex;
  justify-content: space-between;
  margin: 1rem 2rem; // TODO: Get to vars
  font-size: 1.4rem;
}
</style>
