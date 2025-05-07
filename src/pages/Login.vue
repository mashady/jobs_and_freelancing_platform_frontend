<template>
    <div class="login-container">
      <div class="login-card">
        <h2 class="text-center mb-2">Log In</h2>
        <p class="text-center text-muted mb-4">Give your visitor a smooth online experience with a solid UX design</p>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input 
            type="email" 
            class="form-control" 
            id="email" 
            v-model="email" 
            placeholder="Email"
          >
        </div>
  
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <div class="input-group">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              class="form-control" 
              id="password" 
              v-model="password" 
              placeholder="Password"
            >
            <button 
              class="btn btn-outline-secondary" 
              type="button"
              @click="togglePassword"
            >
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
        </div>
  
        <div class="d-flex justify-content-between mb-4">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="keepSignedIn" v-model="keepSignedIn">
            <label class="form-check-label" for="keepSignedIn">
              Keep me signed in
            </label>
          </div>
          <a href="#" class="text-decoration-none">Forgotten password?</a>
        </div>
  
        <button 
          type="button" 
          class="btn btn-success w-100 py-2"
          @click="handleLogin"
        >
          Login <i class="bi bi-arrow-up-right ms-1"></i>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const email = ref('')
  const password = ref('')
  const keepSignedIn = ref(false)
  const showPassword = ref(false)
  
  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }
  
  const handleLogin = () => {
    console.log('Login attempt with:', {
      email: email.value,
      password: password.value,
      keepSignedIn: keepSignedIn.value
    })
  }
  </script>
  
  <style scoped>
  .login-container {
    min-height: 100vh;
    background-color: #feeae3;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  .login-card {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 30px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
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