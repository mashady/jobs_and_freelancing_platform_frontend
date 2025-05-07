<template>
    <div class="register-container">
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-lg-6 col-md-8 col-sm-10">
            <div class="register-card">
              <div class="text-center mb-4">
                <h2 class="fw-bold">Register</h2>
                <p class="text-muted">Give your visitor a smooth online experience with a solid UX design</p>
              </div>
              
              <div class="d-flex justify-content-center mb-4">
                <div class="user-type-selector">
                  <label class="user-type-option" :class="{ 'active': userType === 'freelancer' }">
                    <input 
                      type="radio" 
                      name="userType" 
                      value="freelancer" 
                      v-model="userType" 
                      class="d-none"
                    >
                    <span class="option-content">
                      <i class="bi bi-person-workspace me-2 text-success"></i>
                      Freelancer
                    </span>
                  </label>
                  <label class="user-type-option" :class="{ 'active': userType === 'employer' }">
                    <input 
                      type="radio" 
                      name="userType" 
                      value="employer" 
                      v-model="userType"
                      class="d-none"
                    >
                    <span class="option-content">
                      <i class="bi bi-briefcase me-2"></i>
                      Employer
                    </span>
                  </label>
                </div>
              </div>
              
              <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                  <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    v-model="email" 
                    placeholder="Email" 
                    required
                  >
                </div>
                
                <div class="mb-3">
                  <label for="password" class="form-label">Password <span class="text-danger">*</span></label>
                  <div class="input-group">
                    <input 
                      :type="showPassword ? 'text' : 'password'" 
                      class="form-control" 
                      id="password" 
                      v-model="password" 
                      placeholder="Password" 
                      required
                    >
                    <button 
                      class="btn bg-light border-0" 
                      type="button"
                      @click="showPassword = !showPassword"
                    >
                      <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                    </button>
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm Password <span class="text-danger">*</span></label>
                  <div class="input-group">
                    <input 
                      :type="showConfirmPassword ? 'text' : 'password'" 
                      class="form-control" 
                      id="confirmPassword" 
                      v-model="confirmPassword" 
                      placeholder="Confirm Password" 
                      required
                    >
                    <button 
                      class="btn bg-white border" 
                      type="button"
                      @click="showConfirmPassword = !showConfirmPassword"
                    >
                      <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                    </button>
                  </div>
                </div>
                
                <div class="mb-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="agreeToTerms" id="termsCheck">
                    <label class="form-check-label" for="termsCheck">
                      You accept our <a href="#" class="text-decoration-none">Terms and Conditions</a> and <a href="#" class="text-decoration-none">Privacy Policy</a>
                    </label>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  class="btn btn-success w-100 py-3" 
                >
                  Register now 
                  <i class="bi bi-arrow-up-right ms-1"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  
  const userType = ref('freelancer')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const agreeToTerms = ref(false)
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  
  const isFormValid = computed(() => {
    return email.value.length > 0 && 
           password.value.length > 0 && 
           password.value === confirmPassword.value && 
           agreeToTerms.value
  })
  
  const handleSubmit = () => {
    if (isFormValid.value) {
      console.log('Form submitted:', {
        userType: userType.value,
        email: email.value,
        password: password.value
      })
    }
  }
  </script>
  
  <style scoped>
  .register-container {
    background-color: #FFF5F0;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  
  .register-card {
    background-color: white;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
  }
  
  .user-type-selector {
    display: flex;
    border-radius: 999px;
    overflow: hidden;
    background-color: #f5f8fd;
    padding: 5px;
    border: 1px solid #e6e9f0;
  }
  
  .user-type-option {
    padding: 10px 20px;
    cursor: pointer;
    margin: 0;
    border-radius: 999px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
  }
  
  .user-type-option.active {
    background-color: white;
    color: var(--theme-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .user-type-option:not(.active) {
    color: #6c757d;
  }
  
  .form-label {
    font-weight: 500;
    color: #333;
  }
  
  .btn-success {
    background-color: var(--theme-color);
    border-color: var(--theme-color);
  }
  
  .btn-success:hover {
    background-color: var(--theme-color);
    border-color: var(--theme-color);
  }
  
  a {
    color: var(--theme-color);
  }
  
  .form-control.bg-light {
    background-color: #f5f8fd !important;
    border-color: #f5f8fd;
  }
  
  .form-control:focus {
    border-color: var(--theme-color);
    box-shadow: 0 0 0 0.25rem rgba(74, 222, 128, 0.25);
  }
  </style>
