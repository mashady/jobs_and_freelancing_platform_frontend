<template>
  <div class="container py-5" style="background: #fff3f0; border-radius: 10px;">
    <!-- Top Section -->
    <div class="d-flex justify-content-between align-items-center flex-wrap mb-4">
      <div class="d-flex align-items-center">
        <img
          src="https://via.placeholder.com/100"
          class="rounded-circle me-3"
          alt="Profile"
          width="100"
          height="100"
        />
        <div>
          <h4 class="mb-0">Freelancer</h4>
          <p class="text-muted mb-1">Marketing Manager</p>
          <div class="d-flex align-items-center flex-wrap gap-3">
            <div class="d-flex align-items-center">
              <i class="bi bi-star-fill text-warning me-1"></i>
              <span>5.0 (1 Review)</span>
            </div>
            <div class="text-muted d-flex align-items-center">
              <i class="bi bi-geo-alt me-1"></i> Los Angeles &nbsp;
              <i class="bi bi-calendar-event ms-3 me-1"></i> November 9, 1986
            </div>
          </div>
        </div>
      </div>
      <div>
        <button class="btn btn-success me-2">Download CV</button>
        <button class="btn btn-success">Message</button>
      </div>
    </div>
  </div>

  <!-- Stats Section -->
  <div class="row text-center mb-4">
    <div class="col">
      <i class="bi bi-bullseye text-success" style="font-size: 2rem;"></i>
      <p class="mb-0">Project Success</p>
      <strong>0</strong>
    </div>
    <div class="col">
      <i class="bi bi-bar-chart text-success" style="font-size: 2rem;"></i>
      <p class="mb-0">Total Service</p>
      <strong>2</strong>
    </div>
    <div class="col">
      <i class="bi bi-bullseye text-success" style="font-size: 2rem;"></i>
      <p class="mb-0">Completed Service</p>
      <strong>2</strong>
    </div>
    <div class="col">
      <i class="bi bi-file-earmark-text text-success" style="font-size: 2rem;"></i>
      <p class="mb-0">In Queue service</p>
      <strong>5</strong>
    </div>
  </div>

  <!-- About Section -->
  <h5 class="p-3">About Freelancer</h5>
  <p class="text-muted p-5">
   Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
  </p>

  <!-- Side Card -->
  <div class="card mt-4 shadow-sm rounded" style="max-width: 400px; float: right;">
    <div class="card-body">
      <h4 class="card-title fw-bold">$25 - $30 <small class="text-muted fw-normal">/ hr</small></h4>
      <hr class="my-3" />
      <ul class="list-unstyled">
        <li class="d-flex justify-content-between align-items-center py-2 border-bottom">
          <div><i class="bi bi-geo-alt me-2 text-success"></i> Location</div>
          <div class="fw-semibold text-dark">Los Angeles</div>
        </li>
        <li class="d-flex justify-content-between align-items-center py-2 border-bottom">
          <div><i class="bi bi-building me-2 text-success"></i> Type</div>
          <div class="fw-semibold text-dark">Agency Freelancers</div>
        </li>
        <li class="d-flex justify-content-between align-items-center py-2 border-bottom">
          <div><i class="bi bi-translate me-2 text-success"></i> English Level</div>
          <div class="fw-semibold text-dark">Fluent</div>
        </li>
        <li class="d-flex justify-content-between align-items-center py-2 border-bottom">
          <div><i class="bi bi-gender-male me-2 text-success"></i> Gender</div>
          <div class="fw-semibold text-dark">Male</div>
        </li>
        <li class="d-flex justify-content-between align-items-center py-2 border-bottom">
          <div><i class="bi bi-envelope me-2 text-success"></i> Email</div>
          <div class="fw-semibold text-dark">freelancer@apus.com</div>
        </li>
        <li class="d-flex justify-content-between align-items-center py-2">
          <div><i class="bi bi-telephone me-2 text-success"></i> Phone Number</div>
          <div class="fw-semibold text-dark">(+88) 123–456–789</div>
        </li>
      </ul>
    </div>
  </div>

  <!-- Education -->
  <div class="container my-5">
    <h4 class="mb-4">Education</h4>
    <div class="timeline">
      <div class="timeline-entry" v-for="(entry, index) in education" :key="index" :data-icon="entry.icon">
        <span class="date-badge">{{ entry.years }}</span>
        <div class="edu-title">{{ entry.title }}</div>
        <div class="edu-subtitle">{{ entry.institution }}</div>
        <p class="edu-description">{{ entry.description }}</p>
      </div>
    </div>
  </div>

  <!-- Work -->
  <div class="container my-5">
    <h4 class="mb-4">Work & Experience</h4>
    <div class="timeline">
      <div class="timeline-entry" v-for="(entry, index) in education" :key="index" :data-icon="entry.icon">
        <span class="date-badge">{{ entry.years }}</span>
        <div class="edu-title">{{ entry.title }}</div>
        <div class="edu-subtitle">{{ entry.institution }}</div>
        <p class="edu-description">{{ entry.description }}</p>
      </div>
    </div>
  </div>

  <!-- Services -->
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold">Services</h2>
      <a href="#" class="text-success text-decoration-none">
        Browse Full List <i class="bi bi-arrow-up-right"></i>
      </a>
    </div>

    <div class="row">
      <div class="col-md-6 mb-4" v-for="service in services" :key="service.title">
        <div class="card h-100 shadow-sm border-0">
          <div class="position-relative">
            <img :src="service.image" class="card-img-top" alt="Service Image" />
            <button class="btn btn-light rounded-circle position-absolute top-0 end-0 m-2 shadow-sm">
              <i class="bi bi-heart"></i>
            </button>
          </div>
          <div class="card-body">
            <p class="text-muted small mb-1">{{ service.category }}</p>
            <h6 class="fw-semibold">{{ service.title }}</h6>
            <div class="d-flex align-items-center small text-muted mb-2">
              <i class="bi bi-star-fill text-warning me-1"></i>
              <span>{{ service.rating }} ({{ service.reviews }} Reviews)</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <img :src="service.avatar" alt="Freelancer" class="rounded-circle me-2" width="30" height="30" />
                <small class="text-muted">Freelancer</small>
              </div>
              <div class="text-end">
                <small class="text-muted">Starting at:</small>
                <div class="fw-bold">${{ service.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container py-5">
    <!-- Header -->
    <h5 class="fw-bold mb-4">1 Review</h5>

    <div class="row">
      <!-- Left Rating Box -->
      <div class="col-md-4">
        <div class="bg-light text-center py-5 rounded" style="background-color: #ffeee9 !important;">
          <h1 class="text-warning display-4 fw-bold">{{ averageRating.toFixed(1) }}</h1>
          <div class="text-warning mb-2">
            <i class="bi bi-star-fill" v-for="i in 5" :key="i"></i>
          </div>
          <small class="text-muted">{{ totalRatings }} rating</small>
        </div>
      </div>

      <!-- Rating Breakdown -->
      <div class="col-md-8">
        <div v-for="star in 5" :key="star" class="d-flex align-items-center mb-2">
          <div class="me-2" style="width: 60px;">{{ star }} Star</div>
          <div class="progress flex-grow-1" style="height: 6px;">
            <div
              class="progress-bar"
              :class="star === 5 ? 'bg-warning' : 'bg-light'"
              :style="{ width: getRatingPercentage(star) + '%' }"
            ></div>
          </div>
          <div class="ms-2" style="width: 40px;">{{ getRatingPercentage(star) }}%</div>
        </div>
      </div>
    </div>

    <!-- User Review -->
    <div class="d-flex align-items-start mt-5">
      <img
        src="https://via.placeholder.com/50"
        alt="user"
        class="rounded-circle me-3"
        width="50"
        height="50"
      />
      <div>
        <div class="d-flex align-items-center mb-1">
          <strong class="me-2">Admin</strong>
          <i class="bi bi-star-fill text-warning me-1"></i>
          <span class="text-muted small">{{ averageRating }} &nbsp; November 16, 2022</span>
        </div>
        <p class="text-muted mb-0">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
          consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
      </div>
    </div>
  </div>
  <div class="container py-5">
    <h5 class="fw-bold mb-3">Add a review</h5>

    <!-- Star Rating -->
    <p class="text-muted mb-1">Your Rating for this listing</p>
    <div class="mb-3">
      <i
        class="bi"
        v-for="i in 5"
        :key="i"
        :class="i <= form.rating ? 'bi-star-fill text-warning' : 'bi-star text-warning'"
        style="font-size: 1.25rem; cursor: pointer"
        @click="form.rating = i"
      ></i>
    </div>

    <!-- Comment -->
    <div class="mb-3">
      <label for="comment" class="form-label">Your Comment</label>
      <textarea
        id="comment"
        class="form-control"
        rows="5"
        placeholder="Comment"
        v-model="form.comment"
      ></textarea>
    </div>

    <!-- Name and Email -->
    <div class="row mb-3">
      <div class="col-md-6">
        <input
          type="text"
          class="form-control"
          placeholder="Name"
          v-model="form.name"
        />
      </div>
      <div class="col-md-6">
        <input
          type="email"
          class="form-control"
          placeholder="Email"
          v-model="form.email"
        />
      </div>
    </div>

    <!-- Save Info -->
    <div class="form-check mb-4">
      <input
        class="form-check-input"
        type="checkbox"
        id="saveInfo"
        v-model="form.saveInfo"
      />
      <label class="form-check-label" for="saveInfo">
        Save my name, email, and website in this browser for the next time I comment.
      </label>
    </div>

    <!-- Submit Button -->
    <button class="btn btn-success px-4 py-2" @click="submitReview">
      Submit Review
    </button>
  </div>
</template>
<script>
export default {
  name: "FreelancerProfile",
  data() {
    return {
      education: [
        {
          icon: "M",
          years: "2005–2008",
          title: "Marketing College",
          institution: "Modern College",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
        },
        {
          icon: "C",
          years: "2008–2009",
          title: "Computer Science",
          institution: "Harvartd University",
          description:
            "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
        },
      ],
      services: [
        {
          category: "Development & IT",
          title: "Easy to build your own playlists and sync them for...",
          rating: 5.0,
          reviews: 1,
          price: 58,
          image: "https://via.placeholder.com/600x400?text=Code+Preview",
          avatar: "https://via.placeholder.com/30",
        },
        {
          category: "Design & Creative",
          title: "I will design website UI UX in adobe xd or figma",
          rating: 4.3,
          reviews: 3,
          price: 69,
          image: "hdata:image/jpeg;base64,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",
          avatar: "https://via.placeholder.com/30",
        },
      ],
      averageRating: 5.0,
      totalRatings: 1,
      ratings: {
        5: 1,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      },
      form: {
        rating: 0,
        comment: "",
        name: "",
        email: "",
        saveInfo: false,
      },
    };
  },
  methods: {
    getRatingPercentage(star) {
      const total = Object.values(this.ratings).reduce((a, b) => a + b, 0);
      if (total === 0) return 0;
      return Math.round((this.ratings[star] / total) * 100);
    },
    submitReview() {
      console.log({
        rating: this.form.rating,
        comment: this.form.comment,
        name: this.form.name,
        email: this.form.email,
        saveInfo: this.form.saveInfo,
      });
      alert("Review submitted!");
    },
  },
};
</script>



<style scoped>
body {
  background-color: #f8f9fa;
}
.timeline {
  position: relative;
  margin-left: 40px;
  padding-left: 30px;
  border-left: 2px dashed #56c870;
}
.timeline-entry {
  position: relative;
  margin-bottom: 40px;
}
.timeline-entry::before {
  content: attr(data-icon);
  position: absolute;
  left: -42px;
  top: 0;
  background-color: #e5f4eb;
  color: #56c870;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  font-weight: bold;
  font-family: Arial, sans-serif;
}
.date-badge {
  background-color: #ffece7;
  color: #000;
  font-size: 14px;
  padding: 5px 15px;
  border-radius: 15px;
  display: inline-block;
  margin-bottom: 10px;
}
.edu-title {
  font-weight: 600;
  font-size: 18px;
}
.edu-subtitle {
  color: #56c870;
  font-weight: 500;
  margin-bottom: 10px;
}
.edu-description {
  color: #666;
  font-size: 15px;
}
.card-img-top {
  height: 200px;
  object-fit: cover;
}
.progress-bar.bg-light {
  background-color: #f2f7f4 !important;
}
.bi {
  font-size: 1.25rem;
  cursor: pointer;
}
</style>
