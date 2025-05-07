<template>
  <div>
    <section class="">
          <div class="container py-5">
              <div class="row">
              <div class="col-md-6">
              <h2 >Find the talent needed to get your business growing.</h2>
              <p class="mb-4 mt-4">Advertise your jobs to millions of monthly users and search 15.8 million CVs
              </p>
              <Button class="btn talentBtn">Find Talent</Button>
          </div>
          <div class="col-md-6 position-relative" >
              <img src="https://demoapus1.com/freeio/wp-content/uploads/2022/09/h16.png" height="482"/>
          </div>
          </div>

          </div>
      
      </section>
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import AOS from 'aos'
  import 'aos/dist/aos.css'
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootstrap-icons/font/bootstrap-icons.css'
  

  
  onMounted(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    })
  })
  const partners = ref([
  {
    name: 'Amazon',
    logo: 'https://demoapus1.com/freeio/wp-content/uploads/2022/09/b1.png', 
  },
  {
    name: 'AMD',
    logo: 'https://demoapus1.com/freeio/wp-content/uploads/2022/09/b2.png',
  },
  {
    name: 'Cisco',
    logo: 'https://demoapus1.com/freeio/wp-content/uploads/2022/09/b3.png',
  },
  {
    name: 'Dropcam',
    logo: 'https://demoapus1.com/freeio/wp-content/uploads/2022/09/b4.png',
  },
  {
    name: 'Logitech',
    logo: 'https://demoapus1.com/freeio/wp-content/uploads/2022/09/b5.png',
  },
  {
    name: 'Spotify',
    logo: 'https://demoapus1.com/freeio/wp-content/uploads/2022/09/b6.png',
  }
])
  </script>
  
  <style scoped>
  section{
    background-color: var(--talent-section);
 
    margin-top: 100px;
    height: 412px;
  }
  h2{
    margin-top: 55px;
  }
    .talentBtn{
        font-size: 15px;
        font-weight: 700;
        fill: #FFFFFF;
        color: #FFFFFF;
        background-color: var(--second-color);
        border-style: solid;
        border-width: 2px 2px 2px 2px;
        border-color: var(--second-color);
        border-radius: 4px 4px 4px 4px;
        padding: 20px 32px 20px 32px;
    }
    img{
        position: absolute;
    top: -145px;
    width: 547px;
    right: -20px;
    }
    .trusted-partners {
  background-color: #fff;
}

h3 {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
}

.partner-logo {
  max-height: 40px;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  filter: grayscale(100%);
}

.partner-logo:hover {
  opacity: 1;
  filter: grayscale(0);
}

@media (max-width: 991px) {
  .partner-logo {
    max-height: 30px;
    margin-bottom: 20px;
  }
}
  </style>