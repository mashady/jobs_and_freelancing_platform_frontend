<template>
  <div class="row gap-5 justify-content-center"> <div class="card p-2" style="width: 16rem;">
      <div class="card-body text-start">
        <div class="service-card">
          <div class="card-content">
            <div class="card-title">Applied Jobs</div>
            <div class="card-value">{{ totalApplications }}</div>
          </div>
          <div class="card-icon">
            <i class="bi bi-file-earmark-check-fill"></i> </div>
        </div>
      </div>
    </div>

    <div class="card p-2" style="width: 16rem;">
      <div class="card-body text-start">
        <div class="service-card">
          <div class="card-content">
            <div class="card-title">Accepted Jobs</div>
            <div class="card-value">{{ acceptedApplications }}</div>
          </div>
          <div class="card-icon">
            <i class="bi bi-check-circle-fill"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="card p-2" style="width: 16rem;">
      <div class="card-body text-start">
        <div class="service-card">
          <div class="card-content">
            <div class="card-title">Pending Jobs</div>
            <div class="card-value">{{ pendingApplications }}</div>
          </div>
          <div class="card-icon">
            <i class="bi bi-hourglass-split"></i> </div>
        </div>
      </div>
    </div>

    <div class="card p-2" style="width: 16rem;">
      <div class="card-body text-start">
        <div class="service-card">
          <div class="card-content">
            <div class="card-title">Rejected Jobs</div>
            <div class="card-value">{{ rejectedApplications }}</div>
          </div>
          <div class="card-icon">
            <i class="bi bi-x-circle-fill"></i> </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  applications: {
    type: Array,
    default: () => [],
  },
});

const totalApplications = computed(() => {
  return props.applications.length;
});

const acceptedApplications = computed(() => {
  return props.applications.filter(app => app.status === 'accepted').length;
});

const pendingApplications = computed(() => {
  return props.applications.filter(app => app.status === 'pending').length;
});

const rejectedApplications = computed(() => {
  return props.applications.filter(app => app.status === 'rejected').length;
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