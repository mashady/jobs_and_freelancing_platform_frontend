<template>
  <div class="container my-5">
    <div class="card shadow-sm">
      <div class="card-body">
        <h2 class="mb-4">Complete Your Payment</h2>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3">Redirecting to secure payment page...</p>
        </div>

        <!-- Error State -->
        <div v-if="error" class="alert alert-danger">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          {{ error }}
          <button class="btn btn-sm btn-outline-danger ms-3" @click="retryPayment">
            Try Again
          </button>
        </div>

        <!-- Payment Details (shown briefly before redirect) -->
        <div v-if="!loading && !error" class="text-center">
          <div class="alert alert-info">
            <i class="bi bi-info-circle-fill me-2"></i>
            You're being redirected to our secure payment processor
          </div>
          <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { useToast } from 'vue-toastification'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const applicationId = route.query.application_id
const amount = route.query.amount
const jobTitle = route.query.job_title

const loading = ref(true)
const error = ref(null)

const createCheckoutSession = async () => {
  try {
    const token = localStorage.getItem('authToken')

    if (!token) {
      throw new Error('Authentication required')
    }

    const response = await axios.post(
      'http://127.0.0.1:8000/api/create-checkout-session',
      {
        application_id: applicationId,
        amount: amount,
        job_title: jobTitle
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const { sessionId, publishableKey } = response.data

    const stripe = await loadStripe('pk_test_51OqLgkH3WWmm4aKHCZxY7tLVwWhMjx3GvTV0KUMOaFCl7vWh5INw2lLTfrdv6lhMpqGFgAgtJIAu5BAnLlIkddt700obd97llV')
    const { error: stripeError } = await stripe.redirectToCheckout({
      sessionId
    })

    if (stripeError) {
      throw stripeError
    }

  } catch (err) {
    console.error('Payment error:', err)
    error.value = err.response?.data?.message ||
      err.message ||
      'Payment failed to initialize. Please try again later.'

    // Show toast notification
    toast.error(error.value, {
      timeout: 5000
    })

    // Optionally redirect back after delay
    setTimeout(() => {
      router.push({ name: 'applications' })
    }, 3000)

  } finally {
    loading.value = false
  }
}

const retryPayment = () => {
  error.value = null
  loading.value = true
  createCheckoutSession()
}

onMounted(() => {
  // Validate we have required parameters
  if (!applicationId || !amount) {
    error.value = 'Missing required payment information'
    loading.value = false
    router.push({ name: 'applications' })
    return
  }

  createCheckoutSession()
})
</script>

<style scoped>
.card {
  max-width: 600px;
  margin: 0 auto;
  border-radius: 10px;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.alert {
  border-radius: 8px;
}

.btn-outline-danger {
  border-color: #dc3545;
  color: #dc3545;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: white;
}
</style>