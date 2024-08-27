<template>
  <OAuthLogin @auth-success="onAuthSuccess" />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import OAuthLogin from "../components/auth/OAuthLogin.vue";

const router = useRouter();

const onAuthSuccess = () => {
  router.push("/athlete");
};
</script>
