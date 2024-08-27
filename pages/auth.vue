<template>
  <div>
    <h1>Authentication in progress...</h1>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  if (code) {
    try {
      const response = await $fetch("/api/auth/callback", {
        method: "GET",
        params: { code },
      });
      console.log("Auth response:", response);
      router.push("/athlete");
    } catch (error) {
      console.error("Auth error:", error);
    }
  } else {
    console.error("No authorization code found");
    router.push("/");
  }
});
</script>
