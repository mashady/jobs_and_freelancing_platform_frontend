<template>
  <div class="container my-5">
    <h1 class="mb-4">My Job Applications</h1>

    <div class="border rounded p-4">
      <div class="row mb-4 align-items-center">
        <div class="col-md-6">
          <div class="input-group">
            <!-- <input type="text" class="form-control" placeholder="Search..." v-model="searchQuery">
            <button class="btn btn-outline-secondary" @click="searchApplications">
              <i class="bi bi-search"></i>
            </button> -->
          </div>
        </div>
        <div class="col-md-6 text-end">
          <label class="me-2">Sort by:</label>
          <select class="form-select d-inline w-auto" v-model="sortOption">
            <option value="default">Default</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="salary">Salary</option>
          </select>
        </div>
      </div>

      <div class="row fw-bold border-bottom py-2">
        <div class="col-6">Position</div>
        <div class="col-2">Salary/Type</div>
        <div class="col-2">Status</div>
        <!-- <div class="col-2">Actions</div> -->
      </div>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else-if="applications.length === 0" class="text-center py-5">
        <p class="mb-0">No job applications found</p>
      </div>

      <div v-else v-for="application in filteredApplications" :key="application.id" class="border-bottom py-3">
        <!-- <div class="d-flex align-items-center mb-2">
          <div class="company-logo me-3">
            <i class="bi bi-building"></i>
          </div>
          <h5 class="mb-0">{{ getEmployerName(application) }}</h5>
        </div> -->

        <div class="row align-items-center">
          <div class="col-6">
            <h6 class="mb-1">{{ application.job.position_name }}</h6>
            <p class="text-muted mb-0 small">
              <i class="bi bi-geo-alt me-2"></i>{{ application.job.location }}
              <i class="bi bi-calendar ms-2 me-1"></i>{{ formatDate(application.created_at) }}
            </p>
          </div>
          <div class="col-2">
            <div class="fw-bold">${{ formatSalary(application.job.offered_salary) }}</div>
            <small class="text-muted">{{ capitalizeFirstLetter(application.job.type) }}</small>
          </div>
          <div class="col-2">
            <span :class="['badge', application.status.toLowerCase()]">
              {{ capitalizeFirstLetter(application.status) }}
            </span>
          </div>
          <div class="col-2">
            <div class="d-flex">
              <!-- <button class="custom-btn me-2" @click="viewDetails(application.id)" title="View Details">
                <i class="bi bi-eye"></i>
              </button> -->
              <!-- <button class="custom-btn me-2" @click="editApplication(application.id)" title="Edit Application"
                :disabled="application.status === 'accepted' || application.status === 'rejected'">
                <i class="bi bi-pencil"></i>
              </button> -->
              <!-- <button class="custom-btn" @click="confirmDelete(application.id)" title="Delete Application">
                <i class="bi bi-trash"></i>
              </button> -->
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="d-flex justify-content-center mt-4" v-if="pagination && pagination.last_page > 1">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
              <a class="page-link" href="#" @click.prevent="changePage(pagination.current_page - 1)">
                Previous
              </a>
            </li>
            <li v-for="page in paginationRange" :key="page" class="page-item"
              :class="{ active: page === pagination.current_page }">
              <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
              <a class="page-link" href="#" @click.prevent="changePage(pagination.current_page + 1)">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-labelledby="deleteConfirmModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteConfirmModalLabel">Confirm Deletion</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete this job application?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="deleteApplication">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'JobApplications',
  data() {
    return {
      applications: [],
      searchQuery: '',
      sortOption: 'default',
      loading: true,
      pagination: null,
      deleteId: null,
      deleteModal: null
    };
  },
  computed: {
    filteredApplications() {
      let filtered = [...this.applications];

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(app =>
          app.job.position_name.toLowerCase().includes(query) ||
          app.job.location.toLowerCase().includes(query)
        );
      }

      switch (this.sortOption) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          break;
        case 'oldest':
          filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          break;
        case 'salary':
          filtered.sort((a, b) => parseFloat(b.job.offered_salary) - parseFloat(a.job.offered_salary));
          break;
        default:
          // Default sort by newest first
          filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          break;
      }

      return filtered;
    },
    paginationRange() {
      if (!this.pagination) return [];

      const range = [];
      const totalPages = this.pagination.last_page;
      const currentPage = this.pagination.current_page;

      // Always show first and last page, and 3 pages around current page
      for (let i = 1; i <= totalPages; i++) {
        if (
          i === 1 ||
          i === totalPages ||
          (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
          range.push(i);
        }
      }

      return range;
    }
  },
  created() {
    this.fetchApplications();
  },
  mounted() {
    // Initialize Bootstrap modal
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
  },
  methods: {
    async fetchApplications(page = 1) {
      this.loading = true;
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`/api/job-applications?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.success) {
          this.applications = response.data.data.data;
          this.pagination = {
            current_page: response.data.data.current_page,
            last_page: response.data.data.last_page,
            total: response.data.data.total
          };
          console.log(response.data)
        } else {
          console.error('Error fetching job applications');
        }
      } catch (error) {
        console.error('Error fetching job applications:', error);
      } finally {
        this.loading = false;
      }
    },
    searchApplications() {
      // The filtering is handled by the computed property
    },
    changePage(page) {
      if (page < 1 || (this.pagination && page > this.pagination.last_page)) return;
      this.fetchApplications(page);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    },
    formatSalary(salary) {
      return parseFloat(salary).toLocaleString();
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    getEmployerName(application) {
      // This would ideally come from the API, but for now we'll use a placeholder
      return 'Company Name';
    },
    viewDetails(id) {
      // Navigate to application details page
      this.$router.push(`/job-applications/${id}`);
    },
    editApplication(id) {
      // Navigate to edit page
      this.$router.push(`/job-applications/${id}/edit`);
    },
    confirmDelete(id) {
      this.deleteId = id;
      this.deleteModal.show();
    },
    async deleteApplication() {
      if (!this.deleteId) return;

      try {
        const response = await axios.delete(`/api/job-applications/${this.deleteId}`);
        if (response.data.success) {
          // Remove from local array
          this.applications = this.applications.filter(app => app.id !== this.deleteId);
          this.$toast.success('Application deleted successfully');
        } else {
          this.$toast.error('Failed to delete application');
        }
      } catch (error) {
        console.error('Error deleting application:', error);
        this.$toast.error('An error occurred while deleting application');
      } finally {
        this.deleteModal.hide();
        this.deleteId = null;
      }
    }
  }
}
</script>

<style scoped>
.border {
  background-color: white;
}

.badge {
  padding: 0.5rem 0.75rem;
  border-radius: 5px;
  width: 80px;
  height: 30px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

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

.custom-btn {
  background-color: #ffece6;
  color: #333;
  border: none;
  border-radius: 5px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s, transform 0.2s;
}

.custom-btn:hover:not(:disabled) {
  background-color: #d8b8ae;
  transform: translateY(-3px);
}

.custom-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.custom-btn i {
  font-size: 18px;
}

.company-logo {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-logo i {
  font-size: 22px;
  color: #6c757d;
}
</style>