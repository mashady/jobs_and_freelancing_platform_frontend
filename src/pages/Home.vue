<template>
  <div class="home-view">
    <header class="hero-section">
      <div class="gradient-overlay"></div>

      <div class="hero-content">
        <h1 class="hero-title">Hire the best freelancers for<br>any job, online.</h1>
        <p class="hero-subtitle">Millions of people use freeio.com to turn their ideas into reality.</p>

        <!-- <div class="search-container">
          <div class="search-input-wrapper">
            <i class="search-icon bi bi-search"></i>
            <input type="text" class="search-input" placeholder="What are you looking for?">
          </div>
          
          
          
          <button class="search-button">Search</button>
        </div>
        
        <div class="popular-searches">
          <span>Popular Searches : </span>
          <a href="#">Designer</a>,
          <a href="#">Developer</a>,
          <a href="#">Web</a>,
          <a href="#">iOS</a>,
          <a href="#">PHP</a>,
          <a href="#">Senior</a>,
          <a href="#">Engineer</a>
        </div> -->
      </div>
    </header>
    <ServicesSection />
    <TrendingServicesSection />
    <FreelancerServicesSection />
    <MarketPlace />
    <FindTalentSection />
    <Footer />
  </div>

</template>

<script setup>
import ServicesSection from '../components/home/ServicesSection.vue';
import TrendingServicesSection from '../components/home/TrendingServicesSection.vue';
import FreelancerServicesSection from '../components/home/FreelancerServices.vue';
import FindTalentSection from '../components/home/FindTalentSection.vue';
import Footer from '../shared/Footer.vue';
import MarketPlace from '../components/home/MarketPlace.vue';
</script>


<style scoped>
.home-view {
  position: relative;
}

.hero-section {
  position: relative;
  height: 100vh;
  background-image: url('https://demoapus1.com/freeio/wp-content/uploads/2022/10/slider1.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: left;
  padding-bottom: 100px;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom,
      rgba(0, 0, 0, 0.7) 0px,
      rgba(0, 0, 0, 0.55) 90px,
      rgba(0, 0, 0, 0.4) 180px,
      rgba(0, 0, 0, 0.3) 100%);
}

.hero-content {
  position: relative;
  top: 100px;
  z-index: 2;
  padding: 0 20px;
  max-width: 1340px;
  width: 100%;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  font-weight: 400;
}

.search-container {
  display: flex;
  background: white;
  border-radius: 5px;
  overflow: hidden;
  max-width: 850px;
  height: 60px;
  margin-bottom: 1.5rem;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 15px;
  position: relative;
}

.search-icon {
  color: #666;
  margin-right: 10px;
}

.search-input {
  width: 100%;
  height: 50px;
  border: none;
  outline: none;
  font-size: 1rem;
  color: #333;
}

.categories-dropdown {
  display: flex;
  align-items: center;
  border-left: 1px solid #eee;
  padding: 0 15px;
  min-width: 150px;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: none;
  border: none;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
}

.dropdown-toggle i {
  margin-left: 5px;
}

.search-button {
  background-color: var(--theme-color);
  color: white;
  border: none;
  padding: 0 30px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #489d6d;
}

.popular-searches {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
}

.popular-searches span {
  font-weight: 500;
}

.popular-searches a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  margin: 0 2px;
}

.popular-searches a:hover {
  text-decoration: underline;
}

:global(.navbar) {
  background-color: transparent !important;
  position: relative;
  z-index: 3;
}

:global(.navbar .nav-link),
:global(.navbar .navbar-brand),
:global(.navbar .bi) {
  color: white !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

@media (max-width: 992px) {
  .hero-title {
    font-size: 2.8rem;
  }

  .search-container {
    flex-direction: column;
    height: auto;
  }

  .search-input-wrapper,
  .categories-dropdown {
    height: 50px;
  }

  .categories-dropdown {
    border-left: none;
    border-top: 1px solid #eee;
  }

  .search-button {
    height: 50px;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .gradient-overlay {
    background: linear-gradient(to bottom,
        rgba(0, 0, 0, 0.7) 0px,
        rgba(0, 0, 0, 0.55) 70px,
        rgba(0, 0, 0, 0.4) 140px,
        rgba(0, 0, 0, 0.3) 100%);
  }
}
</style>