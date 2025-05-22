<template>
  <div class="row gap-5 justify-content-start">
    <div class="card p-2" style="width: 16rem;">
      <div class="card-body text-start">
        <div class="service-card">
          <div class="card-content">
            <div class="card-title">Total Job Postings</div>
            <div class="card-value">{{ totalJobPostings }}</div>
          </div>
          <div class="card-icon">
            <i class="bi bi-briefcase-fill"></i> </div>
        </div>
      </div>
    </div>

    <div class="card p-2" style="width: 16rem;">
      <div class="card-body text-start">
        <div class="service-card">
          <div class="card-content">
            <div class="card-title">Active Postings</div>
            <div class="card-value">{{ activeJobPostings }}</div>
          </div>
          <div class="card-icon">
            <i class="bi bi-journal-check"></i> </div>
        </div>
      </div>
    </div>

    <div class="card p-2" style="width: 16rem;">
      <div class="card-body text-start">
        <div class="service-card">
          <div class="card-content">
            <div class="card-title">Inactive Postings</div>
            <div class="card-value">{{ inactiveJobPostings }}</div>
          </div>
          <div class="card-icon">
            <i class="bi bi-journal-x"></i> </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  jobs: [],
});

const totalJobPostings = computed(() => {
  return props.jobs.length;
});

const activeJobPostings = computed(() => {
  return props.jobs.filter(job => job.is_active).length;

});

const inactiveJobPostings = computed(() => {
  return props.jobs.filter(job => !job.is_active).length;

});



</script>

<style scoped>
.service-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.card-icon {
  margin-left: 16px;
  padding: 5px 10px;
  background-color: #E8F5E9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4CAF50; 
  font-size: 1.2rem; 
}

.card-icon svg {
  width: 1em;
  height: 1em;
}

.card-content {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 14px;
  margin-bottom: 4px;
}

.card-value {
  font-size: 24px;
  font-weight: bolder;
  color: #2E7D32;
}
</style>