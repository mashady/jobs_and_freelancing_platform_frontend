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
                    <div class="col-lg-8">
                        <h1 class="freelancer-list-title mb-2">Find Freelancers</h1>
                        <p class="freelancer-list-subtitle">Browse skilled professionals for your projects.</p>

                        <div class="search-container mt-4">
                            <div class="row g-2">
                                <div class="col-md-4">
                                    <div class="search-input-wrapper">
                                        <input type="text" class="form-control"
                                            placeholder="Skills, job title, or keywords" v-model="searchQuery"
                                            @input="debouncedSearch">
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="location-input-wrapper">
                                        <select class="form-select" v-model="locationFilter"
                                            @change="searchFreelancers">
                                            <option value="">All Locations</option>
                                            <option value="Remote">Remote</option>
                                            <option value="Cairo">Cairo</option>
                                            <option value="Alexandria">Alexandria</option>
                                            <option value="Minya">Minya</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="category-input-wrapper">
                                        <select class="form-select" v-model="categoryFilter"
                                            @change="searchFreelancers">
                                            <option value="">All Categories</option>
                                            <option v-for="category in uniqueCategories" :key="category.id"
                                                :value="category.id">
                                                {{ category.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="rate-input-wrapper">
                                        <select class="form-select" v-model="rateFilter" @change="searchFreelancers">
                                            <option value="">All Rates</option>
                                            <option value="50">Under $50/hr</option>
                                            <option value="100">$50-$100/hr</option>
                                            <option value="101">Over $100/hr</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <button class="btn search-button text-white w-100" @click="searchFreelancers">
                                        Search
                                    </button>
                                </div>
                            </div>
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
                                {{ sortDropdownText }}
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
                    <div v-for="freelancer in paginatedFreelancers" :key="freelancer.user.id" class="col-lg-3 col-md-6">
                        <div class="card freelancer-card h-100" style="cursor: pointer"
                            @click="goToFreelancerDetails(freelancer.user.id)">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-start mb-3">
                                    <div class="freelancer-avatar"
                                        :style="{ backgroundColor: getRandomLogoBackground() }">
                                        <img v-if="freelancer.user?.profile_image"
                                            :src="getProfileImageUrl(freelancer.user.profile_image)" alt="Profile"
                                            class="img-fluid rounded-circle" @error="handleImageError">
                                        <span v-else class="freelancer-initial">{{ getUserInitial(freelancer.user?.name)
                                        }}</span>
                                    </div>
                                </div>

                                <div
                                    class="freelancer-name text-success mb-2 text-nowrap overflow-hidden text-truncate">
                                    {{ freelancer.user?.name || 'Unknown Freelancer' }}
                                </div>
                                <h5 class="freelancer-title mb-2">
                                    {{ freelancer.job_title || 'No job title specified' }}
                                </h5>
                                <div class="rate-range mb-3">
                                    ${{ formatRate(freelancer.min_hourly_rate) }} - ${{
                                        formatRate(freelancer.max_hourly_rate) }} / hour
                                </div>

                                <div class="freelancer-bio mb-3 text-muted small">
                                    {{ truncateBio(freelancer.bio) }}
                                </div>

                                <div class="freelancer-tags mb-2">
                                    <span class="freelancer-tag me-2">
                                        {{ freelancer.category?.name || 'No category' }}
                                    </span>
                                    <span v-for="(skill, index) in (freelancer.skills || []).slice(0, 3)" :key="index"
                                        class="freelancer-tag me-2">
                                        {{ skill.name || 'Skill' }}
                                    </span>
                                    <span v-if="(freelancer.skills?.length || 0) > 3" class="freelancer-tag">
                                        +{{ (freelancer.skills?.length || 0) - 3 }}
                                    </span>
                                </div>
                                <div class="freelancer-location">
                                    <i class="bi bi-geo-alt"></i> {{ freelancer.city || 'Location not specified' }}
                                </div>
                                <div class="freelancer-experience mt-2">
                                    <i class="bi bi-briefcase"></i> {{ freelancer.work_experiences?.length || 0 }} work
                                    experiences
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="paginatedFreelancers.length === 0 && !isLoading && !error" class="text-center py-5">
                    <p>No freelancers found matching your criteria. Try adjusting your search filters.</p>
                    <button class="btn btn-outline-secondary mt-3" @click="resetFilters">
                        Reset All Filters
                    </button>
                </div>

                <div v-if="filteredFreelancers.length > 0" class="d-flex justify-content-center mt-5">
                    <nav aria-label="Freelancer listings pagination">
                        <ul class="pagination">
                            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)"
                                    aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li v-for="page in visiblePages" :key="page" class="page-item"
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
import { debounce } from 'lodash-es';

const router = useRouter();

// State
const freelancers = ref([]);
const allFreelancers = ref([]);
const isLoading = ref(true);
const error = ref(null);
const currentPage = ref(1);
const itemsPerPage = ref(12);
const totalResults = ref(0);

// Filters
const searchQuery = ref('');
const locationFilter = ref('');
const categoryFilter = ref('');
const rateFilter = ref('');
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
    return Math.min(currentPage.value * itemsPerPage.value, filteredFreelancers.value.length);
});

const totalPages = computed(() => {
    return Math.ceil(filteredFreelancers.value.length / itemsPerPage.value);
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

const paginatedFreelancers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredFreelancers.value.slice(start, end);
});

