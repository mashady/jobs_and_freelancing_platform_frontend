<template>
    <div class="freelancer-profile">
        <div class="container-fluid py-3 bg-white my-4">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><a href="#" style="color: #222;">Home</a></li>
                            <li class="breadcrumb-item"><a href="#" style="color: #222;">Freelancers</a></li>
                            <li class="breadcrumb-item active">{{ freelancerData.user?.name }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>

        <div class="container profile-header">
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <div class="d-flex">
                            <div class="position-relative me-4">
                                <img :src="'http://localhost:8000/storage/' + freelancerData.user?.profile_image || defaultAvatar"
                                    class="rounded-circle" alt="Profile Picture" width="100" height="100">
                            </div>
                            <div>
                                <h3 class="mb-1">{{ freelancerData.user?.name }}</h3>
                                <p class="text-muted mb-2">{{ freelancerData.job_title }}</p>
                                <div class="d-flex align-items-center mb-2">
                                    <!-- <div class="me-3">
                                        <i class="bi bi-star-fill star-color"></i>
                                        <span class="ms-1">5.0 (1 Review)</span>
                                    </div> -->
                                    <div class="me-3">
                                        <i class="bi bi-geo-alt"></i>
                                        <span class="ms-1">{{ freelancerData.city }}, {{ freelancerData.address
                                            }}</span>
                                    </div>
                                    <div>
                                        <i class="bi bi-calendar"></i>
                                        <span class="ms-1">{{ formatDate(freelancerData.birth_date) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 d-flex justify-content-end align-items-center">
                        <button class="btn btn-success me-2" @click="downloadCV">Download CV</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="container py-4">
            <div class="row">
                <div class="col-md-8">
                    <div class="row mb-4">
                        <div class="col-md-3" v-for="stat in stats" :key="stat.title">
                            <div class="card border-0 h-100">
                                <div class="card-body d-flex align-items-center">
                                    <div class="me-3">
                                        <div
                                            class="rounded-circle bg-light d-flex align-items-center justify-content-center stat-icon">
                                            <i :class="stat.icon"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="text-muted small">{{ stat.title }}</div>
                                        <div class="fw-bold">{{ stat.value }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mb-4">
                        <h4>About Freelancer</h4>
                        <p class="text-muted">{{ freelancerData.bio }}</p>
                    </div>

                    <div class="mb-4">
                        <h4>Education</h4>
                        <div class="position-relative pb-4">
                            <div class="position-relative" v-for="(edu, index) in freelancerData.educations"
                                :key="edu.id">
                                <div class="d-flex">
                                    <div class="position-relative me-4">
                                        <div
                                            class="rounded-circle bg-light d-flex align-items-center justify-content-center edu-icon">
                                            <span class="text-success fw-bold">{{ getInitials(edu.institution) }}</span>
                                        </div>
                                        <div class="position-absolute timeline-connector"
                                            v-if="index < freelancerData.educations.length - 1"></div>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div>
                                            <span class="badge bg-light text-dark px-3 py-2 rounded-pill">
                                                {{ formatDate(edu.start_date) }} - {{ formatDate(edu.end_date) }}
                                            </span>
                                        </div>
                                        <h5 class="mt-3 mb-1">{{ edu.degree }} in {{ edu.field_of_study }}</h5>
                                        <div class="text-success mb-2">{{ edu.institution }}</div>
                                        <p class="text-muted" v-if="edu.description">
                                            {{ edu.description }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mb-4">
                        <h4>Work & Experience</h4>
                        <div class="position-relative pb-4">
                            <div class="position-relative" v-for="(exp, index) in freelancerData.work_experiences"
                                :key="exp.id">
                                <div class="d-flex">
                                    <div class="position-relative me-4">
                                        <div
                                            class="rounded-circle bg-light d-flex align-items-center justify-content-center exp-icon">
                                            <span class="text-success fw-bold">{{ getInitials(exp.company_name)
                                                }}</span>
                                        </div>
                                        <div class="position-absolute timeline-connector"
                                            v-if="index < freelancerData.work_experiences.length - 1"></div>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div>
                                            <span class="badge bg-light text-dark px-3 py-2 rounded-pill">
                                                {{ formatDate(exp.start_date) }} - {{ formatDate(exp.end_date) }}
                                            </span>
                                        </div>
                                        <h5 class="mt-3 mb-1">{{ exp.position }}</h5>
                                        <div class="text-success mb-2">{{ exp.company_name }}</div>
                                        <p class="text-muted">
                                            {{ exp.description }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="card border h-100">
                                <div class="card-body">
                                    <div class="small text-muted mb-2">{{ freelancerData.category?.name }}</div>
                                    <h5 class="card-title">{{ freelancerData.job_title }}</h5>
                                    <div class="d-flex align-items-center mb-3">
                                        <div class="star-color me-1">
                                            <i class="bi bi-star-fill"></i>
                                        </div>
                                        <span>5.0 (1 Review)</span>
                                    </div>
                                    <div class="d-flex align-items-center mt-3">
                                        <div class="me-3">
                                            <img :src="freelancerData.user?.profile_image || defaultAvatar"
                                                class="rounded-circle" alt="Freelancer" width="32" height="32">
                                        </div>
                                        <div class="text-muted small">{{ freelancerData.user?.name }}</div>
                                        <div class="ms-auto">
                                            <div class="small text-muted">Starting at:</div>
                                            <div class="fw-bold">${{ freelancerData.min_hourly_rate }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->

                    <!-- <div class="mb-4">
                        <h4>1 Review</h4>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="card bg-light border-0 h-100">
                                    <div class="card-body text-center">
                                        <h1 class="star-color display-4">5.0</h1>
                                        <div class="star-color mb-2">
                                            <i v-for="star in 5" :key="star" class="bi bi-star-fill"></i>
                                        </div>
                                        <div class="small text-muted">1 rating</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div v-for="n in 5" :key="n" class="mb-2">
                                    <div class="d-flex align-items-center">
                                        <div class="me-2">{{ 6 - n }} Star</div>
                                        <div class="progress flex-grow-1" style="height: 10px;">
                                            <div class="progress-bar star-bg" role="progressbar"
                                                :style="{ width: getStarPercentage(6 - n) + '%' }"></div>
                                        </div>
                                        <div class="ms-2">{{ getStarPercentage(6 - n) }}%</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-4">
                            <div class="d-flex mb-3">
                                <div class="me-3">
                                    <img :src="freelancerData.user?.profile_image || defaultAvatar"
                                        class="rounded-circle" width="48" height="48">
                                </div>
                                <div>
                                    <div class="fw-bold">Admin</div>
                                    <div class="d-flex align-items-center mb-2">
                                        <div class="star-color me-2">
                                            <i class="bi bi-star-fill"></i>
                                            <span class="ms-1">5.0</span>
                                        </div>
                                        <div class="text-muted small">November 16, 2022</div>
                                    </div>
                                    <p class="text-muted">
                                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
                                        quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>

                <div class="col-md-4">
                    <div class="card border mb-4">
                        <div class="card-body">
                            <h4 class="card-title mb-4">${{ freelancerData.min_hourly_rate }} - ${{
                                freelancerData.max_hourly_rate }} <small class="text-muted">/ hr</small></h4>

                            <div v-for="detail in profileDetails" :key="detail.label"
                                class="d-flex align-items-center mb-3">
                                <div style="width: 24px;">
                                    <i :class="detail.icon"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <div class="text-muted">{{ detail.label }}</div>
                                </div>
                                <div class="text-end">
                                    {{ detail.value }}
                                </div>
                            </div>

                            <div class="mb-4">
                                <h5>My Skills</h5>
                                <div class="mt-3">
                                    <span v-for="skill in freelancerData.skills" :key="skill.id"
                                        class="badge rounded-pill text-dark py-2 px-3 me-2 mb-2" style="
                                            background-color: #FFEDE8;
                                            cursor: pointer;
                                        ">
                                        {{ skill.name }}
                                    </span>
                                </div>
                            </div>

                            <button class="btn btn-success w-100" @click="contactFreelancer">
                                Contact Me <i class="bi bi-arrow-up-right ms-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const defaultAvatar = 'https://demoapus1.com/freeio/wp-content/uploads/2022/10/9-150x150.jpg'

const freelancerData = ref({
    user: {},
    educations: [],
    work_experiences: [],
    skills: [],
    category: {}
})

import { useRoute } from 'vue-router'

const route = useRoute()

const fetchFreelancerData = async () => {
    try {
        const token = localStorage.getItem('authToken')
        const id = route.params.id
        const response = await axios.get(`http://127.0.0.1:8000/api/freelancer-profiles/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response)
        freelancerData.value = response.data.data
    } catch (error) {
        console.error('Error fetching freelancer data:', error)
    }
}

const formatDate = (dateString) => {
    if (!dateString) return 'Present'
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

const getInitials = (name) => {
    if (!name) return ''
    return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2)
}

const stats = computed(() => [
    {
        title: 'Project Success',
        value: freelancerData.value.work_experiences?.length || 0,
        icon: 'bi bi-bullseye text-success fs-4'
    },
    {
        title: 'Total Service',
        value: 1,
        icon: 'bi bi-bar-chart text-success fs-4'
    },
    {
        title: 'Completed Service',
        value: 1,
        icon: 'bi bi-check-circle text-success fs-4'
    },
    {
        title: 'In Queue service',
        value: 0,
        icon: 'bi bi-file-earmark-check text-success fs-4'
    }
])

const profileDetails = computed(() => [
    {
        label: 'Location',
        value: `${freelancerData.value.city}, ${freelancerData.value.address}`,
        icon: 'bi bi-geo-alt text-muted'
    },
    {
        label: 'Type',
        value: 'Individual Freelancer',
        icon: 'bi bi-briefcase text-muted'
    },
    {
        label: 'English Level',
        value: freelancerData.value.english_level,
        icon: 'bi bi-translate text-muted'
    },
    {
        label: 'Gender',
        value: freelancerData.value.gender?.charAt(0).toUpperCase() + freelancerData.value.gender?.slice(1),
        icon: `bi bi-gender-${freelancerData.value.gender === 'male' ? 'male' : 'female'} text-muted`
    },
    {
        label: 'Email',
        value: freelancerData.value.email,
        icon: 'bi bi-envelope text-muted'
    },
    {
        label: 'Phone Number',
        value: freelancerData.value.user?.phone,
        icon: 'bi bi-telephone text-muted'
    }
])

const getStarPercentage = (star) => {
    if (star === 5) return 100
    return 0
}

const contactFreelancer = () => {
    console.log('Contacting freelancer...')
}

const downloadCV = () => {
    if (freelancerData.value.resume) {
        window.open(freelancerData.value.resume, '_blank')
    } else {
        console.log('No resume available')
    }
}

onMounted(() => {
    fetchFreelancerData()
})
</script>

<style scoped>
.profile-header {
    background-image: url('https://demoapus1.com/freeio/wp-content/uploads/2024/04/freelancer-detail.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
}

.star-color {
    color: #E1C03F;
}

.star-bg {
    background-color: #E1C03F;
}

.stat-icon {
    width: 48px;
    height: 48px;
}

.edu-icon,
.exp-icon {
    width: 36px;
    height: 36px;
}

.btn-success {
    background-color: var(--theme-color);
    border-color: var(--theme-color);
    max-width: 120px;
    height: 45px;
    font-weight: 700;
    font-size: 13px;
}

.btn-success:hover {
    background-color: #FFF;
    border-color: var(--theme-color);
    color: var(--theme-color);
}

.timeline-connector {
    height: 100%;
    border-left: 2px solid #e9ecef;
    left: 18px;
    top: 36px;
}

.freelancer-profile {
    font-family: 'Poppins', sans-serif;
    color: #333;
}

.breadcrumb {
    background-color: transparent;
    padding: 0;
}

.breadcrumb-item+.breadcrumb-item::before {
    content: "/";
    padding: 0 0.5rem;
}

.card {
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-2px);
}

.badge {
    font-weight: normal;
}

@media (max-width: 768px) {
    .profile-header {
        padding: 1rem 0;
    }

    .profile-header .row {
        flex-direction: column;
        text-align: center;
    }

    .profile-header .col-md-4 {
        margin-top: 1rem;
        justify-content: center;
    }
}
</style>