<template>
    <div class="container my-5">
        <h1 class="mb-4">Saved</h1>

        <ul class="nav nav-tabs mb-4" id="savedTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="jobs-tab" data-bs-toggle="tab" data-bs-target="#jobs" type="button"
                    role="tab">Jobs</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="employer-tab" data-bs-toggle="tab" data-bs-target="#employers"
                    type="button" role="tab">Employers</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="freelancer-tab" data-bs-toggle="tab" data-bs-target="#freelancers"
                    type="button" role="tab">Freelancers</button>
            </li>
        </ul>

        <div class="tab-content" id="savedTabsContent">
            <div class="tab-pane fade show active" id="jobs" role="tabpanel">
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
                            <button class="delete-btn">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-pane fade" id="employers" role="tabpanel">
                <div class="row">
                    <div v-for="employer in employers" :key="employer.id" class="col-md-6 mb-4">
                        <div class="employer-card">
                            <div class="employer-info">
                                <img :src="employer.logo" alt="Logo" class="employer-logo" />
                                <div>
                                    <h3>{{ employer.name }}</h3>
                                    <div class="rating">
                                        <span class="stars">
                                            <i v-for="i in 5" :key="i" class="bi"
                                                :class="i <= Math.round(employer.rating) ? 'bi-star-fill text-warning' : 'bi-star'">
                                            </i>
                                        </span>
                                        <span class="review-count ms-2">{{ employer.reviewCount }} Review{{
                                            employer.reviewCount !== 1 ? 's' : '' }}</span>
                                    </div>
                                    <p class="employer-location">{{ employer.location }}</p>
                                    <p class="open-projects">Open Project{{ employer.openProjects !== 1 ? 's' : '' }} –
                                        {{ employer.openProjects }}</p>
                                </div>
                            </div>
                            <button class="delete-btn">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-pane fade" id="freelancers" role="tabpanel">
                <div class="row">
                    <div v-for="freelancer in freelancers" :key="freelancer.id" class="col-md-6 mb-4">
                        <div class="freelancer-card">
                            <div class="freelancer-info">
                                <img :src="freelancer.avatar" alt="Avatar" class="freelancer-avatar" />
                                <div>
                                    <h3>{{ freelancer.name }}</h3>
                                    <p class="freelancer-title">{{ freelancer.title }}</p>
                                    <div class="rating">
                                        <span class="stars">
                                            <i v-for="i in 5" :key="i" class="bi"
                                                :class="i <= Math.round(freelancer.rating) ? 'bi-star-fill text-warning' : 'bi-star'">
                                            </i>
                                        </span>
                                        <span class="review-count ms-2">({{ freelancer.reviewCount }} Review{{
                                            freelancer.reviewCount !== 1 ? 's' : '' }})</span>
                                    </div>
                                    <div class="skills">
                                        <span v-for="skill in freelancer.skills" :key="skill" class="skill-badge">{{
                                            skill }}</span>
                                    </div>
                                    <div class="freelancer-location">
                                        <p><strong>Location:</strong> {{ freelancer.location }}</p>
                                        <p><strong>{{ freelancer.rate }}</strong> / hr</p>
                                    </div>
                                    <button class="view-profile-btn">View Profile</button>
                                </div>
                            </div>
                            <button class="delete-btn">
                                <i class="bi bi-trash"></i>
                            </button>
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
                },
                {
                    id: 4,
                    title: 'Finance Manager & Health',
                    company: 'MediaAZ',
                    salary: '$350 - $380 / month',
                    category: 'Music & Audio',
                    type: 'Temporary',
                    location: 'New York',
                    logo: '/img/upwork-logo.png'
                },
                {
                    id: 5,
                    title: 'General Ledger Accountant',
                    company: 'DesignBlue',
                    salary: '$8 - $12 / day',
                    category: 'Business',
                    type: 'Full Time',
                    location: 'New York',
                    logo: '/img/upwork-logo.png'
                },
                {
                    id: 6,
                    title: 'Product Designer',
                    company: 'APInter',
                    salary: '$120 - $150 / week',
                    category: 'Writing & Translation',
                    type: 'Internship',
                    location: 'New York',
                    logo: '/img/upwork-logo.png'
                },
            ],
            employers: [
                {
                    id: 1,
                    name: 'MediaAZ',
                    rating: 4.0,
                    reviewCount: 1,
                    location: 'Los Angeles',
                    openProjects: 1,
                    logo: '/img/upwork-logo.png'
                },
                {
                    id: 2,
                    name: 'ABConsult',
                    rating: 5.0,
                    reviewCount: 1,
                    location: 'New York',
                    openProjects: 0,
                    logo: '/img/upwork-logo.png'
                },
                {
                    id: 3,
                    name: 'NetTrue',
                    rating: 5.0,
                    reviewCount: 1,
                    location: 'Los Angeles',
                    openProjects: 0,
                    logo: '/img/upwork-logo.png'
                },
                {
                    id: 4,
                    name: 'DesignBlue',
                    rating: 0.0,
                    reviewCount: 0,
                    location: 'New York',
                    openProjects: 1,
                    logo: '/img/upwork-logo.png'
                },
                {
                    id: 5,
                    name: 'APInter',
                    rating: 3.0,
                    reviewCount: 0,
                    location: 'New York',
                    openProjects: 1,
                    logo: '/img/upwork-logo.png'
                },
                {
                    id: 6,
                    name: 'MediaAZ',
                    rating: 4.0,
                    reviewCount: 1,
                    location: 'Los Angeles',
                    openProjects: 1,
                    logo: '/img/upwork-logo.png'
                },
            ], freelancers: [
                {
                    id: 1,
                    name: 'Agent Pakulla',
                    title: 'Nursing Assistant',
                    rating: 4.0,
                    reviewCount: 1,
                    skills: ['Design Writing', 'HTML5', 'Prototyping'],
                    location: 'New York',
                    rate: '$60 - $65',
                    avatar: '/img/upwork-logo.png'
                },
                {
                    id: 2,
                    name: 'Agent Pakulla',
                    title: 'Nursing Assistant',
                    rating: 4.0,
                    reviewCount: 1,
                    skills: ['Design Writing', 'HTML5', 'Prototyping'],
                    location: 'New York',
                    rate: '$60 - $65',
                    avatar: '/img/upwork-logo.png'
                },
                {
                    id: 3,
                    name: 'Agent Pakulla',
                    title: 'Nursing Assistant',
                    rating: 4.0,
                    reviewCount: 1,
                    skills: ['Design Writing', 'HTML5', 'Prototyping'],
                    location: 'New York',
                    rate: '$60 - $65',
                    avatar: '/img/upwork-logo.png'
                },
                {
                    id: 4,
                    name: 'Agent Pakulla',
                    title: 'Nursing Assistant',
                    rating: 4.0,
                    reviewCount: 1,
                    skills: ['Design Writing', 'HTML5', 'Prototyping'],
                    location: 'New York',
                    rate: '$60 - $65',
                    avatar: '/img/upwork-logo.png'
                },
                {
                    id: 5,
                    name: 'Agent Pakulla',
                    title: 'Nursing Assistant',
                    rating: 4.0,
                    reviewCount: 1,
                    skills: ['Design Writing', 'HTML5', 'Prototyping'],
                    location: 'New York',
                    rate: '$60 - $65',
                    avatar: '/img/upwork-logo.png'
                },
                {
                    id: 6,
                    name: 'Agent Pakulla',
                    title: 'Nursing Assistant',
                    rating: 4.0,
                    reviewCount: 1,
                    skills: ['Design Writing', 'HTML5', 'Prototyping'],
                    location: 'New York',
                    rate: '$60 - $65',
                    avatar: '/img/upwork-logo.png'
                },
            ]
        };
    }
};
</script>

