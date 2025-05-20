<template>
  <div>
    <nav class="navbar navbar-expand-lg" :class="[navbarClass, isDashboard ? 'position-fixed top-0 w-100' : '']">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <a class="navbar-brand d-flex align-items-center" href="/" style="margin-right: 0px;">
            <span class="fw-bold" :class="textColorClass">Freeio.</span>
          </a>
          <!-- <button class="btn ms-3 d-none d-lg-block" :class="textColorClass">
            <i class="bi bi-grid" :class="textColorClass"></i> Categories
          </button> -->
        </div>

        <button class="navbar-toggler border-0" type="button" @click="toggleSidebar" aria-label="Toggle navigation">
          <i class="bi bi-list fs-4" :class="textColorClass"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav ms-3">
            <li class="nav-item">
              <a class="nav-link" :class="textColorClass" href="/">Home</a>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" :class="textColorClass" href="#" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Browse Jobs
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/projects">Projects</a></li>
                <li><a class="dropdown-item" href="/jobs">Jobs</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" :class="textColorClass" href="#" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Users
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/list-freelancers">Freelancers</a></li>
                <li><a class="dropdown-item" href="/list-employers">Employers</a></li>
              </ul>
            </li>
          </ul>

          <div class="ms-auto d-none d-lg-flex align-items-center">
            <!-- <div class="search-box me-3">
              <i class="bi bi-search" :class="textColorClass" style="font-size: 1.3rem; cursor: pointer;"></i>
            </div> -->

            <template v-if="isLoggedIn">
              <div class="user-profile d-flex align-items-center">
                <!-- <div class="notification-badge me-3 position-relative">
                  <i class="bi bi-bell" :class="textColorClass" style="font-size: 1.3rem; cursor: pointer;"></i>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    3
                  </span>
                </div> -->

                <div class="position-relative" ref="userDropdownRef">
                  <div class="d-flex align-items-center cursor-pointer" @click="toggleUserDropdown">
                    <img :src="'http://localhost:8000/storage/' + userData?.profile_image || profileImage" alt="Profile"
                      class="rounded-circle me-2" width="40" height="40" />
                    <div class="user-info" :class="textColorClass">
                      <div style="font-size: 0.9rem; font-weight: 500;">{{ userData?.name || 'User' }}</div>
                      <div style="font-size: 0.75rem;">{{ userData?.role || 'Member' }}</div>
                    </div>
                  </div>
                  <div v-if="isUserDropdownOpen" class="user-dropdown">
                    <div v-for="(item, index) in menuItems" :key="index" class="dropdown-item d-flex align-items-center"
                      @click="navigateTo(item.path)">
                      <i :class="`bi ${item.icon} me-3`"></i>
                      <span>{{ item.text }}</span>
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item d-flex align-items-center" @click="logout">
                      <i class="bi bi-box-arrow-right me-3"></i>
                      <span>Logout</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template v-else>
              <div class="auth-buttons d-flex">
                <button class="btn" :class="textColorClass + ' me-2'">
                  <router-link to="/login" class="underline-none" :class="textColorClass"
                    style="text-decoration: none;">Login</router-link>
                </button>
                <button class="btn bg-white text-dark rounded-1 px-4" :class="textColorClass + ' me-2'">
                  <router-link to="/register" class="underline-none text-dark" style="text-decoration: none;">Sign
                    Up</router-link>
                </button>
              </div>
            </template>
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
            <a class="nav-link py-3 px-4" href="/">Home</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link py-3 px-4 d-flex justify-content-between align-items-center" href="/jobs">
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

          <template v-if="!isLoggedIn">
            <li class="nav-item border-top mt-3">
              <div class="d-flex flex-column p-3">
                <router-link to="/login" class="btn btn-outline-dark mb-2">Login</router-link>
                <router-link to="/register" class="btn btn-dark">Sign Up</router-link>
              </div>
            </li>
          </template>
          <template v-else>
            <li class="nav-item border-top">
              <div class="d-flex align-items-center p-3">
                <img :src="userData?.profile_image || profileImage" alt="Profile" class="rounded-circle me-2" width="40"
                  height="40" />
                <div>
                  <div class="fw-bold">{{ userData?.name || 'User' }}</div>
                  <div class="text-muted small mb-1">{{ userData?.email || '' }}</div>
                  <button @click="logout" class="btn btn-sm btn-outline-danger mt-1">
                    Logout
                  </button>
                </div>
              </div>
            </li>
            <li class="nav-item">
              <router-link v-for="(item, index) in menuItems" :key="index" :to="item.path"
                class="nav-link py-2 px-4 d-flex align-items-center" @click="closeSidebar">
                <i :class="`bi ${item.icon} me-3`"></i>
                <span>{{ item.text }}</span>
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const profileImage = ref('https://demoapus1.com/freeio/wp-content/uploads/wp-freeio-uploads/_employer_featured_image/2023/06/h36-150x150.png')
const sidebarOpen = ref(false)
const isUserDropdownOpen = ref(false)
const userDropdownRef = ref(null)
const isLoggedIn = ref(false)
const userData = ref(null)

