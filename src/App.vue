<script setup>
import { ref } from 'vue'
import JobList from './components/JobList.vue'
import JobDetails from './components/JobDetails.vue'
import FreelancerProfile from './components/FreelancerProfile.vue'
import EmployerProfile from './components/EmployerProfile.vue'

const selectedJob = ref(null)
const currentPage = ref('profile') // الصفحة الافتراضية
</script>

<template>
  <div style="padding: 20px;">
    <!-- أزرار التنقل بين الصفحات -->
    <div style="margin-bottom: 20px;">
      <button 
        @click="currentPage = 'profile'" 
        style="margin-right: 10px; padding: 10px 20px; background-color: #10b981; color: white; border: none; border-radius: 8px;">
        Freelancer Profile
      </button>
      <button 
        @click="currentPage = 'jobs'" 
        style="padding: 10px 20px; background-color: #3b82f6; color: white; border: none; border-radius: 8px;">
        Job List
      </button>
    </div>

    <!-- عرض الصفحة حسب القيمة الحالية -->
    <FreelancerProfile v-if="currentPage === 'profile'" />

    <div v-else>
      <JobList 
        v-if="!selectedJob" 
        @view-job="selectedJob = $event" 
      />
      <JobDetails 
        v-else 
        :job="selectedJob" 
        @back="selectedJob = null" 
      />
    </div>
  </div>

  <!-- شعارات Vite و Vue -->
  <div style="text-align: center; margin-top: 40px;">
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
