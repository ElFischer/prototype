    <!-- ./app.vue -->
<script setup>
/* import "@/assets/css/main.css"; */
/* const router = useRouter();
const session = useSession(); */
onMounted(() => {
  /* useSetSession(JSON.parse(localStorage.getItem("session")));
  router.beforeEach((to, from) => {
    if ((to.path === "/auth/register" || to.path === "/auth/sign-in") && session.value?.jwt) {
      return false;
    }
  }); */
});
</script>
<template>
  <NuxtLayout>
    <!-- Render page depending on route -->
    <NuxtPage />
  </NuxtLayout>
</template>