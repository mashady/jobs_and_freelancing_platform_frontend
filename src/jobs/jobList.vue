<template>
<div class="projects-list-section py-5 px-4 position-relative">
    <div class="container">
      <div class="row align-items-center">
        <!-- Left Side: Text and Search -->
        <div class="col-md-6 mb-4 mb-md-0">
          <h2 class="fw-bold mb-3">Projects List</h2>
          <p class="text-muted">All the Lorem Ipsum generators on the Internet tend to repeat.</p>

          <div class="input-group mt-4 shadow rounded overflow-hidden">
            <span class="input-group-text bg-white border-0">
              <i class="bi bi-search"></i>
            </span>
            <input
              type="text"
              class="form-control border-0"
              placeholder="Project title, keywords"
            />
            <button class="btn btn-success px-4">Search</button>
          </div>
        </div>

        <!-- Right Side: Illustration -->
        <div class="col-md-6 text-center">
          <img
            src="https://raw.githubusercontent.com/abanoub1234/kkkk/refs/heads/main/112.PNG"
            alt="Designer"
            class="img-fluid"
            style="max-height: 320px;"
          />
        </div>
      </div>
    </div>

    <!-- Optional background texture image -->
    <div
      class="background-pattern position-absolute top-0 start-0 w-100 h-100"
      style="z-index: -1; background: url('/your-image-path/bg-pattern.svg') no-repeat center center / cover;"
    ></div>
  </div>
  <div class="container py-5">
    <div class="row">
      <!-- Sidebar Filters -->
      <div class="col-md-3">
        <!-- Category -->
        <h5 class="fw-semibold">Category</h5>
        <ul class="list-unstyled">
          <li v-for="category in categories" :key="category">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :id="category">
              <label class="form-check-label" :for="category">{{ category }}</label>
            </div>
          </li>
        </ul>
        <a href="#" class="text-success small">+ Show less</a>

        <hr />

        <!-- Project Type -->
        <h6 class="fw-semibold mt-4">Project Type</h6>
        <select class="form-select mt-2">
          <option>Project type</option>
        </select>

        <hr />

        <!-- Price Range -->
        <h6 class="fw-semibold mt-4">Price</h6>
        <div class="d-flex justify-content-between mb-1">
          <span class="px-2 py-1 bg-light border border-success text-success rounded small fw-semibold">$0</span>
          <span class="px-2 py-1 bg-light border border-success text-success rounded small fw-semibold">$200</span>
        </div>
        <input type="range" class="form-range text-success" min="0" max="200" style="accent-color: #27a76c;" />

        <hr />

        <!-- Skills -->
        <h6 class="fw-semibold">Skills</h6>
        <ul class="list-unstyled">
          <li v-for="skill in skills" :key="skill">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :id="skill">
              <label class="form-check-label" :for="skill">{{ skill }}</label>
            </div>
          </li>
        </ul>
        <a href="#" class="text-success small">+ Show More</a>

        <hr />

        <!-- City -->
        <h6 class="fw-semibold">Citys</h6>
        <ul class="list-unstyled">
          <li v-for="city in cities" :key="city">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :id="city">
              <label class="form-check-label" :for="city">{{ city }}</label>
            </div>
          </li>
        </ul>

        <hr />

        <!-- Languages -->
        <h6 class="fw-semibold">Languages</h6>
        <ul class="list-unstyled">
          <li v-for="lang in languages" :key="lang">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :id="lang">
              <label class="form-check-label" :for="lang">{{ lang }}</label>
            </div>
          </li>
        </ul>
      </div>

      <!-- Projects List -->
      <div class="col-md-9">
        <!-- Sort and Results -->
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>Showing all 6 results</div>
          <div>
            <select class="form-select" style="width: 200px;">
              <option selected>Sort by (Default)</option>
            </select>
          </div>
        </div>

        <!-- Project Cards -->
        <div v-for="project in projects" :key="project.id" class="card border-0 shadow-sm mb-4">
          <div class="row g-0">
            <div class="col-md-10 p-3">
              <div class="d-flex align-items-center mb-2">
                <img :src="project.logo" alt="logo" style="width: 40px; height: 40px;" class="me-3">
                <div>
                  <h6 class="fw-semibold mb-0">{{ project.title }}</h6>
                  <div class="text-muted small d-flex align-items-center gap-3">
                    <span><i class="bi bi-geo-alt"></i> {{ project.location }}</span>
                    <span><i class="bi bi-calendar3"></i> Posted {{ project.posted }}</span>
                    <span><i class="bi bi-send"></i> {{ project.proposals }} Proposals</span>
                  </div>
                </div>
              </div>
              <p class="text-muted small">{{ project.description }}</p>
              <div class="d-flex flex-wrap gap-2">
                <span v-for="tag in project.tags" :key="tag" class="badge rounded-pill px-3 py-2" style="background-color: #ffeae5; color: #333;">
                  {{ tag }}
                </span>
                <span class="text-muted small align-self-center">+3</span>
              </div>
            </div>
            <div class="col-md-2 text-end p-3 d-flex flex-column justify-content-between align-items-end">
              <div class="text-end">
                <strong class="d-block">${{ project.price }}</strong>
                <small class="text-muted">{{ project.rateType }}</small>
              </div>
              <button class="btn btn-success btn-sm px-4 mt-3" style="background-color: #e8f7ec; color: #27a76c; border: none;">
                Send Proposal <i class="bi bi-arrow-up-right ms-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectsBoard',
  data() {
    return {
      categories: [
        'Business', 'Design & Creative', 'Development & IT', 'Digital Marketing',
        'Lifestyle', 'Music & Audio', 'Programming & Tech', 'Trending',
        'Video & Animation', 'Writing & Translation'
      ],
      skills: [
        'Adobe Photoshop', 'Adobe XD', 'Android Developer', 'Artist',
        'Computer', 'Developer'
      ],
      cities: ['Boston', 'Florida', 'Los Angeles', 'Miami', 'New York'],
      languages: ['English', 'French'],
      projects: [
        {
          id: 1,
          logo: '/images/project1.png',
          title: 'Developer for ACG iOS apps and Website',
          location: 'Miami',
          posted: '2 years ago',
          proposals: 3,
          description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam ...',
          tags: ['Artist', 'Computer', 'Front end Developer'],
          price: '79 - 89',
          rateType: 'Hourly rate'
        },
        {
          id: 2,
          logo: '/images/project2.png',
          title: 'English Content Writer for College',
          location: 'Los Angeles',
          posted: '2 years ago',
          proposals: 2,
          description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam ...',
          tags: ['Artist', 'Computer', 'Front end Developer'],
          price: '29 - 59',
          rateType: 'Fixed'
        }
      ]
    };
  }
}
</script>

<style scoped>
.projects-list-section {
  background-color: #fef1ec;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.input-group-text i {
  font-size: 1.2rem;
  color: #555;
}
.background-pattern {
  opacity: 0.2;
  pointer-events: none;
}
.card {
  border-radius: 10px;
}
.form-range::-webkit-slider-thumb {
  background-color: #27a76c;
}
.form-check-input:checked {
  background-color: #27a76c;
  border-color: #27a76c;
}

</style>
