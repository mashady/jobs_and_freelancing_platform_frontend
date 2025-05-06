<template>
  <div class="slider-container">
    <div class="container">
        <div class="slider-header" data-aos="fade-up" data-aos-delay="0">
          <div>
            <h2 class="text-2xl font-bold">Trending Services</h2>
            <p class="text-gray-500 text-sm">Most viewed and all-time top-selling services</p>
          </div>
          <a href="#" class="view-all">All Categories →</a>
        </div>
    
        <div class="slider-content-wrapper">
          <button 
            class="nav-button prev-button" 
            @click="scrollLeft"
            :disabled="isAtStart"
            data-aos="fade-right"
            data-aos-delay="100">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
      
          <div class="slider-content" ref="sliderContent">
            <div 
              v-for="(service, index) in services" 
              :key="index" 
              class="service-card"
              data-aos="fade-up"
              :data-aos-delay="index * 100">
              <div class="card-image-container">
                <img :src="service.image" :alt="service.title" class="card-image" />
                <button class="favorite-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <div v-if="service.featured" class="featured-tag">Featured</div>
              </div>
          
              <div class="card-content">
                <div class="card-category">{{ service.category }}</div>
                <h3 class="card-title">{{ service.title }}</h3>
            
                <div class="card-rating">
                  <div class="stars">
                    <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" :fill="i <= service.rating ? '#ffc107' : 'none'" stroke="#ffc107" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <span class="rating-text">{{ service.rating.toFixed(1) }} ({{ service.reviews }} {{ service.reviews === 1 ? 'Review' : 'Reviews' }})</span>
                </div>
            
                <div class="card-seller">
                  <div class="seller-avatar">
                    <img :src="service.seller.avatar" :alt="service.seller.name" />
                  </div>
                  <span class="seller-name">{{ service.seller.name }}</span>
                  <div class="price-info">
                    <span class="price-label">Starting at:</span>
                    <span class="price-value">${{ service.price }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <button 
            class="nav-button next-button" 
            @click="scrollRight"
            :disabled="isAtEnd"
            data-aos="fade-left"
            data-aos-delay="100">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

const sliderContent = ref(null);
const isAtStart = ref(true);
const isAtEnd = ref(false);
const scrollAmount = ref(300);

const services = ref([
  {
    id: 1,
    title: 'I will often turn to a PHP framework to compose My code',
    category: 'Design & Creative',
    image: 'https://demoapus1.com/freeio/wp-content/uploads/2022/11/service8-495x370.jpg',
    rating: 4.0,
    reviews: 1,
    price: 68,
    featured: false,
    seller: {
      name: 'Ali Tufan',
      avatar: 'https://demoapus1.com/freeio/wp-content/uploads/2022/10/5.jpg'
    }
  },
  {
    id: 2,
    title: 'Management software to help you manage your mobile',
    category: 'Development & IT',
    image: 'https://demoapus1.com/freeio/wp-content/uploads/2022/11/service12-495x370.jpg',
    rating: 4.5,
    reviews: 2,
    price: 89,
    featured: false,
    seller: {
      name: 'Ali Tufan',
      avatar: 'https://demoapus1.com/freeio/wp-content/uploads/2022/10/5.jpg'
    }
  },
  {
    id: 3,
    title: 'Web development, with HTML, CSS, JavaScript and PHP',
    category: 'Development & IT',
    image: 'https://demoapus1.com/freeio/wp-content/uploads/2022/11/service11-495x370.jpg',
    rating: 4.5,
    reviews: 2,
    price: 69,
    featured: false,
    seller: {
      name: 'Agent Pakulla',
      avatar: 'https://demoapus1.com/freeio/wp-content/uploads/2022/10/5.jpg'
    }
  },
  {
    id: 4,
    title: 'Developers drop the framework folder into a new parent',
    category: 'Design & Creative',
    image: 'https://demoapus1.com/freeio/wp-content/uploads/2022/11/service10-495x370.jpg',
    rating: 4.5,
    reviews: 2,
    price: 128,
    featured: true,
    seller: {
      name: 'John Powell',
      avatar: 'https://demoapus1.com/freeio/wp-content/uploads/2022/10/5.jpg'
    }
  },
  {
    id: 5,
    title: 'Flexibility & Custom CMS vs PHP Framework',
    category: 'Development & IT',
    image: 'https://demoapus1.com/freeio/wp-content/uploads/2022/11/service9-495x370.jpg',
    rating: 5.0,
    reviews: 1,
    price: 95,
    featured: false,
    seller: {
      name: 'Thomas Powell',
      avatar: 'https://demoapus1.com/freeio/wp-content/uploads/2022/10/5.jpg'
    }
  },
  {
    id: 6,
    title: 'I will often turn to a PHP framework to compose My code',
    category: 'Design & Creative',
    image: 'https://demoapus1.com/freeio/wp-content/uploads/2022/11/service8-495x370.jpg',
    rating: 4.0,
    reviews: 1,
    price: 68,
    featured: false,
    seller: {
      name: 'Ali Tufan',
      avatar: 'https://demoapus1.com/freeio/wp-content/uploads/2022/10/5.jpg'
    }
  },
  {
    id: 7,
    title: 'Management software to help you manage your mobile',
    category: 'Development & IT',
    image: 'https://demoapus1.com/freeio/wp-content/uploads/2022/11/service12-495x370.jpg',
    rating: 4.5,
    reviews: 2,
    price: 89,
    featured: false,
    seller: {
      name: 'Ali Tufan',
      avatar: 'https://demoapus1.com/freeio/wp-content/uploads/2022/10/5.jpg'
    }
  },
  {
    id: 8,
    title: 'Web development, with HTML, CSS, JavaScript and PHP',
    category: 'Development & IT',
    image: 'https://demoapus1.com/freeio/wp-content/uploads/2022/11/service11-495x370.jpg',
    rating: 4.5,
    reviews: 2,
    price: 69,
    featured: false,
    seller: {
      name: 'Agent Pakulla',
      avatar: 'https://demoapus1.com/freeio/wp-content/uploads/2022/10/5.jpg'
    }
  },
  {
    id: 9,
    title: 'Developers drop the framework folder into a new parent',
    category: 'Design & Creative',
    image: 'https://demoapus1.com/freeio/wp-content/uploads/2022/11/service10-495x370.jpg',
    rating: 4.5,
    reviews: 2,
    price: 128,
    featured: true,
    seller: {
      name: 'John Powell',
      avatar: 'https://demoapus1.com/freeio/wp-content/uploads/2022/10/5.jpg'
    }
  },
  {
    id: 10,
    title: 'Flexibility & Custom CMS vs PHP Framework',
    category: 'Development & IT',
    image: 'https://demoapus1.com/freeio/wp-content/uploads/2022/11/service9-495x370.jpg',
    rating: 5.0,
    reviews: 1,
    price: 95,
    featured: false,
    seller: {
      name: 'Thomas Powell',
      avatar: 'https://demoapus1.com/freeio/wp-content/uploads/2022/10/5.jpg'
    }
  }
]);

const checkScrollPosition = () => {
  const content = sliderContent.value;
  if (content) {
    isAtStart.value = content.scrollLeft <= 10;
    isAtEnd.value = content.scrollLeft + content.clientWidth >= content.scrollWidth - 10;
  }
};

const scrollLeft = () => {
  if (sliderContent.value) {
    sliderContent.value.scrollBy({
      left: -scrollAmount.value,
      behavior: 'smooth'
    });
    setTimeout(checkScrollPosition, 300);
  }
};

const scrollRight = () => {
  if (sliderContent.value) {
    sliderContent.value.scrollBy({
      left: scrollAmount.value,
      behavior: 'smooth'
    });
    setTimeout(checkScrollPosition, 300);
  }
};

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 50
  });
  
  checkScrollPosition();
  window.addEventListener('resize', checkScrollPosition);
  
  sliderContent.value.addEventListener('scroll', () => {
    setTimeout(() => {
      AOS.refresh();
    }, 500);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScrollPosition);
  if (sliderContent.value) {
    sliderContent.value.removeEventListener('scroll', () => {});
  }
});
</script>

