<template>
    <section class="container ">
      <div class="header-section">
        <h1 class="header-title" data-aos="fade-up">Need something done?</h1>
        <p class="header-subtitle" data-aos="fade-up" data-aos-delay="100">Most viewed and all-time top-selling services</p>
      </div>
      
      <div class="row g-4">
        <div class="col-md-3" v-for="(service, index) in services" :key="service.id">
          <div class="service-card" :data-aos="'fade-up'" :data-aos-delay="index * 100">
            <div class="feature-icon">
              <i :class="service.icon"></i>
            </div>
            <h5 class="mb-3">{{ service.title }}</h5>
            <p class="text-muted">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="feature-section">
      <div class="container py-4">
        <div class="row align-items-center">
          <div class="col-lg-6" data-aos="fade-right">
            <h2>A whole world of freelance talent at your fingertips</h2>
            
            <div class="feature-benefit" v-for="feature in features" :key="feature.id">
              <div class="feature-icon-sm">
                <i :class="feature.icon"></i>
              </div>
              <div>
                <h5>{{ feature.title }}</h5>
                <p class="text-muted">{{ feature.description }}</p>
              </div>
            </div>
          </div>
          <div class="col-lg-6" data-aos="fade-left" data-aos-delay="200">
            <img src="https://demoapus1.com/freeio/wp-content/uploads/2022/09/h1.jpg" alt="Freelancer working" class="freelancer-img">
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import AOS from 'aos'
  import 'aos/dist/aos.css'
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootstrap-icons/font/bootstrap-icons.css'
  
  const services = ref([
    {
      id: 1,
      icon: 'bi bi-briefcase',
      title: 'Post a job',
      description: 'It\'s free and easy to post a job. Simply fill in a title, description.'
    },
    {
      id: 2,
      icon: 'bi bi-people',
      title: 'Choose freelancers',
      description: 'It\'s free and easy to post a job. Simply fill in a title, description.'
    },
    {
      id: 3,
      icon: 'bi bi-shield-check',
      title: 'Pay safely',
      description: 'It\'s free and easy to post a job. Simply fill in a title, description.'
    },
    {
      id: 4,
      icon: 'bi bi-headset',
      title: 'We\'re here to help',
      description: 'It\'s free and easy to post a job. Simply fill in a title, description.'
    }
  ])
  
  const features = ref([
    {
      id: 1,
      icon: 'bi bi-award',
      title: 'Proof of quality',
      description: 'Check any pro\'s work samples, client reviews, and identity verification.'
    },
    {
      id: 2,
      icon: 'bi bi-cash',
      title: 'No cost until you hire',
      description: 'Check any pro\'s work samples, client reviews, and identity verification.'
    },
    {
      id: 3,
      icon: 'bi bi-shield-lock',
      title: 'Safe and secure',
      description: 'Check any pro\'s work samples, client reviews, and identity verification.'
    }
  ])
  
  onMounted(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    })
  })
  </script>
  
  <style scoped>
  section{
    padding-top: 100px;
    padding-bottom: 100px;
  }
  .feature-icon {
    font-size: 2rem;
    color: #146c43;
    margin-bottom: 1rem;
  }
  
  .service-card {
    text-align: center;
    padding: 1.5rem;
    transition: transform 0.3s ease;
    height: 100%;
  }
  
  .service-card:hover {
    transform: translateY(-5px);
  }
  
  .feature-benefit {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }
  
  .feature-icon-sm {
    color: #146c43;
    margin-right: 15px;
    min-width: 40px;
  }
  
  .feature-section {
    background-color: #f9f7f2;
    padding: 4rem 0;
  }
  
  .header-section {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .header-title {
    font-weight: 600;
    color: #333;
  }
  
  .header-subtitle {
    color: #666;
  }
  
  h2 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  
  .freelancer-img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  </style>