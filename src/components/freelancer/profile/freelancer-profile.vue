<template>
  <div class="container px-4 mb-3">
    <myProfile/>
    <media/>
    <education/>
    <experience/>
    <skills/>
    <button class="btn greenbtn mt-4" style="height: 50px; width:175px">save profile</button>
  </div>
</template>

<script setup>
  import myProfile from './my-profile.vue';
  import media from './media.vue';
  import education from './education.vue';
  import experience from './experience.vue';
  import skills from './skills.vue';
</script>

<style scoped>
  * {
    font-family: sans-serif;
  }

  .greenbtn{
      border:1px solid transparent;
      background-color: #5bbb7b;
      color: white;
  }
  .greenbtn:hover{
      border: 1px #5bbb7b solid;
      background-color: white;
      color: #5bbb7b;
  }
</style>