<template>
  <div class="full-screen">
    <h2 class="title text-start mt-3 ms-5 pb-4 fw-bolder">Dashboard</h2>
    <div class="container">
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading applications...</p>
      </div>

      <template v-else>
        <div v-if="userApplications.length < 1">
          <h2 class="alert alert-info fs-3">No Applied Jobs Yet!</h2>
        </div>
        <div v-else>
          <jobStatistics :applications="userApplications" />

          <recentOrders class="mt-4" :applications="userApplications" />
        </div>
      </template>
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
const token = localStorage.getItem('authToken');
const isLoading = ref(true); 

const fetchApplications = async () => {
  try {
    isLoading.value = true; 

    if (!token) {
      console.warn("No authentication token found. Cannot fetch job applications.");
      return;
    }

    const response = await fetch('http://127.0.0.1:8000/api/job-applications', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error(`HTTP error! Status: ${response.status}`, errorBody);
      if (response.status === 401) {
        localStorage.removeItem('authToken');

      }
      throw new Error(`Failed to fetch job applications: ${response.statusText}`);
    }

    const res = await response.json();
    userApplications.value = res.data.data;

  } catch (error) {
    console.error("Error fetching job applications:", error);
    // Optionally display a user-friendly error message
  } finally {
    isLoading.value = false; // Set loading to false after fetch completes (success or error)
  }
};

onMounted(() => {
  fetchApplications();
});
</script>

<style scoped>
.full-screen {
  width: 100%;
  min-height: 100vh; /* Use min-height for better content adaptability */
  background-color: #f0efec;
}

* {
  font-family: sans-serif;
}

/* Spinner styling (using Bootstrap classes, but you can define custom ones) */
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
  color: #007bff !important; /* Example Bootstrap primary color */
}
</style>