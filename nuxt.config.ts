// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    preset: 'firebase',
    replace: {
      [`functions.https.onRequest`]: `functions.region('asia-northeast1').https.onRequest`,
    }
  }
})