<style scoped>
.slider-container {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7fafc;
  padding-top: 100px;
  padding-bottom: 100px;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.view-all {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.view-all:hover {
  color: #3182ce;
}

.slider-content-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.slider-content {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none; 
  -ms-overflow-style: none; 
  gap: 20px;
  padding: 10px 0;
}

.slider-content::-webkit-scrollbar {
  display: none; 
}

.service-card {
  min-width: 280px;
  max-width: 280px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex-shrink: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.card-image-container {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.service-card:hover .card-image {
  transform: scale(1.05);
}

.favorite-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.favorite-button:hover {
  transform: scale(1.1);
}

.featured-tag {
  position: absolute;
  top: 10px;
  left: 0;
  background-color: #4caf50;
  color: white;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.card-content {
  padding: 16px;
}

.card-category {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.4;
  height: 45px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  transition: color 0.3s ease;
}

.service-card:hover .card-title {
  color: #3182ce;
}

.card-rating {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.stars {
  display: flex;
  margin-right: 8px;
}

.rating-text {
  font-size: 14px;
  color: #666;
}

.card-seller {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #eee;
  padding-top: 12px;
}

.seller-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 8px;
  transition: transform 0.3s ease;
}

.service-card:hover .seller-avatar {
  transform: scale(1.1);
}

.seller-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.seller-name {
  font-size: 14px;
  color: #333;
  flex-grow: 1;
}

.price-info {
  text-align: right;
}

.price-label {
  display: block;
  font-size: 10px;
  color: #999;
}

.price-value {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.nav-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: absolute;
  z-index: 2;
  transition: transform 0.2s ease, background-color 0.3s ease;
}

.nav-button:hover:not(:disabled) {
  background-color: #f8f9fa;
  transform: scale(1.05);
}

.prev-button {
  left: -20px;
}

.next-button {
  right: -20px;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .slider-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .service-card {
    min-width: 250px;
  }
  
  .nav-button {
    top: calc(50% - 20px);
  }
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