<template>
    <footer class="footer py-5">
      <div class="container">
        <div class="row mb-4 border-bottom pb-3">
          <div class="col-md-6">
            <nav class="footer-nav">
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <router-link to="/terms" class="footer-link">Terms of Service</router-link>
                </li>
                <li class="list-inline-item">
                  <router-link to="/privacy" class="footer-link">Privacy Policy</router-link>
                </li>
                <li class="list-inline-item">
                  <router-link to="/sitemap" class="footer-link">Site Map</router-link>
                </li>
              </ul>
            </nav>
          </div>
          <div class="col-md-6 text-md-end">
            <div class="social-links">
              <span class="me-3">Follow Us</span>
              <a href="#" class="social-link me-3" aria-label="Facebook">
                <i class="bi bi-facebook"></i>
              </a>
              <a href="#" class="social-link me-3" aria-label="Twitter">
                <i class="bi bi-twitter"></i>
              </a>
              <a href="#" class="social-link me-3" aria-label="Instagram">
                <i class="bi bi-instagram"></i>
              </a>
              <a href="#" class="social-link" aria-label="LinkedIn">
                <i class="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
  
        <div class="row pt-4">
          <div class="col-md-3 col-6 mb-4 mb-md-0">
            <h5 class="footer-heading">About</h5>
            <ul class="footer-links">
              <li v-for="(link, index) in aboutLinks" :key="'about-' + index">
                <router-link :to="link.url" class="footer-link">{{ link.text }}</router-link>
              </li>
            </ul>
          </div>
  
          <div class="col-md-3 col-6 mb-4 mb-md-0">
            <h5 class="footer-heading">Categories</h5>
            <ul class="footer-links">
              <li v-for="(link, index) in categoryLinks" :key="'cat-' + index">
                <router-link :to="link.url" class="footer-link">{{ link.text }}</router-link>
              </li>
            </ul>
          </div>
  
          <div class="col-md-3 col-6 mb-4 mb-md-0">
            <h5 class="footer-heading">Support</h5>
            <ul class="footer-links">
              <li v-for="(link, index) in supportLinks" :key="'support-' + index">
                <router-link :to="link.url" class="footer-link">{{ link.text }}</router-link>
              </li>
            </ul>
          </div>
  
          <div class="col-md-3 col-6 mb-4 mb-md-0">
            <h5 class="footer-heading">Subscribe</h5>
            <div class="input-group mb-4">
              <input type="email" class="form-control footer-input" placeholder="Your email address">
              <button class="btn btn-send" type="button">Send</button>
            </div>
            
            <h5 class="footer-heading mt-4">Apps</h5>
            <ul class="footer-links">
              <li>
                <a href="#" class="footer-link">
                  <i class="bi bi-apple me-2"></i> iOS App
                </a>
              </li>
              <li>
                <a href="#" class="footer-link">
                  <i class="bi bi-android2 me-2"></i> Android App
                </a>
              </li>
            </ul>
          </div>
        </div>
  
        <div class="row mt-5">
          <div class="col-md-6">
            <p class="copyright">© Freeio. 2022 CreativeLayers. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const aboutLinks = ref([
    { text: 'About Us', url: '/about-us' },
    { text: 'Become Seller', url: '/become-seller' },
    { text: 'Jobs on Freeio', url: '/jobs' },
    { text: 'Pricing', url: '/pricing' },
    { text: 'Services Freeio', url: '/services' },
    { text: 'Terms of Service', url: '/terms' }
  ])
  
  const categoryLinks = ref([
    { text: 'Design & Creative', url: '/categories/design' },
    { text: 'Development & IT', url: '/categories/development' },
    { text: 'Music & Audio', url: '/categories/music' },
    { text: 'Programming & Tech', url: '/categories/programming' },
    { text: 'Digital Marketing', url: '/categories/marketing' },
    { text: 'Finance & Accounting', url: '/categories/finance' },
    { text: 'Writing & Translation', url: '/categories/writing' },
    { text: 'Trending', url: '/categories/trending' },
    { text: 'Lifestyle', url: '/categories/lifestyle' }
  ])
  
  const supportLinks = ref([
    { text: 'Help & Support', url: '/help' },
    { text: 'FAQ Freeio', url: '/faq' },
    { text: 'Contact Us', url: '/contact' },
    { text: 'Services', url: '/services' },
    { text: 'Terms of Service', url: '/terms' }
  ])
  </script>
  
  <style scoped>
  .footer {
    background-color: #222;
    color: #aaa;
    font-size: 0.9rem;
  }
  
  .footer-heading {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
  
  .footer-links {
    list-style-type: none;
    padding-left: 0;
  }
  
  .footer-links li {
    margin-bottom: 0.8rem;
  }
  
  .footer-link {
    color: #aaa;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .footer-link:hover {
    color: #fff;
    text-decoration: none;
  }
  
  .social-link {
    color: #fff;
    font-size: 1.2rem;
    transition: opacity 0.2s ease;
  }
  
  .social-link:hover {
    opacity: 0.8;
  }
  
  .border-bottom {
    border-color: #444 !important;
  }
  
  .footer-input {
    background-color: #333;
    border: none;
    color: #fff;
    padding: 0.5rem 1rem;
  }
  
  .footer-input::placeholder {
    color: #aaa;
  }
  
  .btn-send {
    background-color: #444;
    color: #fff;
    border: none;
  }
  
  .btn-send:hover {
    background-color: #555;
  }
  
  .copyright {
    color: #777;
    font-size: 0.85rem;
  }
  
  .language-dropdown .btn {
    background-color: transparent;
    color: #aaa;
    border: none;
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
  }
  
  .language-dropdown .btn:focus,
  .language-dropdown .btn:active {
    box-shadow: none;
  }
  
  .language-dropdown .dropdown-menu {
    background-color: #333;
    border: none;
    min-width: 8rem;
  }
  
  .language-dropdown .dropdown-item {
    color: #aaa;
  }
  
  .language-dropdown .dropdown-item:hover {
    background-color: #444;
    color: #fff;
  }
  </style>