<template>
  <div class="container mt-5">
    <div class="row">
      <!-- Left Column: Main Info -->
      <div class="col-md-8">
        <div class="card p-4 mb-3">
          <div class="d-flex align-items-center mb-3">
            <img src="https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-622.jpg?semt=ais_hybrid" alt="Profile" class="rounded-circle me-3" width="80" height="80" />
            <div>
              <h4 class="mb-0">Freelancer</h4>
              <small class="text-muted">Marketing Manager</small><br />
              <span class="text-warning">★ 5.0 (1 Review)</span>
              <div class="text-muted mt-1">
                <i class="bi bi-geo-alt-fill me-1"></i> Los Angeles |
                <i class="bi bi-calendar-event me-1"></i> November 9, 1986
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="row text-center mb-3">
            <div class="col">
              <div><i class="bi bi-bullseye"></i></div>
              <div>Project Success</div>
              <strong>0</strong>
            </div>
            <div class="col">
              <div><i class="bi bi-bar-chart-line"></i></div>
              <div>Total Service</div>
              <strong>2</strong>
            </div>
            <div class="col">
              <div><i class="bi bi-check-circle"></i></div>
              <div>Completed</div>
              <strong>2</strong>
            </div>
            <div class="col">
              <div><i class="bi bi-hourglass-split"></i></div>
              <div>In Queue</div>
              <strong>5</strong>
            </div>
          </div>

          <!-- About -->
          <h5>About Freelancer</h5>
          <p class="text-muted">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...
          </p>
        </div>
      </div>

      <!-- Right Column: Sidebar -->
      <div class="col-md-4">
        <div class="card p-4 mb-3">
          <h4 class="text-success">$25 - $30 <small class="text-muted">/ hr</small></h4>
          <ul class="list-unstyled mt-3">
            <li><strong>Location:</strong> Los Angeles</li>
            <li><strong>Type:</strong> Agency Freelancers</li>
            <li><strong>English Level:</strong> Fluent</li>
            <li><strong>Gender:</strong> Male</li>
            <li><strong>Email:</strong> freelancer@apus.com</li>
            <li><strong>Phone:</strong> (+88) 123-456-789</li>
          </ul>
          <div class="d-grid gap-2 mt-4">
            <button class="btn btn-success">Download CV</button>
            <button class="btn btn-outline-success">Message</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FreelancerProfile",
};
</script>

<style scoped>
.card {
  border-radius: 1rem;
}
</style>