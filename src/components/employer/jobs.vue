<template>
  <div class="container my-5">
    <h1 class="mb-4">My Jobs</h1>

    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else class="border rounded p-4">
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

    <div class="modal fade" id="createJobModal" tabindex="-1" aria-hidden="true" ref="createJobModal">
      <div class="modal-dialog modal-lg">
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
                    <button class="btn btn-outline-secondary" type="button" @click="addSkill">
                      Add
                    </button>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary" :disabled="submitting">
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

export default {
  name: 'EmployerJobs',
  data() {
    return {
      loading: true,
      jobs: [],
      filteredJobs: [],
      searchQuery: '',
      statusFilter: 'all',
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 1,
      showCreateModal: false,
      createJobModal: null,
      deleteConfirmationModal: null,
      jobToDelete: null,
      deleting: false,
      editingJob: null,
      submitting: false,
      categories: [],
      newSkill: '',
      jobForm: {
        position_name: '',
        location: '',
        offered_salary: '',
        job_description: '',
        job_responsibility: '',
        experience_years: '',
        type: 'fulltime',
        category_id: '',
        skills: []
      }
    }
  },
  computed: {
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
    }
  },
  created() {
    this.fetchJobs()
    this.fetchCategories()
  },
  mounted() {
    this.createJobModal = new Modal(this.$refs.createJobModal)
    this.deleteConfirmationModal = new Modal(this.$refs.deleteConfirmationModal)

    this.$refs.createJobModal.addEventListener('hidden.bs.modal', () => {
      this.showCreateModal = false
      this.resetForm()
    })
  },
  methods: {
    async fetchJobs() {
      try {
        this.loading = true
        const token = localStorage.getItem('authToken')
        const response = await axios.get('http://127.0.0.1:8000/api/myJobs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(response)
        /* this.jobs = response.data.data
        this.filteredJobs = [...this.jobs]
        this.totalPages = Math.ceil(response.data.total / this.itemsPerPage) */
      } catch (error) {
        console.error('Error fetching jobs:', error)
        this.$toast.error('Failed to load jobs. Please try again.')
      } finally {
        this.loading = false
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('/api/categories')
        this.categories = response.data.data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },
    filterJobs() {
      let filtered = [...this.jobs]

      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(job =>
          job.position_name.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.skills.some(skill => skill.name.toLowerCase().includes(query))
        )
      }

      // Apply status filter
      if (this.statusFilter !== 'all') {
        filtered = filtered.filter(job => job.status === this.statusFilter)
      }

      this.filteredJobs = filtered
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
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.currentPage = page
        this.fetchJobs()
      }
    },
    editJob(job) {
      this.editingJob = job
      this.jobForm = {
        position_name: job.position_name,
        location: job.location,
        offered_salary: job.offered_salary,
        job_description: job.job_description,
        job_responsibility: job.job_responsibility,
        experience_years: job.experience_years,
        type: job.type,
        category_id: job.category_id,
        skills: job.skills.map(skill => skill.name)
      }
      this.showCreateModal = true
    },
    confirmDelete(job) {
      this.jobToDelete = job
      this.deleteConfirmationModal.show()
    },
    async deleteJob() {
      try {
        this.deleting = true
        await axios.delete(`/api/jobs/${this.jobToDelete.id}`)
        this.$toast.success('Job deleted successfully')
        this.fetchJobs()
        this.deleteConfirmationModal.hide()
      } catch (error) {
        console.error('Error deleting job:', error)
        this.$toast.error('Failed to delete job. Please try again.')
      } finally {
        this.deleting = false
      }
    },
    async activateJob(jobId) {
      try {
        await axios.post(`/api/jobs/${jobId}/activate`)
        this.$toast.success('Job activated successfully')
        this.fetchJobs()
      } catch (error) {
        console.error('Error activating job:', error)
        this.$toast.error('Failed to activate job. Please try again.')
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
        offered_salary: '',
        job_description: '',
        job_responsibility: '',
        experience_years: '',
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
        const endpoint = this.editingJob
          ? `/api/jobs/${this.editingJob.id}`
          : '/api/jobs'
        const method = this.editingJob ? 'put' : 'post'

        const response = await axios[method](endpoint, this.jobForm)

        this.$toast.success(
          this.editingJob ? 'Job updated successfully' : 'Job created successfully'
        )
        this.createJobModal.hide()
        this.fetchJobs()
      } catch (error) {
        console.error('Error submitting job:', error)
        let errorMessage = 'Failed to submit job. Please try again.'

        if (error.response && error.response.data.errors) {
          errorMessage = Object.values(error.response.data.errors).join(' ')
        }

        this.$toast.error(errorMessage)
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<style scoped>
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
</style>