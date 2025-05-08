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
          <h4 class="mb-0">employeer</h4>
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
        <button class="btn btn-success">Message</button>
      </div>
    </div>

   
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
  </div>
 <!-- About Sections -->
    <h5 class="p-3">About employeer</h5>
    <p class="text-muted p-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dui at urna fermentum, ut placerat purus tempus. Sed euismod odio in purus tincidunt, a feugiat ante posuere. Maecenas consequat, odio id pretium malesuada, nunc nulla facilisis eros, eget auctor turpis turpis et nunc. Nunc nec libero nisl. Cras condimentum auctor sapien sit amet interdum. Suspendisse eu erat nisl. Ut vestibulum nulla sit amet felis sollicitudin, ut sodales turpis hendrerit. Ut feugiat ligula id quam viverra, ac ullamcorper magna suscipit. Phasellus imperdiet cursus erat in vulputate.
</p>

    <h5 class="p-3">who are we?</h5>
    <p class="text-muted p-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dui at urna fermentum, ut placerat purus tempus. Sed euismod odio in purus tincidunt, a feugiat ante posuere. Maecenas consequat, odio id pretium malesuada, nunc nulla facilisis eros, eget auctor turpis turpis et nunc. Nunc nec libero nisl. Cras condimentum auctor sapien sit amet interdum. Suspendisse eu erat nisl. Ut vestibulum nulla sit amet felis sollicitudin, ut sodales turpis hendrerit. Ut feugiat ligula id quam viverra, ac ullamcorper magna suscipit. Phasellus imperdiet cursus erat in vulputate.
</p>

    <h5 class="p-3">what do we do</h5>
    <p class="text-muted p-5">[Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dui at urna fermentum, ut placerat purus tempus. Sed euismod odio in purus tincidunt, a feugiat ante posuere. Maecenas consequat, odio id pretium malesuada, nunc nulla facilisis eros, eget auctor turpis turpis et nunc. Nunc nec libero nisl. Cras condimentum auctor sapien sit amet interdum. Suspendisse eu erat nisl. Ut vestibulum nulla sit amet felis sollicitudin, ut sodales turpis hendrerit. Ut feugiat ligula id quam viverra, ac ullamcorper magna suscipit. Phasellus imperdiet cursus erat in vulputate.
</p>

  <!-- Image Section -->
  <div class="container my-5">
    <div class="row">
      <div class="col-12">
        <img
          :src="mainImage"
          alt="Main preview"
          class="img-fluid rounded shadow-sm"
          style="width: 100%; max-height: 400px; object-fit: cover;"
        />
      </div>
    </div>

    <div class="row mt-3">
      <div
        class="col-auto"
        v-for="(thumb, index) in thumbnails"
        :key="index"
      >
        <img
          :src="thumb"
          alt="Thumbnail"
          class="img-thumbnail border-0 shadow-sm"
          style="width: 100px; height: 60px; object-fit: cover; cursor: pointer;"
          @click="setMainImage(thumb)"
        />
      </div>
    </div>
  </div>

<div class="container my-5">
    <!-- Header Row -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="fw-bold">Open Position</h5>
      <a href="#" class="text-success text-decoration-none small">
        Browse Full List <i class="bi bi-pencil"></i>
      </a>
    </div>
<!-- Job Cards -->
    <div
      v-for="(job, index) in jobs"
      :key="index"
      class="card border-0 shadow-sm mb-3"
    >
      <div class="card-body d-flex justify-content-between align-items-center">
        <!-- Left Side: Logo + Info -->
        <div class="d-flex">
          <img
            :src="job.logo"
            alt="logo"
            class="me-3"
            style="width: 40px; height: 40px"
          />
          <div>
            <h6 class="mb-1 fw-bold">{{ job.title }}</h6>
            <p class="text-success mb-1 small">{{ job.company }}</p>
            <p class="text-muted small mb-0">
              {{ job.salary }} &nbsp;|&nbsp;
              {{ job.category }} &nbsp;|&nbsp;
              {{ job.type }} &nbsp;|&nbsp;
              {{ job.location }}
            </p>
          </div>
        </div>

        <!-- Right Side: Bookmark -->
        <button
          class="btn rounded-circle"
          :class="job.saved ? 'btn-success' : 'btn-outline-light border'"
          style="width: 36px; height: 36px;"
        >
          <i
            :class="job.saved ? 'bi bi-heart-fill text-white' : 'bi bi-heart text-muted'"
          ></i>
        </button>
      </div>
    </div>
  </div>
  <!-- Review Section -->
  <div class="container py-5">
    <h5 class="fw-bold mb-4">1 Review</h5>

    <div class="row">
      <div class="col-md-4">
        <div class="bg-light text-center py-5 rounded" style="background-color: #ffeee9 !important;">
          <h1 class="text-warning display-4 fw-bold">{{ averageRating.toFixed(1) }}</h1>
          <div class="text-warning mb-2">
            <i class="bi bi-star-fill" v-for="i in 5" :key="i"></i>
          </div>
          <small class="text-muted">{{ totalRatings }} rating</small>
        </div>
      </div>

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
        src="https://s3.eu-west-2.amazonaws.com/selloffng/uploads/blog/202310/img_6527ca82eb8bc0-32465328-77007012.jpg"
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
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
        </p>
      </div>
    </div>
  </div>

    
  <!-- Add Review Section -->
  <div class="container py-5">
    <h5 class="fw-bold mb-3">Add a review</h5>

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
      mainImage: "https://s3.eu-west-2.amazonaws.com/selloffng/uploads/blog/202310/img_6527ca82eb8bc0-32465328-77007012.jpg",
      thumbnails: [
        "https://s3.eu-west-2.amazonaws.com/selloffng/uploads/blog/202310/img_6527ca82eb8bc0-32465328-77007012.jpg",
        "https://s3.eu-west-2.amazonaws.com/selloffng/uploads/blog/202310/img_6527ca82eb8bc0-32465328-77007012.jpg",
        "https://s3.eu-west-2.amazonaws.com/selloffng/uploads/blog/202310/img_6527ca82eb8bc0-32465328-77007012.jpg",
        "https://s3.eu-west-2.amazonaws.com/selloffng/uploads/blog/202310/img_6527ca82eb8bc0-32465328-77007012.jpg",
        "https://s3.eu-west-2.amazonaws.com/selloffng/uploads/blog/202310/img_6527ca82eb8bc0-32465328-77007012.jpg"
      ],
      averageRating: 5.0,
      totalRatings: 1,
      form: {
        rating: 0,
        comment: '',
        name: '',
        email: '',
        saveInfo: false
      },
      jobs: [
        {
          title: "Executive, HR Operations",
          company: "NetTrue",
          salary: "$220 - $250 / week",
          category: "Developers",
          type: "Temporary",
          location: "New York",
         
          saved: true
        },
        {
          title: "Product Sales Specialist",
          company: "NetTrue",
          salary: "$250 - $270 / week",
          category: "Digital Marketing",
          type: "Freelance",
          location: "New York",
         
          saved: false
        }
      ]
    };
  },
  methods: {
    setMainImage(image) {
      this.mainImage = image;
    },
    getRatingPercentage(star) {
      return star === 5 ? 100 : 0; // Change this logic if you plan to dynamically calculate
    },
    submitReview() {
      alert("Thank you for your review!");
      this.form = {
        rating: 0,
        comment: '',
        name: '',
        email: '',
        saveInfo: false
      };
    }
  }
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
.container {
  max-width: 900px;
}
.card {
  border-radius: 14px;
}
</style>
