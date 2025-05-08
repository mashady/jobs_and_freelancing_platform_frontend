<template>
    <section class="services-section py-5 my-5">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-8">
            <h2 class="fw-bold mb-2">Browse services by category</h2>
            <p class="text-muted">Get some inspirations from 1800+ skills</p>
          </div>
          <div class="col-md-4 text-md-end d-flex align-items-center justify-content-md-end">
            <a href="#" class="text-decoration-none text-dark">All Categories <i class="bi bi-arrow-right ms-2"></i></a>
          </div>
        </div>
  
        <div class="row g-4 mb-5">
          <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="0">
            <div class="service-card p-4 rounded-3 h-100">
              <div class="icon-wrapper mb-4">
                <div class="icon-bg rounded-circle">
                  <i class="bi bi-code-square text-success"></i>
                </div>
              </div>
              <span class="d-block text-muted small mb-2">8 Services</span>
              <h5 class="fw-bold mb-2">Development & IT</h5>
              <p class="text-muted small mb-0">
                Software Engineer, Web / Mobile Developer & More
              </p>
            </div>
          </div>
  
          <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div class="service-card p-4 rounded-3 h-100">
              <div class="icon-wrapper mb-4">
                <div class="icon-bg rounded-circle">
                  <i class="bi bi-window-dock text-success"></i>
                </div>
              </div>
              <span class="d-block text-muted small mb-2">8 Services</span>
              <h5 class="fw-bold mb-2">Design & Creative</h5>
              <p class="text-muted small mb-0">
                Website Design Adobe XD, Figma, Adobe Photoshop
              </p>
            </div>
          </div>
  
          <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div class="service-card p-4 rounded-3 h-100">
              <div class="icon-wrapper mb-4">
                <div class="icon-bg rounded-circle">
                  <i class="bi bi-megaphone text-success"></i>
                </div>
              </div>
              <span class="d-block text-muted small mb-2">1 Service</span>
              <h5 class="fw-bold mb-2">Digital Marketing</h5>
              <p class="text-muted small mb-0">
                Service Digital and Social Media Management
              </p>
            </div>
          </div>
  
          <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div class="service-card p-4 rounded-3 h-100">
              <div class="icon-wrapper mb-4">
                <div class="icon-bg rounded-circle">
                  <i class="bi bi-translate text-success"></i>
                </div>
              </div>
              <span class="d-block text-muted small mb-2">1 Service</span>
              <h5 class="fw-bold mb-2">Writing & Translation</h5>
              <p class="text-muted small mb-0">
                Writing, Translation Project, get It Quickly done
              </p>
            </div>
          </div>
        </div>
  
        <div class="row g-4">
          <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="0">
            <div class="service-card p-4 rounded-3 h-100">
              <div class="icon-wrapper mb-4">
                <div class="icon-bg rounded-circle">
                  <i class="bi bi-mic text-success"></i>
                </div>
              </div>
              <span class="d-block text-muted small mb-2">0 Services</span>
              <h5 class="fw-bold mb-2">Music & Audio</h5>
              <p class="text-muted small mb-0">
                Freelancer Music, Audio Services, Music Projects
              </p>
            </div>
          </div>
  
          <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div class="service-card p-4 rounded-3 h-100">
              <div class="icon-wrapper mb-4">
                <div class="icon-bg rounded-circle">
                  <i class="bi bi-play-btn text-success"></i>
                </div>
              </div>
              <span class="d-block text-muted small mb-2">0 Services</span>
              <h5 class="fw-bold mb-2">Video & Animation</h5>
              <p class="text-muted small mb-0">
                Animation Video Maker that Brings Studio Quality
              </p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div class="service-card p-4 rounded-3 h-100">
              <div class="icon-wrapper mb-4">
                <div class="icon-bg rounded-circle">
                  <i class="bi bi-braces text-success"></i>
                </div>
              </div>
              <span class="d-block text-muted small mb-2">1 Service</span>
              <h5 class="fw-bold mb-2">Programming & Tech</h5>
              <p class="text-muted small mb-0">
                Programmers and coders Both for Your Project
              </p>
            </div>
          </div>
  
          <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div class="service-card p-4 rounded-3 h-100">
              <div class="icon-wrapper mb-4">
                <div class="icon-bg rounded-circle">
                  <i class="bi bi-graph-up text-success"></i>
                </div>
              </div>
              <span class="d-block text-muted small mb-2">4 Services</span>
              <h5 class="fw-bold mb-2">Finance & Accounting</h5>
              <p class="text-muted small mb-0">
                Team Works, Collaboration Meet for Your Business
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
    import { onMounted } from 'vue'
    import AOS from 'aos'
    import 'aos/dist/aos.css'

    export default {
      name: 'ServicesSection',
      setup() {
        onMounted(() => {
          AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
          });
        });
      }
    }

  </script>
  
  <style scoped>
  .services-section {
    background-color: #fff;
  }
  
  .service-card {
    transition: all 0.3s ease;
    border: 1px solid #f0f0f0;
    background-color: #fff;
  }
  
  .service-card:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    transform: translateY(-5px);
  }
  
  .icon-wrapper {
    position: relative;
    width: 60px;
    height: 60px;
  }
  
  .icon-bg {
    width: 60px;
    height: 60px;
    background-color: rgba(85, 180, 126, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .icon-bg i {
    font-size: 1.5rem;
  }
  
 
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .fade-in-up {
    animation: fadeInUp 0.5s ease forwards;
  }
  

  .delay-100 {
    animation-delay: 0.1s;
  }
  
  .delay-200 {
    animation-delay: 0.2s;
  }
  
  .delay-300 {
    animation-delay: 0.3s;
  }
  
  .delay-400 {
    animation-delay: 0.4s;
  }
  </style>