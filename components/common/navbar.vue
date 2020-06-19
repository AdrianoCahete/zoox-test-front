<template>
  <section :class="$device.isMobile ? 'navbar navbarMobile' : 'navbar'">
    <nav v-if="$store.state.auth" id="nav" class="menu">
      <nuxt-link to="/">
        Home
      </nuxt-link>
      <nuxt-link to="/config">
        Config
      </nuxt-link>
      <!-- <nuxt-link v-if="isDevMode" to="/debug">
        Test
      </nuxt-link> -->
    </nav>
    <section :class="$store.state.auth ? 'brand' : 'brand notLogged'">
      Logo
    </section>
    <section v-if="$store.state.auth" class="userInfo">
      <!-- <userAvatar user-name="Username" /> -->
      <span>Username</span>
      <nuxt-link to="/" @click.native="logoutUser">
        Sair
      </nuxt-link>
    </section>
  </section>
</template>

<script>
// import userAvatar from '~/components/common/userAvatar.vue'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  components: {
    // userAvatar
  },
  data () {
    return {
      isDevMode: process.env.NODE_ENV === 'development'
    }
  },
  methods: {
    logoutUser () {
      Cookie.remove('auth')
      this.$store.commit('setAuth', null)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  top: 0;
  padding: 1rem;
  border-bottom: 1px solid #ccc;

  .userInfo {
    margin-left: auto;
  }

  .brand {
    margin-left: auto;

    &.notLogged {
      margin-right: auto;
    }
  }
}

// // Small Desktop
// @media (max-width: 1024px) {
//   .navbar {
//   }
// }

// // Tablet
// @media (max-width: 670px) {
//   .navbar {

//   }
// }

// // Phone
// @media (max-width: 390px) {
//   .navbar {
//   }
// }
</style>
