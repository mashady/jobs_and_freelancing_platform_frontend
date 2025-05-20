<template>
  <div class="container py-4">
    <nav aria-label="breadcrumb">
      <ul class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
        <li class="breadcrumb-item"><router-link to="/jobs">Jobs</router-link></li>
        <li class="breadcrumb-item active">{{ job.position_name }}</li>
      </ul>
    </nav>

    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <!-- <div v-else-if="applicationDn" class="alert alert-danger" role="alert">
      {{ applicationDn }}
    </div> -->
    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-else class="row">
      <div class="col-lg-8">
        <div class="card mb-4" style="
            background-image: url('https://demoapus1.com/freeio/wp-content/uploads/2024/04/project-detail1.jpg');
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 0.5rem;
            height: 250px;
            border:0;
          ">
          <div class="card-body p-4" style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            ">
            <h1 class="card-title mb-4">{{ job.position_name }}</h1>

            <div class="d-flex align-items-center mb-4">
              <div class="d-flex align-items-center me-4">
                <i class="bi bi-geo-alt me-2"></i>
                <span>{{ job.location }}</span>
              </div>
              <div class="d-flex align-items-center me-4">
                <i class="bi bi-calendar me-2"></i>
                <span>{{ formatDate(job.created_at) }}</span>
              </div>
              <div class="d-flex align-items-center">
                <i class="bi bi-eye me-2"></i>
                <span>3340 Views</span>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-md-4 mb-3 mx-auto">
            <div class="d-flex align-items-center">
              <div class="p-3 me-3">
                <i class="bi bi-geo-alt job-icons" style="font-size: 2rem;color: var(--second-color)"></i>
              </div>
              <div>
                <h6 class="mb-1">Location Type</h6>
                <p class="mb-0">{{ job.type === 'remote' ? 'Remote' : 'On-site' }}</p>
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <div class="d-flex align-items-center">
              <div class="p-3 me-3">
                <i class="bi bi-currency-dollar" style="font-size: 2rem;color: var(--second-color)"></i>
              </div>
              <div>
                <h6 class="mb-1">Salary</h6>
                <p class="mb-0">${{ formatSalary(job.offered_salary) }}</p>
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <div class="d-flex align-items-center">
              <div class="p-3 me-3" style="font-size: 2rem;color: var(--second-color)">
                <i class="bi bi-clock"></i>
              </div>
              <div>
                <h6 class="mb-1">Experience</h6>
                <p class="mb-0">{{ job.experience_years }} years</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h2 class="mb-3">Job Description</h2>
          <p class="text-muted" v-html="job.job_description"></p>
        </div>

        <div class="mb-4" v-if="job.job_responsibility">
          <h2 class="mb-3">Job Responsibilities</h2>
          <p class="text-muted" v-html="job.job_responsibility"></p>
        </div>

        <div class="mb-4" v-if="job.skills && job.skills.length > 0">
          <h2 class="mb-4">Skills Required</h2>
          <div class="d-flex flex-wrap gap-2">
            <span v-for="(skill, index) in job.skills" :key="index" class="badge rounded-pill text-dark"
              style="background-color: #f8e8e8; padding: 10px 15px;">
              {{ skill.name }}
            </span>
          </div>
        </div>

        <!-- Moved comment section inside the main content column -->
        <div class="mb-4">
          <h2 class="mb-4">Leave a Comment</h2>
          <textarea v-model="commentText" class="form-control mb-3" rows="4"
            placeholder="Write your comment here..."></textarea>
          <button @click="submitComment" class="btn btn-success">Submit Comment</button>
          <p v-if="submitStatus" class="mt-3">{{ submitStatus }}</p>
        </div>

      </div>

      <div class="col-lg-4">
        <div class="position-sticky" style="top: 20px;max-width: 350px;">
          <div class="card mb-4" style="
              box-shadow: 0 6px 15px 0 rgba(64, 79, 104, 0.05);
              border-radius: 8px;
              border: 1px solid #E9E9E9;">
            <div class="card-body p-4">
              <h2 class="mb-2 fw-bold" style="font-size: 1.8rem;">${{ formatSalary(job.offered_salary) }}</h2>
              <p class="mb-4">Annual salary</p>
              <button v-if="job.user_role === 'freelancer'" @click="openApplyModal"
                class="btn btn-success w-100 d-flex align-items-center justify-content-center">
                <span>Apply Now</span>
                <i class="bi bi-arrow-up-right ms-2"></i>
              </button>
            </div>
          </div>

          <div class="card" style="
              box-shadow: 0 6px 15px 0 rgba(64, 79, 104, 0.05);
              border-radius: 8px;
              border: 1px solid #E9E9E9;">
            <div class="card-body p-4">
              <h5 class="mb-4">About Employer</h5>

              <div class="d-flex align-items-center mb-3">
                <div class="me-3">
                  <div class="bg-light text-center p-3 rounded-circle" style="width: 60px; height: 60px;">
                    <i class="bi bi-building" style="font-size: 1.5rem; color: var(--theme-color);"></i>
                  </div>
                </div>
                <div>
                  <h6 class="mb-1">{{ job.employer.company_name }}</h6>
                  <p class="mb-0 small">{{ job.employer.employees_count }} employees</p>

                </div>
              </div>

              <div class="row mb-4">
                <div class="col-12 mb-2">
                  <div class="fw-bold small">Location</div>
                  <div>{{ job.employer.location }}</div>
                </div>
                <div class="col-12 mb-2">
                  <div class="fw-bold small">Employees</div>
                  <div>{{ job.employer.employees_count }}</div>
                </div>
                <div class="col-12">
                  <div class="fw-bold small">Founded</div>
                  <div>{{ formatDate(job.employer.founded_date) }}</div>
                </div>
              </div>

              <button class="btn btn-outline-success w-100 d-flex align-items-center justify-content-center">
                <span>Contact Employer</span>
                <i class="bi bi-arrow-up-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showApplyModal" class="modal-backdrop fade show"></div>

    <div class="modal fade" :class="{ 'show d-block': showApplyModal }" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Apply for {{ job.position_name }}</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitApplication">
              <div class="mb-3">
                <label for="coverLetter" class="form-label">Cover Letter</label>
                <textarea class="form-control" id="coverLetter" rows="5" v-model="application.cover_letter"
                  placeholder="Explain why you're a good fit for this position..." required></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label">Upload CV (doc, docx, pdf)</label>
                <input type="file" class="form-control" accept=".doc,.docx,.pdf" @change="handleFileUpload"
                  ref="fileInput" required>
                <div class="form-text">Max file size: 5MB</div>
              </div>

              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="termsCheck" v-model="application.accepted_terms"
                  required>
                <label class="form-check-label" for="termsCheck">
                  I accept the <a href="#" @click.prevent="openTermsModal">Terms and Conditions</a> and <a href="#"
                    @click.prevent="openPrivacyModal">Privacy Policy</a>
                </label>
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-success" :disabled="isSubmitting">
                  <span v-if="!isSubmitting">Submit Application</span>
                  <span v-else>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Submitting...
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showTermsModal" class="modal-backdrop fade show"></div>

    <div class="modal fade" :class="{ 'show d-block': showTermsModal }" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Terms and Conditions</h5>
            <button type="button" class="btn-close" @click="showTermsModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="terms-content">
              <h4>1. General Terms</h4>
              <p>By applying for this position, you agree to the following terms and conditions...</p>

              <h4>2. Application Process</h4>
              <p>All applications will be reviewed by our HR team. We may contact you for additional information...</p>

              <h4>3. Data Collection</h4>
              <p>We collect your personal data for recruitment purposes only. Your data will be stored securely...</p>

              <h4>4. Confidentiality</h4>
              <p>All application materials will be treated as confidential...</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showTermsModal = false">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showPrivacyModal" class="modal-backdrop fade show"></div>

    <div class="modal fade" :class="{ 'show d-block': showPrivacyModal }" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Privacy Policy</h5>
            <button type="button" class="btn-close" @click="showPrivacyModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="privacy-content">
              <h4>1. Information We Collect</h4>
              <p>During the application process, we collect your personal information including...</p>

              <h4>2. How We Use Your Information</h4>
              <p>Your information will be used solely for recruitment purposes...</p>

              <h4>3. Data Protection</h4>
              <p>We implement appropriate security measures to protect your personal data...</p>

              <h4>4. Your Rights</h4>
              <p>You have the right to access, correct, or delete your personal information...</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showPrivacyModal = false">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';