<style scoped>
.nav-item,
.nav-link {
    color: black;
}

.job-card,
.employer-card {
    background-color: #ffffff;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
}

.job-info,
.employer-info {
    display: flex;
    align-items: center;
    gap: 15px;
}

.job-logo,
.employer-logo {
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

.delete-btn {
    background-color: #ffece6;
    color: #333;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    cursor: pointer;
}

.delete-btn:hover {
    background-color: #ffd8cc;
}

.delete-btn i {
    font-size: 20px;
}

.rating {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 4px 0;
}

.stars {
    font-weight: bold;
}

.review-count {
    color: #888;
    font-size: 14px;
}

.employer-location,
.open-projects {
    color: #888;
    font-size: 14px;
    margin: 2px 0;
}

.freelancer-card {
    background-color: #ffffff;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
}

.freelancer-info {
    display: flex;
    gap: 15px;
}

.freelancer-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}

.freelancer-title {
    color: #666;
    margin-bottom: 4px;
    font-size: 14px;
}

.skills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 10px 0;
}

.skill-badge {
    background-color: #ffece6;
    font-weight: bold;
    color: #555;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
}

.freelancer-location {
    color: #555;
    font-size: 14px;
    margin: 8px 0;
}

.freelancer-location p {
    margin: 4px 0;
}

.freelancer-location strong {
    color: #333;
}

.view-profile-btn {
    background-color: #dde8e1;
    color: #509a69;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.view-profile-btn:hover {
    background-color: #72b789;
    color: white;
}
</style>