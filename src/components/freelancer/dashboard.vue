<template>
  <div class="full-screen">
    <h2 class="title text-start mt-5 ms-5 py-4 fw-bolder">Dashboard</h2>
    <div class="container">
      <jobStatistics/>
      <div class="row mt-2">

      <chart style="width: 50%; height:400px;"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import jobStatistics from './job-statistics.vue';
import chart from './chart.vue';
</script>

<style scoped>
  .full-screen {
    width: 100vw;
    height: 100vh;
    background-color: #f0efec;
  }

  * {
    font-family: sans-serif;
  }
</style>