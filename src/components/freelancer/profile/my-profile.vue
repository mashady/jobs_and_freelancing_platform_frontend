<template>
  <div class="p-4 bg-white mb-4 rounded rounded-2">
    <h2 class="fw-bold">Edit Profile</h2>
    <div class="row mt-4">
      <div class="col">
        <div class="mb-4">
          <label for="name" class="form-label">Full Name</label>
          <input
            :value="modelValue.user ? modelValue.user.name : ''"
            @input="updateField('user.name', $event.target.value)"
            @blur="validateField('user.name')"
            class="form-control"
            :class="{ 'is-invalid': errors['user.name'] }"
            type="text"
            name="name"
            id="name"
          >
          <div v-if="errors['user.name']" class="invalid-feedback">
            {{ errors['user.name'] }}
          </div>
        </div>

        <div class="mb-4">
          <label for="address" class="form-label">Address</label>
          <input
            :value="modelValue.address"
            @input="updateField('address', $event.target.value)"
            @blur="validateField('address')"
            class="form-control"
            :class="{ 'is-invalid': errors.address }"
            type="text"
            name="address"
            id="address"
          >
          <div v-if="errors.address" class="invalid-feedback">
            {{ errors.address }}
          </div>
        </div>

        <div class="mb-4">
          <label for="email" class="form-label">Email</label>
          <input
            :value="modelValue.email"
            @input="updateField('email', $event.target.value)"
            @blur="validateField('email')"
            class="form-control"
            :class="{ 'is-invalid': errors.email }"
            type="email"
            name="email"
            id="email"
          >
          <div v-if="errors.email" class="invalid-feedback">
            {{ errors.email }}
          </div>
        </div>

        <div class="mb-4">
          <label for="birth_date" class="form-label">Birth Date</label>
          <input
            :value="modelValue.birth_date"
            @input="updateField('birth_date', $event.target.value)"
            @blur="validateField('birth_date')"
            class="form-control"
            :class="{ 'is-invalid': errors.birth_date }"
            type="date"
            name="birth_date"
            id="birth_date"
          >
          <div v-if="errors.birth_date" class="invalid-feedback">
            {{ errors.birth_date }}
          </div>
        </div>

        <div class="mb-4">
          <label for="min_hourly_rate" class="form-label">Minimum per hour rate </label>
          <input
            :value="modelValue.min_hourly_rate"
            @input="updateField('min_hourly_rate', $event.target.value)"
            @blur="validateField('min_hourly_rate')"
            class="form-control"
            :class="{ 'is-invalid': errors.min_hourly_rate }"
            type="number"
            step="0.01"
            name="min_hourly_rate"
            id="min_hourly_rate"
          >
          <div v-if="errors.min_hourly_rate" class="invalid-feedback">
            {{ errors.min_hourly_rate }}
          </div>
        </div>

        <div class="mb-4">
          <label for="category_id">Category</label>
          <select
            :value="modelValue.category_id"
            @change="updateField('category_id', parseInt($event.target.value))"
            @blur="validateField('category_id')"
            class="form-select"
            :class="{ 'is-invalid': errors.category_id }"
            id="category_id"
            name="category_id"
            aria-label="Category"
          >
            <option :value="null" disabled>Select Category</option>
            <option :value="cat.id" v-for="cat in categories" :key="cat.id">{{ cat.name }}</option>
          </select>
          <div v-if="errors.category_id" class="invalid-feedback">
            {{ errors.category_id }}
          </div>
        </div>

        <div class="mb-4">
          <label for="job_title" class="form-label">Job Title</label>
          <input
            :value="modelValue.job_title"
            @input="updateField('job_title', $event.target.value)"
            @blur="validateField('job_title')"
            class="form-control"
            :class="{ 'is-invalid': errors.job_title }"
            type="text"
            name="job_title"
            id="job_title"
          >
          <div v-if="errors.job_title" class="invalid-feedback">
            {{ errors.job_title }}
          </div>
        </div>
      </div>

      <div class="col">
        <div class="mb-4">
          <label for="city" class="form-label">City</label>
          <input
            :value="modelValue.city"
            @input="updateField('city', $event.target.value)"
            @blur="validateField('city')"
            class="form-control"
            :class="{ 'is-invalid': errors.city }"
            type="text"
            name="city"
            id="city"
          >
          <div v-if="errors.city" class="invalid-feedback">
            {{ errors.city }}
          </div>
        </div>

        <div class="mb-4">
          <label for="gender" class="form-label">Gender</label>
          <select
            :value="modelValue.gender"
            @change="updateField('gender', $event.target.value)"
            @blur="validateField('gender')"
            class="form-select"
            :class="{ 'is-invalid': errors.gender }"
            id="gender"
            name="gender"
            aria-label="Gender"
          >
            <option :value="null" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <div v-if="errors.gender" class="invalid-feedback">
            {{ errors.gender }}
          </div>
        </div>

        <div class="mb-4">
          <label for="max_hourly_rate" class="form-label">Maximum per hour rate</label>
          <input
            :value="modelValue.max_hourly_rate"
            @input="updateField('max_hourly_rate', $event.target.value)"
            @blur="validateField('max_hourly_rate')"
            class="form-control"
            :class="{ 'is-invalid': errors.max_hourly_rate }"
            type="number"
            step="0.01"
            name="max_hourly_rate"
            id="max_hourly_rate"
          >
          <div v-if="errors.max_hourly_rate" class="invalid-feedback">
            {{ errors.max_hourly_rate }}
          </div>
        </div>

        <div class="mb-4">
          <label for="english_level">English Level</label>
          <select
            :value="modelValue.english_level"
            @change="updateField('english_level', $event.target.value)"
            @blur="validateField('english_level')"
            class="form-select"
            :class="{ 'is-invalid': errors.english_level }"
            id="english_level"
            name="english_level"
            aria-label="English Level"
          >
            <option :value="null" disabled>Select Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="fluent">Fluent</option>
            <option value="native">Native</option>
          </select>
          <div v-if="errors.english_level" class="invalid-feedback">
            {{ errors.english_level }}
          </div>
        </div>

        <div class="mb-4">
          <label for="payment_method" class="form-label">Payment Method</label>
          <select
            :value="modelValue.payment_method"
            @change="updateField('payment_method', $event.target.value)"
            @blur="validateField('payment_method')"
            class="form-select"
            :class="{ 'is-invalid': errors.payment_method }"
            id="payment_method"
            name="payment_method"
            aria-label="payment_method"
          >
            <option :value="null" disabled>Select Method</option>
            <option value="paypal">Paypal</option>
            <option value="stripe">Stripe</option>
          </select>
          <div v-if="errors.payment_method" class="invalid-feedback">
            {{ errors.payment_method }}
          </div>
        </div>
      </div>
      <div class="form-floating">
        <textarea
          :value="modelValue.bio"
          @input="updateField('bio', $event.target.value)"
          @blur="validateField('bio')"
          class="form-control"
          :class="{ 'is-invalid': errors.bio }"
          name="bio"
          placeholder="Leave a comment here"
          id="bio"
          style="height: 200px"
        ></textarea>
        <label class="ms-2" for="bio">Bio</label>
        <div v-if="errors.bio" class="invalid-feedback d-block">
            {{ errors.bio }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, defineExpose } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      id: null,
      user_id: null,
      category_id: null,
      city: '',
      address: '',
      email: '',
      bio: '',
      gender: '',
      birth_date: '',
      job_title: '',
      min_hourly_rate: null,
      max_hourly_rate: null,
      english_level: '',
      payment_method: '',
      resume: '', // Although resume is in media.vue, it's also part of the main profile object
      user: {
        name: '',
      },
    }),
  },
  categories: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue', 'validation-change']);

