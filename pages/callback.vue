<template>
  <div>Processing authentication...</div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  // The server will handle the callback and redirect, so we just need to show a loading message
  setTimeout(() => {
    router.push("/"); // Redirect to home if the server callback hasn't redirected after 5 seconds
  }, 5000);
});
</script>
