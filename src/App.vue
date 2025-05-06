<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/shared/Navbar.vue';
import job from '../src/jobs/ProjectsList.vue';
</script>

<template>
  <div>
    <job />
    <RouterView />

  </div>
</template>

<style scoped>

</style>

