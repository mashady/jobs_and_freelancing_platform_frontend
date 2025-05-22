<template>
  <div class="row bg-white rounded rounded-1 p-3 m-3 ms-0">
    <h3 class="mb-3">Recent Job Applications</h3> <div v-if="applications.length === 0" class="alert alert-info" role="alert">
      You haven't applied for any jobs yet.
    </div>
    <div v-else>
      <table class="table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Offered Salary</th>
            <th>Status</th>
            <th>Application Date</th> 
          </tr>
        </thead>
        <tbody>
          <tr v-for="application in applications" :key="application.id">
            <td class="py-3">
              <div>
                {{ application.job.position_name }}
              </div>
              <ul class="text-muted" style="font-size: 15px; list-style: none; padding-left: 0;"> 
                <li>
                  {{ truncateText(application.job.job_description, 70) }}
                </li>
              </ul>
              <div class="text-muted" style="font-size: 14px;">
                <span class="me-3"><i class="bi bi-geo-alt"></i> {{ application.job.location }}</span>
                <span><i class="bi bi-person"></i> Employer ID: {{ application.job.employer_id }}</span>
              </div>
            </td>
            <td class="py-3">
              ${{ application.job.offered_salary }}
            </td>
            <td class="py-3">
              <span
                class="p-2 rounded-1"
                :class="{
                  'text-primary bg-primary-subtle': application.status === 'hired',
                  'text-success bg-success-subtle': application.status === 'accepted' || application.status === 'completed',
                  'text-warning bg-warning-subtle': application.status === 'pending',
                  'text-danger bg-danger-subtle': application.status === 'rejected'
                }"
              >
                {{ application.status.charAt(0).toUpperCase() + application.status.slice(1) }}
              </span>
            </td>
            <td class="py-3">
              {{ formatDate(application.created_at) }}
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  applications: {
    type: Array,
    default: () => [],
  },
});

// Helper function to truncate text for description display
const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
/* Ensure the list in the first column has no bullets and no left padding */
td ul {
  list-style: none;
  padding-left: 0;
  margin-bottom: 0; /* Remove default margin for list */
}

.table {
  width: 100%; /* Ensure table takes full width of its container */
}
/* Your existing styles (if any, copy them here if they were in a separate style block) */
</style>