const uniqueCategories = computed(() => {
    const categories = new Map();
    allFreelancers.value.forEach(freelancer => {
        if (freelancer.category) {
            categories.set(freelancer.category.id, freelancer.category);
        }
    });
    return Array.from(categories.values());
});

const filteredFreelancers = computed(() => {
    let result = [...allFreelancers.value];

    // Apply search query filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(freelancer => {
            const nameMatch = freelancer.user?.name?.toLowerCase().includes(query) || false;
            const titleMatch = freelancer.job_title?.toLowerCase().includes(query) || false;
            const bioMatch = freelancer.bio?.toLowerCase().includes(query) || false;
            const skillsMatch = freelancer.skills?.some(skill =>
                skill.name?.toLowerCase().includes(query)
            ) || false;

            return nameMatch || titleMatch || bioMatch || skillsMatch;
        });
    }

    // Apply location filter
    if (locationFilter.value) {
        result = result.filter(freelancer =>
            freelancer.city?.toLowerCase().includes(locationFilter.value.toLowerCase()) || false
        );
    }

    // Apply category filter
    if (categoryFilter.value) {
        result = result.filter(freelancer =>
            freelancer.category?.id == categoryFilter.value
        );
    }

    // Apply rate filter
    if (rateFilter.value) {
        const rateValue = parseInt(rateFilter.value);
        result = result.filter(freelancer => {
            const minRate = parseFloat(freelancer.min_hourly_rate) || 0;
            if (rateValue === 50) return minRate < 50;
            if (rateValue === 100) return minRate >= 50 && minRate <= 100;
            if (rateValue === 101) return minRate > 100;
            return true;
        });
    }

    // Apply sorting if any
    if (sortField.value) {
        result.sort((a, b) => {
            let comparison = 0;

            if (sortField.value === 'rate') {
                const rateA = parseFloat(a.min_hourly_rate) || 0;
                const rateB = parseFloat(b.min_hourly_rate) || 0;
                comparison = rateA - rateB;
            } else if (sortField.value === 'name') {
                comparison = (a.user?.name || '').localeCompare(b.user?.name || '');
            } else if (sortField.value === 'experience') {
                comparison = (a.work_experiences?.length || 0) - (b.work_experiences?.length || 0);
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
        'rate': 'Hourly Rate',
        'name': 'Name',
        'experience': 'Experience'
    };
    return `Sort by ${fieldNames[sortField.value]} ${direction}`;
});

// Methods
const fetchFreelancers = async () => {
    try {
        isLoading.value = true;
        error.value = null;
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://127.0.0.1:8000/api/freelancer-profiles', {
            headers: {
                Authorization: token ? `Bearer ${token}` : ''
            }
        });

        if (response.data?.data) {
            allFreelancers.value = response.data.data.map(freelancer => ({
                ...freelancer,
                isFavorite: false
            }));
            totalResults.value = response.data.data.length;
        } else {
            error.value = 'Invalid response format from server';
        }
    } catch (err) {
        error.value = err.response?.data?.message || 'Failed to load freelancers. Please try again.';
        console.error('Error fetching freelancers:', err);
    } finally {
        isLoading.value = false;
    }
};

const debouncedSearch = debounce(() => {
    currentPage.value = 1;
}, 500);

const searchFreelancers = () => {
    currentPage.value = 1;
};

const sortFreelancers = (field) => {
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
    categoryFilter.value = '';
    rateFilter.value = '';
    sortField.value = '';
    sortDirection.value = 'asc';
    currentPage.value = 1;
};

const goToFreelancerDetails = (freelancerId) => {
    router.push({ name: 'Freelancer Profile', params: { id: freelancerId } });
};

const getRandomLogoBackground = () => {
    const randomIndex = Math.floor(Math.random() * logoBackgrounds.length);
    return logoBackgrounds[randomIndex];
};

const getUserInitial = (name) => {
    return name?.charAt(0)?.toUpperCase() || '?';
};

const truncateBio = (bio) => {
    if (!bio) return 'No bio provided';
    return bio.length > 100 ? bio.substring(0, 100) + '...' : bio;
};

const formatRate = (rate) => {
    if (!rate) return '0';
    const num = parseFloat(rate);
    return isNaN(num) ? '0' : num.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
};

const getProfileImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:8000/storage/${path}`;
};

const handleImageError = (event) => {
    event.target.style.display = 'none';
    event.target.parentElement.querySelector('.freelancer-initial').style.display = 'block';
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
    border: none;
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
    position: relative;
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
    display: none;
}

.freelancer-name {
    font-size: 1rem;
    color: #28a745;
    font-weight: 600;
}

.freelancer-title {
    font-weight: 600;
    font-size: 1.1rem;
    min-height: 3rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.rate-range {
    color: #555;
    font-size: 0.9rem;
    font-weight: 500;
}

.freelancer-bio {
    min-height: 3rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.freelancer-tag {
    display: inline-block;
    padding: 4px 8px;
    background-color: #f5f5f5;
    border-radius: 4px;
    font-size: 0.75rem;
    color: #666;
    margin-bottom: 4px;
}

.freelancer-location,
.freelancer-experience {
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

    .freelancer-card {
        margin-bottom: 20px;
    }

    .freelancer-list-title {
        font-size: 1.5rem;
    }
}
</style>