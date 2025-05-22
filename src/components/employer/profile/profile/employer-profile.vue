<template>
  <div class="container px-4 mb-3">
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <template v-else>
      <div class="p-4 bg-white mb-4 rounded rounded-2">
        <h2 class="fw-bold">Edit Profile</h2>

        <div v-if="generalError" class="alert alert-danger mt-3">
          Error: {{ generalError }}
        </div>
        <div v-if="generalSuccess" class="alert alert-success mt-3">
          Profile saved successfully!
        </div>

        <div class="row mt-4">
          <div class="col">
            <div class="mb-4">
              <label for="company_name" class="form-label">Company Name *</label>
              <input
                v-model="formData.company_name"
                class="form-control"
                :class="{ 'is-invalid': hasError('company_name'), 'is-valid': isValid('company_name') && validationStates.formSubmitted }"
                type="text"
                id="company_name"
                required
                @input="validateField('company_name')"
                @blur="validateField('company_name', true)"
                maxlength="255"
              >
              <div class="invalid-feedback">
                {{ getErrorMessage('company_name') }}
              </div>
            </div>

            <div class="mb-4">
              <label for="location" class="form-label">Location *</label>
              <input
                v-model="formData.location"
                class="form-control"
                :class="{ 'is-invalid': hasError('location'), 'is-valid': isValid('location') && validationStates.formSubmitted }"
                type="text"
                id="location"
                required
                @input="validateField('location')"
                @blur="validateField('location', true)"
                maxlength="255"
              >
              <div class="invalid-feedback">
                {{ getErrorMessage('location') }}
              </div>
            </div>

            <div class="mb-4">
              <label for="category" class="form-label">Category *</label>
              <select
                v-model="formData.category_id"
                class="form-select"
                :class="{ 'is-invalid': hasError('category_id'), 'is-valid': isValid('category_id') && validationStates.formSubmitted }"
                id="category"
                required
                @change="validateField('category_id')"
                @blur="validateField('category_id', true)"
              >
                <option disabled value="">Select a category</option>
                <option v-for="category in fetchedCategories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
              <div class="invalid-feedback">
                {{ getErrorMessage('category_id') }}
              </div>
            </div>
          </div>

          <div class="col">
            <div class="mb-4">
              <label for="employees_count" class="form-label">Employees</label>
              <input
                v-model="formData.employees_count"
                class="form-control"
                :class="{ 'is-invalid': hasError('employees_count'), 'is-valid': isValid('employees_count') && validationStates.formSubmitted && formData.employees_count !== null && formData.employees_count !== '' }"
                type="number"
                id="employees_count"
                min="0"
                @input="validateField('employees_count')"
                @blur="validateField('employees_count', true)"
              >
              <div class="invalid-feedback">
                {{ getErrorMessage('employees_count') }}
              </div>
            </div>

            <div class="mb-4">
              <label for="founded_date" class="form-label">Founded At</label>
              <input
                v-model="formData.founded_date"
                class="form-control"
                :class="{ 'is-invalid': hasError('founded_date'), 'is-valid': isValid('founded_date') && validationStates.formSubmitted && formData.founded_date !== null && formData.founded_date !== '' }"
                type="date"
                id="founded_date"
                @input="validateField('founded_date')"
                @blur="validateField('founded_date', true)"
              >
              <div class="invalid-feedback">
                {{ getErrorMessage('founded_date') }}
              </div>
            </div>
          </div>

          <div class="form-floating mt-3">
            <textarea
              v-model="formData.company_description"
              class="form-control"
              placeholder="Company description"
              id="company_description"
              style="height: 200px"
              :class="{ 'is-invalid': hasError('company_description'), 'is-valid': isValid('company_description') && validationStates.formSubmitted && formData.company_description !== null && formData.company_description !== '' }"
              @input="validateField('company_description')"
              @blur="validateField('company_description', true)"
              maxlength="1000"
            ></textarea>
            <label for="company_description">Company Description</label>
            <div class="invalid-feedback">
                {{ getErrorMessage('company_description') }}
            </div>
          </div>

          <div class="form-floating my-4">
            <textarea
              v-model="formData.about"
              class="form-control"
              placeholder="About the company"
              id="about"
              style="height: 200px"
              :class="{ 'is-invalid': hasError('about'), 'is-valid': isValid('about') && validationStates.formSubmitted && formData.about !== null && formData.about !== '' }"
              @input="validateField('about')"
              @blur="validateField('about', true)"
              maxlength="2000"
            ></textarea>
            <label for="about">About</label>
            <div class="invalid-feedback">
                {{ getErrorMessage('about') }}
            </div>
          </div>
        </div>
      </div>

      <button @click="submitForm" class="btn greenbtn mt-4" style="height: 50px; width:175px" :disabled="isSaving">
        <span v-if="!isSaving">Save Profile</span>
        <span v-else>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Saving...
        </span>
      </button>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const fetchedCategories = ref([]);
