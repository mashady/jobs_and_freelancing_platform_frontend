import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  
  const user = ref(JSON.parse(localStorage.getItem('user')))
  const token = ref(localStorage.getItem('authToken'))
  const isAuthenticated = computed(() => !!token.value)
  
  const login = async (credentials) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (response.ok) {
        setAuth(data)
        return { success: true }
      } else {
        return { 
          success: false, 
          error: data.message || 'Login failed' 
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: 'Failed to connect to server' 
      }
    }
  }

  const register = async (formData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setAuth(data)
        return { success: true }
      } else {
        return { 
          success: false, 
          error: data.message || Object.values(data.errors).flat().join(' ') 
        }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { 
        success: false, 
        error: 'Failed to connect to server' 
      }
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
    router.push('/login')
  }

  const setAuth = (data) => {
    user.value = data.user
    token.value = data.token
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('authToken', data.token)
  }

  const getUser = computed(() => user.value)
  const getToken = computed(() => token.value)
  const isAuth = computed(() => isAuthenticated.value)

/*   const setupAxiosInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.request.use(config => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
  })

  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        logout()
      }
      return Promise.reject(error)
    }
  )
} */

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    setAuth,
    getUser,
    getToken,
    isAuth
  }
})

