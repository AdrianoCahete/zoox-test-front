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
    name: process.env.npm_package_name,
    short_name: 'Adriano Cahete',
    description: '',
    theme_color: process.env.npm_package_primaryColor
  },

  meta: {
    mobileAppIOS: true,
    appleStatusBarStyle: process.env.npm_package_primaryColor
  },

  loading: { color: process.env.npm_package_primaryColor },

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

  moment: {
    defaultLocale: 'pt-br',
    locale: 'pt-br',
    defaultTimezone: 'America/Sao_Paulo'
  },

  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/device',
    // '@nuxtjs/pwa' // The 'request' argument must be string. Received type undefined
    '@nuxtjs/moment'
  ],

  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/auth',
    '@nuxtjs/pwa',
    'nuxt-vue-multiselect'
  ],

  // router: {
  //   middleware: ['auth']
  // },

  axios: {
    baseURL: 'http://localhost:3001' // Local API: http://localhost:3001
    // credentials: true
  },

  // auth: {
  //   redirect: {
  //     login: '/login',
  //     logout: '/logout',
  //     callback: '/login',
  //     home: '/dashboard'
  //   },
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: {
  //           url: '/login',
  //           method: 'post',
  //           propertyName: false
  //         },
  //         logout: {
  //           url: '/logout',
  //           method: 'post'
  //         },
  //         user: {
  //           url: '/profile',
  //           method: 'get',
  //           propertyName: 'user'
  //         }
  //       },
  //       responseType: 'accessToken',
  //       grantType: 'accessToken'
  //       // tokenRequired: true,
  //       // tokenType: 'bearer'
  //     },
  //     github: {
  //       client_id: '',
  //       client_secret: ''
  //     }
  //   }
  // },

  pwa: {
    manifest: {
      display: 'browser'
    }
  },

  build: {
    extend (config, ctx) {
    }
  }
}