const generalError = ref(null);
const generalSuccess = ref(false);
const isSaving = ref(false);
const isLoading = ref(true);
const user_id = JSON.parse(localStorage.getItem('user')).id;
const isUpdate = ref(null); // Will store profile data if found, null otherwise

const formData = ref({
  company_name: '',
  category_id: '',
  location: '',
  employees_count: null, // Ensure numbers are null, not empty strings
  founded_date: '',
  company_description: '',
  about: '',
});

const validationStates = reactive({
  // Initialize all fields as valid and no messages
  company_name: { isValid: true, message: '' },
  company_description: { isValid: true, message: '' },
  about: { isValid: true, message: '' },
  category_id: { isValid: true, message: '' },
  employees_count: { isValid: true, message: '' },
  founded_date: { isValid: true, message: '' },
  location: { isValid: true, message: '' },
  formSubmitted: false, // Flag to indicate if submission has been attempted
});

// Helper to check if a field has any error (client or server)
const hasError = (field) => {
  return validationStates.formSubmitted && !validationStates[field].isValid;
};

// Helper to check if a field is valid
const isValid = (field) => {
    return validationStates[field].isValid;
};

// Helper to get the error message for a field
const getErrorMessage = (field) => {
  return validationStates[field].message;
};


// Function to validate a specific field based on Laravel rules
const validateField = (field, forceShow = false) => {
  // Clear general messages on user interaction
  generalError.value = null;
  generalSuccess.value = false;

  let isValidLocal = true;
  let message = '';
  const value = formData.value[field];

  switch (field) {
    case 'company_name':
      if (value.trim() === '') {
        isValidLocal = false;
        message = 'Company name is required.';
      } else if (value.length > 255) {
        isValidLocal = false;
        message = 'Company name must not exceed 255 characters.';
      }
      break;
    case 'location':
      if (value.trim() === '') {
        isValidLocal = false;
        message = 'Location is required.';
      } else if (value.length > 255) {
        isValidLocal = false;
        message = 'Location must not exceed 255 characters.';
      }
      break;
    case 'category_id':
      if (!value) { // Check for empty string or null
        isValidLocal = false;
        message = 'Category is required.';
      }
      break;
    case 'employees_count':
      // Nullable, integer, min:0
      if (value !== null && value !== '') { // Only validate if a value is provided
        const num = Number(value);
        if (isNaN(num) || !Number.isInteger(num)) {
          isValidLocal = false;
          message = 'Employees count must be an integer.';
        } else if (num < 0) {
          isValidLocal = false;
          message = 'Employees count must be a positive number.';
        }
      }
      break;
    case 'founded_date':
      // Nullable, date, before_or_equal:today
      if (value) { // Only validate if a value is provided
        const selectedDate = new Date(value);
        const today = new Date();
        // Clear time components for comparison
        selectedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
          isValidLocal = false;
          message = 'Founded date must be today or in the past.';
        }
      }
      break;
    case 'company_description':
      // Nullable, string, max:1000
      if (value && value.length > 1000) {
        isValidLocal = false;
        message = 'Company description must not exceed 1000 characters.';
      }
      break;
    case 'about':
      // Nullable, string, max:2000
      if (value && value.length > 2000) {
        isValidLocal = false;
        message = 'About must not exceed 2000 characters.';
      }
      break;
    // No default, as only explicitly handled fields need validation
  }

  // Only update validation state and message if form has been submitted or forceShow is true (on blur)
  if (validationStates.formSubmitted || forceShow) {
    validationStates[field].isValid = isValidLocal;
    validationStates[field].message = message;
  }
};


// Function to validate all fields for form submission
const validateAllFields = () => {
  validationStates.formSubmitted = true; // Mark form as submitted
  let allValid = true;
  for (const field in formData.value) {
    // Only validate fields for which we have a rule defined in validateField
    // and which are explicitly required or have specific format rules
    if (['company_name', 'location', 'category_id', 'employees_count', 'founded_date', 'company_description', 'about'].includes(field)) {
      validateField(field, true); // Force show validation message
      if (!validationStates[field].isValid) {
        allValid = false;
      }
    }
  }
  return allValid;
};

const fetchCategories = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/categories/');
    if (!response.ok) throw new Error('Failed to fetch categories');
    const data = await response.json();
    fetchedCategories.value = data.data;
  } catch (err) {
    console.error('Categories fetch error:', err);
    toast.error('Failed to load job categories.');
  }
};

