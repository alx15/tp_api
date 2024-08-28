export default defineNuxtConfig({
  nitro: {
    routeRules: {
      "/api/**": { cors: true },
    },
  },

  runtimeConfig: {
    clientSecret: process.env.CLIENT_SECRET,
    public: {
      clientId: process.env.CLIENT_ID,
      appUrl: process.env.APP_URL || 'http://localhost:3000',
    },
  },

  compatibilityDate: "2024-08-28",
});