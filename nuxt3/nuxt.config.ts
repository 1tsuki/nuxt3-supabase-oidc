// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    }
  },
  nitro: {
    preset: 'firebase',
    replace: {
      [`functions.https.onRequest`]: `functions.region('asia-northeast1').https.onRequest`,
    },
    storage: {
      'redis': {
        driver: 'redis',
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST
      }
    }
  }
})
