<template>
    <section>
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-6 col-md-12 mb-4 mb-lg-0 text-center text-lg-start" data-aos="fade-right" data-aos-duration="1000" data-aos-once="true">
            <img src="https://demoapus1.com/freeio/wp-content/uploads/2022/09/h12.png" class="img-fluid" alt="Marketplace illustration" />
          </div>
          <div class="col-lg-6 col-md-12 content-section">
            <h1 class="mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100" data-aos-once="true">Join World's Best Marketplace for Workers</h1>
            <p class="mt-4 mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" data-aos-once="true">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
            <ul class="list-unstyled">
              <li data-aos="fade-up" data-aos-duration="800" data-aos-delay="300" data-aos-once="true">
                <div class="d-flex align-items-center">
                  <i class="fas fa-check-circle text-success me-2"></i>
                  Connect to freelancers with proven business experience
                </div>
              </li>
              <li data-aos="fade-up" data-aos-duration="800" data-aos-delay="400" data-aos-once="true">
                <div class="d-flex align-items-center">
                  <i class="fas fa-check-circle text-success me-2"></i>
                  Get matched with the perfect talent by a customer success manager
                </div>
              </li>
              <li data-aos="fade-up" data-aos-duration="800" data-aos-delay="500" data-aos-once="true">
                <div class="d-flex align-items-center">
                  <i class="fas fa-check-circle text-success me-2"></i>
                  Unmatched quality of remote, hybrid, and flexible jobs
                </div>
              </li>
            </ul>
            <button class="btn" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="600" data-aos-once="true">Find talent</button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { defineComponent, onMounted } from 'vue'
  import AOS from 'aos'
  import 'aos/dist/aos.css'
  
  export default defineComponent({
    name: 'MarketplaceComponent',
    setup() {
      onMounted(() => {
        AOS.init({
          offset: 120, 
          delay: 0, 
          duration: 1000, 
          easing: 'ease', 
          once: true, 
          anchorPlacement: 'top-bottom', 
        })
      })
  
      return {}
    }
  })
  </script>
  
  <style scoped>
  section {
    background-color: #1F4B3F;
    padding-top: 100px;
    padding-bottom: 100px;
  }
  
  button, button:hover {
    font-size: 15px;
    font-weight: 700;
    fill: #FFFFFF;
    color: #FFFFFF;
    background-color: #5BBB7B;
    border-style: solid;
    border-width: 2px 2px 2px 2px;
    border-color: #5BBB7B;
    border-radius: 4px 4px 4px 4px;
    padding: 20px 32px 20px 32px;
    margin-top: 20px;
  }
  
  h1, p, li {
    color: #FFFFFF;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  .fas.fa-check-circle {
    color: #5BBB7B;
  }
  
  .img-fluid {
    max-width: 100%;
    height: auto;
  }
  
  @media (max-width: 991.98px) {
    h1 {
      font-size: 2rem;
      text-align: center;
    }
    
    .content-section {
      padding: 0 20px;
      text-align: center;
    }
    
    .d-flex {
      justify-content: center;
    }
    
    button {
      display: block;
      margin: 20px auto;
    }
  }
  
  @media (max-width: 767.98px) {
    section {
      padding-top: 60px;
      padding-bottom: 60px;
    }
    
    h1 {
      font-size: 1.8rem;
    }
    
    button {
      padding: 15px 25px;
    }
  }
  </style>