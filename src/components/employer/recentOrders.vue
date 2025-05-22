<template>
  <div class="row bg-white rounded rounded-1 p-3 m-3 ms-0">
    <h3 class="mb-3">Recent Job Postings</h3>
    <div v-if="jobs.length === 0" class="alert alert-info" role="alert">
      You haven't posted any jobs yet.
    </div>
    <div v-else>
      <table class="table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Type</th>
            <th>Status</th>
            <th>Posted Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="job in jobs" :key="job.id">
            <td class="py-3">
              <div>
                {{ job.position_name }}
              </div>
              <ul class="text-muted" style="font-size: 15px; list-style: none; padding-left: 0; margin-bottom: 0;"> 
                <li>
                  {{ truncateText(job.job_description, 70) }}
                </li>
              </ul>
              <div class="text-muted" style="font-size: 14px;">
                <span class="me-3"><i class="bi bi-hash"></i> ID: {{ job.id }}</span>
                <span><i class="bi bi-tags"></i> Category: {{ job.category?.name || 'N/A' }}</span>
              </div>
            </td>
            <td class="py-3">{{ job.location }}</td>
            <td class="py-3">${{ parseFloat(job.offered_salary).toLocaleString() }}</td>
            <td class="py-3">{{ job.type.charAt(0).toUpperCase() + job.type.slice(1) }}</td>
            <td class="py-3">
              <span
                class="p-2 rounded-1"
                :class="{
                  'text-success bg-success-subtle': job.status === 'open' || job.is_active,
                  'text-danger bg-danger-subtle': job.status === 'closed' || !job.is_active
                }"
              >
                {{ job.status ? (job.status.charAt(0).toUpperCase() + job.status.slice(1)) : (job.is_active ? 'Active' : 'Inactive') }}
              </span>
            </td>
            <td class="py-3">
              {{ formatDate(job.created_at) }}
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
  jobs: { // Expecting 'jobs' array as prop
    type: Array,
    default: () => [],
  },
});

// Helper function to truncate text (reused from previous versions)
const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

// Helper function to format date (reused from previous versions)
const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
/* Keeping your existing styles for consistency */
td ul {
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
}

.table {
  width: 100%;
}
</style>