<template>
  <div class="container my-5">
    <h1 class="mb-4">My Jobs</h1>

    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else class="border rounded p-4" style="background-color: #FFF;">
      <div class="row mb-4 align-items-center">
        <div class="col-md-4">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search jobs..." v-model="searchQuery"
              @input="filterJobs">
            <button class="btn btn-outline-secondary" @click="filterJobs">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
        <div class="col-md-6 text-start">
          <label class="me-2">Sort by:</label>
          <select class="form-select d-inline w-auto" v-model="sortOption" @change="sortJobs">
            <option value="default">Default</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div class="col-md-2 text-end"> <button class="btn" style="
                      background-color: #5BBB7B;
                      color: #FFF;
                    " @click="openCreateJobModal"> Add Job
          </button>
        </div>
      </div>

      <div v-if="paginatedJobs.length === 0" class="alert alert-info text-center">
        No jobs found. Start by adding a new job!
      </div>

      <div v-else>
        <div class="row fw-bold border-bottom py-2 d-none d-md-flex">
          <div class="col-md-4">Title</div>
          <div class="col-md-2">Type</div>
          <div class="col-md-2">Salary</div>
          <div class="col-md-2">Status</div>
          <div class="col-md-2 text-center">Actions</div>
        </div>

        <div v-for="job in paginatedJobs" :key="job.id" class="row border-bottom py-3 align-items-center job-item">
          <div class="col-12 col-md-4 mb-2 mb-md-0">
            <strong>{{ job.position_name }}</strong><br>
            <small class="text-muted">{{ job.location }}</small>
            <div class="d-md-none mt-1">
              <span class="badge bg-secondary me-1">{{ formatStatus(job.type) }}</span>
              <span class="badge bg-info">${{ job.offered_salary }}</span>
            </div>
          </div>
          <div class="col-6 col-md-2 d-none d-md-block">{{ formatStatus(job.type) }}</div>
          <div class="col-6 col-md-2 d-none d-md-block">${{ job.offered_salary }}</div>
          <div class="col-6 col-md-2 mb-2 mb-md-0">
            <span class="badge" :class="statusClass(job.status)">
              {{ formatStatus(job.status) }}
            </span>
            <br v-if="!job.is_active" class="d-md-none"> <span v-if="!job.is_active" class="badge  ms-md-2 mt-1 mt-md-0"
              style="
        background: #F1FAFF !important;
    color: #00A3FF !important;
              ">Inactive</span>
            <span v-else class="badge bg-success ms-md-2 mt-1 mt-md-0">Active</span>
          </div>
          <div class="col-6 col-md-2 text-center">
            <div class="d-flex flex-column flex-md-row justify-content-center gap-2">
              <button class="btn text-white" style="
                  background-color: #FFEDE8;
                " @click="editJob(job)" title="Edit Job">
                <i class="bi bi-pencil" style="
                  color:#1F4B3F;
                "></i> <span class="d-md-none">Edit</span>
              </button>
              <button class="btn " style="
                  background-color: #FFEDE8;
                " @click="confirmDelete(job)" title="Delete Job">
                <i class="bi bi-trash" style="
                  color:#1F4B3F;
                "></i> <span class="d-md-none">Delete</span>
              </button>

            </div>
          </div>
        </div>
      </div>


      <nav v-if="totalPages > 1" aria-label="Page navigation">
        <ul class="pagination justify-content-center mt-4">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="changePage(currentPage - 1)">Previous</button>
          </li>
          <li v-for="page in displayedPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
            <button class="page-link" @click="changePage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="changePage(currentPage + 1)">Next</button>
          </li>
        </ul>
      </nav>
    </div>

    <div style="
      margin-top: 70px;
    " class="modal fade" id="createJobModal" tabindex="-1" aria-hidden="true" ref="createJobModal">
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editingJob ? 'Edit Job' : 'Create New Job' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitJob">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="position_name" class="form-label">Position Name*</label>
                  <input type="text" class="form-control" id="position_name" v-model="jobForm.position_name" required>
                </div>
                <div class="col-md-6">
                  <label for="location" class="form-label">Location*</label>
                  <input type="text" class="form-control" id="location" v-model="jobForm.location" required>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="offered_salary" class="form-label">Offered Salary ($)*</label>
                  <input type="number" class="form-control" id="offered_salary" v-model="jobForm.offered_salary" min="0"
                    step="0.01" required>
                </div>
                <div class="col-md-6">
                  <label for="experience_years" class="form-label">Required Experience (years)*</label>
                  <input type="number" class="form-control" id="experience_years" v-model="jobForm.experience_years"
                    min="0" required>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="type" class="form-label">Job Type*</label>
                  <select class="form-select" id="type" v-model="jobForm.type" required>
                    <option value="fulltime">Full-time</option>
                    <option value="parttime">Part-time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="category_id" class="form-label">Category*</label>
                  <select class="form-select" id="category_id" v-model="jobForm.category_id" required>
                    <option value="">Select a category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="mb-3">
                <label for="job_description" class="form-label">Job Description*</label>
                <textarea class="form-control" id="job_description" rows="3" v-model="jobForm.job_description"
                  required></textarea>
              </div>

              <div class="mb-3">
                <label for="job_responsibility" class="form-label">Job Responsibilities*</label>
                <textarea class="form-control" id="job_responsibility" rows="3" v-model="jobForm.job_responsibility"
                  required></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label">Required Skills*</label>
                <div>
                  <div class="d-flex flex-wrap gap-2 mb-2">
                    <span v-for="(skill, index) in jobForm.skills" :key="index"
                      class="badge bg-primary d-flex align-items-center">
                      {{ skill }}
                      <button type="button" class="btn-close btn-close-white ms-2" @click="removeSkill(index)"
                        aria-label="Remove skill"></button>
                    </span>
                  </div>
                  <div class="input-group">
                    <input type="text" class="form-control" v-model="newSkill" placeholder="Add skill"
                      @keydown.enter.prevent="addSkill">
                    <button class="btn" style="
                      background-color: #5BBB7B;
                      color: #FFF;
                    " type="button" @click="addSkill">
                      Add
                    </button>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" class="btn" style="
                      background-color: #5BBB7B;
                      color: #FFF;
                    " :disabled="submitting">
                  <span v-if="submitting" class="spinner-border spinner-border-sm" role="status"></span>
                  {{ editingJob ? 'Update Job' : 'Create Job' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="deleteConfirmationModal" tabindex="-1" aria-hidden="true" ref="deleteConfirmationModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Delete</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete the job "{{ jobToDelete?.position_name }}"?</p>
            <p class="text-danger">This action cannot be undone.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="deleteJob" :disabled="deleting">
              <span v-if="deleting" class="spinner-border spinner-border-sm" role="status"></span>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import axios from 'axios'
import { useToast } from 'vue-toastification' // Assuming you have vue-toastification installed and configured

export default {
  name: 'EmployerJobs',
  data() {
    return {
      loading: true,
      jobs: [], // Holds all fetched jobs
      filteredJobs: [], // Jobs after search/filter/sort
      searchQuery: '',
      sortOption: 'default', // 'default', 'newest', 'oldest'
      currentPage: 1,
      itemsPerPage: 5, // Changed to 5 for easier testing of pagination
      totalPages: 1,
      showCreateModal: false, // This prop is watched to control modal visibility
      createJobModal: null,
      deleteConfirmationModal: null,
      jobToDelete: null,
      deleting: false,
      editingJob: null, // Stores the job object when editing
      submitting: false, // For create/update submission loading state
      categories: [],
      newSkill: '',
      jobForm: {
        position_name: '',
        location: '',
        offered_salary: null, // Initialize as null or 0 for number inputs
        job_description: '',
        job_responsibility: '',
        experience_years: null, // Initialize as null or 0 for number inputs
        type: 'fulltime',
        category_id: '',
        skills: []
      }
    }
  },
  computed: {
    // Calculates which jobs to display based on current page and items per page
    paginatedJobs() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      return this.filteredJobs.slice(startIndex, endIndex)
    },
    displayedPages() {
      const pages = []
      const maxVisiblePages = 5
      let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2))
      let endPage = startPage + maxVisiblePages - 1

      if (endPage > this.totalPages) {
        endPage = this.totalPages
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  watch: {
    showCreateModal(newVal) {
      if (newVal) {
        this.createJobModal.show()
      } else {
        this.createJobModal.hide()
      }
    },
    // Watch for changes in filteredJobs to recalculate totalPages
    filteredJobs: {
      handler() {
        this.totalPages = Math.ceil(this.filteredJobs.length / this.itemsPerPage);
        // Reset current page if it's out of bounds after filtering
        if (this.currentPage > this.totalPages && this.totalPages > 0) {
          this.currentPage = this.totalPages;
        } else if (this.totalPages === 0) {
          this.currentPage = 1;
        }
      },
      immediate: true // Run handler immediately on component creation
    }
  },
  setup() {
    // Initialize Toast (assuming vue-toastification setup)
    const toast = useToast()
    return { toast }
  },
  created() {
    this.fetchJobs()
    this.fetchCategories()
  },
  mounted() {
    this.createJobModal = new Modal(this.$refs.createJobModal)
    this.deleteConfirmationModal = new Modal(this.$refs.deleteConfirmationModal)

    // Listen for modal close events to reset form
    this.$refs.createJobModal.addEventListener('hidden.bs.modal', () => {
      this.showCreateModal = false
      this.resetForm()
    })
  },
  methods: {
    async fetchJobs() {
      try {
        this.loading = true;
        const token = localStorage.getItem('authToken');

        if (!token) {
          this.toast.error('Authentication token not found. Please log in.');
          this.loading = false;
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/myJobs', {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        });

        // --- ADD THIS LOG ---
        console.log('API Response for myJobs:', response.data);
        console.log('Raw Jobs fetched:', response.data.data);
        // --------------------

        this.jobs = response.data.data;
        this.filterAndSortJobs(); // Apply initial filter and sort
      } catch (error) {
        // ... (your existing error handling)
      } finally {
        this.loading = false;
      }
    },

    async fetchCategories() {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) return; // Don't fetch categories if no token

        const response = await axios.get('http://127.0.0.1:8000/api/categories',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        this.categories = response.data.data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },

    // Centralized function to apply all filters and sorts
    filterAndSortJobs() {
      let tempJobs = [...this.jobs]; // Start with a copy of all jobs

      // --- ADD THIS LOG ---
      console.log('Jobs before filtering:', tempJobs.length);
      // --------------------

      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        tempJobs = tempJobs.filter(job =>
          job.position_name.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          (job.skills && job.skills.some(skill => skill.name.toLowerCase().includes(query)))
        );
      }

      // --- ADD THIS LOG ---
      console.log('Jobs after search filter (query:', this.searchQuery, '):', tempJobs.length);
      // --------------------

      // Apply sorting
      if (this.sortOption === 'newest') {
        tempJobs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      } else if (this.sortOption === 'oldest') {
        tempJobs.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      }

      this.filteredJobs = tempJobs;
      // --- ADD THIS LOG ---
      console.log('Jobs after sorting (option:', this.sortOption, '):', this.filteredJobs.length);
      console.log('filteredJobs array content:', this.filteredJobs);
      // --------------------
      this.currentPage = 1; // Reset to first page after filtering/sorting
    },
    filterJobs() {
      this.filterAndSortJobs();
    },
    sortJobs() {
      this.filterAndSortJobs();
    },

    formatStatus(status) {
      return status.split('_').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    },
    statusClass(status) {
      return {
        'open': 'bg-info',
        'in_progress': 'bg-primary',
        'completed': 'bg-success'
      }[status] || 'bg-secondary'
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },
    openCreateJobModal() {
      this.resetForm(); // Ensure form is clean for new job
      this.editingJob = null;
      this.showCreateModal = true;
    },
    editJob(job) {
      this.editingJob = job;
      this.jobForm = {
        position_name: job.position_name,
        location: job.location,
        offered_salary: job.offered_salary,
        job_description: job.job_description,
        job_responsibility: job.job_responsibility,
        experience_years: job.experience_years,
        type: job.type,
        category_id: job.category_id,
        skills: job.skills.map(skill => skill.name) // Map skill objects to just their names
      };
      this.showCreateModal = true;
    },
    confirmDelete(job) {
      this.jobToDelete = job
      this.deleteConfirmationModal.show()
    },
    async deleteJob() {
      try {
        this.deleting = true
        const token = localStorage.getItem('authToken');
        await axios.delete(`http://127.0.0.1:8000/api/jobs/${this.jobToDelete.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.toast.success('Job deleted successfully');
        this.deleteConfirmationModal.hide();
        this.fetchJobs(); // Re-fetch to update the list
      } catch (error) {
        console.error('Error deleting job:', error.response || error);
        let errorMessage = 'Failed to delete job. Please try again.';
        if (error.response && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        this.toast.error(errorMessage);
      } finally {
        this.deleting = false;
      }
    },
    async activateJob(jobId) {
      try {
        const token = localStorage.getItem('authToken');
        await axios.post(`http://127.0.0.1:8000/api/jobs/${jobId}/activate`, {}, { // Empty object for POST body
          headers: { Authorization: `Bearer ${token}` }
        });
        this.toast.success('Job activated successfully');
        this.fetchJobs();
      } catch (error) {
        console.error('Error activating job:', error.response || error);
        let errorMessage = 'Failed to activate job. Please try again.';
        if (error.response && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        this.toast.error(errorMessage);
      }
    },
    addSkill() {
      if (this.newSkill.trim() && !this.jobForm.skills.includes(this.newSkill.trim())) {
        this.jobForm.skills.push(this.newSkill.trim())
        this.newSkill = ''
      }
    },
    removeSkill(index) {
      this.jobForm.skills.splice(index, 1)
    },
    resetForm() {
      this.jobForm = {
        position_name: '',
        location: '',
        offered_salary: null, // Reset to null or 0
        job_description: '',
        job_responsibility: '',
        experience_years: null, // Reset to null or 0
        type: 'fulltime',
        category_id: '',
        skills: []
      }
      this.editingJob = null
      this.newSkill = ''
    },
    async submitJob() {
      try {
        this.submitting = true
        const token = localStorage.getItem('authToken');
        const endpoint = this.editingJob
          ? `http://127.0.0.1:8000/api/jobs/${this.editingJob.id}`
          : 'http://127.0.0.1:8000/api/jobs'
        const method = this.editingJob ? 'put' : 'post'

        const response = await axios[method](endpoint, this.jobForm, {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.toast.success(
          this.editingJob ? 'Job updated successfully' : 'Job created successfully'
        );
        this.createJobModal.hide();
        this.fetchJobs(); // Re-fetch to update the list
      } catch (error) {
        console.error('Error submitting job:', error.response || error);
        let errorMessage = 'Failed to submit job. Please try again.';

        if (error.response && error.response.data.errors) {
          // Flatten validation errors into a single string
          errorMessage = Object.values(error.response.data.errors).map(e => e.join(', ')).join(' ');
        } else if (error.response && error.response.data.message) {
          errorMessage = error.response.data.message;
        }

        this.toast.error(errorMessage);
      } finally {
        this.submitting = false;
      }
    }
  }
}
</script>

<style scoped>
/* Your existing styles */


.table {
  background-color: white;
}

.table th {
  font-weight: 600;
  background-color: #f8f9fa;
}

.badge {
  font-size: 0.85em;
  font-weight: 500;
  padding: 0.35em 0.65em;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.modal-content {
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.form-control,
.form-select {
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
}

.input-group-text {
  border-radius: 8px;
}

textarea.form-control {
  min-height: 100px;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

/* New/Adjusted styles for job listing and responsiveness */
.job-item {
  border-bottom: 1px solid #eee;
  padding-top: 15px;
  padding-bottom: 15px;
}

.job-item:last-child {
  border-bottom: none;
}

/* Adjustments for smaller screens */
@media (max-width: 767.98px) {
  .job-item .col-md-2.d-none.d-md-block {
    display: none !important;
  }

  .job-item .col-6.col-md-2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .job-item .col-12.col-md-4 {
    flex-basis: 100%;
  }

  .job-item .col-6.col-md-2.text-center {
    text-align: left !important;
    justify-content: flex-start;
  }

  .job-item .d-flex.flex-column.flex-md-row {
    flex-direction: row !important;
    flex-wrap: wrap;
    gap: 5px;
    /* Adjust gap for mobile buttons */
  }

  .job-item .btn-sm span.d-md-none {
    display: inline;
    /* Show button text on small screens */
  }

  .row.fw-bold.border-bottom.py-2.d-none.d-md-flex {
    display: none !important;
    /* Hide header row on small screens */
  }
}
</style>