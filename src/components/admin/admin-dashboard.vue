<template>
  <div class="dashboard-container">
    <!-- Title -->
    <h1 class="dashboard-title">Platform Overview</h1>
    
    <!-- Stats Blocks -->
    <div class="stats-grid">
      <!-- Jobs Block -->
      <div class="stat-card jobs-card">
        <div class="stat-icon">
          <i class="bi bi-briefcase"></i>
        </div>
        <div class="stat-number">{{ formatNumber(jobCount) }}</div>
        <div class="stat-label">Active Jobs</div>
        <div class="stat-trend positive">
          <i class="bi bi-graph-up"></i>
          <span>12% increase</span>
        </div>
      </div>
      
      <!-- Employers Block -->
      <div class="stat-card employers-card">
        <div class="stat-icon">
          <i class="bi bi-building"></i>
        </div>
        <div class="stat-number">{{ formatNumber(employerCount) }}</div>
        <div class="stat-label">Registered Employers</div>
        <div class="stat-trend positive">
          <i class="bi bi-graph-up"></i>
          <span>5% increase</span>
        </div>
      </div>
      
      <!-- Freelancers Block -->
      <div class="stat-card freelancers-card">
        <div class="stat-icon">
          <i class="bi bi-people"></i>
        </div>
        <div class="stat-number">{{ formatNumber(freelancerCount) }}</div>
        <div class="stat-label">Active Freelancers</div>
        <div class="stat-trend positive">
          <i class="bi bi-graph-up"></i>
          <span>18% increase</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobCount: 1245,
      employerCount: 532,
      freelancerCount: 2876
    }
  },
  methods: {
    formatNumber(num) {
      return num.toLocaleString()
    }
  }
}
</script>

<style scoped>
/* Base Container */
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Title Styling */
.dashboard-title {
  font-size: 2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
}

/* Grid Layout */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Card Base Styling */
.stat-card {
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Card Hover Effect */
.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* Icon Styling */
.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

/* Number Styling */
.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

/* Label Styling */
.stat-label {
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 1rem;
  font-weight: 500;
}

/* Trend Indicator */
.stat-trend {
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stat-trend.positive {
  color: #38a169;
}

/* Individual Card Colors */
.jobs-card {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 1px solid #bae6fd;
}

.jobs-card .stat-icon {
  background-color: #bae6fd;
  color: #0369a1;
}

.employers-card {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: 1px solid #bbf7d0;
}

.employers-card .stat-icon {
  background-color: #bbf7d0;
  color: #15803d;
}

.freelancers-card {
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
  border: 1px solid #e9d5ff;
}

.freelancers-card .stat-icon {
  background-color: #e9d5ff;
  color: #7e22ce;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}
</style>