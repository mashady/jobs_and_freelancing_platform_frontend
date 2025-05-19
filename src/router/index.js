import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/components/Layout/DashboardLayout.vue'
import { useAuthStore } from '@/stores/authStore'



const routes = [
  { path: '/', name: 'Home', component: () => import('@/pages/Home.vue') },
  { path: '/register', name: 'Register', component: () => import('@/pages/Register.vue') },
  { path: '/login', name: 'Login', component: () => import('@/pages/Login.vue') },
  { path: '/job-details', name: 'Job Details', component: () => import('@/pages/JobDetails.vue') },
  { path: '/profile/freelancer', name: 'Freelancer Profile', component: () => import('@/pages/profiles/freelancer.vue') },
  { path: '/profile/employer', name: 'Employer Profile', component: () => import('@/pages/profiles/employer.vue') },
  {
    path: '/admin',
    component: DashboardLayout,
    children: [
      { path: '', component: () => import('@/pages/admin/Dashboard.vue') },
      { path: 'settings', component: () => import('@/pages/admin/Settings.vue') },
      { path: 'jobs', component: () => import('@/pages/admin/Jobs.vue') },
      { path: 'password', component: () => import('@/pages/admin/ChangePassword.vue') }
    ]
  },
  {
    path: '/employer',
    component: DashboardLayout,
    children: [
      { path: '', component: () => import('@/pages/employer/Dashboard.vue') },
      { path: 'favorite', component: () => import('@/pages/employer/Favorite.vue') },
      { path: 'addJob', component: () => import('@/pages/employer/AddJob.vue') },
      { path: 'profile', component: () => import('@/pages/employer/Profile.vue') },
      { path: 'messages', component: () => import('@/pages/employer/Messages.vue') },
      { path: 'password', component: () => import('@/pages/employer/ChangePassword.vue') },
      { path: 'jobs', component: () => import('@/pages/employer/Jobs.vue') },
    ]
  },
  {
    path: '/freelancer',
    component: DashboardLayout,
    children: [
      { path: '', component: () => import('@/pages/freelancer/Dashboard.vue') },
      { path: 'settings', component: () => import('@/pages/freelancer/Settings.vue') },
      { path: 'profile', component: () => import('@/pages/freelancer/Profile.vue') },
      { path: 'messages', component: () => import('@/pages/freelancer/Messages.vue') },
      { path: 'password', component: () => import('@/pages/freelancer/ChangePassword.vue') },
      { path: 'favorite', component: () => import('@/pages/freelancer/Favorite.vue') },
      { path: 'propposal', component: () => import('@/pages/freelancer/Propposal.vue') },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.guestOnly && authStore.isAuthenticated) {
    next('/freelancer')
  } else {
    next()
  }
})
export default router
