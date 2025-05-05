import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/components/Layout/DashboardLayout.vue'

import Home from '../pages/Home.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
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
      { path: 'settings', component: () => import('@/pages/employer/Settings.vue') },
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

export default router
