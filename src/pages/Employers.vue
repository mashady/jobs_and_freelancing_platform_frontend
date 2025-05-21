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
                    <div class="col-lg-8">
                        <h1 class="employer-list-title mb-2">Find Employers</h1>
                        <p class="employer-list-subtitle">Browse companies looking for talent.</p>

                        <div class="search-container mt-4">
                            <div class="row g-2">
                                <div class="col-md-4">
                                    <div class="search-input-wrapper">
                                        <input type="text" class="form-control"
                                            placeholder="Company name, industry, or keywords" v-model="searchQuery"
                                            @input="debouncedSearch">
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="location-input-wrapper">
                                        <select class="form-select" v-model="locationFilter" @change="searchEmployers">
                                            <option value="">All Locations</option>
                                            <option value="Remote">Remote</option>
                                            <option value="Cairo">Cairo</option>
                                            <option value="Alexandria">Alexandria</option>
                                            <option value="New York">New York</option>
                                            <option value="London">London</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="category-input-wrapper">
                                        <select class="form-select" v-model="categoryFilter" @change="searchEmployers">
                                            <option value="">All Categories</option>
                                            <option v-for="category in uniqueCategories" :key="category.id"
                                                :value="category.id">
                                                {{ category.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="size-input-wrapper">
                                        <select class="form-select" v-model="sizeFilter" @change="searchEmployers">
                                            <option value="">All Sizes</option>
                                            <option value="1-10">1-10 employees</option>
                                            <option value="11-50">11-50 employees</option>
                                            <option value="51-200">51-200 employees</option>
                                            <option value="201+">201+ employees</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <button class="btn search-button text-white w-100" @click="searchEmployers">
                                        Search
                                    </button>
                                </div>
                            </div>
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
                                {{ sortDropdownText }}
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="sortDropdown">
                                <li><a class="dropdown-item" href="#" @click.prevent="sortEmployers('name')">Company
                                        Name</a></li>
                                <li><a class="dropdown-item" href="#" @click.prevent="sortEmployers('jobs')">Job
                                        Listings</a></li>
                                <li><a class="dropdown-item" href="#" @click.prevent="sortEmployers('size')">Company
                                        Size</a></li>
                                <li><a class="dropdown-item" href="#" @click.prevent="sortEmployers('founded')">Founded
                                        Year</a></li>
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
                    <div v-for="employer in paginatedEmployers" :key="employer.id" class="col-lg-3 col-md-6">
                        <div class="card employer-card h-100" style="cursor: pointer"
                            @click="goToEmployerDetails(employer)">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-start mb-3">
                                    <div class="employer-logo" :style="{ backgroundColor: getRandomLogoBackground() }">
                                        <img v-if="employer.user?.profile_image"
                                            :src="getProfileImageUrl(employer.user.profile_image)" alt="Logo"
                                            class="img-fluid rounded-circle" @error="handleImageError">
                                        <span v-else class="employer-initial">{{
                                            getCompanyInitial(employer.company_name) }}</span>
                                    </div>
                                </div>

                                <div class="employer-name text-success mb-2 text-nowrap overflow-hidden text-truncate">
                                    {{ employer.company_name || 'Unknown Company' }}
                                </div>
                                <h5 class="employer-title mb-2">
                                    {{ employer.category?.name || 'Various Industries' }}
                                </h5>
                                <div class="job-count mb-3">
                                    <i class="bi bi-briefcase"></i> {{ employer.jobs_count || 0 }} active jobs
                                </div>

                                <div class="employer-description mb-3 text-muted small">
                                    {{ truncateDescription(employer.company_description) }}
                                </div>

                                <div class="employer-tags mb-2">
                                    <span v-if="employer.employees_count" class="employer-tag me-2">
                                        {{ getCompanySize(employer.employees_count) }}
                                    </span>
                                    <span v-if="employer.founded_date" class="employer-tag me-2">
                                        Est. {{ getFoundedYear(employer.founded_date) }}
                                    </span>
                                </div>
                                <div class="employer-location">
                                    <i class="bi bi-geo-alt"></i> {{ employer.location || 'Location not specified' }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="paginatedEmployers.length === 0 && !isLoading && !error" class="text-center py-5">
                    <p>No employers found matching your criteria. Try adjusting your search filters.</p>
                    <button class="btn btn-outline-secondary mt-3" @click="resetFilters">
                        Reset All Filters
                    </button>
                </div>

                <div v-if="filteredEmployers.length > 0" class="d-flex justify-content-center mt-5">
                    <nav aria-label="Employer listings pagination">
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
const employers = ref([]);
const allEmployers = ref([]);
const isLoading = ref(true);
const error = ref(null);
const currentPage = ref(1);
const itemsPerPage = ref(12);
const totalResults = ref(0);

// Filters
const searchQuery = ref('');
const locationFilter = ref('');
const categoryFilter = ref('');
const sizeFilter = ref('');
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
    return Math.min(currentPage.value * itemsPerPage.value, filteredEmployers.value.length);
});

const totalPages = computed(() => {
    return Math.ceil(filteredEmployers.value.length / itemsPerPage.value);
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

const paginatedEmployers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredEmployers.value.slice(start, end);
});

const uniqueCategories = computed(() => {
    const categories = new Map();
    allEmployers.value.forEach(employer => {
        if (employer.category) {
            categories.set(employer.category.id, employer.category);
        }
    });
    return Array.from(categories.values());
});

const filteredEmployers = computed(() => {
    let result = [...allEmployers.value];

    // Apply search query filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(employer => {
            const nameMatch = employer.company_name?.toLowerCase().includes(query) || false;
            const descMatch = employer.company_description?.toLowerCase().includes(query) || false;
            const categoryMatch = employer.category?.name?.toLowerCase().includes(query) || false;

            return nameMatch || descMatch || categoryMatch;
        });
    }

    // Apply location filter
    if (locationFilter.value) {
        result = result.filter(employer =>
            employer.location?.toLowerCase().includes(locationFilter.value.toLowerCase()) || false
        );
    }

    // Apply category filter
    if (categoryFilter.value) {
        result = result.filter(employer =>
            employer.category?.id == categoryFilter.value
        );
    }

    // Apply size filter
    if (sizeFilter.value) {
        const [min, max] = sizeFilter.value.split('-').map(Number);
        result = result.filter(employer => {
            const size = employer.employees_count || 0;
            if (sizeFilter.value === '201+') return size > 200;
            if (max) return size >= min && size <= max;
            return size >= min;
        });
    }

    // Apply sorting if any
    if (sortField.value) {
        result.sort((a, b) => {
            let comparison = 0;

            if (sortField.value === 'name') {
                comparison = (a.company_name || '').localeCompare(b.company_name || '');
            } else if (sortField.value === 'jobs') {
                comparison = (a.jobs_count || 0) - (b.jobs_count || 0);
            } else if (sortField.value === 'size') {
                comparison = (a.employees_count || 0) - (b.employees_count || 0);
            } else if (sortField.value === 'founded') {
                const yearA = a.founded_date ? new Date(a.founded_date).getFullYear() : 0;
                const yearB = b.founded_date ? new Date(b.founded_date).getFullYear() : 0;
                comparison = yearA - yearB;
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
        'name': 'Company Name',
        'jobs': 'Job Listings',
        'size': 'Company Size',
        'founded': 'Founded Year'
    };
    return `Sort by ${fieldNames[sortField.value]} ${direction}`;
});

// Methods
const fetchEmployers = async () => {
    try {
        isLoading.value = true;
        error.value = null;
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://127.0.0.1:8000/api/employer-profiles', {
            headers: {
                Authorization: token ? `Bearer ${token}` : ''
            }
        });

        if (response.data?.data) {
            allEmployers.value = response.data.data.map(employer => ({
                ...employer,
                isFavorite: false,
                jobs_count: employer.jobs_count || 0
            }));
            totalResults.value = response.data.data.length;
        } else {
            error.value = 'Invalid response format from server';
        }
    } catch (err) {
        error.value = err.response?.data?.message || 'Failed to load employers. Please try again.';
        console.error('Error fetching employers:', err);
    } finally {
        isLoading.value = false;
    }
};

