<template>
  <div>
    <button class="sidebar-toggle d-lg-none" @click="toggleSidebar" :class="{ 'open': sidebarVisible }"
      aria-label="Toggle sidebar">
      <i class="bi" :class="sidebarVisible ? 'bi-x' : 'bi-list'"></i>
    </button>

    <div class="sidebar text-white" :class="{ 'show': sidebarVisible }">
      <!-- <div class="sidebar-header d-flex justify-content-center align-items-center">
        <div class="user-profile text-center py-4 d-flex justify-content-center align-items-center">
          <img :src="profileImage" alt="Profile Image" class="profile-image rounded-circle mb-2" />
          <div>
            <h5 class="mb-0">Freelancer</h5>
            <div class="">
              <a href="#" class="text-decoration-none text-dark">View Profile</a>
            </div>
          </div>
        </div>
      </div> -->

      <div class="sidebar-menu">
        <ul class="nav flex-column">

          <li v-for="(link, index) in sidebarLinks" :key="index" class="nav-item">
            <router-link :to="link.to" class="nav-link" exact-active-class="active">
              <i class="bi" :class="link.icon"></i> {{ link.label }}
            </router-link>
          </li>


        </ul>
      </div>
    </div>

    <div class="sidebar-overlay" v-if="sidebarVisible" @click="closeSidebar"></div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const adminLinks = [
  /* { label: 'Dashboard', to: '/admin', icon: 'bi-house-door' }, */
  { label: 'Jobs', to: '/admin/jobs', icon: 'bi-briefcase' },
  /* { label: 'Change Password', to: '/admin/password', icon: 'bi bi-lock' }, */
  { label: 'Logout', to: '/', icon: 'bi bi-box-arrow-right' },
]
const freelancerLinks = [
  { label: 'Dashboard', to: '/freelancer', icon: 'bi-house-door' },
  { label: 'Job Applications', to: '/freelancer/job-applications', icon: 'bi-briefcase' },
  /* { label: 'Favorite', to: '/freelancer/favorite', icon: 'bi-heart' }, */
  { label: 'Profile', to: '/freelancer/profile', icon: 'bi-file-earmark-text' },
  /* { label: 'Messages', to: '/freelancer/messages', icon: 'bi-chat-square-text' }, */
  /* { label: 'Settings', to: '/freelancer/settings', icon: 'bi-gear' }, */
  /* { label: 'Change Password', to: '/freelancer/password', icon: 'bi bi-lock' }, */
  { label: 'Logout', to: '/freelancer/logout', icon: 'bi bi-box-arrow-right' },

]

const employerLinks = [
  { label: 'Dashboard', to: '/employer', icon: 'bi-house-door' },
  { label: 'Jobs', to: '/employer/jobs', icon: 'bi-briefcase' },
  { label: 'Applications', to: '/employer/applications', icon: 'bi-briefcase' },
  /* { label: 'Favorite', to: '/employer/favorite', icon: 'bi-heart' }, */
  { label: 'Profile', to: '/employer/profile', icon: 'bi-file-earmark-text' },
  /* { label: 'Messages', to: '/employer/messages', icon: 'bi-chat-square-text' }, */
  /* { label: 'Settings', to: '/employer/settings', icon: 'bi-gear' }, */
  /* { label: 'Change Password', to: '/employer/password', icon: 'bi bi-lock' }, */
  { label: 'Logout', to: '/employer/logout', icon: 'bi bi-box-arrow-right' },
]

const sidebarLinks = computed(() => {
  console.log(route.path)
  console.log(route.path.startsWith('/admin'))


  if (route.path.startsWith('/admin')) return adminLinks
  if (route.path.startsWith('/freelancer')) return freelancerLinks
  if (route.path.startsWith('/employer')) return employerLinks
  return []
})

const profileImage = 'https://demoapus1.com/freeio/wp-content/uploads/wp-freeio-uploads/_employer_featured_image/2023/06/h36-150x150.png'
const sidebarVisible = ref(false)

function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value
  if (sidebarVisible.value) {
    document.body.classList.add('sidebar-open')
  } else {
    document.body.classList.remove('sidebar-open')
  }
}

function closeSidebar() {
  sidebarVisible.value = false
  document.body.classList.remove('sidebar-open')
}

onBeforeUnmount(() => {
  document.body.classList.remove('sidebar-open')
})
</script>


<style scoped>
.sidebar {
  background-color: white;
  color: black;
  width: 18%;
  height: 94vh;
  position: fixed;
  left: 0;
  top: 90px;
  z-index: 100;
  padding-top: 0;
  overflow-y: auto;
  transition: transform 0.3s ease;
}

h5 {
  color: black;
}

.user-profile {}

.profile-image {
  width: 90px;
  height: 90px;
  object-fit: cover;
}

.sidebar-menu {
  margin-top: 20px;
}

.nav-item {
  margin-bottom: 5px;
}

.nav-link {
  display: flex;
  align-items: center;
  color: var(--link-color);
  padding: 10px 20px;
  transition: all 0.3s;
}

.nav-link:hover {
  color: var(--theme-color);

}

.active {
  background-color: var(--link-color);
  color: white;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-right: 20px;
}

.nav-link.active:focus {
  color: #FFF;
}

.nav-link i {
  margin-right: 10px;
  font-size: 1.1rem;
}

.sidebar-toggle {
  position: fixed;
  left: 15px;
  top: 92px;
  z-index: 99;
  background-color: var(--link-color, #fff);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}

.sidebar-toggle.open {
  background-color: var(--link-color, #FFF);
  ;
}

.sidebar-toggle:focus {
  outline: none;
}

.sidebar-overlay {
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}


@media (max-width: 991.98px) {
  .sidebar {
    transform: translateX(-100%);
    width: 240px;
  }

  .sidebar.show {
    transform: translateX(0);
  }

  :global(body.sidebar-open) {
    overflow: hidden;
  }
}
</style>