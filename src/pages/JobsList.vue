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
          <div class="col-lg-8">
            <h1 class="job-list-title mb-2">Job List</h1>
            <p class="job-list-subtitle">Find your dream job from our extensive listings.</p>

            <div class="search-container mt-4">
              <div class="row g-2">
                <div class="col-md-4">
                  <div class="search-input-wrapper">
                    <input type="text" class="form-control" placeholder="Job, title, skills, or company"
                      v-model="searchQuery" @input="debouncedSearch">
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="location-input-wrapper">
                    <select class="form-select" v-model="locationFilter" @change="searchJobs">
                      <option value="">All Locations</option>
                      <option value="Remote">Remote</option>
                      <option value="Cairo">Cairo</option>
                      <option value="Alexandria">Alexandria</option>
                      <option value="Giza">Giza</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="job-type-input-wrapper">
                    <select class="form-select" v-model="jobTypeFilter" @change="searchJobs">
                      <option value="">All Types</option>
                      <option value="fulltime">Full-time</option>
                      <option value="parttime">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="experience-input-wrapper">
                    <select class="form-select" v-model="experienceFilter" @change="searchJobs">
                      <option value="">All Experience</option>
                      <option value="1">Entry Level (0-2)</option>
                      <option value="3">Mid Level (3-5)</option>
                      <option value="6">Senior (6+)</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-2">
                  <button class="btn search-button text-white w-100" @click="searchJobs">
                    Search
                  </button>
                </div>
              </div>
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
            <div class="dropdown">
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="sortDropdown"
                data-bs-toggle="dropdown" aria-expanded="false">
                {{ sortDropdownText }}
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
          <div v-for="job in paginatedJobs" :key="job.id" class="col-lg-3 col-md-6">
            <div class="card job-card h-100" style="cursor: pointer" @click="goToJobDetails(job.id)">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <div class="company-logo" :style="{ backgroundColor: getRandomLogoBackground() }">
                    <span class="company-initial">{{ getCompanyInitial(job) }}</span>
                  </div>
                </div>

                <div class="company-name text-success mb-2">{{ job.employer?.company_name || 'Unknown Company' }}</div>
                <h5 class="job-title mb-2">{{ job.position_name || 'No Position Title' }}</h5>
                <div class="salary-range mb-3">${{ formatSalary(job.offered_salary) }} / year</div>

                <div class="job-tags mb-2">
                  <span class="job-tag me-2">{{ job.type || 'N/A' }}</span>
                  <span class="job-tag me-2">{{ job.status || 'N/A' }}</span>
                  <span v-for="(skill, index) in (job.skills || []).slice(0, 3)" :key="index" class="job-tag me-2">
                    {{ skill.name || 'Skill' }}
                  </span>
                  <span v-if="job.skills?.length > 3" class="job-tag">+{{ job.skills.length - 3 }}</span>
                </div>
                <div class="job-location">
                  <i class="bi bi-geo-alt"></i> {{ job.location || 'Location not specified' }}
                </div>
                <div class="job-experience mt-2">
                  <i class="bi bi-briefcase"></i> {{ job.experience_years || '0' }} years experience
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="paginatedJobs.length === 0 && !isLoading && !error" class="text-center py-5">
          <p>No jobs found matching your criteria. Try adjusting your search filters.</p>
          <button class="btn btn-outline-secondary mt-3" @click="resetFilters">
            Reset All Filters
          </button>
        </div>

        <div v-if="filteredJobs.length > 0" class="d-flex justify-content-center mt-5">
          <nav aria-label="Job listings pagination">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li v-for="page in visiblePages" :key="page" class="page-item" :class="{ active: currentPage === page }">
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
import { debounce } from 'lodash-es';

const router = useRouter();

// State
const jobs = ref([]);
const allJobs = ref([]);
const isLoading = ref(true);
const error = ref(null);
const currentPage = ref(1);
const itemsPerPage = ref(12);
const totalResults = ref(0);

// Filters
const searchQuery = ref('');
const locationFilter = ref('');
const jobTypeFilter = ref('');
const experienceFilter = ref('');
const sortField = ref('');
const sortDirection = ref('asc');

// Logo backgrounds
const logoBackgrounds = [
  '#e6f7e6', '#fff5e6', '#e6f7ff', '#f5e6ff', '#ffe6e6',
  '#e6ffe6', '#ffe6f5', '#e6f7ff', '#f8e6ff', '#ffece6'
];

// Computed properties
const startCount = computed(() => {
  return ((currentPage.value - 1) * itemsPerPage.value) + 1;
});

const endCount = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, filteredJobs.value.length);
});

const totalPages = computed(() => {
  return Math.ceil(filteredJobs.value.length / itemsPerPage.value);
});

