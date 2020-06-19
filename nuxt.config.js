/* eslint-disable no-labels */

export default {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    titleTemplate: '%s @ Zoox Test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=2, user-scalable=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'author', content: 'Adriano Cahete' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      // { rel: 'preconnect', href: 'https://in.hotjar.com' }
    ],
    htmlAttrs: {
      lang: 'pt-BR'
    }
  },

  manifest: {
    name: 'Zoox Test',
    short_name: 'Adriano Cahete',
    description: '',
    theme_color: '#172b4d'
  },

  meta: {
    mobileAppIOS: true,
    appleStatusBarStyle: '#172b4d'
  },

  loading: { color: '#172b4d' },

  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },

  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  },

  css: [
  ],

  plugins: [
  ],

  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
    // '@nuxtjs/pwa'
    // {
    //   icon: false,
    //   meta: false
    // }
  ],

  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa'
  ],

  router: {
    middleware: ['auth']
  },

  axios: {
    baseURL: 'http://localhost:3001',
    credentials: true
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/logout',
      callback: '/login',
      home: '/dashboard'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: false
          },
          logout: {
            url: '/logout',
            method: 'post'
          },
          user: {
            url: '/profile',
            method: 'get',
            propertyName: 'user'
          }
        },
        responseType: 'accessToken',
        grantType: 'accessToken'
        // tokenRequired: true,
        // tokenType: 'bearer'
      },
      github: {
        client_id: 'c73a4b3d0d621614e2a5',
        client_secret: 'f65a2778ca3f000333dbc24f9e0607daaeeb2f96'
      }
    }
  },

  pwa: {
    // workbox: {
    //   // Offline
    //   offline: true,
    //   offlineStrategy: 'NetworkFirst'
    // },
    manifest: {
      display: 'browser'
    }
  },

  build: {
    extend (config, ctx) {
    }
  }
}
