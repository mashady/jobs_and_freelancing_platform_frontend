<template>
  <div class="container my-5">
    <h1 class="mb-4">My Jobs</h1>

    <div class="border rounded p-4">
      <div class="row mb-4 align-items-center">
        <div class="col-md-4">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search..." v-model="searchQuery">
            <button class="btn btn-outline-secondary" @click="searchJobs">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
        <div class="col-md-6 text-start">
          <label class="me-2">Sort by:</label>
          <select class="form-select d-inline w-auto" v-model="sortOption">
            <option value="default">Default</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div class="col-md-2">
          <router-link to="/employer/addJob">
            <button class="btn btn-outline-secondary" @click="searchJobs">
              Add Job
            </button>
          </router-link>
        </div>
      </div>

      <div class="row fw-bold border-bottom py-2">
        <div class="col-6">Title</div>
        <div class="col-2">Cost/Time</div>
        <div class="col-2">Status</div>
        <div class="col-2">Actions</div>
      </div>

      <div v-for="Job in filteredJobs" :key="Job.id" class="border-bottom py-3">
        <div class="d-flex align-items-center mb-2">
          <img src="/img/upwork-logo.png" alt="Upwork Logo" class="me-3"
            style="width: 40px; height: 40px; border-radius: 8px; object-fit: cover;">
          <h5 class="mb-0">Upwork</h5>
        </div>

        <div class="row align-items-center">
          <div class="col-6">
            <h6 class="mb-1">{{ Job.title }}</h6>
            <p class="text-muted mb-0 small">
              <i class="bi bi-geo-alt me-2"></i>{{ Job.location }}
              <i class="bi bi-calendar ms-2 me-1"></i>{{ Job.date }}
            </p>
          </div>
          <div class="col-2">
            <div class="fw-bold">{{ Job.cost.split(' in ')[0] }}</div>
            <small class="text-muted">in {{ Job.cost.split(' in ')[1] }}</small>
          </div>
          <div class="col-2">
            <span :class="['badge', Job.status.toLowerCase()]">{{ Job.status }}</span>
          </div>
          <div class="col-2">
            <div class="d-flex">
              <button class="custom-btn me-2">
                <i class="bi bi-envelope"></i>
              </button>
              <button class="custom-btn me-2">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="custom-btn">
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
      searchQuery: '',
      sortOption: 'default',
      Jobs: [
        {
          id: 1,
          title: 'Website Designer Required For My Project',
          location: 'Los Angeles',
          date: 'February 24, 2025',
          cost: '$150 in 14 hours',
          status: 'Pending'
        },
        {
          id: 2,
          title: 'Mobile App Development for Fitness App',
          location: 'San Francisco',
          date: 'March 12, 2025',
          cost: '$500 in 30 days',
          status: 'Accepted'
        },
        {
          id: 3,
          title: 'Graphic Design for Marketing Campaign',
          location: 'New York',
          date: 'April 5, 2025',
          cost: '$300 in 10 days',
          status: 'Rejected'
        },
        {
          id: 4,
          title: 'Custom E-commerce Website Development',
          location: 'Chicago',
          date: 'May 1, 2025',
          cost: '$1200 in 45 days',
          status: 'Pending'
        },
        {
          id: 5,
          title: 'SEO Optimization for Online Store',
          location: 'Houston',
          date: 'May 7, 2025',
          cost: '$200 in 7 days',
          status: 'Accepted'
        },
        {
          id: 6,
          title: 'Content Writer for Blog Posts',
          location: 'Miami',
          date: 'June 1, 2025',
          cost: '$100 in 14 days',
          status: 'Pending'
        },
        {
          id: 7,
          title: 'Logo Design for Startup',
          location: 'Seattle',
          date: 'June 10, 2025',
          cost: '$250 in 14 days',
          status: 'Accepted'
        },
        {
          id: 8,
          title: 'Social Media Management',
          location: 'Denver',
          date: 'June 15, 2025',
          cost: '$150 in 14 days',
          status: 'Pending'
        },
      ]
    }
  },
  computed: {
    filteredJobs() {
      let filtered = [...this.Jobs];
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(Job =>
          Job.title.toLowerCase().includes(query) ||
          Job.location.toLowerCase().includes(query)
        );
      }
      switch (this.sortOption) {
        case 'default':
          filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case 'oldest':
          filtered.sort((a, b) => this.extractCost(b.cost) - this.extractCost(a.cost));
          break;
      }
      return filtered;
    }
  },
  methods: {
    extractCost(costString) {
      const match = costString.match(/\$(\d+)/);
      return match ? parseInt(match[1]) : 0;
    },
    searchJobs() {
    }
  }
}
</script>

<style scoped>
.border {
  background-color: white;
}

.badge.pending {
  background-color: #ffe0b2;
  color: #e65100;
  border-radius: 5px;
  width: 80px;
  height: 30px;
  font-size: 15px;

}

.badge.accepted {
  background-color: #ffe0b2;
  color: #2e7d32;
  border-radius: 5px;
  width: 80px;
  height: 30px;
  font-size: 15px;
}

.badge.rejected {
  background-color: #ffe0b2;
  color: #c62828;
  border-radius: 5px;
  width: 80px;
  height: 30px;
  font-size: 15px;
}

.custom-btn {
  background-color: #ffece6;
  color: #333;
  border: none;
  border-radius: 5px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s, transform 0.2s;
}

.custom-btn:hover {
  background-color: #d8b8ae;
  transform: translateY(-3px);
}

.custom-btn i {
  font-size: 20px;
}
</style>
