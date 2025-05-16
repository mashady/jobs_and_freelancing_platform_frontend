<template>
  <div class="container-fluid vh-100 bg-light d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow">
            <div class="card-body p-5">
              <h2 class="text-center mb-4">Create Account</h2>
              <p class="text-center text-muted mb-4">Join our platform today</p>

              <form @submit.prevent="handleRegister">
                <div class="mb-3">
                  <label class="form-label">Account Type</label>
                  <div class="d-flex gap-3">
                    <div class="form-check flex-grow-1">
                      <input class="form-check-input" type="radio" name="userType" id="freelancer" value="freelancer"
                        v-model="userType">
                      <label class="form-check-label w-100" for="freelancer">
                        <div class="border p-3 rounded text-center">
                          <i class="bi bi-person-workspace fs-4 d-block mb-2"></i>
                          Freelancer
                        </div>
                      </label>
                    </div>
                    <div class="form-check flex-grow-1">
                      <input class="form-check-input" type="radio" name="userType" id="employer" value="employer"
                        v-model="userType">
                      <label class="form-check-label w-100" for="employer">
                        <div class="border p-3 rounded text-center">
                          <i class="bi bi-briefcase fs-4 d-block mb-2"></i>
                          Employer
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="fullName" class="form-label">Full Name</label>
                    <input type="text" class="form-control" id="fullName" v-model="fullName"
                      :class="{ 'is-invalid': fullNameError }">
                    <div class="invalid-feedback">{{ fullNameError }}</div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" v-model="email"
                      :class="{ 'is-invalid': emailError }">
                    <div class="invalid-feedback">{{ emailError }}</div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="phone" class="form-label">Phone Number</label>
                  <input type="tel" class="form-control" id="phone" v-model="phone"
                    :class="{ 'is-invalid': phoneError }">
                  <div class="invalid-feedback">{{ phoneError }}</div>
                </div>

                <div class="mb-3">
                  <label for="profileImage" class="form-label">Profile Image</label>
                  <input type="file" class="form-control" id="profileImage" @change="handleImageUpload" accept="image/*"
                    :class="{ 'is-invalid': profileImageError }">
                  <div class="invalid-feedback">{{ profileImageError }}</div>
                  <div class="form-text">Max 2MB (JPG, PNG, GIF)</div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="password" class="form-label">Password</label>
                    <div class="input-group">
                      <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password"
                        v-model="password" :class="{ 'is-invalid': passwordError }">
                      <button class="btn btn-outline-secondary" type="button" @click="togglePassword">
                        <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                      </button>
                    </div>
                    <div class="invalid-feedback">{{ passwordError }}</div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                    <div class="input-group">
                      <input :type="showConfirmPassword ? 'text' : 'password'" class="form-control" id="confirmPassword"
                        v-model="confirmPassword" :class="{ 'is-invalid': confirmPasswordError }">
                      <button class="btn btn-outline-secondary" type="button" @click="toggleConfirmPassword">
                        <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                      </button>
                    </div>
                    <div class="invalid-feedback">{{ confirmPasswordError }}</div>
                  </div>
                </div>

                <div class="form-check mb-4">
                  <input class="form-check-input" type="checkbox" id="terms" v-model="agreeToTerms"
                    :class="{ 'is-invalid': termsError }">
                  <label class="form-check-label" for="terms">
                    I agree to the <a href="#" class="text-decoration-none">Terms</a> and
                    <a href="#" class="text-decoration-none">Privacy Policy</a>
                  </label>
                  <div class="invalid-feedback">{{ termsError }}</div>
                </div>

                <div v-if="serverError" class="alert alert-danger">{{ serverError }}</div>

                <button type="submit" class="btn btn-success w-100 py-2" :disabled="isSubmitting">
                  <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                  {{ isSubmitting ? 'Registering...' : 'Register' }}
                </button>

                <div class="text-center">
                  <p class="mb-0">Already have an account?
                    <router-link to="/login" class="text-decoration-none">Login</router-link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const userType = ref('freelancer');
const fullName = ref('');
const email = ref('');
const phone = ref('');
const profileImage = ref(null);
const password = ref('');
const confirmPassword = ref('');
const agreeToTerms = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isSubmitting = ref(false);

const fullNameError = ref('');
const emailError = ref('');
const phoneError = ref('');
const profileImageError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const termsError = ref('');
const serverError = ref('');

const togglePassword = () => showPassword.value = !showPassword.value;
const toggleConfirmPassword = () => showConfirmPassword.value = !showConfirmPassword.value;

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  profileImageError.value = '';

  if (!file) return;

  if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
    profileImageError.value = 'Only JPG, PNG or GIF allowed';
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    profileImageError.value = 'File must be less than 2MB';
    return;
  }

  profileImage.value = file;
};

const validateForm = () => {
  let isValid = true;

  fullNameError.value = '';
  emailError.value = '';
  phoneError.value = '';
  profileImageError.value = '';
  passwordError.value = '';
  confirmPasswordError.value = '';
  termsError.value = '';

  if (!fullName.value.trim()) {
    fullNameError.value = 'Full name is required';
    isValid = false;
  }

  if (!email.value) {
    emailError.value = 'Email is required';
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    emailError.value = 'Invalid email format';
    isValid = false;
  }

  if (!phone.value) {
    phoneError.value = 'Phone is required';
    isValid = false;
  }

  if (!profileImage.value) {
    profileImageError.value = 'Profile image is required';
    isValid = false;
  }

  if (!password.value) {
    passwordError.value = 'Password is required';
    isValid = false;
  } else if (password.value.length < 8) {
    passwordError.value = 'Password must be 8+ characters';
    isValid = false;
  }

  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Passwords do not match';
    isValid = false;
  }

  if (!agreeToTerms.value) {
    termsError.value = 'You must accept the terms';
    isValid = false;
  }

  return isValid;
};

const handleRegister = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  serverError.value = '';

  try {
    const formData = new FormData();
    formData.append('name', fullName.value);
    formData.append('email', email.value);
    formData.append('phone', phone.value);
    formData.append('password', password.value);
    formData.append('password_confirmation', confirmPassword.value);
    formData.append('role', userType.value);
    formData.append('profile_image', profileImage.value);

    const { success, error } = await authStore.register(formData);

    if (success) {
      router.push(userType.value === 'freelancer' ? '/freelancer/dashboard' : '/employer/dashboard');
    } else {
      serverError.value = error || 'Registration failed';
    }
  } catch (err) {
    serverError.value = 'An error occurred. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.bg-light {
  background-color: #f8f9fa !important;
}

.card {
  border: none;
  border-radius: 10px;
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.form-check-input[type="radio"]:checked+label>div {
  border-color: #0d6efd !important;
  background-color: #f0f7ff;
}

.btn-success {
  background-color: var(--theme-color);
  border-color: var(--theme-color);
}

.btn-success:hover {
  background-color: var(--theme-color);
  border-color: var(--theme-color);
}
</style>