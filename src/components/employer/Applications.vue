<template>
    <div class="container my-5">

        <div class="border rounded p-4">
        <h2 class="mb-4 fw-bold">My Job Applications</h2>
            <div class="row mb-4 align-items-center">
                <div class="col-md-6">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search..." v-model="searchQuery">
                        <button class="btn btn-outline-secondary" @click="searchApplications">
                            <i class="bi bi-search"></i>
                        </button>
                    </div>
                </div>
                <div class="col-md-6 text-end">
                    <label class="me-2">Sort by:</label>
                    <select class="form-select d-inline w-auto" v-model="sortOption">
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="status">Status</option>
                    </select>
                </div>
            </div>

            <div class="row fw-bold border-bottom py-2">
                <div class="col-5">Job Details</div>
                <div class="col-3">{{ userRole === 'freelancer' ? 'Employer' : 'Freelancer' }}</div>
                <div class="col-2">Applied On</div>
                <div class="col-2">Status</div>
            </div>

            <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div v-else-if="error" class="alert alert-danger mt-3">
                {{ error }}
            </div>

            <div v-else-if="applications.length === 0" class="text-center py-5">
                <p>No applications found</p>
            </div>

            <div v-else>
                <div v-for="application in filteredApplications" :key="application.id" class="border-bottom py-3">
                    <div class="row align-items-center">
                        <div class="col-5">
                            <div v-if="userRole === 'freelancer'">
                                <h6 class="mb-1">{{ application.job?.position_name }}</h6>
                                <p class="text-muted mb-1 small">
                                    <i class="bi bi-geo-alt me-1"></i>{{ application.job?.location }}
                                </p>
                                <p class="text-muted mb-0 small">
                                    <i class="bi bi-cash me-1"></i>${{ application.job?.offered_salary }}
                                    <i class="bi bi-clock ms-2 me-1"></i>{{ formatJobType(application.job?.type) }}
                                </p>
                            </div>
                            <div v-else>
                                <h6 class="mb-1">{{ application.user?.name }}</h6>
                                <p class="text-muted mb-1 small">
                                    <i class="bi bi-briefcase me-1"></i>
                                    {{ application.user?.freelancer_profile?.job_title || 'Freelancer' }}
                                </p>
                                <!-- <p class="text-muted mb-0 small">
                                    <i class="bi bi-envelope me-1"></i>{{ application.user?.email }}
                                </p> -->
                            </div>
                        </div>

                        <div class="col-3">
                            <div v-if="userRole === 'freelancer'">
                                <p class="mb-1">{{ application.job?.employer_profile?.company_name }}</p>
                                <p class="text-muted small mb-0">
                                    {{ application.job?.employer_profile?.location }}
                                </p>
                            </div>
                            <div v-else>
                                <p class="mb-1">
                                    Applied for: {{ application.job?.position_name }}
                                </p>
                                <p class="text-muted small mb-0">
                                    ${{ application.job?.offered_salary }}
                                </p>
                            </div>
                        </div>

                        <div class="col-2">
                            <p class="mb-0">{{ formatDate(application.created_at) }}</p>
                        </div>

                        <div class="col-2">
                            <select class="form-select form-select-sm" v-model="application.status"
                                @change="updateApplicationStatus(application.id, application.status)"
                                :disabled="userRole !== 'employer'">
                                <option value="pending">Pending</option>
                                <option value="accepted">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    <div class="mt-3">
                        <!-- <button class="btn btn-sm btn-primary" @click="viewApplication(application.id)">
                            <i class="bi bi-eye"></i> View
                        </button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            loading: true,
            error: null,
            applications: [],
            searchQuery: '',
            sortOption: 'newest',
            userRole: 'employer'
        };
    },
    computed: {
        filteredApplications() {
            let filtered = Array.isArray(this.applications) ? [...this.applications] : [];

            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(app => {
                    if (this.userRole === 'freelancer') {
                        return (
                            app.job?.position_name?.toLowerCase().includes(query) ||
                            app.job?.employer_profile?.company_name?.toLowerCase().includes(query) ||
                            app.job?.location?.toLowerCase().includes(query)
                        );
                    } else {
                        return (
                            app.user?.name?.toLowerCase().includes(query) ||
                            app.job?.position_name?.toLowerCase().includes(query) ||
                            app.user?.freelancer_profile?.job_title?.toLowerCase().includes(query)
                        );
                    }
                });
            }

            switch (this.sortOption) {
                case 'newest':
                    filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    break;
                case 'oldest':
                    filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                    break;
                case 'status':
                    filtered.sort((a, b) => a.status.localeCompare(b.status));
                    break;
            }

            return filtered;
        }
    },
    async mounted() {
        await this.fetchApplications();

    },
    methods: {
        async fetchApplications() {
            this.loading = true;
            this.error = null;
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://127.0.0.1:8000/api/employer-applications', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                this.applications = Array.isArray(response.data.employer_applications) ? response.data.employer_applications : [];
            } catch (error) {
                console.error('Error fetching applications:', error);
                this.error = error.response?.data?.message || 'Failed to load applications';
            } finally {
                this.loading = false;
            }
        },
        searchApplications() {
        },
        formatDate(dateString) {
            if (!dateString) return '';
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        },
        formatJobType(type) {
            const types = {
                fulltime: 'Full Time',
                parttime: 'Part Time',
                contract: 'Contract'
            };
            return types[type] || type;
        },
        async updateApplicationStatus(applicationId, status) {
            try {
                const token = localStorage.getItem('authToken');
                await axios.patch(
                    `http://127.0.0.1:8000/api/application-status/${applicationId}`,
                    { status },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const index = this.applications.findIndex(app => app.id === applicationId);
                if (index !== -1) {
                    this.applications[index].status = status;
                }

                this.$toast.success(`Application status updated to ${status}`);
            } catch (error) {
                console.error('Error updating application status:', error);
                this.$toast.error(`Failed to update status: ${error.response?.data?.message || error.message}`);

                const index = this.applications.findIndex(app => app.id === applicationId);
                if (index !== -1) {
                    this.applications[index].status = this.applications[index]._originalStatus;
                }
            }
        },
        viewApplication(applicationId) {
            this.$router.push(`/applications/${applicationId}`);
        }
    }
};
</script>

<style scoped>
.border {
    background-color: white;
}

.form-select-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    height: auto;
}

.btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
}
</style>