const menuItems = computed(() => {
  if (!userData.value || !userData.value.role) return []
  switch (userData.value.role) {
    case 'admin':
      return [
        { icon: "bi-speedometer2", text: "Admin Dashboard", path: "/admin" },
        /* { icon: "bi-people", text: "Manage Users", path: "/admin/users" },
        { icon: "bi-briefcase-fill", text: "Manage Jobs", path: "/admin/jobs" },
        { icon: "bi-gear", text: "Settings", path: "/admin/settings" }, */
      ]
    case 'freelancer':
      return [
        {
          icon: "bi-speedometer2",
          text: "Profile",
          path: userData.value && userData.value.id ? `/profile/freelancer/${userData.value.id}` : "/profile/freelancer"
        },
        { icon: "bi-speedometer2", text: "Dashboard", path: "/freelancer" },
        /*{ icon: "bi-file-earmark-text", text: "Proposals", path: "/freelancer/proposals" },
        { icon: "bi-briefcase-fill", text: "My Jobs", path: "/freelancer/jobs" },
        { icon: "bi-heart", text: "Favorite", path: "/freelancer/favorites" },
        { icon: "bi-chat-left-text", text: "Messages", path: "/freelancer/messages" }, */
      ]
    case 'employer':
      return [
        {
          icon: "bi-speedometer2",
          text: "Profile",
          path: userData.value && userData.value.id ? `/profile/employer/${userData.value.id}` : "/profile/employer"
        },
        { icon: "bi-speedometer2", text: "Dashboard", path: "/employer" },
        /* { icon: "bi-plus-circle", text: "Post Job", path: "/employer/post-job" },
        { icon: "bi-briefcase-fill", text: "My Jobs", path: "/employer/jobs" }, */
      ]
    default:
      return [
        { icon: "bi-speedometer2", text: "Dashboard", path: "/dashboard" },
        /*{ icon: "bi-file-earmark-text", text: "Proposals", path: "/proposals" },
        { icon: "bi-briefcase-fill", text: "Jobs Applied", path: "/jobs" },
        { icon: "bi-heart", text: "Favorite", path: "/favorites" },
        { icon: "bi-chat-left-text", text: "Messages", path: "/messages" }, */
      ]
  }
})

const checkAuthStatus = () => {
  const token = localStorage.getItem('authToken')
  const user = localStorage.getItem('user')

  isLoggedIn.value = !!token
  if (user) {
    try {
      userData.value = JSON.parse(user)
      if (!userData.value.profile_image) {
        userData.value.profile_image = profileImage.value
      }
    } catch (e) {
      userData.value = null
    }
  } else {
    userData.value = null
  }
}

