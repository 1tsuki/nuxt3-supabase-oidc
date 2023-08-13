// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    supabaseJwtSecret: process.env.SUPABASE_JWT_SECRET,
    sessionCookieName: process.env.SESSION_COOKIE_NAME || '__session',
    sessionCookieSecret: process.env.SESSION_COOKIE_SECRET || 'secret',
    sessionExpires: parseInt(process.env.SESSION_EXPIRES || '60 * 15', 10),
    sessionIdPrefix: process.env.SESSION_ID_PREFIX || 'session:',
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
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
