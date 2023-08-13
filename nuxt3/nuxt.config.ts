// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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