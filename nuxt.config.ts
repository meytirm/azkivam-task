// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@nuxt/image',
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: 'https://interview-api.azkivam.com/api/v1',
    },
  },
  compatibilityDate: '2025-07-15',
  typescript: {
    typeCheck: true,
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: false,
        quotes: 'single',
      },
    },
  },
})