const visiblePages = computed(() => {
  const maxVisible = 5;
  const pages = [];
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredJobs.value.slice(start, end);
});

const filteredJobs = computed(() => {
  let result = [...allJobs.value];

  // Apply search query filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(job => {
      const positionMatch = job.position_name?.toLowerCase().includes(query) || false;
      const companyMatch = job.employer?.company_name?.toLowerCase().includes(query) || false;
      const skillsMatch = job.skills?.some(skill =>
        skill.name?.toLowerCase().includes(query)
      ) || false;

      return positionMatch || companyMatch || skillsMatch;
    });
  }

  // Apply location filter
  if (locationFilter.value) {
    result = result.filter(job =>
      job.location?.toLowerCase().includes(locationFilter.value.toLowerCase()) || false
    );
  }

  // Apply job type filter
  if (jobTypeFilter.value) {
    result = result.filter(job =>
      job.type?.toLowerCase() === jobTypeFilter.value.toLowerCase()
    );
  }

  // Apply experience filter
  if (experienceFilter.value) {
    const minExp = parseInt(experienceFilter.value) || 0;
    result = result.filter(job =>
      (job.experience_years || 0) >= minExp
    );
  }

  // Apply sorting if any
  if (sortField.value) {
    result.sort((a, b) => {
      let comparison = 0;

      if (sortField.value === 'salary') {
        const salaryA = parseFloat(a.offered_salary) || 0;
        const salaryB = parseFloat(b.offered_salary) || 0;
        comparison = salaryA - salaryB;
      } else if (sortField.value === 'title') {
        comparison = (a.position_name || '').localeCompare(b.position_name || '');
      } else if (sortField.value === 'experience') {
        comparison = (a.experience_years || 0) - (b.experience_years || 0);
      }

      return sortDirection.value === 'asc' ? comparison : -comparison;
    });
  }

  totalResults.value = result.length;
  return result;
});

const sortDropdownText = computed(() => {
  if (!sortField.value) return 'Sort by (Default)';
  const direction = sortDirection.value === 'asc' ? '↑' : '↓';
  const fieldNames = {
    'salary': 'Salary',
    'title': 'Title',
    'experience': 'Experience'
  };
  return `Sort by ${fieldNames[sortField.value]} ${direction}`;
});

// Methods
const fetchJobs = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    const token = localStorage.getItem('authToken');
    const response = await axios.get('http://127.0.0.1:8000/api/jobs', {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    });

    if (response.data?.data) {
      allJobs.value = response.data.data.map(job => ({
        ...job,
        isFavorite: false
      }));
      totalResults.value = response.data.data.length;
    } else {
      error.value = 'Invalid response format from server';
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load jobs. Please try again.';
    console.error('Error fetching jobs:', err);
  } finally {
    isLoading.value = false;
  }
};

const debouncedSearch = debounce(() => {
  currentPage.value = 1;
}, 500);

const searchJobs = () => {
  currentPage.value = 1;
};

const sortJobs = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
};

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const resetFilters = () => {
  searchQuery.value = '';
  locationFilter.value = '';
  jobTypeFilter.value = '';
  experienceFilter.value = '';
  sortField.value = '';
  sortDirection.value = 'asc';
  currentPage.value = 1;
};

const goToJobDetails = (jobId) => {
  router.push({ name: 'Job Details', params: { id: jobId } });
};

const getRandomLogoBackground = () => {
  const randomIndex = Math.floor(Math.random() * logoBackgrounds.length);
  return logoBackgrounds[randomIndex];
};

const getCompanyInitial = (job) => {
  return job.employer?.company_name?.charAt(0)?.toUpperCase() || 'C';
};

const formatSalary = (salary) => {
  if (!salary) return 'Not specified';
  const num = parseFloat(salary);
  return isNaN(num) ? 'Not specified' : num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
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
  border: none;
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
  font-weight: 500;
}

.job-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
  min-height: 3rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.salary-range {
  color: #555;
  font-size: 0.9rem;
  font-weight: 500;
}

.job-tag {
  display: inline-block;
  padding: 4px 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 4px;
}

.job-location,
.job-experience {
  font-size: 0.85rem;
  color: #777;
  display: flex;
  align-items: center;
  gap: 5px;
}

.pagination .page-item.active .page-link {
  background-color: #0d5c46;
  border-color: #0d5c46;
  color: #fff;
}

.pagination .page-link {
  color: #0d5c46;
}

@media (max-width: 768px) {

  .search-container .col-md-2,
  .search-container .col-md-4 {
    margin-bottom: 10px;
  }

  .job-card {
    margin-bottom: 20px;
  }

  .job-list-title {
    font-size: 1.5rem;
  }
}
</style>