const getUser = async () => {
  try {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`http://127.0.0.1:8000/api/employer-profiles/${user_id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const profileData = await response.json();
      console.log('Fetched Employer Profile:', profileData.data);
      isUpdate.value = profileData.data; // Store full profile data if found
      // Bind existing data to the form
      // Ensure numerical fields are numbers and categories are numbers
      formData.value.company_name = profileData.data.company_name || '';
      formData.value.location = profileData.data.location || '';
      formData.value.category_id = profileData.data.category_id || '';
      formData.value.employees_count = profileData.data.employees_count !== null ? Number(profileData.data.employees_count) : null;
      formData.value.founded_date = profileData.data.founded_date ? profileData.data.founded_date.split('T')[0] : '';
      formData.value.company_description = profileData.data.company_description || '';
      formData.value.about = profileData.data.about || '';
      return true;
    } else if (response.status === 404) {
      isUpdate.value = null; // Profile not found, so it's a create operation
      return false;
    } else {
      const errorData = await response.json();
      console.error('Error fetching employer profile:', response.status, errorData);
      toast.error(errorData.message || 'Error fetching employer profile.');
      return false;
    }
  } catch (error) {
    console.error('Network error fetching employer profile:', error);
    toast.error('Network error. Could not fetch profile.');
    return false;
  }
};

const submitForm = async () => {
  generalError.value = null;
  generalSuccess.value = false;

  // Run client-side validation for all fields
  if (!validateAllFields()) {
    toast.error('Please correct the highlighted errors.');
    return;
  }

  isSaving.value = true;

  try {
    const token = localStorage.getItem('authToken');

    // Prepare payload, ensuring nullable fields are null if empty strings or zero
    const payload = {
      company_name: formData.value.company_name,
      category_id: formData.value.category_id,
      location: formData.value.location || null, // required in backend, should not be null after client validation
      employees_count: formData.value.employees_count !== null && formData.value.employees_count !== '' ? Number(formData.value.employees_count) : null,
      founded_date: formData.value.founded_date || null, // Send as null if empty string
      company_description: formData.value.company_description || null,
      about: formData.value.about || null
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    };

    let url = 'http://127.0.0.1:8000/api/employer-profiles';
    let method = 'POST';

    if (isUpdate.value) { // If isUpdate contains profile data, it's an update
      method = 'PUT';
      url = `http://127.0.0.1:8000/api/employer-profiles/${isUpdate.value.id}`;
    }

    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 422 && data.errors) {
        // Handle server-side validation errors
        for (const field in validationStates) {
            if (validationStates.hasOwnProperty(field) && field !== 'formSubmitted') {
                validationStates[field].isValid = true; // Reset valid state initially
                validationStates[field].message = ''; // Clear message
            }
        }

        Object.keys(data.errors).forEach(field => {
          if (validationStates[field]) { // Check if we have a validation state for this field
            validationStates[field].isValid = false;
            validationStates[field].message = data.errors[field][0]; // Use server message
          }
        });
        toast.error('Please correct the validation errors below.');
      } else {
        generalError.value = data.message || `Failed to ${isUpdate.value ? 'update' : 'create'} profile.`;
        toast.error(generalError.value);
      }
      return;
    }

    generalSuccess.value = true;
    toast.success(`Profile ${isUpdate.value ? 'updated' : 'created'} successfully!`);

    // Reset formSubmitted flag and clear client-side error messages on success
    validationStates.formSubmitted = false;
    for (const field in validationStates) {
        if (validationStates.hasOwnProperty(field) && field !== 'formSubmitted') {
            validationStates[field].isValid = true;
            validationStates[field].message = '';
        }
    }

    // After successful creation/update, refetch to ensure isUpdate flag is correct
    // (especially if it was a create operation and now it's an update)
    if (!isUpdate.value) { // If it was a create, now it's an update
      await getUser(); // Re-fetch to set isUpdate.value with the new profile ID
    }

  } catch (error) {
    console.error('Submission error:', error);
    generalError.value = 'Network error or unexpected issue. Please try again.';
    toast.error(generalError.value);
  } finally {
    isSaving.value = false;
  }
};

onMounted(async () => {
  try {
    await Promise.all([fetchCategories(), getUser()]);
  } catch (error) {
    console.error('Initialization error:', error);
    generalError.value = 'Error loading initial data. Please refresh the page.';
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
/* Your existing styles */
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

/* Loading spinner styles (same as freelancer profile) */
.text-center.py-5 {
  padding-top: 3rem !important;
  padding-bottom: 3rem !important;
}

.spinner-border.text-primary {
  width: 3rem;
  height: 3rem;
  border-width: 0.25em;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.2em;
}
</style>