<template>
    <div class="container">
        <nav aria-label="breadcrumb" class="mt-3">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Projects List</li>
            </ol>
        </nav>

        <div class="projects-header rounded p-4 mb-4" style="background-color: #FFF5EC;">
            <div class="row">
                <div class="col-md-6">
                    <h2 class="mb-2">Projects List</h2>
                    <p class="text-muted">All the Lorem Ipsum generators on the Internet tend to repeat.</p>

                    <div class="search-container mt-4 d-flex">
                        <div class="input-group w-100">
                            <span class="input-group-text bg-white border-end-0">
                                <i class="bi bi-search"></i>
                            </span>
                            <input type="text" class="form-control border-start-0" placeholder="Project title, keywords"
                                v-model="searchQuery">
                            <button class="btn btn-success px-4" @click="fetchProjects">Search</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 d-none d-md-block">
                    <img src="" alt="Working Professional" class="img-fluid" />
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-3">
                <div class="filter-section mb-4">
                    <h5>Languages</h5>
                    <div class="form-check mb-2" v-for="(language, index) in visibleLanguages" :key="'lang-' + index">
                        <input class="form-check-input" type="checkbox" :id="'language-' + index"
                            v-model="selectedLanguages" :value="language">
                        <label class="form-check-label" :for="'language-' + index">
                            {{ language }}
                        </label>
                    </div>
                    <a href="#" class="text-success d-flex align-items-center mt-2"
                        @click.prevent="showMoreLanguages = !showMoreLanguages">
                        <i class="bi" :class="showMoreLanguages ? 'bi-dash' : 'bi-plus'"></i>
                        <span class="ms-1">Show {{ showMoreLanguages ? 'Less' : 'More' }}</span>
                    </a>
                </div>

                <div class="filter-section mb-4">
                    <h5>English Level</h5>
                    <div class="dropdown w-100">
                        <button class="btn btn-outline-secondary dropdown-toggle w-100 text-start" type="button"
                            id="englishLevelDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ selectedEnglishLevel || 'English Level' }}
                        </button>
                        <ul class="dropdown-menu w-100" aria-labelledby="englishLevelDropdown">
                            <li><a class="dropdown-item" href="#" @click.prevent="selectedEnglishLevel = ''">Any
                                    Level</a></li>
                            <li><a class="dropdown-item" href="#"
                                    @click.prevent="selectedEnglishLevel = 'beginner'">Beginner</a></li>
                            <li><a class="dropdown-item" href="#"
                                    @click.prevent="selectedEnglishLevel = 'intermediate'">Intermediate</a></li>
                            <li><a class="dropdown-item" href="#"
                                    @click.prevent="selectedEnglishLevel = 'advanced'">Advanced</a></li>
                            <li><a class="dropdown-item" href="#"
                                    @click.prevent="selectedEnglishLevel = 'fluent'">Fluent</a></li>
                        </ul>
                    </div>
                </div>

                <div class="filter-section mb-4">
                    <h5>Project Type</h5>
                    <div class="dropdown w-100">
                        <button class="btn btn-outline-secondary dropdown-toggle w-100 text-start" type="button"
                            id="projectTypeDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ selectedProjectType || 'Project type' }}
                        </button>
                        <ul class="dropdown-menu w-100" aria-labelledby="projectTypeDropdown">
                            <li><a class="dropdown-item" href="#" @click.prevent="selectedProjectType = ''">All
                                    Projects</a></li>
                            <li><a class="dropdown-item" href="#" @click.prevent="selectedProjectType = 'fixed'">Fixed
                                    Price</a></li>
                            <li><a class="dropdown-item" href="#" @click.prevent="selectedProjectType = 'hourly'">Hourly
                                    Rate</a></li>
                        </ul>
                    </div>
                </div>

                <div class="filter-section mb-4">
                    <h5>Skills</h5>
                    <div class="form-check mb-2" v-for="(skill, index) in visibleSkills" :key="'skill-' + index">
                        <input class="form-check-input" type="checkbox" :id="'skill-' + index" v-model="selectedSkills"
                            :value="skill">
                        <label class="form-check-label" :for="'skill-' + index">
                            {{ skill }}
                        </label>
                    </div>
                    <a href="#" class="text-success d-flex align-items-center mt-2"
                        @click.prevent="showMoreSkills = !showMoreSkills">
                        <i class="bi" :class="showMoreSkills ? 'bi-dash' : 'bi-plus'"></i>
                        <span class="ms-1">Show {{ showMoreSkills ? 'Less' : 'More' }}</span>
                    </a>
                </div>

                <div class="filter-section mb-4">
                    <h5>Cities</h5>
                    <div class="form-check mb-2" v-for="(city, index) in visibleCities" :key="'city-' + index">
                        <input class="form-check-input" type="checkbox" :id="'city-' + index" v-model="selectedCities"
                            :value="city">
                        <label class="form-check-label" :for="'city-' + index">
                            {{ city }}
                        </label>
                    </div>
                    <a href="#" class="text-success d-flex align-items-center mt-2"
                        @click.prevent="showMoreCities = !showMoreCities">
                        <i class="bi" :class="showMoreCities ? 'bi-dash' : 'bi-plus'"></i>
                        <span class="ms-1">Show {{ showMoreCities ? 'Less' : 'More' }}</span>
                    </a>
                </div>

                <div class="filter-section mb-4">
                    <h5>Price</h5>
                    <div class="price-range">
                        <div class="d-flex justify-content-between mb-2">
                            <span>${{ priceRange[0] }}</span>
                            <span>${{ priceRange[1] }}</span>
                        </div>
                        <input type="range" class="form-range" min="0" max="5000" step="100"
                            v-model.number="priceRange[1]">
                    </div>
                </div>

                <button class="btn btn-success w-100 mb-4" @click="fetchProjects">
                    Search <i class="bi bi-arrow-right ms-1"></i>
                </button>
            </div>

            <div class="col-md-9">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <span>Showing all {{ filteredProjects.length }} results</span>
                    <div class="dropdown">
                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="sortDropdown"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Sort by ({{ sortOptions[selectedSort].label }})
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="sortDropdown">
                            <li v-for="(option, key) in sortOptions" :key="key">
                                <a class="dropdown-item" href="#" @click.prevent="selectedSort = key">{{ option.label
                                    }}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div v-if="isLoading" class="text-center py-5">
                    <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-2">Loading projects...</p>
                </div>

                <div v-else-if="error" class="alert alert-danger">
                    {{ error }}
                </div>

                <div v-else>
                    <router-link v-for="project in filteredProjects" :key="project.id"
                        :to="`/project-details/${project.id}`"
                        class="project-card mb-4 p-4 border rounded d-block text-decoration-none text-dark">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <h5 class="mb-0">{{ project.title }}</h5>
                            <div class="d-flex">
                                <span class="text-muted me-3">{{ extractCity(project.employer.location) }}</span>
                                <span class="text-muted me-3">Posted {{ formatDate(project.created_at) }}</span>
                                <span class="text-muted">{{ project.proposals || 0 }} Proposals</span>
                            </div>
                        </div>

                        <p class="text-muted mb-3">
                            {{ truncateDescription(project.description) }}
                        </p>

                        <div class="d-flex flex-wrap mb-3">
                            <span v-for="(skill, index) in project.skills.slice(0, 3)" :key="index"
                                class="skill-tag me-2 mb-2">
                                {{ skill.name }}
                            </span>
                            <span v-if="project.skills.length > 3" class="skill-tag me-2 mb-2">
                                +{{ project.skills.length - 3 }}
                            </span>
                        </div>

                        <div class="d-flex justify-content-between align-items-center">
                            <div class="price-section">
                                <h5 class="mb-0">${{ project.budget_min }} – ${{ project.budget_max }}</h5>
                                <small class="text-muted text-uppercase">{{ formatProjectType(project.project_type)
                                    }}</small>
                            </div>
                            <button class="btn btn-success px-4" @click.stop>
                                Send Proposal
                            </button>
                        </div>
                    </router-link>

                    <div v-if="filteredProjects.length === 0" class="text-center py-5">
                        <p>No projects found matching your criteria.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    name: 'ProjectList',
    setup() {
        const router = useRouter();

        const searchQuery = ref('');

        const showMoreSkills = ref(false);
        const showMoreCities = ref(false);
        const showMoreLanguages = ref(false);

        const priceRange = ref([0, 5000]);

        const languages = ref([
            'English',
            'French',
            'Italian',
            'Japanese',
            'Spanish',
            'German',
            'Chinese',
            'Arabic'
        ]);

        const skills = ref([
            'Adobe Photoshop',
            'Adobe XD',
            'Android Developer',
            'Artist',
            'Computer',
            'Laravel',
            'Vue.js',
            'MySQL',
            'REST API',
            'PHP',
            'JavaScript'
        ]);

        const cities = ref([
            'Boston',
            'Florida',
            'Los Angeles',
            'Miami',
            'New York',
            'San Francisco',
            'Chicago',
            'Houston',
            'Cairo'
        ]);

        const selectedLanguages = ref([]);
        const selectedSkills = ref([]);
        const selectedCities = ref([]);
        const selectedEnglishLevel = ref('');
        const selectedProjectType = ref('');
        const selectedSort = ref('default');

        const projects = ref([]);
        const isLoading = ref(false);
        const error = ref(null);

        const sortOptions = {
            default: { label: 'Default', fn: (a, b) => a.id - b.id },
            priceLow: { label: 'Price: Low to High', fn: (a, b) => a.budget_min - b.budget_min },
            priceHigh: { label: 'Price: High to Low', fn: (a, b) => b.budget_min - a.budget_min },
            newest: { label: 'Date: Newest First', fn: (a, b) => new Date(b.created_at) - new Date(a.created_at) }
        };

        const visibleSkills = computed(() => showMoreSkills.value ? skills.value : skills.value.slice(0, 5));
        const visibleCities = computed(() => showMoreCities.value ? cities.value : cities.value.slice(0, 5));
        const visibleLanguages = computed(() => showMoreLanguages.value ? languages.value : languages.value.slice(0, 5));

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const now = new Date();
            const diffInSeconds = Math.floor((now - date) / 1000);

            if (diffInSeconds < 60) return 'just now';
            if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
            if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
            if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
            if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
            return `${Math.floor(diffInSeconds / 31536000)} years ago`;
        };

        const truncateDescription = (text) => {
            if (!text) return '';
            const maxLength = 200;
            return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
        };

        const extractCity = (location) => {
            if (!location) return 'Unknown';
            const city = cities.value.find(c => location.includes(c));
            return city || location.split(',')[0] || 'Unknown';
        };

        const formatProjectType = (type) => {
            return type === 'fixed' ? 'Fixed' : 'Hourly rate';
        };

        const fetchProjects = async () => {
            isLoading.value = true;
            error.value = null;

            try {
                const authToken = localStorage.getItem('authToken');
                const response = await axios.get('http://127.0.0.1:8000/api/projects', {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                projects.value = response.data.data.map(project => ({
                    ...project,
                    proposals: project.proposals || 0
                }));
            } catch (err) {
                error.value = 'Failed to load projects. Please try again later.';
                console.error('Error fetching projects:', err);
            } finally {
                isLoading.value = false;
            }
        };

        const filteredProjects = computed(() => {
            let filtered = [...projects.value];

            if (searchQuery.value) {
                const query = searchQuery.value.toLowerCase();
                filtered = filtered.filter(project =>
                    project.title.toLowerCase().includes(query) ||
                    project.description.toLowerCase().includes(query)
                );
            }

            if (selectedLanguages.value.length > 0) {
                filtered = filtered.filter(project =>
                    selectedLanguages.value.includes(project.project_language)
                );
            }

            if (selectedEnglishLevel.value) {
                filtered = filtered.filter(project =>
                    project.english_level === selectedEnglishLevel.value
                );
            }

            if (selectedProjectType.value) {
                filtered = filtered.filter(project =>
                    project.project_type === selectedProjectType.value
                );
            }

            if (selectedSkills.value.length > 0) {
                filtered = filtered.filter(project =>
                    project.skills.some(skill =>
                        selectedSkills.value.includes(skill.name)
                    )
                );
            }

            if (selectedCities.value.length > 0) {
                filtered = filtered.filter(project =>
                    selectedCities.value.some(city =>
                        project.employer.location.includes(city)
                    )
                );
            }

            filtered = filtered.filter(project =>
                parseInt(project.budget_min) <= priceRange.value[1] &&
                parseInt(project.budget_max) >= priceRange.value[0]
            );

            if (selectedSort.value !== 'default') {
                filtered.sort(sortOptions[selectedSort.value].fn);
            }

            return filtered;
        });

        onMounted(() => {
            fetchProjects();
        });

        return {
            searchQuery,
            showMoreSkills,
            showMoreCities,
            showMoreLanguages,
            priceRange,
            languages,
            skills,
            cities,
            selectedLanguages,
            selectedSkills,
            selectedCities,
            selectedEnglishLevel,
            selectedProjectType,
            selectedSort,
            sortOptions,
            projects,
            filteredProjects,
            isLoading,
            error,
            visibleSkills,
            visibleCities,
            visibleLanguages,
            fetchProjects,
            formatDate,
            truncateDescription,
            extractCity,
            formatProjectType
        };
    }
}
</script>

<style scoped>
.projects-header {
    position: relative;
    overflow: hidden;
}

.filter-section h5 {
    margin-bottom: 15px;
    font-weight: 600;
}

.project-card {
    background-color: white;
    transition: all 0.3s ease;
}

.project-card:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

.skill-tag {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 20px;
    padding: 2px 10px;
    font-size: 0.85rem;
    color: #495057;
}

.price-section h5 {
    margin-bottom: 0;
    font-weight: 600;
}

.btn-success {
    background-color: #4CAF50;
    border-color: #4CAF50;
}

.btn-outline-success {
    color: #4CAF50;
    border-color: #4CAF50;
}

.text-success {
    color: #4CAF50 !important;
}

.form-check-input:checked {
    background-color: #4CAF50;
    border-color: #4CAF50;
}

.badge {
    font-weight: normal;
}

/* Router link styling */
.text-decoration-none {
    text-decoration: none;
}

.text-dark {
    color: inherit;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .project-card {
        padding: 1rem;
    }

    .project-card h5 {
        font-size: 1rem;
    }

    .project-card .d-flex {
        flex-direction: column;
    }

    .project-card .price-section {
        margin-bottom: 1rem;
    }
}
</style>