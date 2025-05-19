<template>
  <div class="container px-4 mb-3">
    <div class="p-4 bg-white mb-4 rounded rounded-2">
      <h2 class="fw-bold">Edit Profile</h2>

      <!-- Error/Success Messages -->
      <div v-if="submitError" class="alert alert-danger mt-3">
        Error: {{ submitError }}
      </div>
      <div v-if="submitSuccess" class="alert alert-success mt-3">
        Profile saved successfully!
      </div>

      <div class="row mt-4">
        <div class="col">
          <div class="mb-4">
            <label for="company_name" class="form-label">Company Name *</label>
            <input 
              v-model="formData.company_name" 
              class="form-control" 
              type="text" 
              name="company_name" 
              id="company_name"
              required
            >
          </div>
          
          <div class="mb-4">
            <label for="location" class="form-label">Location</label>
            <input 
              v-model="formData.location" 
              class="form-control" 
              type="text" 
              name="location" 
              id="location"
            >
          </div>

          <div class="mb-4">
            <label for="category" class="form-label">Category *</label>
            <select 
              v-model="formData.category_id" 
              class="form-select" 
              id="category"
              required
            >
              <option value="">Select a category</option>
              <option 
                v-for="category in fetchedCategories" 
                :key="category.id" 
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="col">
          <div class="mb-4">
            <label for="employees_count" class="form-label">Employees</label>
            <input 
              v-model="formData.employees_count" 
              class="form-control" 
              type="number" 
              name="employees_count" 
              id="employees_count"
              min="0"
            >
          </div>
          
          <div class="mb-4">
            <label for="founded_date" class="form-label">Founded At</label>
            <input 
              v-model="formData.founded_date" 
              class="form-control" 
              type="date" 
              name="founded_date" 
              id="founded_date"
            >
          </div>
        </div>

        <div class="form-floating mt-3">
          <textarea 
            v-model="formData.company_description" 
            class="form-control" 
            placeholder="Company description" 
            id="company_description" 
            style="height: 200px"
          ></textarea>
          <label for="company_description">Company Description</label>
        </div>

        <div class="form-floating my-4">
          <textarea 
            v-model="formData.about" 
            class="form-control" 
            placeholder="About the company" 
            id="about" 
            style="height: 200px"
          ></textarea>
          <label for="about">About</label>
        </div>
      </div>
    </div>

    <button 
      @click="getUser" 
      class="btn greenbtn mt-4" 
      style="height: 50px; width:175px"
      :disabled="isLoading"
    >
      {{ isLoading ? 'Saving...' : 'Save Profile' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const fetchedCategories = ref([]);
const submitError = ref(null);
const submitSuccess = ref(false);
const isLoading = ref(false);

const formData = ref({
  company_name: '',
  category_id: '',
  location: '',
  employees_count: '',
  founded_date: '',
  company_description: '',
  about: '',
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

const validateForm = () => {
  if (!formData.value.company_name.trim()) {
    submitError.value = 'Company name is required';
    return false;
  }
  if (!formData.value.category_id) {
    submitError.value = 'Category is required';
    return false;
  }
  if (!formData.value.location.trim()) {
    submitError.value = 'Location is required';
    return false;
  }
  return true;
};

const getUser = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const user_id = JSON.parse(localStorage.getItem('user')).id;
    
    const response = await fetch(`http://127.0.0.1:8000/api/employer-profiles/${user_id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const profileData = await response.json();
    console.log('Fetched Employer Profile:', profileData);
    
    // If you want to see the raw response for debugging:
    console.log('Raw Response:', response);
    
    return profileData;

  } catch (error) {
    console.error('Error fetching employer profile:', error);
    // For more detailed error debugging:
    if (error.response) {
      console.error('Error response:', await error.response.json());
    }
    return null;
  }
};


const submitForm = async () => {
  if (!validateForm()) return;
  
  submitError.value = null;
  submitSuccess.value = false;
  isLoading.value = true;

  try {
    const token = localStorage.getItem('authToken');
    const payload = {
      company_name: formData.value.company_name,
      category_id: formData.value.category_id,
      location: formData.value.location,
      employees_count: formData.value.employees_count || null,
      founded_date: formData.value.founded_date 
        ? new Date(formData.value.founded_date).toISOString().split('T')[0]
        : null,
      company_description: formData.value.company_description || '',
      about: formData.value.about || ''
    };

    const response = await fetch('http://127.0.0.1:8000/api/employer-profiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log(data)
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create profile');
    }

    submitSuccess.value = true;
    console.log('Profile created:', data);
    
  } catch (error) {
    console.error('Submission error:', error);
    submitError.value = error.message;
  } finally {
    isLoading.value = false;
  }
};

onMounted('success',fetchCategories);
onMounted(getUser);
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