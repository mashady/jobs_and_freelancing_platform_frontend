<template>
  <div class="full-screen">
    <h2 class="title text-start mt-3 ms-5 pb-4 fw-bolder">Dashboard</h2>
    <div class="container">
      <jobStatistics/>
      <div class="row mt-3">
        <!-- Chart Column - Takes full width on mobile/tablet, 7/12 on desktop -->
        <div class="col-12 col-md-8 col-lg-8 rounded rounded-2">
          <chart style="height:450px; width:100%"/>
        </div>
        
        <!-- Notifications Column - Takes full width on mobile/tablet, 5/12 on desktop -->
        <div class="col-12 col-md-4 col-lg-3 mt-3 mt-md-0 bg-white">
          <notifications/>
        </div>
      </div>
      <recentOrders class="mt-4" />
    </div>
  </div>
</template>

<script setup>
import jobStatistics from './job-statistics.vue';
import recentOrders from './recentOrders.vue';
import chart from './chart.vue';
import notifications from "./notifications.vue"
</script>

<style scoped>
  .full-screen {
    width: 100%;
    height: 100vh;
    background-color: #f0efec;
  }

  * {
    font-family: sans-serif;
  }
</style>