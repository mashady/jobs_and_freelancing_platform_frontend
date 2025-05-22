<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/shared/Navbar.vue';
import Footer from '@/shared/Footer.vue';
// import use route
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
const route = useRoute();
</script>

<template>
  <div>
    <Navbar />
    <main class="" style="
      min-height: 80vh;
    ">
      <RouterView />
    </main>
    <Footer
      v-if="!$route.path.startsWith('/freelancer') && !$route.path.startsWith('/admin') && !$route.path.startsWith('/employer')" />
  </div>
</template>

<style scoped></style>
