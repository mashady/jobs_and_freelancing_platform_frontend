import { createRouter, createWebHistory } from 'vue-router'
import dashboard from "../components/freelancer/dashboard.vue"
const routes = [
  {
    path: '/freelancer',
    component: dashboard,
    children:[
        {
            path:'',
            redirect: '/dashboard'

        },
        {
            path: 'dashboard',
            component: dashboard
        }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})



export default router
