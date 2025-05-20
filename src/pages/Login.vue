<template>
  <div class="container-fluid vh-100 bg-light d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card shadow">
            <div class="card-body p-5">
              <h2 class="text-center mb-4">Log In</h2>
              <p class="text-center text-muted mb-4">Welcome back! Please enter your credentials</p>

              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" v-model="email"
                    :class="{ 'is-invalid': emailError }">
                  <div class="invalid-feedback">{{ emailError }}</div>
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <div class="input-group">
                    <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password"
                      v-model="password" :class="{ 'is-invalid': passwordError }">
                    <!-- <button class="btn btn-outline-secondary" type="button" @click="togglePassword">
                      <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                    </button> -->
                  </div>
                  <div class="invalid-feedback">{{ passwordError }}</div>
                </div>

                <!-- <div class="d-flex justify-content-between mb-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="remember" v-model="keepSignedIn">
                    <label class="form-check-label" for="remember">Remember me</label>
                  </div>
                  <router-link to="/forgot-password" class="text-decoration-none">Forgot password?</router-link>
                </div> -->

                <div v-if="serverError" class="alert alert-danger">{{ serverError }}</div>

                <button type="submit" class="btn btn-success w-100 py-2" :disabled="isSubmitting">
                  <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                  {{ isSubmitting ? 'Logging in...' : 'Login' }}
                </button>

                <div class="text-center">
                  <p class="mb-0">Don't have an account?
                    <router-link to="/register" class="text-decoration-none">Register</router-link>
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

const email = ref('');
const password = ref('');
const keepSignedIn = ref(false);
const showPassword = ref(false);
const isSubmitting = ref(false);

const emailError = ref('');
const passwordError = ref('');
const serverError = ref('');

const togglePassword = () => showPassword.value = !showPassword.value;

const validateForm = () => {
  let isValid = true;
  emailError.value = '';
  passwordError.value = '';

  if (!email.value) {
    emailError.value = 'Email is required';
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    emailError.value = 'Please enter a valid email';
    isValid = false;
  }

  if (!password.value) {
    passwordError.value = 'Password is required';
    isValid = false;
  }

  return isValid;
};

const handleLogin = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  serverError.value = '';

  try {
    const { success, error } = await authStore.login({
      email: email.value,
      password: password.value
    });

    if (success) {
      router.push('/');
    } else {
      serverError.value = error || 'Login failed. Please try again.';
    }
  } catch (err) {
    serverError.value = 'An error occurred. Please try again later.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.bg-light {
  background-color: var(--talent-section) !important;
}

.card {
  border: none;
  border-radius: 10px;
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
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