<template>
  <div class="container my-5">
      <h1 class="mb-4">My Proposals</h1>
      
      <div class="row mb-4 align-items-center">
          <div class="col-md-6">
              <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search..." v-model="searchQuery">
                  <button class="btn btn-outline-secondary" @click="searchProposals">
                      <i class="bi bi-search"></i>
                  </button>
              </div>
          </div>
          <div class="col-md-6 text-end">
              <label class="me-2">Sort by:</label>
              <select class="form-select d-inline w-auto" v-model="sortOption">
                  <option value="default">Default</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>              
              </select>
          </div>
      </div>
      
      <div class="row fw-bold border-bottom py-2">
          <div class="col-6">Title</div>
          <div class="col-2">Cost/Time</div>
          <div class="col-2">Status</div>
          <div class="col-2">Actions</div>
      </div>
      
      <div v-for="proposal in filteredProposals" :key="proposal.id" class="row py-3 border-bottom align-items-center">
            <div class="col-6">
                <h5 class="mb-1">{{ proposal.title }}</h5>
                <small class="text-muted">
                    <i class="bi bi-geo-alt me-1"></i>{{ proposal.location }} &nbsp;
                    <i class="bi bi-calendar-event me-1"></i>{{ proposal.date }}
                </small>
            </div>
            <div class="col-2">
                <span>{{ proposal.cost.split(' in ')[0] }}</span><br>
                <small class="text-muted">in {{ proposal.cost.split(' in ')[1] }}</small>
            </div>
            <div class="col-2">
                <span :class="['badge', proposal.status.toLowerCase()]">{{ proposal.status }}</span>
            </div>
            <div class="col-2 text-end">
                <button class="btn btn-light me-2">
                    <i class="bi bi-envelope"></i>
                </button>
                <button class="btn btn-light me-2">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-light">
                    <i class="bi bi-trash"></i>
                </button>
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
          proposals: [
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
                }
            ]
      }
  },
  computed: {
      filteredProposals() {
          let filtered = [...this.proposals];
          if (this.searchQuery) {
              const query = this.searchQuery.toLowerCase();
              filtered = filtered.filter(proposal => 
                  proposal.title.toLowerCase().includes(query) ||
                  proposal.location.toLowerCase().includes(query)
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
      searchProposals() {
      }
  }
}
</script>

<style scoped>
.badge.pending {
  background-color: #ffe0b2;
  color: #e65100;
}
.badge.accepted {
  background-color: #c8e6c9;
  color: #2e7d32;
}
.badge.rejected {
  background-color: #ffcdd2;
  color: #c62828;
}

</style>
