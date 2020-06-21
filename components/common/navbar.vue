<template>
  <section :class="$device.isMobile ? 'navbar navbarMobile' : 'navbar'">
    <nav v-if="$store.state.auth" id="nav" class="menu">
      <nuxt-link to="/" exact>
        Home
      </nuxt-link>
      <nuxt-link to="/config">
        Configuração <!-- TODO: Move to Icon (move to right side?) -->
      </nuxt-link>
      <!-- <nuxt-link v-if="isDevMode" to="/debug">
        Test
      </nuxt-link> -->
    </nav>
    <section :class="$store.state.auth ? 'brand' : 'brand notLogged'" title="Zoox">
      <Brand />
    </section>
    <section v-if="$store.state.auth" class="userInfo">
      <!-- <userAvatar user-name="Username" /> -->
      <nuxt-link to="/login" title="Sair" @click.native="logoutUser">
        <Icon icon="logout" />
      </nuxt-link>
    </section>
  </section>
</template>

<script>
// import userAvatar from '~/components/common/userAvatar.vue'
import Brand from '~/components/Logo.vue'
import Icon from '~/components/common/Icon.vue'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  components: {
    Brand,
    Icon
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
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/tools/functions.scss';

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  animation: fromUp2Down 1s ease-in;
  width: 100%;
  height: 6rem;
  top: 0;
  padding: 0 1rem;
  background-color: var(--navbarColor);
  border-bottom: var(--navbarBorder);

  .menu,
  .userInfo {
    display: flex;
    width: calc(50vw - 60px);
  }

  .menu,
  .userInfo {

    > a {
      padding: 1.8rem;
      text-decoration: none;
      border-bottom: 3px solid transparent;

      &:hover {
        background-color: var(--navItemBgHover);
        color: var(--navbarColor);
        @include transition();
      }
    }

    .nuxt-link-exact-active,
    .nuxt-link-active {
      color: var(--navItemActive);
      font-weight: bold;
      pointer-events: none;
      border-bottom-color: var(--navItemActive);
    }
  }

  .menu {
    justify-content: flex-start;
  }

  .userInfo {
    justify-content: flex-end;
    margin-left: auto;

    > a {
      display: flex;

      svg {
        fill: inherit;
      }

      &:hover {
        fill: currentColor;
      }
    }
  }

  .brand {
    margin-left: auto;
    height: 3rem;

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
