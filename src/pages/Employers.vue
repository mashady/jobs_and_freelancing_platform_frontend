<template>
    <div class="employer-listing-page">
        <nav class="py-4 px-4">
            <div class="container">
                <div class="d-flex align-items-center">
                    <a href="/" class="text-dark text-decoration-none">Home</a>
                    <span class="mx-2">/</span>
                    <span>Employers</span>
                </div>
            </div>
        </nav>

        <section class="employer-hero-section py-5 mb-4">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <h1 class="employer-list-title mb-2">Find Employers</h1>
                        <p class="employer-list-subtitle">Browse companies looking for talent.</p>

                        <div class="search-container d-flex mt-4">
                            <div class="search-input-wrapper flex-grow-1 me-2">
                                <input type="text" class="form-control"
                                    placeholder="Company name, industry, or keywords" v-model="searchQuery">
                            </div>
                            <div class="location-input-wrapper me-2">
                                <select class="form-select" v-model="locationFilter">
                                    <option value="">Any location</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Alex, Egypt">Alex, Egypt</option>
                                </select>
                            </div>
                            <button class="btn search-button text-white" @click="searchEmployers">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="employer-listings-section pb-5">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div class="results-count">
                        Showing {{ startCount }} - {{ endCount }} of {{ totalResults }} employers
                    </div>
                    <div class="d-flex">
                        <div class="dropdown">
                            <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="sortDropdown"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Sort by (Default)
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="sortDropdown">
                                <li><a class="dropdown-item" href="#" @click.prevent="sortEmployers('name')">Company
                                        Name</a></li>
                                <li><a class="dropdown-item" href="#" @click.prevent="sortEmployers('jobs')">Job
                                        Listings</a></li>
                                <li><a class="dropdown-item" href="#"
                                        @click.prevent="sortEmployers('rating')">Rating</a></li>
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
                    <div v-for="employer in employers" :key="employer.id" class="col-lg-3 col-md-6">
                        <div class="card employer-card h-100" style="cursor: pointer"
                            @click="goToEmployerDetails(employer)">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-start mb-3">
                                    <div class="employer-logo" :style="{ backgroundColor: getRandomLogoBackground() }">
                                        <img v-if="employer.profile_image"
                                            :src="'http://localhost:8000/storage/' + employer.profile_image" alt="Logo"
                                            class="img-fluid rounded-circle">
                                        <span v-else class="employer-initial">{{
                                            getCompanyInitial(employer.company_name) }}</span>
                                    </div>
                                    <!-- <button class="btn btn-favorite" @click.stop="toggleFavorite(employer.id)">
                                        <i class="bi" :class="employer.isFavorite ? 'bi-heart-fill' : 'bi-heart'"></i>
                                    </button> -->
                                </div>

                                <div class="employer-name text-success mb-2">{{ employer.company_name }}</div>
                                <h5 class="employer-title mb-2">{{ employer.industry || 'Various Industries' }}</h5>
                                <div class="job-count mb-3">
                                    <i class="bi bi-briefcase"></i> {{ employer.jobs_count || 0 }} active jobs
                                </div>

                                <div class="employer-description mb-3 text-muted small">
                                    {{ truncateDescription(employer.description) }}
                                </div>

                                <div class="employer-tags mb-2">
                                    <span v-if="employer.company_size" class="employer-tag me-2">{{
                                        employer.company_size }}</span>
                                    <span v-if="employer.founded_year" class="employer-tag me-2">Est. {{
                                        employer.founded_year }}</span>
                                </div>
                                <div class="employer-location">
                                    <i class="bi bi-geo-alt"></i> {{ employer.location || 'Location not specified' }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="employers.length === 0 && !isLoading && !error" class="text-center py-5">
                    <p>No employers found matching your criteria. Try adjusting your search.</p>
                </div>

                <div v-if="employers.length > 0" class="d-flex justify-content-center mt-5">
                    <nav aria-label="Employer listings pagination">
                        <ul class="pagination">
                            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)"
                                    aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li v-for="page in totalPages" :key="page" class="page-item"
                                :class="{ active: currentPage === page }">
                                <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                            </li>
                            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)"
                                    aria-label="Next">
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

const goToEmployerDetails = (employer) => {
    router.push({
        name: 'Employer Profile',
        params: { id: employer.user_id }
    });
};

const employers = ref([]);
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

const fetchEmployers = async () => {
    try {
        isLoading.value = true;
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://127.0.0.1:8000/api/employer-profiles', {
            params: {
                page: currentPage.value,
                limit: itemsPerPage.value,
                search: searchQuery.value,
                location: locationFilter.value,
                include: 'user_id'
            },
            headers: {
                Authorization: token ? `Bearer ${token}` : ''
            }
        });

        if (response.data && response.data.data) {
            employers.value = response.data.data.map(employer => ({
                ...employer,
                user_id: employer.user_id,
                isFavorite: false
            }));
            totalResults.value = response.data.total || response.data.data.length;
        } else {
            error.value = 'Invalid response format from server';
        }
        isLoading.value = false;
    } catch (err) {
        error.value = 'Failed to load employers. Please try again.';
        isLoading.value = false;
        console.error('Error fetching employers:', err);
    }
};

const getRandomLogoBackground = () => {
    const randomIndex = Math.floor(Math.random() * logoBackgrounds.length);
    return logoBackgrounds[randomIndex];
};

const getCompanyInitial = (companyName) => {
    return companyName ? companyName.charAt(0).toUpperCase() : '?';
};

const truncateDescription = (description) => {
    if (!description) return 'No description provided';
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
};

const searchEmployers = () => {
    currentPage.value = 1;
    fetchEmployers();
};

const sortEmployers = (sortBy) => {
    if (sortBy === 'name') {
        employers.value.sort((a, b) => a.company_name.localeCompare(b.company_name));
    } else if (sortBy === 'jobs') {
        employers.value.sort((a, b) => (b.jobs_count || 0) - (a.jobs_count || 0));
    } else if (sortBy === 'rating') {
        employers.value.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
};

const goToPage = (page) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    fetchEmployers();
};

const toggleFavorite = (employerId) => {
    const employerIndex = employers.value.findIndex(e => e.id === employerId);
    if (employerIndex !== -1) {
        employers.value[employerIndex].isFavorite = !employers.value[employerIndex].isFavorite;
    }
};

onMounted(() => {
    fetchEmployers();
});
</script>

<style scoped>
.employer-hero-section {
    background-color: #fff1ec;
    position: relative;
    overflow: hidden;
}

.employer-hero-section::before {
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

.employer-list-title {
    font-size: 2rem;
    font-weight: 600;
    position: relative;
    z-index: 1;
}

.employer-list-subtitle {
    color: #666;
    position: relative;
    z-index: 1;
}

.search-button {
    background-color: #0d5c46;
    border-color: #0d5c46;
    min-width: 100px;
}

.employer-card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
}

.employer-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.employer-logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.employer-logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.employer-initial {
    font-size: 1.5rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.6);
}

.employer-name {
    font-size: 1rem;
    color: #28a745;
    font-weight: 600;
}

.employer-title {
    font-weight: 600;
    font-size: 1.1rem;
}

.job-count {
    color: #555;
    font-size: 0.9rem;
}

.employer-tag {
    display: inline-block;
    padding: 4px 8px;
    background-color: #f5f5f5;
    border-radius: 4px;
    font-size: 0.75rem;
    color: #666;
}

.employer-location {
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
    color: #fff
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