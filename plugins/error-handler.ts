export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // Handle the error
    console.error("Global error:", error, info);
    // You can also use Nuxt's error handling system
    const { $error } = useNuxtApp();
    $error({ statusCode: 500, statusMessage: error.message });
  };
});
