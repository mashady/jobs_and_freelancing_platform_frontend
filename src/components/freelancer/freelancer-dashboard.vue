<template>
  <div class="full-screen">
    <h2 class="title text-start mt-3 ms-5 pb-4 fw-bolder">Dashboard</h2>
    <div class="container">
      <div v-if="userApplications.length<1">
        <h2 class="alert alert-info fs-3">No Applied Jobs Yet!</h2>
      </div>
      <div v-else>

        <jobStatistics/>
        <div class="row mt-3">
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
  </div>
</template>

<script setup>
import jobStatistics from './job-statistics.vue';
import recentOrders from './recentOrders.vue';
import chart from './chart.vue';
import notifications from "./notifications.vue";
import { ref, onMounted } from 'vue';

const userApplications = ref([]);
const token = localStorage.getItem('authToken')
const fetchApplications = async ()=>{
  const response = await fetch('http://127.0.0.1:8000/api/job-applications',
    {
      headers:{
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    }
  )

  const res = await response.json()

  userApplications.value = res.data.data;


}

onMounted(() => {
  fetchApplications();
})

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