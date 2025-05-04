<template>
  <div style="padding: 20px">
    <h2>Available Jobs</h2>
    <ul>
      <li v-for="job in jobs" :key="job.id" style="margin-bottom: 10px;">
        <button @click="$emit('view-job', job)">
          {{ job.title }} - {{ job.location }}
        </button>
      </li>
    </ul>
    <!-- Add the new button to navigate to FreelancerProfile.vue -->
    <button @click="goToFreelancerProfile">Go to Freelancer Profile</button>
  </div>
</template>

<script setup>
const jobs = [
  {
    id: 1,
    title: "Product Designer",
    location: "New York",
    salary: "$120 - $150/week",
    experience: "2 years",
    description: "This is a sample job description for a product designer.",
    skills: [
      "3+ years of experience as a Product Designer",
      "Sketch / InVision / Framer X",
      "Agile experience",
      "Jira & Confluence",
    ],
    responsibilities: [
      "Be involved in every step of the design cycle.",
      "Work with teams to lead Product Design.",
      "Ensure designs reflect accurate specs.",
    ],
  }
]

const goToFreelancerProfile = () => {
  // Navigate to the FreelancerProfile.vue page
  window.location.href = '/FreelancerProfile'; // Update with the correct path
}
</script>
