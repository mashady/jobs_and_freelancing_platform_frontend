<template>
  <div class="container py-5">
    <!-- Project Header -->
    <div class="bg-light rounded shadow-sm p-4 mb-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-start">
        <div>
          <h3 class="fw-bold">Developer for ACG iOS apps and Website</h3>
          <div class="text-muted small">
            <i class="bi bi-geo-alt-fill me-1"></i> Miami &nbsp; | &nbsp;
            <i class="bi bi-calendar-event me-1"></i> November 10, 2022 &nbsp; | &nbsp;
            <i class="bi bi-eye me-1"></i> 3307 Views
          </div>
        </div>
        <div class="mt-3 mt-md-0">
          <button class="btn btn-outline-secondary me-2"><i class="bi bi-share"></i> Share</button>
          <button class="btn btn-outline-secondary"><i class="bi bi-bookmark"></i> Save</button>
        </div>
      </div>
    </div>

    <!-- Main Section -->
    <div class="row">
      <!-- Left Column -->
      <div class="col-md-8">
        <!-- Project Info Badges -->
        <div class="row row-cols-2 row-cols-md-3 g-3 mb-4">
          <div class="col">
            <div class="p-3 border rounded text-center">
              <i class="bi bi-globe2 fs-4 text-primary"></i>
              <div class="fw-bold">Remote</div>
              <small class="text-muted">Project location type</small>
            </div>
          </div>
          <div class="col">
            <div class="p-3 border rounded text-center">
              <i class="bi bi-clock-history fs-4 text-primary"></i>
              <div class="fw-bold">Hourly</div>
              <small class="text-muted">Project Type</small>
            </div>
          </div>
          <div class="col">
            <div class="p-3 border rounded text-center">
              <i class="bi bi-hourglass-split fs-4 text-primary"></i>
              <div class="fw-bold">2 – 3 Hours</div>
              <small class="text-muted">Duration</small>
            </div>
          </div>
          <div class="col">
            <div class="p-3 border rounded text-center">
              <i class="bi bi-translate fs-4 text-primary"></i>
              <div class="fw-bold">Italian</div>
              <small class="text-muted">Language</small>
            </div>
          </div>
          <div class="col">
            <div class="p-3 border rounded text-center">
              <i class="bi bi-patch-check fs-4 text-primary"></i>
              <div class="fw-bold">Fluent</div>
              <small class="text-muted">Level</small>
            </div>
          </div>
          <div class="col">
            <div class="p-3 border rounded text-center">
              <i class="bi bi-bar-chart-line fs-4 text-primary"></i>
              <div class="fw-bold">Professional</div>
              <small class="text-muted">English Level</small>
            </div>
          </div>
        </div>

        <!-- Project Description -->
        <div class="mb-4">
          <h5 class="fw-bold">Project Description</h5>
          <p class="text-muted">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...
          </p>
          <p class="text-muted">
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
          </p>
        </div>
      </div>

      <!-- Right Column -->
      <div class="col-md-4">
        <!-- Pricing Card -->
        <div class="border rounded shadow-sm mb-4 p-3 text-center">
          <h4 class="fw-bold">$79 – $89</h4>
          <p class="text-muted">Hourly rate</p>
          <button class="btn btn-success w-100">Submit a Proposal</button>
        </div>

        <!-- Seller Card -->
        <div class="border rounded shadow-sm p-3">
          <div class="d-flex align-items-center mb-3">
            <img src="https://cdn-icons-png.flaticon.com/512/1995/1995471.png" alt="Seller" class="me-2" style="width: 40px; height: 40px;">
            <div>
              <strong>APinter</strong>
              <div class="text-muted small">Open Project - 1</div>
              <div class="text-warning small">★ 3.5 (2 Reviews)</div>
            </div>
          </div>
          <hr>
          <p class="mb-1"><strong>Location:</strong> New York</p>
          <p class="mb-1"><strong>Employees:</strong> 70–90</p>
          <p class="mb-1"><strong>Categories:</strong> Designer</p>
          <button class="btn btn-outline-primary w-100 mt-2">Contact Me</button>
        </div>
      </div>
    </div>
  </div>
</template>
