<template>
  <div class="app-container">
    <Sidebar />
    <div class="main-content">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Layout/Sidebar.vue'
import Navbar from '@/shared/Navbar.vue'
</script>


<style>

body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background-color: #f8f9fa;
}

.app-container {
  display: flex;
}

.main-content {
  background-color: var(--dashboard-bg-color)
  ;
  flex: 1;
  padding-top: 100px;
  padding-left: 19%; 
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* height: 200vh; */
  transition: padding-left 0.3s ease;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.app-footer {
  margin-top: auto;
}
</style>