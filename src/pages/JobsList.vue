<template>
  <div class="job-listing-page">
    <nav class="py-4 px-4">
      <div class="container">
        <div class="d-flex align-items-center">
          <a href="/" class="text-dark text-decoration-none">Home</a>
          <span class="mx-2">/</span>
          <span>Jobs Layout</span>
        </div>
      </div>
    </nav>

    <section class="job-hero-section py-5 mb-4">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <h1 class="job-list-title mb-2">Job List</h1>
            <p class="job-list-subtitle">All the Lorem Ipsum generators on the Internet tend to repeat.</p>

            <div class="search-container d-flex mt-4">
              <div class="search-input-wrapper flex-grow-1 me-2">
                <input type="text" class="form-control" placeholder="Job, title, skills, or company"
                  v-model="searchQuery">
              </div>
              <div class="location-input-wrapper me-2">
                <select class="form-select" v-model="locationFilter">
                  <option value="">City, state, or zip</option>
                  <option value="Remote">Remote</option>
                  <option value="Alex, Egypt">Alex, Egypt</option>
                </select>
              </div>
              <button class="btn search-button text-white" @click="searchJobs">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="job-listings-section pb-5">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="results-count">
            Showing {{ startCount }} - {{ endCount }} of {{ totalResults }} results
          </div>
          <div class="d-flex">
            <!-- <button class="btn btn-outline-secondary me-2">
              <i class="bi bi-funnel"></i> Filter
            </button> -->
            <div class="dropdown">
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="sortDropdown"
                data-bs-toggle="dropdown" aria-expanded="false">
                Sort by (Default)
              </button>
              <ul class="dropdown-menu" aria-labelledby="sortDropdown">
                <li><a class="dropdown-item" href="#" @click.prevent="sortJobs('salary')">Salary</a></li>
                <li><a class="dropdown-item" href="#" @click.prevent="sortJobs('title')">Title</a></li>
                <li><a class="dropdown-item" href="#" @click.prevent="sortJobs('experience')">Experience</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div v-if="isLoading" class="text-center py-5">
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <div v-else-if="error" class="alert alert-danger" role="alert">
          {{ error }}
        </div>

        <div v-else class="row g-4">
          <div v-for="job in jobs" :key="job.id" class="col-lg-3 col-md-6">
            <div class="card job-card h-100" style="cursor: pointer" @click="goToJobDetails(job.id)">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <div class="company-logo" :style="{ backgroundColor: getRandomLogoBackground() }">
                    <span class="company-initial">{{ getCompanyInitial(job.employer_id) }}</span>
                  </div>
                  <button class="btn btn-favorite" @click.stop="toggleFavorite(job.id)">
                    <i class="bi" :class="job.isFavorite ? 'bi-heart-fill' : 'bi-heart'"></i>
                  </button>
                </div>

                <div class="company-name text-success mb-2"> {{ job.employer.company_name }}</div>
                <h5 class="job-title mb-2">{{ job.position_name }}</h5>
                <div class="salary-range mb-3">${{ formatSalary(job.offered_salary) }} / year</div>

                <div class="job-tags mb-2">
                  <span class="job-tag me-2">{{ job.type }}</span>
                  <span class="job-tag me-2">{{ job.status }}</span>
                  <span v-for="(skill, index) in job.skills" :key="index" class="job-tag me-2">{{ skill.name }}</span>
                </div>
                <div class="job-location">{{ job.location }}</div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="jobs.length === 0 && !isLoading && !error" class="text-center py-5">
          <p>No jobs found matching your criteria. Try adjusting your search.</p>
        </div>

        <div v-if="jobs.length > 0" class="d-flex justify-content-center mt-5">
          <nav aria-label="Job listings pagination">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();

const goToJobDetails = (jobId) => {
  router.push({ name: 'Job Details', params: { id: jobId } });
};

const jobs = ref([]);
const isLoading = ref(true);
const error = ref(null);
const currentPage = ref(1);
const itemsPerPage = ref(12);
const totalResults = ref(0);
const searchQuery = ref('');
const locationFilter = ref('');

const logoBackgrounds = [
  '#e6f7e6', '#fff5e6', '#e6f7ff', '#f5e6ff', '#ffe6e6',
  '#e6ffe6', '#ffe6f5', '#e6f7ff', '#f8e6ff', '#ffece6'
];

