<template>
    <div class="container my-5">
        <h1 class="mb-4">Manage Jobs</h1>
        <div class="row">
            <div v-for="job in jobs" :key="job.id" class="col-md-6 mb-4">
                <div class="job-card">
                    <div class="job-info">
                        <img :src="job.logo" alt="Logo" class="job-logo" />
                        <div>
                            <h3>{{ job.title }}</h3>
                            <p class="company-name">{{ job.company }}</p>
                            <p class="job-details">
                                {{ job.salary }} | {{ job.category }} | {{ job.type }} | {{ job.location }}
                            </p>
                        </div>
                    </div>
                    <div class="job-actions">
                        <button class="accept-btn" data-bs-toggle="modal" :data-bs-target="'#acceptModal' + job.id">Accept</button>
                        <button class="reject-btn" data-bs-toggle="modal" :data-bs-target="'#rejectModal' + job.id">Reject</button>
                    </div>
                </div>

                <div :id="'acceptModal' + job.id" class="modal fade" tabindex="-1" aria-labelledby="acceptModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="acceptModalLabel">Accept Job</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to accept the job <strong>{{ job.title }}</strong>?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="acceptJob(job.id)">Accept</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div :id="'rejectModal' + job.id" class="modal fade" tabindex="-1" aria-labelledby="rejectModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="rejectModalLabel">Reject Job</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to reject the job <strong>{{ job.title }}</strong>?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="rejectJob(job.id)">Reject</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            jobs: [
                {
                    id: 1,
                    title: 'Executive, HR Operations',
                    company: 'NetTrue',
                    salary: '$220 - $250 / week',
                    category: 'Developers',
                    type: 'Temporary',
                    location: 'New York',
                    logo: '/img/upwork-logo.png'
                },
                {
                    id: 2,
                    title: 'General Ledger Accountant',
                    company: 'DesignBlue',
                    salary: '$8 - $12 / day',
                    category: 'Business',
                    type: 'Full Time',
                    location: 'New York',
                    logo: '/img/upwork-logo.png'
                },
                {
                    id: 3,
                    title: 'Product Designer',
                    company: 'APInter',
                    salary: '$120 - $150 / week',
                    category: 'Writing & Translation',
                    type: 'Internship',
                    location: 'New York',
                    logo: '/img/upwork-logo.png'
                }
            ]
        };
    },
    methods: {
        acceptJob(id) {
            console.log(`Job ID ${id} accepted.`);
        },
        rejectJob(id) {
            console.log(`Job ID ${id} rejected.`);
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