const navigateTo = (path) => {
  router.push(path)
  isUserDropdownOpen.value = false
  closeSidebar()
}

const logout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('user')
  isLoggedIn.value = false
  isUserDropdownOpen.value = false
  userData.value = null
  window.location.href = '/'
}

const isDashboard = computed(() => {
  return ['/admin', '/freelancer', '/employer', '/dashboard'].some(path => route.path.startsWith(path))
})

const currentPage = computed(() => {
  if (route.path === '/') return 'home'
  if (route.path.startsWith('/admin')) return 'admin'
  if (route.path.startsWith('/freelancer')) return 'freelancer'
  if (route.path.startsWith('/employer')) return 'employer'
  if (route.path.startsWith('/dashboard')) return 'dashboard'
  return 'other'
})

const navbarClass = computed(() => {
  switch (currentPage.value) {
    case 'home': return 'navbar-transparent ppp'
    case 'admin': return 'navbar-white'
    case 'freelancer': return 'navbar-white'
    case 'employer': return 'navbar-white'
    case 'dashboard': return 'navbar-white'
    default: return 'navbar-black'
  }
})

const textColorClass = computed(() => {
  switch (currentPage.value) {
    case 'home': return 'text-white'
    case 'admin': return 'text-darkkk'
    case 'freelancer': return 'text-darkkk'
    case 'employer': return 'text-darkkk'
    case 'dashboard': return 'text-darkkk'
    default: return 'text-white'
  }
})

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
  document.body.classList.toggle('sidebar-open', sidebarOpen.value)
}

const closeSidebar = () => {
  sidebarOpen.value = false
  document.body.classList.remove('sidebar-open')
}

const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value
}

const handleClickOutside = (event) => {
  if (userDropdownRef.value && !userDropdownRef.value.contains(event.target)) {
    isUserDropdownOpen.value = false
  }
}

const updateBodyDataAttribute = () => {
  document.body.setAttribute('data-page', currentPage.value)
}

const handleStorageChange = (event) => {
  if (event.key === 'authToken' || event.key === 'user') {
    checkAuthStatus()
  }
}

watch(() => route.path, () => {
  checkAuthStatus()
  updateBodyDataAttribute()
})

onMounted(() => {
  checkAuthStatus()
  updateBodyDataAttribute()
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('storage', handleStorageChange)

  if (typeof bootstrap !== 'undefined') {
    const dropdowns = document.querySelectorAll('.dropdown-toggle')
    dropdowns.forEach(dropdown => {
      new bootstrap.Dropdown(dropdown)
    })
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('storage', handleStorageChange)
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

.ppp {
  position: absolute;
  width: 100%;
}

.navbar-transparent {
  background-color: transparent !important;
  box-shadow: none;
}

.dark-navbar {
  background-color: #1A1A1A;
  /* #222 */
}

.navbar-white {
  background-color: white !important;
}

.navbar-black {
  background-color: #222 !important;
}

.text-white {
  color: white !important;
}

.text-darkkk {
  color: black !important;
}

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

.navbar .nav-link,
.navbar .navbar-brand,
.navbar .bi {
  text-shadow: none !important;
}

.kill-the-shadow {
  text-shadow: none !important;
  color: black !important;
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
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
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

.cursor-pointer {
  cursor: pointer;
}

.user-dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  width: 260px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 10px;
  padding: 8px 0;
  border: 1px solid rgba(0, 0, 0, 0.08);
  max-height: 80vh;
  overflow-y: auto;
}

.dropdown-item {
  padding: 12px 20px;
  color: #333;
  font-size: 0.9rem;
  transition: background-color 0.2s;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.dropdown-item i {
  color: #6c757d;
  width: 20px;
}

.auth-buttons .btn {
  font-weight: 500;
}

.notification-badge .badge {
  font-size: 0.6rem;
  padding: 3px 5px;
}

.dropdown-divider {
  margin: 0.5rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>