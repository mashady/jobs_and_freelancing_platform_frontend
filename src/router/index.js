import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/components/Layout/DashboardLayout.vue'
import { useAuthStore } from '@/stores/authStore'



const routes = [
  { path: '/', name: 'Home', component: () => import('@/pages/Home.vue') },
  { path: '/jobs', name: 'Jobs', component: () => import('@/pages/JobsList.vue') },
  { path: '/projects', name: 'Projects', component: () => import('@/pages/Projects.vue') },
  { path: '/list-freelancers', name: 'Freelancers', component: () => import('@/pages/Freelancers.vue') },
  { path: '/list-employers', name: 'Employers', component: () => import('@/pages/Employers.vue') },
  { path: '/register', name: 'Register', component: () => import('@/pages/Register.vue'), meta: { guestOnly: true } },
  { path: '/login', name: 'Login', component: () => import('@/pages/Login.vue'), meta: { guestOnly: true } },
  { path: '/job-details/:id', name: 'Job Details', component: () => import('@/pages/JobDetails.vue') },
  { path: '/project-details/:id', name: 'Project Details', component: () => import('@/pages/ProjectDetails.vue') },
  { path: '/profile/freelancer/:id', name: 'Freelancer Profile', component: () => import('@/pages/profiles/freelancer.vue') },
  { path: '/profile/employer/:id', name: 'Employer Profile', component: () => import('@/pages/profiles/employer.vue') },
  
  {
    path: '/admin',
    component: DashboardLayout,
    meta: { requiresAuth: true, allowedRoles: ['admin'] },
    children: [
      { path: 'settings', component: () => import('@/pages/admin/Settings.vue') },
      { path: 'jobs', component: () => import('@/pages/admin/Jobs.vue') },
      { path: 'password', component: () => import('@/pages/admin/ChangePassword.vue') }
    ]
  },
  
  {
    path: '/employer',
    component: DashboardLayout,
    meta: { requiresAuth: true, allowedRoles: ['employer'] },
    children: [
      { path: '', component: () => import('@/pages/employer/Dashboard.vue') },
      { path: 'applications', component: () => import('../components/employer/Applications.vue') },
      { path: 'profile', component: () => import('@/pages/employer/Profile.vue') },
      { path: 'messages', component: () => import('@/pages/employer/Messages.vue') },
      { path: 'password', component: () => import('@/pages/employer/ChangePassword.vue') },
      { path: 'jobs', component: () => import('@/pages/employer/Jobs.vue') },
    ]
  },
  
  {
    path: '/freelancer',
    component: DashboardLayout,
    meta: { requiresAuth: true, allowedRoles: ['freelancer'] },
    children: [
      { path: '', component: () => import('@/pages/freelancer/Dashboard.vue') },
      { path: 'settings', component: () => import('@/pages/freelancer/Settings.vue') },
      { path: 'profile', component: () => import('@/pages/freelancer/Profile.vue') },
      { path: 'messages', component: () => import('@/pages/freelancer/Messages.vue') },
      { path: 'password', component: () => import('@/pages/freelancer/ChangePassword.vue') },
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
  
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.role === 'admin') {
      return next('/admin')
    } else if (user?.role === 'employer') {
      return next('/employer')
    } else {
      return next('/freelancer')
    }
  }
  
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      return next('/login')
    }
    
    if (to.meta.allowedRoles) {
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user || !to.meta.allowedRoles.includes(user.role)) {
        if (user?.role === 'admin') {
          return next('/admin')
        } else if (user?.role === 'employer') {
          return next('/employer')
        } else if (user?.role === 'freelancer') {
          return next('/freelancer')
        } else {
          return next('/') 
        }
      }
    }
  }
  
  next()
})
export default router