const errors = ref({}); // Stores errors for this component

// Helper to update nested properties in modelValue
const updateField = (path, value) => {
  const newModelValue = { ...props.modelValue };
  const parts = path.split('.');
  let current = newModelValue;

  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;

  emit('update:modelValue', newModelValue);
  validateField(path); // Validate immediately on input
};

const validateField = (field) => {
  let value;
  if (field === 'user.name') {
    value = props.modelValue.user ? props.modelValue.user.name : '';
  } else {
    value = props.modelValue[field];
  }

  let errorMessage = '';
  errors.value[field] = ''; // Clear previous error for this field

  switch (field) {
    case 'user.name':
      if (!value) {
        errorMessage = 'The full name is required.';
      } else if (value.length > 255) {
        errorMessage = 'The full name must not be greater than 255 characters.';
      }
      break;
    case 'city':
      if (!value) {
        errorMessage = 'The city is required.';
      } else if (value.length > 255) {
        errorMessage = 'The city must not be greater than 255 characters.';
      }
      break;
    case 'address':
      if (value && value.length > 500) {
        errorMessage = 'The address must not be greater than 500 characters.';
      }
      break;
    case 'email':
      if (!value) {
        errorMessage = 'The email is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { // Basic email regex
        errorMessage = 'The email must be a valid email address.';
      } else if (value.length > 255) {
        errorMessage = 'The email must not be greater than 255 characters.';
      }
      // Note: Unique email check is backend-only.
      break;
    case 'bio':
      if (value && value.length > 1000) {
        errorMessage = 'The bio must not be greater than 1000 characters.';
      }
      break;
    case 'gender':
      const validGenders = ['male', 'female', 'other'];
      if (value && !validGenders.includes(value)) {
        errorMessage = 'The selected gender is invalid.';
      }
      break;
    case 'birth_date':
      if (value) {
        const birthDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (birthDate >= today) { // Laravel is 'before:today' so strictly before
          errorMessage = 'The birth date must be a date before today.';
        }
      }
      break;
    case 'job_title':
      if (!value) {
        errorMessage = 'The job title is required.';
      } else if (value.length > 255) {
        errorMessage = 'The job title must not be greater than 255 characters.';
      }
      break;
    case 'min_hourly_rate':
      if (value === null || value === '' || isNaN(parseFloat(value))) {
        errorMessage = 'The minimum hourly rate is required.';
      } else {
        const numValue = parseFloat(value);
        if (numValue < 0) {
          errorMessage = 'The minimum hourly rate must be at least 0.';
        }
        // max_hourly_rate 'gte' validation handled below for combined check
      }
      break;
    case 'max_hourly_rate':
      if (value === null || value === '' || isNaN(parseFloat(value))) {
        errorMessage = 'The maximum hourly rate is required.';
      } else {
        const numValue = parseFloat(value);
        const minRate = parseFloat(props.modelValue.min_hourly_rate);
        if (numValue < 0) { // Though already handled by min_hourly_rate, keep for consistency
          errorMessage = 'The maximum hourly rate must be at least 0.';
        } else if (!isNaN(minRate) && numValue < minRate) {
          errorMessage = 'The maximum hourly rate must be greater than or equal to the minimum hourly rate.';
        }
      }
      break;
    case 'category_id':
      if (value === null || value === undefined || value === '') {
        errorMessage = 'The category is required.';
      }
      // exists:categories,id is implicitly handled by selecting from a valid list (categories prop)
      break;
    case 'english_level':
      const validLevels = ['beginner', 'intermediate', 'advanced', 'fluent', 'native'];
      if (!value) {
        errorMessage = 'The English level is required.';
      } else if (!validLevels.includes(value)) {
        errorMessage = 'The selected English level is invalid.';
      }
      break;
    case 'payment_method':
      const validPayments = ['paypal', 'bank_transfer', 'crypto', 'other']; // Adjusted to match backend
      if (!value) {
        errorMessage = 'The payment method is required.';
      } else if (!validPayments.includes(value)) {
        errorMessage = 'The selected payment method is invalid.';
      }
      break;
  }

  if (errorMessage) {
    errors.value[field] = errorMessage;
    return false;
  }
  return true;
};

