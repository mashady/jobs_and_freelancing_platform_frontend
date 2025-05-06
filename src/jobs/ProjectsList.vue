<template>
  <div class="bg-light min-vh-100">
    <!-- Header Section -->
    <header class="py-5 px-3 bg-white shadow-sm">
      <div class="container d-flex flex-column flex-lg-row align-items-center justify-content-between">
        <div>
          <h1 class="h3 fw-bold text-dark">Projects List</h1>
          <p class="text-muted mt-2">All the Lorem Ipsum generators on the Internet tend to repeat.</p>
        </div>
        <div class="mt-3 mt-lg-0">
          <div class="input-group shadow-sm">
            <input type="text" class="form-control" placeholder="Project title, keywords" />
            <button class="btn btn-success">Search</button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container my-4">
      <div class="row">
        <!-- Sidebar -->
        <aside class="col-lg-3 mb-4">
          <div class="mb-4">
            <h5 class="fw-semibold mb-2">Category</h5>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="cat1" />
              <label class="form-check-label" for="cat1">Business</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="cat2" />
              <label class="form-check-label" for="cat2">Design & Creative</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="cat3" />
              <label class="form-check-label" for="cat3">Development & IT</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="cat4" />
              <label class="form-check-label" for="cat4">Digital Marketing</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="cat5" />
              <label class="form-check-label" for="cat5">Lifestyle</label>
            </div>
            <div class="text-success small mt-2" style="cursor: pointer;">+ Show More</div>
          </div>

          <div class="mb-4">
            <h5 class="fw-semibold mb-2">Project Type</h5>
            <select class="form-select form-select-sm">
              <option selected>Project type</option>
            </select>
          </div>

          <div>
            <h5 class="fw-semibold mb-2">Price</h5>
            <div class="d-flex justify-content-between small text-muted mb-2">
              <span class="bg-light px-2 py-1 rounded border">$0</span>
              <span class="bg-light px-2 py-1 rounded border">$200</span>
            </div>
            <input type="range" class="form-range" min="0" max="200" />
          </div>
        </aside>

        <!-- Project List -->
        <main class="col-lg-9">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted small">Showing all 6 results</span>
            <select class="form-select form-select-sm w-auto">
              <option selected>Sort by (Default)</option>
            </select>
          </div>

          <ProjectCard
            title="Developer for ACG iOS apps and Website"
            location="Miami"
            date="2 years ago"
            proposals="3"
            price="$79 - $89"
            rateType="Hourly rate"
          />
          <ProjectCard
            title="English Content Writer for College"
            location="Los Angeles"
            date="2 years ago"
            proposals="2"
            price="$29 - $59"
            rateType="Fixed"
          />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectCard from "./ProjectCard.vue";

export default {
  components: {
    ProjectCard,
  },
};
</script>
