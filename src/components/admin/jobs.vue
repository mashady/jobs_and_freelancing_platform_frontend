<template>
    <div class="container my-5">
        <h1 class="mb-4">Manage Jobs</h1>
        <div v-if="loading" class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else class="row">
            <div v-if="jobs.length === 0" class="col-12">
                <div class="alert alert-info">No pending jobs to review.</div>
            </div>
            <div v-for="job in jobs" :key="job.id" class="col-md-6 mb-4">
                <div class="job-card">
                    <div class="job-info">
                        <img :src="job.employer.logo || '/img/default-logo.png'" alt="Logo" class="job-logo" />
                        <div>
                            <h3>{{ job.position_name }}</h3>
                            <p class="company-name">{{ job.employer.company_name }}</p>
                            <p class="job-details">
                                ${{ job.offered_salary }} | {{ job.category_id }} | {{ job.type }} | {{ job.location }}
                            </p>
                            <p>{{ job.job_description }}</p>
                        </div>
                    </div>
                    <div class="job-actions">
                        <button class="accept-btn" data-bs-toggle="modal"
                            :data-bs-target="'#acceptModal' + job.id">Accept</button>
                        <!-- <button class="reject-btn" data-bs-toggle="modal"
                            :data-bs-target="'#rejectModal' + job.id">Reject</button> -->
                    </div>
                </div>

                <div :id="'acceptModal' + job.id" class="modal fade" tabindex="-1" aria-labelledby="acceptModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="acceptModalLabel">Accept Job</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to accept the job <strong>{{ job.position_name }}</strong>?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal"
                                    @click="acceptJob(job.id)">Accept</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div :id="'rejectModal' + job.id" class="modal fade" tabindex="-1" aria-labelledby="rejectModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="rejectModalLabel">Reject Job</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to reject the job <strong>{{ job.position_name }}</strong>?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                                    @click="rejectJob(job.id)">Reject</button>
                            </div>
                        </div>
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
            jobs: [],
            loading: true,
            error: null
        };
    },
    created() {
        this.fetchJobs();
    },
    methods: {
        async fetchJobs() {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://127.0.0.1:8000/api/jobs/inactive', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                this.jobs = response.data.data;
            } catch (error) {
                this.error = 'Failed to fetch jobs. Please try again later.';
                console.error('Error fetching jobs:', error);
            } finally {
                this.loading = false;
            }
        },
        async acceptJob(id) {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.patch(
                    `http://127.0.0.1:8000/api/jobs/${id}/activate`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                this.jobs = this.jobs.filter(job => job.id !== id);

                const modal = document.createElement('div');
                modal.className = 'modal fade';
                modal.tabIndex = -1;
                modal.innerHTML = `
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Success</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>Job accepted successfully!</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal">OK</button>
                            </div>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);
                const bsModal = new window.bootstrap.Modal(modal);
                bsModal.show();
                modal.addEventListener('hidden.bs.modal', () => {
                    document.body.removeChild(modal);
                });
            } catch (error) {
                console.error('Error accepting job:', error);
                alert('Failed to accept job. Please try again.');
            }
        },
        async rejectJob(id) {
            try {
                const response = await axios.delete(`/api/jobs/${id}`);

                this.jobs = this.jobs.filter(job => job.id !== id);

                alert('Job rejected successfully!');
            } catch (error) {
                console.error('Error rejecting job:', error);
                alert('Failed to reject job. Please try again.');
            }
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: auto;
}

.job-card {
    background-color: #ffffff;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
}

.job-info {
    display: flex;
    align-items: center;
    gap: 15px;
}

.job-logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}

.company-name {
    color: #509a69;
    margin-bottom: 4px;
    font-weight: bold;
}

.job-details {
    color: #888;
    font-size: 14px;
}

.job-actions {
    display: flex;
    gap: 10px;
}

.accept-btn {
    background-color: #72b789;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.accept-btn:hover {
    background-color: #509a69;
}

.reject-btn {
    background-color: #f05454;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.reject-btn:hover {
    background-color: #d43c3c;
}
</style>