const debouncedSearch = debounce(() => {
    currentPage.value = 1;
}, 500);

const searchEmployers = () => {
    currentPage.value = 1;
};

const sortEmployers = (field) => {
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
    sizeFilter.value = '';
    sortField.value = '';
    sortDirection.value = 'asc';
    currentPage.value = 1;
};

const goToEmployerDetails = (employer) => {
    if (employer.user_id) {
        router.push({
            name: 'Employer Profile',
            params: { id: employer.user_id }
        });
    }
};

const getRandomLogoBackground = () => {
    const randomIndex = Math.floor(Math.random() * logoBackgrounds.length);
    return logoBackgrounds[randomIndex];
};

const getCompanyInitial = (companyName) => {
    return companyName?.charAt(0)?.toUpperCase() || '?';
};

const truncateDescription = (description) => {
    if (!description) return 'No description provided';
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
};

const getProfileImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:8000/storage/${path}`;
};

const handleImageError = (event) => {
    event.target.style.display = 'none';
    event.target.parentElement.querySelector('.employer-initial').style.display = 'block';
};

const getCompanySize = (count) => {
    if (!count) return '';
    if (count <= 10) return '1-10 employees';
    if (count <= 50) return '11-50 employees';
    if (count <= 200) return '51-200 employees';
    return '201+ employees';
};

const getFoundedYear = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).getFullYear();
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
    border: none;
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
    position: relative;
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
    display: none;
}

.employer-name {
    font-size: 1rem;
    color: #28a745;
    font-weight: 600;
}

.employer-title {
    font-weight: 600;
    font-size: 1.1rem;
    min-height: 3rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.job-count {
    color: #555;
    font-size: 0.9rem;
    font-weight: 500;
}

.employer-description {
    min-height: 3rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.employer-tag {
    display: inline-block;
    padding: 4px 8px;
    background-color: #f5f5f5;
    border-radius: 4px;
    font-size: 0.75rem;
    color: #666;
    margin-bottom: 4px;
}

.employer-location {
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

    .employer-card {
        margin-bottom: 20px;
    }

    .employer-list-title {
        font-size: 1.5rem;
    }
}
</style>