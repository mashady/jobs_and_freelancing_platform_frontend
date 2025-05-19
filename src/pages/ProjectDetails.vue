<template>
    <div class="container py-4">
        <nav aria-label="breadcrumb">
            <ul class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
                <li class="breadcrumb-item"><router-link to="/projects">Projects</router-link></li>
                <li class="breadcrumb-item active">{{ project.title }}</li>
            </ul>
        </nav>

        <div v-if="isLoading" class="text-center py-5">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-else-if="error" class="alert alert-danger" role="alert">
            {{ error }}
        </div>

        <div v-else class="row">
            <div class="col-lg-8">
                <div class="card mb-4" style="
            background-image: url('https://demoapus1.com/freeio/wp-content/uploads/2024/04/project-detail1.jpg');
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 0.5rem;
            height: 250px;
            border:0;
          ">
                    <div class="card-body p-4" style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            ">
                        <h1 class="card-title mb-4">{{ project.title }}</h1>

                        <div class="d-flex align-items-center mb-4">
                            <div class="d-flex align-items-center me-4">
                                <i class="bi bi-geo-alt me-2"></i>
                                <span>{{ extractCity(project.employer.location) }}</span>
                            </div>
                            <div class="d-flex align-items-center me-4">
                                <i class="bi bi-calendar me-2"></i>
                                <span>Posted {{ formatDate(project.created_at) }}</span>
                            </div>
                            <div class="d-flex align-items-center">
                                <i class="bi bi-eye me-2"></i>
                                <span>3340 Views</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-md-4 mb-3">
                        <div class="d-flex align-items-center">
                            <div class="p-3 me-3">
                                <i class="bi bi-geo-alt job-icons"
                                    style="font-size: 2rem;color: var(--second-color)"></i>
                            </div>
                            <div>
                                <h6 class="mb-1">Project location type</h6>
                                <p class="mb-0">Remote</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <div class="d-flex align-items-center">
                            <div class="p-3 me-3">
                                <i class="bi bi-currency-dollar" style="font-size: 2rem;color: var(--second-color)"></i>
                            </div>
                            <div>
                                <h6 class="mb-1">Project Type</h6>
                                <p class="mb-0">{{ formatProjectType(project.project_type) }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <div class="d-flex align-items-center">
                            <div class="p-3 me-3" style="font-size: 2rem;color: var(--second-color)">
                                <i class="bi bi-clock"></i>
                            </div>
                            <div>
                                <h6 class="mb-1">Duration</h6>
                                <p class="mb-0">{{ project.duration }} days</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <div class="d-flex align-items-center">
                            <div class="p-3 me-3" style="font-size: 2rem;color: var(--second-color)">
                                <i class="bi bi-hand-thumbs-up"></i>
                            </div>
                            <div>
                                <h6 class="mb-1">Level</h6>
                                <p class="mb-0">{{ project.general_level }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <div class="d-flex align-items-center">
                            <div class="p-3 me-3" style="font-size: 2rem;color: var(--second-color)">
                                <i class="bi bi-translate"></i>
                            </div>
                            <div>
                                <h6 class="mb-1">Language</h6>
                                <p class="mb-0">{{ project.project_language }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <div class="d-flex align-items-center">
                            <div class="p-3 me-3" style="font-size: 2rem;color: var(--second-color)">
                                <i class="bi bi-bar-chart"></i>
                            </div>
                            <div>
                                <h6 class="mb-1">English Level</h6>
                                <p class="mb-0">{{ project.english_level }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <h2 class="mb-3">Project Description</h2>
                    <p class="text-muted">{{ project.description }}</p>
                </div>

                <div class="mb-4" v-if="project.attachments && project.attachments.length > 0">
                    <h2 class="mb-4">Attachments</h2>
                    <div class="row">
                        <div v-for="(attachment, index) in project.attachments" :key="index"
                            class="col-md-6 col-lg-4 mb-3">
                            <div class="card" style="
                  background-color: var(--theme-color-010);
                  border: 0;
              ">
                                <div class="card-body d-flex align-items-center">
                                    <div class="flex-grow-1">
                                        <h6 class="mb-1">{{ attachment.file_name }}</h6>
                                        <p class="mb-0 text-muted">{{ getFileType(attachment.file_type) }}</p>
                                    </div>
                                    <div class="ms-3">
                                        <i class="bi bi-file-earmark-text fs-3" style="color: var(--theme-color);"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-4" v-if="project.skills && project.skills.length > 0">
                    <h2 class="mb-4">Skills Required</h2>
                    <div class="d-flex flex-wrap gap-2">
                        <span v-for="(skill, index) in project.skills" :key="index" class="badge rounded-pill text-dark"
                            style="background-color: #f8e8e8; padding: 10px 15px;">
                            {{ skill.name }}
                        </span>
                    </div>
                </div>

                <div class="mb-4">
                    <h2 class="mb-4">Your Proposals (3)</h2>

                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-md-2 mb-3 mb-md-0">
                                    <div class="bg-light text-center p-3">
                                        <i class="bi bi-image text-muted" style="font-size: 2rem;"></i>
                                    </div>
                                </div>
                                <div class="col-md-7 mb-3 mb-md-0">
                                    <h5 class="mb-2">Employer</h5>
                                    <div class="d-flex align-items-center mb-2">
                                        <div class="d-flex align-items-center me-3">
                                            <i class="bi bi-star-fill text-warning me-1"></i>
                                            <span>0.0</span>
                                            <span class="ms-1 fw-bold">(0 Reviews)</span>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <i class="bi bi-calendar me-1"></i>
                                            <span>5 months ago</span>
                                        </div>
                                    </div>
                                    <p class="mb-0">test</p>
                                </div>
                                <div class="col-md-3 text-md-end">
                                    <h5 class="text-dark mb-1">$6</h5>
                                    <p class="mb-0 text-muted">in 2 hours</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-md-2 mb-3 mb-md-0">
                                    <img src="https://demoapus1.com/freeio/wp-content/uploads/wp-freeio-uploads/_employer_featured_image/2023/06/h36-150x150.png"
                                        alt="Freelancer" class="rounded-circle img-fluid" style="max-width: 100px;">
                                </div>
                                <div class="col-md-7 mb-3 mb-md-0">
                                    <h5 class="mb-2">Freelancer</h5>
                                    <div class="d-flex align-items-center mb-2">
                                        <div class="d-flex align-items-center me-3">
                                            <i class="bi bi-star-fill text-warning me-1"></i>
                                            <span>5.0</span>
                                            <span class="ms-1 text-muted">(1 Review)</span>
                                        </div>
                                        <div class="d-flex align-items-center me-3">
                                            <i class="bi bi-geo-alt me-1"></i>
                                            <span>Los Angeles</span>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <i class="bi bi-calendar me-1"></i>
                                            <span>6 months ago</span>
                                        </div>
                                    </div>
                                    <p class="mb-0">sfas</p>
                                </div>
                                <div class="col-md-3 text-md-end">
                                    <h5 class="text-dark mb-1">$240</h5>
                                    <p class="mb-0 text-muted">in 4 hours</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <h2 class="mb-4">Send Your Proposal</h2>

                    <div class="row mb-4">
                        <div class="col-md-6 mb-3" v-if="project.project_type === 'hourly'">
                            <label for="hourlyPrice" class="form-label">Your Hourly Price</label>
                            <input type="text" class="form-control" id="hourlyPrice" placeholder="Price">
                        </div>
                        <div class="col-md-6 mb-3" v-if="project.project_type === 'hourly'">
                            <label for="estimatedHours" class="form-label">Estimated Hours</label>
                            <input type="text" class="form-control" id="estimatedHours" value="4">
                        </div>
                        <div class="col-md-12 mb-3" v-else>
                            <label for="fixedPrice" class="form-label">Your Fixed Price</label>
                            <input type="text" class="form-control" id="fixedPrice" placeholder="Price">
                        </div>
                    </div>

                    <div class="mb-4">
                        <label for="coverLetter" class="form-label">Cover Letter</label>
                        <textarea class="form-control" id="coverLetter" rows="6"></textarea>
                    </div>

                    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                        <button class="btn btn-success d-flex justify-content-center align-items-center" type="button">
                            <span>Submit a Proposal</span>
                            <i class="bi bi-arrow-up-right ms-2"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="position-sticky" style="top: 20px;max-width: 350px;">
                    <div class="card mb-4" style="
              box-shadow: 0 6px 15px 0 rgba(64, 79, 104, 0.05);
              border-radius: 8px;
              border: 1px solid #E9E9E9;">
                        <div class="card-body p-4">
                            <h2 class="mb-2 fw-bold" style="font-size: 1.8rem;">${{ project.budget_min }} - ${{
                                project.budget_max }}</h2>
                            <p class="mb-4">{{ formatProjectType(project.project_type) }} price</p>
                            <button class="btn btn-success w-100 d-flex align-items-center justify-content-center">
                                <span>Submit a Proposal</span>
                                <i class="bi bi-arrow-up-right ms-2"></i>
                            </button>
                        </div>
                    </div>

                    <div class="card" style="
              box-shadow: 0 6px 15px 0 rgba(64, 79, 104, 0.05);
              border-radius: 8px;
              border: 1px solid #E9E9E9;">
                        <div class="card-body p-4">
                            <h5 class="mb-4">About Employer</h5>

                            <div class="d-flex align-items-center mb-3">
                                <div class="me-3">
                                    <div class="bg-light text-center p-3 rounded-circle"
                                        style="width: 60px; height: 60px;">
                                        <i class="bi bi-building"
                                            style="font-size: 1.5rem; color: var(--theme-color);"></i>
                                    </div>
                                </div>
                                <div>
                                    <h6 class="mb-1">{{ project.employer.company_name }}</h6>
                                    <p class="mb-0 small">{{ project.employer.employees_count }} employees</p>
                                    <div class="d-flex align-items-center">
                                        <i class="bi bi-star-fill text-warning me-1"></i>
                                        <span>3.5</span>
                                        <span class="ms-1 text-muted small">2 Reviews</span>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-4">
                                <div class="col-12 mb-2">
                                    <div class="fw-bold small">Location</div>
                                    <div>{{ extractCity(project.employer.location) }}</div>
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="fw-bold small">Employees</div>
                                    <div>{{ project.employer.employees_count }}</div>
                                </div>
                                <div class="col-12">
                                    <div class="fw-bold small">Founded</div>
                                    <div>{{ formatDate(project.employer.founded_date) }}</div>
                                </div>
                            </div>

                            <button
                                class="btn btn-outline-success w-100 d-flex align-items-center justify-content-center">
                                <span>Contact Employer</span>
                                <i class="bi bi-arrow-up-right ms-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const project = ref({});
const isLoading = ref(true);
const error = ref(null);

const fetchProjectDetails = async () => {
    try {
        isLoading.value = true;
        const token = localStorage.getItem('authToken');
        const response = await axios.get(
            `http://127.0.0.1:8000/api/projects/${route.params.id}`,
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : ''
                }
            }
        );
        project.value = response.data.data;
        isLoading.value = false;
    } catch (err) {
        error.value = 'Failed to load project details. Please try again.';
        isLoading.value = false;
        console.error('Error fetching project details:', err);
    }
};

const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const formatProjectType = (type) => {
    return type === 'fixed' ? 'Fixed' : 'Hourly rate';
};

const extractCity = (location) => {
    if (!location) return 'Unknown';
    // Try to extract the city name from the location string
    const commonCities = ['New York', 'Los Angeles', 'Miami', 'Chicago', 'Houston', 'Boston', 'San Francisco', 'Cairo'];
    const city = commonCities.find(c => location.includes(c));
    return city || location.split(',')[0] || 'Unknown';
};

const getFileType = (fileType) => {
    if (!fileType) return 'File';
    const typeMap = {
        'image/png': 'PNG',
        'image/jpeg': 'JPEG',
        'application/pdf': 'PDF',
        'application/msword': 'DOC',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX'
    };
    return typeMap[fileType] || fileType.split('/')[1]?.toUpperCase() || 'File';
};

onMounted(() => {
    fetchProjectDetails();
});
</script>

<style scoped>
.breadcrumb {
    padding: 0.75rem 0;
}

.breadcrumb-item a {
    color: #222;
}

.job-icons {
    color: var(--second-color);
}

h2 {
    font-size: 20px;
}

.btn-success {
    background-color: var(--theme-color);
    border-color: var(--theme-color);
    max-width: 300px;
    height: 60px;
    font-weight: 700;
    font-size: 0.9375rem;
}

.btn-success:hover {
    background-color: #FFF;
    border-color: var(--theme-color);
    color: var(--theme-color);
    max-width: 300px;
    height: 60px;
    font-weight: 700;
    font-size: 0.9375rem;
}

.btn-outline-success {
    background-color: #FFF;
    border-color: var(--theme-color);
    max-width: 300px;
    height: 60px;
    font-weight: 700;
    font-size: 0.9375rem;
}

.btn-outline-success:hover {
    background-color: var(--theme-color);
    border-color: var(--theme-color);
    max-width: 300px;
    height: 60px;
    font-weight: 700;
    font-size: 0.9375rem;
}

@media (min-width: 992px) {
    .position-sticky {
        position: sticky;
        top: 20px;
    }
}
</style>