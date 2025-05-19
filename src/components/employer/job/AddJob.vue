<template>
  <div class="container px-4 mb-3">
    <div class="p-4 bg-white mb-4 rounded rounded-2">
      <h2 class="fw-bold">{{ isUpdate && jobId ? 'Edit Job' : 'Add New Job' }}</h2>

      <div v-if="submitSuccess" class="alert alert-success mt-3">
        Job {{ isUpdate && jobId ? 'updated' : 'posted' }} successfully!
      </div>

      <div class="row mt-4">
        <div class="col">


          <div class="mb-4">
            <label for="position_name" class="form-label">Position Name *</label>
            <input
              v-model="jobData.position_name"
              class="form-control"
              type="text"
              name="position_name"
              id="position_name"
              required
            >
            <div v-if="fieldErrors.position_name" class="form-text text-danger">{{ fieldErrors.position_name }}</div>
          </div>

          <div class="mb-4">
            <label for="location" class="form-label">Location *</label>
            <input
              v-model="jobData.location"
              class="form-control"
              type="text"
              name="location"
              id="location"
              required
            >
            <div v-if="fieldErrors.location" class="form-text text-danger">{{ fieldErrors.location }}</div>
          </div>

          <div class="mb-4">
            <label for="category" class="form-label">Category *</label>
            <select
              v-model="jobData.category_id"
              class="form-select"
              id="category"
              required
            >
              <option value="" disabled>Select a category</option>
              <option
                v-for="category in fetchedCategories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
            <div v-if="fieldErrors.category_id" class="form-text text-danger">{{ fieldErrors.category_id }}</div>
          </div>

          <div class="mb-4">
            <label for="offered_salary" class="form-label">Salary *</label>
            <input
              v-model="jobData.offered_salary"
              class="form-control"
              type="text"
              name="offered_salary"
              id="offered_salary"
              required
            >
            <div v-if="fieldErrors.offered_salary" class="form-text text-danger">{{ fieldErrors.offered_salary }}</div>
          </div>
        </div>

        <div class="col">
          <div class="mb-4">
            <label for="experience_years" class="form-label">Experience (Years) *</label>
            <input
              v-model="jobData.experience_years"
              class="form-control"
              type="number"
              name="experience_years"
              id="experience_years"
              min="0"
              required
            >
            <div v-if="fieldErrors.experience_years" class="form-text text-danger">{{ fieldErrors.experience_years }}</div>
          </div>

          <div class="mb-4">
            <label for="type" class="form-label">Job Type *</label>
            <select
              v-model="jobData.type"
              class="form-select"
              id="type"
              required
            >
              <option value="">Select job type</option>
              <option value="fulltime">Full-time</option>
              <option value="parttime">Part-time</option>
              <option value="contract">Contract</option>
            </select>
            <div v-if="fieldErrors.type" class="form-text text-danger">{{ fieldErrors.type }}</div>
          </div>

          <div class="mb-4">
            <label for="status" class="form-label">Status</label>
            <select
              v-model="jobData.status"
              class="form-select"
              id="status"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="skills" class="form-label">Skills (comma-separated)</label>
            <input
              v-model="jobData.skillsInput" 
              @blur="handleSkillsInput"
              class="form-control"
              type="text"
              name="skills"
              id="skills"
              placeholder="e.g., PHP, Laravel, MySQL"
            >
          </div>
        </div>

        <div class="form-floating mt-3">
          <textarea
            v-model="jobData.job_description"
            class="form-control"
            placeholder="Job description"
            id="job_description"
            style="height: 200px"
            required
          ></textarea>
          <label for="job_description">Job Description *</label>
          <div v-if="fieldErrors.job_description" class="form-text text-danger">{{ fieldErrors.job_description }}</div>
        </div>

        <div class="form-floating mt-3">
          <textarea
            v-model="jobData.job_responsibility"
            class="form-control"
            placeholder="Job Responsibilities"
            id="job_responsibility"
            style="height: 200px"
            required
          ></textarea>
          <label for="job_responsibility">Job Responsibilities *</label>
          <div v-if="fieldErrors.job_responsibility" class="form-text text-danger">{{ fieldErrors.job_responsibility }}</div>
        </div>
      </div>
    </div>

    <button
      @click="submitJob"
      class="btn greenbtn mt-4"
      style="height: 50px; width:175px"
      :disabled="isLoading"
    >
      {{ isLoading ? 'Saving ...' : (isUpdate && jobId ? 'Update Job' : 'Post Job') }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // Import for accessing route parameters

const route = useRoute();
const fetchedCategories = ref([]);
const fieldErrors = ref({});
const submitSuccess = ref(false);
const isLoading = ref(false);
const user_id = JSON.parse(localStorage.getItem('user')).id;
const jobId = ref(route.params.id || null); // Get job ID from route params
const isUpdate = ref(false);
const employerProfileId = ref(null); // To store the employer profile ID

const jobData = ref({
  employer_id: null, // Will be set after fetching profile
  category_id: '',
  position_name: '',
  location: '',
  offered_salary: '',
  job_description: '',
  experience_years: '',
  status: 'open',
  type: '',
  job_responsibility: '',
  skills: [],
  skillsInput: '' // Temporary input for skills
});

const fetchCategories = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/categories/');
    if (!response.ok) throw new Error('Failed to fetch categories');
    const data = await response.json();
    fetchedCategories.value = data.data;
  } catch (err) {
    console.error('Categories fetch error:', err);
  }
};