const commentText = ref('');
const submitStatus = ref('');

async function submitComment() {
  if (!commentText.value.trim()) {
    submitStatus.value = 'Please enter a comment before submitting.';
    return;
  }

  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch('http://localhost:8000/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify({
        content: commentText.value,
        job_id: job.value.id
      }),
    });

    if (!response.ok) throw new Error('Failed to submit comment');

    submitStatus.value = 'Comment submitted successfully!';
    commentText.value = '';
  } catch (error) {
    submitStatus.value = 'Error submitting comment. Please try again later.';
    console.error(error);
  }
}

const route = useRoute();
const job = ref({});
const isLoading = ref(true);
const error = ref(null);
const applicationDn = ref(null);


const showApplyModal = ref(false);
const showTermsModal = ref(false);
const showPrivacyModal = ref(false);
const isSubmitting = ref(false);
const fileInput = ref(null);

const application = ref({
  job_id: null,
  cover_letter: '',
  resume_path: null,
  accepted_terms: false
});

const fetchJobDetails = async () => {
  try {
    isLoading.value = true;
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`http://127.0.0.1:8000/api/jobs/${route.params.id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    });

    job.value = response.data.data;
    application.value.job_id = job.value.id;
    isLoading.value = false;
  } catch (err) {
    error.value = 'Failed to load job details. Please try again.';
    isLoading.value = false;
    console.error('Error fetching job details:', err);
  }
};

const openApplyModal = () => {
  showApplyModal.value = true;
};

const openTermsModal = () => {
  showTermsModal.value = true;
};

const openPrivacyModal = () => {
  showPrivacyModal.value = true;
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit. Please choose a smaller file.');
      event.target.value = '';
      return;
    }
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a document file (PDF, DOC, or DOCX).');
      event.target.value = '';
      return;
    }
    application.value.resume_path = file;
  }
};

const closeModal = () => {
  showApplyModal.value = false;
  application.value.cover_letter = '';
  application.value.resume_path = null;
  application.value.accepted_terms = false;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const submitApplication = async () => {
  if (!application.value.accepted_terms) {
    alert('Please accept the Terms and Conditions and Privacy Policy');
    return;
  }

  if (!application.value.resume_path) {
    alert('Please upload your CV');
    return;
  }

  isSubmitting.value = true;

  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('You need to be logged in to apply for jobs');
    }

    const formData = new FormData();

    formData.append('job_id', application.value.job_id);
    formData.append('cover_letter', application.value.cover_letter);
    formData.append('resume_path', application.value.resume_path);

    const response = await axios.post('http://127.0.0.1:8000/api/job-applications', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });


    alert('Application submitted successfully!');
    closeModal();
  } catch (error) {
    console.error('Error submitting application:', error);
    let errorMessage = 'Failed to submit application. Please try again.';
    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = 'You need to be logged in to apply for jobs';
      } else if (error.response.data.message) {
        errorMessage = error.response.data.message;
      }
    }
    alert(errorMessage);
  } finally {
    isSubmitting.value = false;
  }
};

const formatSalary = (salary) => {
  if (!salary) return 'Not specified';
  return parseFloat(salary).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};

const formatDate = (dateString) => {
  if (!dateString) return 'Not specified';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

onMounted(() => {
  fetchJobDetails();
});
</script>

<style scoped>
.breadcrumb {
  padding: 0.75rem 0;
}

.breadcrumb-item a {
  color: #222;
  text-decoration: none;
}

.breadcrumb-item.active {
  color: #6c757d;
}

.job-icons {
  color: var(--second-color);
}

h2 {
  font-size: 20px;
}

.btn-success {
  background-color: var(--theme-color);
  border-color: var(--theme-color);
  max-width: 300px;
  height: 60px;
  font-weight: 700;
  font-size: 0.9375rem;
}

.btn-success:hover {
  background-color: #FFF;
  border-color: var(--theme-color);
  color: var(--theme-color);
  max-width: 300px;
  height: 60px;
  font-weight: 700;
  font-size: 0.9375rem;
}

.btn-outline-success {
  background-color: #FFF;
  border-color: var(--theme-color);
  max-width: 300px;
  height: 60px;
  font-weight: 700;
  font-size: 0.9375rem;
}

.btn-outline-success:hover {
  background-color: var(--theme-color);
  border-color: var(--theme-color);
  max-width: 300px;
  height: 60px;
  font-weight: 700;
  font-size: 0.9375rem;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: none;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
}

.modal.show {
  display: block;
}

.modal-dialog {
  position: relative;
  width: auto;
  margin: 0.5rem;
  pointer-events: none;
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}

.modal-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
}

.modal-title {
  margin-bottom: 0;
  line-height: 1.5;
}

.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
}

.modal-footer {
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);
}

.terms-content h4,
.privacy-content h4 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: var(--theme-color);
}

.terms-content p,
.privacy-content p {
  margin-bottom: 1rem;
  color: #495057;
}

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 500px;
    margin: 1.75rem auto;
  }

  .modal-lg {
    max-width: 800px;
  }
}

@media (min-width: 992px) {
  .position-sticky {
    position: sticky;
    top: 20px;
  }
}

.alert {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.alert-success {
  background-color: #d1e7dd;
  color: #0f5132;
  border-color: #badbcc;
}

.alert-danger {
  background-color: #f8d7da;
  color: #842029;
  border-color: #f5c2c7;
}

.btn-close {
  padding: 0.5rem 0.5rem;
}
</style>