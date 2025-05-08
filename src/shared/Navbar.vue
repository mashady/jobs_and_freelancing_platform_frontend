<template>
  <div>
    <nav class="navbar navbar-expand-lg"
    :class="[navbarClass, isDashboard ? 'position-fixed top-0 w-100' : '']">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <a class="navbar-brand d-flex align-items-center" href="/" style="margin-right: 0px;">
            <span class="fw-bold" :class="textColorClass">Freeio.</span>
          </a>
          <button class="btn ms-3 d-none d-lg-block" :class="textColorClass">
            <i class="bi bi-grid" :class="textColorClass"></i> Categories
          </button>
        </div>

        <button class="navbar-toggler border-0" type="button" @click="toggleSidebar" aria-label="Toggle navigation">
          <i class="bi bi-list fs-4" :class="textColorClass"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav ms-3">
            <li class="nav-item">
              <a class="nav-link" :class="textColorClass" href="/nopage">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="textColorClass" href="/freelancer" role="button">Browse Jobs</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" :class="textColorClass" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Users
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" :class="textColorClass" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Blog
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" :class="textColorClass" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Pages
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
              </ul>
            </li>
          </ul>

          <div class="ms-auto d-none d-lg-flex align-items-center">
            <div class="user-profile d-flex align-items-center">
              <div class="search-box me-3">
                <i class="bi bi-search" :class="textColorClass"></i>
              </div>
              <div class="notification-badge me-3 position-relative">
                <i class="bi bi-bell" :class="textColorClass"></i>
              </div>
              <img :src="profileImage" alt="Profile" class="rounded-circle me-2" width="50" height="50" />
              <div class="user-info" :class="textColorClass">
                <div class="small">Freelancer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="offcanvas-backdrop" v-if="sidebarOpen" @click="closeSidebar"></div>
    <div class="mobile-sidebar" :class="{ 'open': sidebarOpen }">
      <div class="sidebar-header d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5 class="m-0">Menu</h5>
        <button type="button" class="btn-close" @click="closeSidebar" aria-label="Close"></button>
      </div>
      <div class="sidebar-body p-0">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link py-3 px-4" href="#">Home</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link py-3 px-4 d-flex justify-content-between align-items-center" href="#">
              Browse Jobs
              <i class="bi bi-chevron-right"></i>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link py-3 px-4 d-flex justify-content-between align-items-center" href="#">
              Users
              <i class="bi bi-chevron-right"></i>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link py-3 px-4 d-flex justify-content-between align-items-center" href="#">
              Blog
              <i class="bi bi-chevron-right"></i>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link py-3 px-4 d-flex justify-content-between align-items-center" href="#">
              Pages
              <i class="bi bi-chevron-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const profileImage = ref('https://demoapus1.com/freeio/wp-content/uploads/wp-freeio-uploads/_employer_featured_image/2023/06/h36-150x150.png')
const sidebarOpen = ref(false)

const isDashboard = computed(() => {
  return ['/admin', '/freelancer', '/employer'].some(path => route.path.startsWith(path))
})


const currentPage = computed(() => {
  if (route.path === '/') return 'home'
  if (route.path.startsWith('/admin')) return 'admin'
  if (route.path.startsWith('/freelancer')) return 'freelancer'
  if (route.path.startsWith('/employer')) return 'employer'
  return 'other'
})

const navbarClass = computed(() => {
  switch(currentPage.value) {
    case 'home': return 'navbar-transparent ppp'
    case 'admin': return 'navbar-white'
    case 'freelancer': return 'navbar-white'
    case 'employer': return 'navbar-white'
    default: return 'navbar-black'
  }
})

const textColorClass = computed(() => {
  switch(currentPage.value) {
    case 'home': return 'text-white'
    case 'admin': return 'text-darkkk'
    case 'freelancer': return 'text-darkkk'
    case 'employer': return 'text-darkkk'
    default: return 'text-white'
  }
})

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
  document.body.classList.toggle('sidebar-open', sidebarOpen.value)
}

function closeSidebar() {
  sidebarOpen.value = false
  document.body.classList.remove('sidebar-open')
}

function updateBodyDataAttribute() {
  document.body.setAttribute('data-page', currentPage.value)
}

watch(() => route.path, () => {
  updateBodyDataAttribute()
})

onMounted(() => {
  updateBodyDataAttribute()
})
</script>

<style scoped>
.navbar {
  padding: 10px 20px;
  height: 90px;
  z-index: 99;
  transition: all 0.3s ease;
  border-style: solid;
    border-width: 0px 0px 1px 0px;
    border-color: #FFFFFF0F;
    transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
}
.ppp{
  position: absolute;
  width: 100%;
}
.navbar-transparent {
  background-color: transparent !important;
  box-shadow: none;
}

.navbar-white {
  background-color: white !important;
}

.navbar-black {
  background-color: black !important;
}

.text-white {
  color: white !important;
}

.text-darkkk {
  color: black !important;
}

/* Direct styling for nav-links in freelancer section */
body[data-page="freelancer"] .navbar .nav-link,
body[data-page="freelancer"] .navbar .navbar-brand,
body[data-page="freelancer"] .navbar .bi,
body[data-page="freelancer"] .navbar .btn {
  color: black !important;
  text-shadow: none !important;
}

.brand-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-info {
  line-height: 1.2;
}

.mobile-sidebar {
  position: fixed;
  top: 0;
  left: -280px;
  width: 280px;
  height: 100vh;
  background-color: white;
  z-index: 1050;
  transition: left 0.3s ease;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}
.navbar .nav-link, .navbar .navbar-brand, .navbar .bi{
  text-shadow: none!important;
}
.kill-the-shadow{
  text-shadow: none!important;
  color: black!important;
}
.mobile-sidebar.open {
  left: 0;
}

.offcanvas-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.sidebar-body .nav-link {
  color: black;
  border-bottom: 1px solid #f8f9fa;
}

.sidebar-body .nav-link:hover {
  background-color: #f8f9fa;
}

:global(body.sidebar-open) {
  overflow: hidden;
}

.navbar-toggler:focus {
  box-shadow: none;
  outline: none;
}

@media (min-width: 992px) {
  .mobile-sidebar {
    display: none;
  }
}
</style>