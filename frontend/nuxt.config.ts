// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    'vuetify-nuxt-module',
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'http://127.0.0.1:8000/',
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  pages: true,
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.ts',
      },
      {
        code: 'ru',
        file: 'ru-RU.ts',
      },
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'ru',
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    },
  },
  devServer: {
    host: 'app.test',
    port: 3000,
  },
})