const startCount = computed(() => {
  return ((currentPage.value - 1) * itemsPerPage.value) + 1;
});

const endCount = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, totalResults.value);
});

const totalPages = computed(() => {
  return Math.ceil(totalResults.value / itemsPerPage.value);
});

const fetchJobs = async () => {
  try {
    isLoading.value = true;
    const token = localStorage.getItem('authToken');
    const response = await axios.get('http://127.0.0.1:8000/api/jobs', {
      params: {
        page: currentPage.value,
        limit: itemsPerPage.value,
        search: searchQuery.value,
        location: locationFilter.value
      },
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    });

    if (response.data && response.data.data) {
      jobs.value = response.data.data.map(job => ({
        ...job,
        isFavorite: false
      }));
      totalResults.value = response.data.data.length;
    } else {
      error.value = 'Invalid response format from server';
    }
    isLoading.value = false;
  } catch (err) {
    error.value = 'Failed to load jobs. Please try again.';
    isLoading.value = false;
    console.error('Error fetching jobs:', err);
  }
};

const getRandomLogoBackground = () => {
  const randomIndex = Math.floor(Math.random() * logoBackgrounds.length);
  return logoBackgrounds[randomIndex];
};

const getCompanyInitial = (employerId) => {
  const companyNames = {
    1: 'Acme Corp',
    2: 'TechGiant',
    3: 'DataSoft',
    4: 'WebWorks'
  };

  const companyName = companyNames[employerId] || `Company ${employerId}`;
  return companyName.charAt(0).toUpperCase();
};

const formatSalary = (salary) => {
  if (!salary) return 'Not specified';
  return parseFloat(salary).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};

const searchJobs = () => {
  currentPage.value = 1;
  fetchJobs();
};

const sortJobs = (sortBy) => {
  if (sortBy === 'salary') {
    jobs.value.sort((a, b) => parseFloat(a.offered_salary) - parseFloat(b.offered_salary));
  } else if (sortBy === 'title') {
    jobs.value.sort((a, b) => a.position_name.localeCompare(b.position_name));
  } else if (sortBy === 'experience') {
    jobs.value.sort((a, b) => a.experience_years - b.experience_years);
  }
};

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  fetchJobs();
};

const toggleFavorite = (jobId) => {
  const jobIndex = jobs.value.findIndex(job => job.id === jobId);
  if (jobIndex !== -1) {
    // Toggle favorite status
    jobs.value[jobIndex].isFavorite = !jobs.value[jobIndex].isFavorite;

    // In a real app, you might want to send this to your API
    // axios.post(`/api/jobs/${jobId}/favorite`, {
    //   isFavorite: jobs.value[jobIndex].isFavorite
    // });
  }
};

onMounted(() => {
  fetchJobs();
});
</script>

<style scoped>
.job-hero-section {
  background-color: #fff1ec;
  position: relative;
  overflow: hidden;
}

.job-hero-section::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100px;
  background-color: #ffd48a;
  z-index: 0;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
}

.job-list-title {
  font-size: 2rem;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

.job-list-subtitle {
  color: #666;
  position: relative;
  z-index: 1;
}

.search-button {
  background-color: #0d5c46;
  border-color: #0d5c46;
  min-width: 100px;
}

.job-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.job-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.company-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.company-initial {
  font-size: 1.5rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.6);
}

.company-name {
  font-size: 0.85rem;
  color: #28a745;
}

.job-title {
  font-weight: 600;
  font-size: 1.1rem;
}

.salary-range {
  color: #555;
  font-size: 0.9rem;
}

.job-tag {
  display: inline-block;
  padding: 4px 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #666;
}

.job-location {
  font-size: 0.85rem;
  color: #777;
}

.btn-favorite {
  background: none;
  border: none;
  color: #28a745;
  font-size: 1.25rem;
  padding: 0;
  line-height: 1;
}

.pagination .page-item.active .page-link {
  background-color: #0d5c46;
  border-color: #0d5c46;
}

.pagination .page-link {
  color: #0d5c46;
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
  }

  .search-input-wrapper,
  .location-input-wrapper {
    margin-bottom: 10px;
    width: 100%;
  }
}
</style>