const fetchEmployerProfileId = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`http://127.0.0.1:8000/api/employer-profiles/${user_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      employerProfileId.value = data.data.id;
      jobData.value.employer_id = data.data.id; // Set employer ID in job data
      if (jobId.value) {
        isUpdate.value = true;
        fetchJobDetails(); // Fetch job details for editing
      }
    } else {
      console.error('Failed to fetch employer profile');
    }
  } catch (error) {
    console.error('Error fetching employer profile:', error);
  }
};

const fetchJobDetails = async () => {
  if (!jobId.value) return;
  isLoading.value = true;
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`http://127.0.0.1:8000/api/jobs/${jobId.value}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      jobData.value = { ...jobData.value, ...data.data };
      if (data.data.skills) {
        jobData.value.skillsInput = data.data.skills.join(', ');
        jobData.value.skills = [...data.data.skills]; // Ensure skills array is also populated
      }
    } else {
      console.error('Failed to fetch job details');
    }
  } catch (error) {
    console.error('Error fetching job details:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleSkillsInput = () => {
  jobData.value.skills = jobData.value.skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill);
};

const validateJobForm = () => {
  fieldErrors.value = {};
  let isValid = true;


  if (!jobData.value.position_name.trim()) {
    fieldErrors.value.position_name = 'Position name is required';
    isValid = false;
  }
  if (!jobData.value.category_id) {
    fieldErrors.value.category_id = 'Category is required';
    isValid = false;
  }
  if (!jobData.value.location.trim()) {
    fieldErrors.value.location = 'Location is required';
    isValid = false;
  }
  if (!jobData.value.offered_salary) {
    fieldErrors.value.offered_salary = 'Salary is required';
    isValid = false;
  } else if (isNaN(parseFloat(jobData.value.offered_salary))) {
    fieldErrors.value.offered_salary = 'Salary must be a number';
    isValid = false;
  }
  if (!jobData.value.experience_years) {
    fieldErrors.value.experience_years = 'Experience is required';
    isValid = false;
  } else if (isNaN(parseInt(jobData.value.experience_years)) || parseInt(jobData.value.experience_years) < 0) {
    fieldErrors.value.experience_years = 'Experience must be a non-negative number';
    isValid = false;
  }
  if (!jobData.value.type) {
    fieldErrors.value.type = 'Job type is required';
    isValid = false;
  }
  if (!jobData.value.job_description.trim()) {
    fieldErrors.value.job_description = 'Job description is required';
    isValid = false;
  }
  if (!jobData.value.job_responsibility.trim()) {
    fieldErrors.value.job_responsibility = 'Job Responsibilities are required';
    isValid = false;
  }

  return isValid;
};

const submitJob = async () => {
  if (!validateJobForm()) return;

  isLoading.value = true;
  submitSuccess.value = false;

  try {
    const token = localStorage.getItem('authToken');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    };

    let url = 'http://127.0.0.1:8000/api/jobs';
    let method = 'POST';
    const payload = { ...jobData.value }; // Create a payload object

    // Remove the temporary skillsInput from the payload
    delete payload.skillsInput;

    if (isUpdate.value && jobId.value) {
      method = 'PUT';
      url = `http://127.0.0.1:8000/api/jobs/${jobId.value}`;
    }

    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.message || `Failed to ${isUpdate.value ? 'update' : 'post'} job`);
    }

    submitSuccess.value = true;
    jobData.value = { // Reset form after successful submission
      employer_id: employerProfileId.value,
      category_id: '',
      position_name: '',
      location: '',
      offered_salary: '',
      job_description: '',
      experience_years: '',
      status: 'open',
      type: '',
      job_responsibility: '',
      skills: [],
      skillsInput: '' // Reset skills input
    };
    // Optionally redirect the user or show a success message for longer
  } catch (error) {
    console.error('Job submission error:', error);
    // Optionally set an error message to display to the user (you already have submitError)
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchCategories);
onMounted(fetchEmployerProfileId);
</script>

<style scoped>
.greenbtn {
  border: 1px solid transparent;
  background-color: #5bbb7b;
  color: white;
  transition: all 0.3s ease;
}
.greenbtn:hover {
  border: 1px #5bbb7b solid;
  background-color: white;
  color: #5bbb7b;
}
.greenbtn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.alert {
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
}
.alert-danger {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}
.alert-success {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
}
</style>