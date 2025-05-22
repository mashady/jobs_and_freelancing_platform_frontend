<template>
  <div class="full-screen">
    <h2 class="title text-start mt-3 ms-5 pb-4 fw-bolder">Dashboard</h2>
    <div class="container">
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading employer jobs...</p>
      </div>

      <template v-else>
        <div v-if="employerJobs.length < 1">
          <h2 class="alert alert-info fs-3">No Jobs Posted Yet!</h2>
        </div>
        <div v-else >
          <jobStatistics class="ms-2" :jobs="employerJobs" />
          <recentOrders class="mt-4" :jobs="employerJobs"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import jobStatistics from './job-statistics.vue'; 
import recentOrders from './recentOrders.vue';     

import { ref, onMounted } from 'vue';

const employerJobs = ref([]);
const token = localStorage.getItem('authToken');
const isLoading = ref(true); 


const employer_id = JSON.parse(localStorage.getItem('user'))?.employer_profile?.id;

const fetchEmployerJobs = async () => {
  try {
    isLoading.value = true;

    const response = await fetch('http://127.0.0.1:8000/api/myJobs', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error(`API Error: ${response.status} ${response.statusText}`, errorBody);

      if (response.status === 401) {
        localStorage.removeItem('authToken');

      }
      throw new Error(`Failed to fetch employer jobs: ${response.statusText}`);
    }

    const res = await response.json();

    employerJobs.value = res.data; 

    console.log("Fetched Employer Jobs:", employerJobs.value);

  } catch (error) {
    console.error("Error fetching employer jobs:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchEmployerJobs();
});
</script>

<style scoped>
.full-screen {
  width: 100%;
  min-height: 100vh;
  background-color: #f0efec;
}

* {
  font-family: sans-serif;
}

.text-center.py-5 {
  padding-top: 3rem !important;
  padding-bottom: 3rem !important;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
  border-width: 0.25em;
}

.spinner-border.text-primary {
  color: #007bff !important;
}
</style>