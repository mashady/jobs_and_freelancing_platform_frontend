<template>
    <div class="freelancer-listing-page">
        <nav class="py-4 px-4">
            <div class="container">
                <div class="d-flex align-items-center">
                    <a href="/" class="text-dark text-decoration-none">Home</a>
                    <span class="mx-2">/</span>
                    <span>Freelancers</span>
                </div>
            </div>
        </nav>

        <section class="freelancer-hero-section py-5 mb-4">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <h1 class="freelancer-list-title mb-2">Find Freelancers</h1>
                        <p class="freelancer-list-subtitle">Browse skilled professionals for your projects.</p>

                        <div class="search-container d-flex mt-4">
                            <div class="search-input-wrapper flex-grow-1 me-2">
                                <input type="text" class="form-control" placeholder="Skills, job title, or keywords"
                                    v-model="searchQuery">
                            </div>
                            <div class="location-input-wrapper me-2">
                                <select class="form-select" v-model="locationFilter">
                                    <option value="">Any location</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Alex, Egypt">Alex, Egypt</option>
                                </select>
                            </div>
                            <button class="btn search-button text-white" @click="searchFreelancers">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="freelancer-listings-section pb-5">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div class="results-count">
                        Showing {{ startCount }} - {{ endCount }} of {{ totalResults }} freelancers
                    </div>
                    <div class="d-flex">
                        <div class="dropdown">
                            <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="sortDropdown"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Sort by (Default)
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="sortDropdown">
                                <li><a class="dropdown-item" href="#" @click.prevent="sortFreelancers('rate')">Hourly
                                        Rate</a></li>
                                <li><a class="dropdown-item" href="#"
                                        @click.prevent="sortFreelancers('experience')">Experience</a></li>
                                <li><a class="dropdown-item" href="#" @click.prevent="sortFreelancers('name')">Name</a>
                                </li>
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
                    <div v-for="freelancer in freelancers" :key="freelancer.id" class="col-lg-3 col-md-6">
                        <div class="card freelancer-card h-100" style="cursor: pointer"
                            @click="goToFreelancerDetails(freelancer.id)">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-start mb-3">
                                    <div class="freelancer-avatar"
                                        :style="{ backgroundColor: getRandomLogoBackground() }">
                                        <img v-if="freelancer.user.profile_image"
                                            :src="'http://localhost:8000/storage/' + freelancer.user.profile_image"
                                            alt="Profile" class="img-fluid rounded-circle">
                                        <span v-else class="freelancer-initial">{{ getUserInitial(freelancer.user.name)
                                            }}</span>
                                    </div>
                                    <!--  <button class="btn btn-favorite" @click.stop="toggleFavorite(freelancer.id)">
                                        <i class="bi" :class="freelancer.isFavorite ? 'bi-heart-fill' : 'bi-heart'"></i>
                                    </button> -->
                                </div>

                                <div class="freelancer-name text-success mb-2">{{ freelancer.user.name }}</div>
                                <h5 class="freelancer-title mb-2">{{ freelancer.job_title }}</h5>
                                <div class="rate-range mb-3">${{ freelancer.min_hourly_rate }} - ${{
                                    freelancer.max_hourly_rate }} / hour</div>

                                <div class="freelancer-bio mb-3 text-muted small">
                                    {{ truncateBio(freelancer.bio) }}
                                </div>

                                <div class="freelancer-tags mb-2">
                                    <span class="freelancer-tag me-2">{{ freelancer.category.name }}</span>
                                    <span v-for="(skill, index) in freelancer.skills.slice(0, 3)" :key="index"
                                        class="freelancer-tag me-2">{{ skill.name }}</span>
                                    <span v-if="freelancer.skills.length > 3" class="freelancer-tag">+{{
                                        freelancer.skills.length - 3 }}</span>
                                </div>
                                <div class="freelancer-location">
                                    <i class="bi bi-geo-alt"></i> {{ freelancer.city || 'Location not specified' }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="freelancers.length === 0 && !isLoading && !error" class="text-center py-5">
                    <p>No freelancers found matching your criteria. Try adjusting your search.</p>
                </div>

                <div v-if="freelancers.length > 0" class="d-flex justify-content-center mt-5">
                    <nav aria-label="Freelancer listings pagination">
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

const goToFreelancerDetails = (freelancerId) => {
    router.push({ name: 'Freelancer Profile', params: { id: freelancerId } });
};

const freelancers = ref([]);
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

const fetchFreelancers = async () => {
    try {
        isLoading.value = true;
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://127.0.0.1:8000/api/freelancer-profiles', {
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
            freelancers.value = response.data.data.map(freelancer => ({
                ...freelancer,
                isFavorite: false
            }));
            totalResults.value = response.data.data.length;
        } else {
            error.value = 'Invalid response format from server';
        }
        isLoading.value = false;
    } catch (err) {
        error.value = 'Failed to load freelancers. Please try again.';
        isLoading.value = false;
        console.error('Error fetching freelancers:', err);
    }
};

const getRandomLogoBackground = () => {
    const randomIndex = Math.floor(Math.random() * logoBackgrounds.length);
    return logoBackgrounds[randomIndex];
};

const getUserInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
};

const truncateBio = (bio) => {
    if (!bio) return 'No bio provided';
    return bio.length > 100 ? bio.substring(0, 100) + '...' : bio;
};

const searchFreelancers = () => {
    currentPage.value = 1;
    fetchFreelancers();
};

const sortFreelancers = (sortBy) => {
    if (sortBy === 'rate') {
        freelancers.value.sort((a, b) => parseFloat(a.min_hourly_rate) - parseFloat(b.min_hourly_rate));
    } else if (sortBy === 'name') {
        freelancers.value.sort((a, b) => a.user.name.localeCompare(b.user.name));
    } else if (sortBy === 'experience') {
        freelancers.value.sort((a, b) => b.work_experiences.length - a.work_experiences.length);
    }
};

const goToPage = (page) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    fetchFreelancers();
};

const toggleFavorite = (freelancerId) => {
    const freelancerIndex = freelancers.value.findIndex(f => f.id === freelancerId);
    if (freelancerIndex !== -1) {
        freelancers.value[freelancerIndex].isFavorite = !freelancers.value[freelancerIndex].isFavorite;
    }
};

onMounted(() => {
    fetchFreelancers();
});
</script>

<style scoped>
.freelancer-hero-section {
    background-color: #fff1ec;
    position: relative;
    overflow: hidden;
}

.freelancer-hero-section::before {
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

.freelancer-list-title {
    font-size: 2rem;
    font-weight: 600;
    position: relative;
    z-index: 1;
}

.freelancer-list-subtitle {
    color: #666;
    position: relative;
    z-index: 1;
}

.search-button {
    background-color: #0d5c46;
    border-color: #0d5c46;
    min-width: 100px;
}

.freelancer-card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
}

.freelancer-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.freelancer-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.freelancer-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.freelancer-initial {
    font-size: 1.5rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.6);
}

.freelancer-name {
    font-size: 1rem;
    color: #28a745;
    font-weight: 600;
}

.freelancer-title {
    font-weight: 600;
    font-size: 1.1rem;
}

.rate-range {
    color: #555;
    font-size: 0.9rem;
}

.freelancer-tag {
    display: inline-block;
    padding: 4px 8px;
    background-color: #f5f5f5;
    border-radius: 4px;
    font-size: 0.75rem;
    color: #666;
}

.freelancer-location {
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
    color: #FFF
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