const validateAll = () => {
  let isValid = true;
  errors.value = {}; // Clear all previous errors

  const fieldsToValidate = [
    'user.name', 'city', 'address', 'email', 'bio', 'gender',
    'birth_date', 'job_title', 'min_hourly_rate', 'max_hourly_rate',
    'category_id', 'english_level', 'payment_method'
  ];

  for (const field of fieldsToValidate) {
    if (!validateField(field)) {
      isValid = false;
    }
  }

  // Special case for max_hourly_rate and min_hourly_rate cross-validation
  // Re-validate max_hourly_rate after min_hourly_rate in case min_hourly_rate changed
  if (validateField('min_hourly_rate') && !validateField('max_hourly_rate')) {
      isValid = false;
  }


  emit('validation-change', { component: 'my-profile', isValid: isValid });
  return isValid;
};

defineExpose({
  validateAll,
});

// Watch modelValue changes to re-run validation for relevant fields
watch(() => props.modelValue, (newVal, oldVal) => {
    // Only re-validate relevant fields, not the whole form on every change
    // This is a more performant deep watch, but for simpler forms validateAll on change is okay
    // For this component, we'll let individual field watches handle real-time,
    // and `validateAll` for the final submission check.
    // However, for cross-field dependencies (like min/max rate),
    // we should ensure re-validation if either changes.
    if (newVal.min_hourly_rate !== oldVal.min_hourly_rate || newVal.max_hourly_rate !== oldVal.max_hourly_rate) {
        validateField('min_hourly_rate');
        validateField('max_hourly_rate');
    }
}, { deep: true });
</script>

<style scoped>
.form-control:focus {
  border-width: 2px;
  box-shadow: none;
}
.invalid-feedback.d-block { /* For the floating label textarea */
  display: block !important;
}
</style>