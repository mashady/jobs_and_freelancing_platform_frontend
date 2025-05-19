<template>
    <div class="employer-profile">
        <div class="container-fluid py-3 bg-white my-4">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><a href="#" style="color: #222;">Home</a></li>
                            <li class="breadcrumb-item"><a href="#" style="color: #222;">Employers</a></li>
                            <li class="breadcrumb-item active">{{ company.company_name }}</li>
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
                                <img :src="company.user?.profile_image ? 'http://localhost:8000/storage/' + company.user.profile_image : defaultLogo"
                                    class="rounded-circle" alt="Company Logo" width="100" height="100">
                            </div>
                            <div>
                                <h3 class="mb-1">{{ company.company_name }}</h3>
                                <p class="text-muted mb-2">{{ company.category?.name }}</p>
                                <div class="d-flex align-items-center mb-2">
                                    <div class="me-3">
                                        <i class="bi bi-geo-alt"></i>
                                        <span class="ms-1">{{ company.location }}</span>
                                    </div>
                                    <div>
                                        <i class="bi bi-calendar"></i>
                                        <span class="ms-1">Est. {{ formatDate(company.founded_date) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                        <h4>Company Description</h4>

                        <p class="text-muted">{{ company.company_description }}</p>
                        <h4>About Company</h4>

                        <p class="text-muted">{{ company.about }}</p>
                    </div>

                </div>

                <div class="col-md-4">
                    <div class="card border mb-4">
                        <div class="card-body">
                            <h4 class="card-title mb-4">Company Details</h4>

                            <div v-for="detail in companyDetails" :key="detail.label"
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
                                <h5>Industry</h5>
                                <div class="mt-3">
                                    <span class="badge rounded-pill text-dark py-2 px-3 me-2 mb-2"
                                        style="background-color: #FFEDE8; cursor: pointer;">
                                        {{ company.category?.name }}
                                    </span>
                                </div>
                            </div>

                            <button class="btn btn-success w-100" @click="contactCompany">
                                Contact Us <i class="bi bi-arrow-up-right ms-1"></i>
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

const defaultLogo = 'https://demoapus1.com/freeio/wp-content/uploads/2022/10/9-150x150.jpg'

const company = ref({
    company_name: '',
    company_description: '',
    about: '',
    location: '',
    founded_date: '',
    employees_count: 0,
    user: {},
    category: {}
})

import { useRoute } from 'vue-router'

const route = useRoute()

const fetchCompanyData = async () => {
    try {
        const token = localStorage.getItem('authToken')
        const companyId = route.params.id
        const response = await axios.get(`http://127.0.0.1:8000/api/employer-profiles/${companyId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        company.value = response.data.data
    } catch (error) {
        console.error('Error fetching company data:', error)
    }
}

const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

const stats = computed(() => [
    {
        title: 'Total Employees',
        value: company.value.employees_count || 'N/A',
        icon: 'bi bi-people text-success fs-4'
    },
    {
        title: 'Years in Business',
        value: company.value.founded_date ? new Date().getFullYear() - new Date(company.value.founded_date).getFullYear() : 'N/A',
        icon: 'bi bi-calendar-check text-success fs-4'
    },
])

const companyDetails = computed(() => [
    {
        label: 'Location',
        value: company.value.location || 'N/A',
        icon: 'bi bi-geo-alt text-muted'
    },
    {
        label: 'Company Type',
        value: company.value.category?.name || 'N/A',
        icon: 'bi bi-building text-muted'
    },
    {
        label: 'Founded Date',
        value: company.value.founded_date ? formatDate(company.value.founded_date) : 'N/A',
        icon: 'bi bi-calendar-event text-muted'
    },
    {
        label: 'Employees',
        value: company.value.employees_count || 'N/A',
        icon: 'bi bi-people text-muted'
    },
    {
        label: 'Email',
        value: company.value.user?.email || 'N/A',
        icon: 'bi bi-envelope text-muted'
    },
    {
        label: 'Phone Number',
        value: company.value.user?.phone || 'N/A',
        icon: 'bi bi-telephone text-muted'
    }
])

const contactCompany = () => {
    console.log('Contacting company...')
}

onMounted(() => {
    fetchCompanyData()
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

.stat-icon {
    width: 48px;
    height: 48px;
}

.btn-success {
    background-color: var(--theme-color);
    border-color: var(--theme-color);
    max-width: 160px;
    height: 45px;
    font-weight: 700;
    font-size: 13px;
}

.btn-success:hover {
    background-color: #FFF;
    border-color: var(--theme-color);
    color: var(--theme-color);
}

.employer-profile {
    font-family: 'Poppins', sans-serif;
    color: #333;
}
</style>