<template>
  <div class="container px-4">
    <myProfile/>
    <media/>
    <education/>
  </div>
</template>

<script setup>
  import myProfile from './my-profile.vue';
  import media from './media.vue';
  import education from './education.vue';


</script>

<style scoped>
  * {
    font-family: sans-serif;
  }
  body{
    background-color: aqua;
  }

</style>