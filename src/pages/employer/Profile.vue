<template>
  <div class="container py-5">
    <!-- Profile Header -->
    <div class="bg-white shadow-sm rounded p-4 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
      <!-- Profile Info -->
      <div class="d-flex align-items-center">
        <img src="https://demoapus1.com/freeio/wp-content/uploads/wp-freeio-uploads/_employer_featured_image/2023/06/h36-410x410.png" alt="Employer" class="rounded-circle me-4 border" style="width: 90px; height: 90px;" />
        <div>
          <h4 class="fw-bold mb-1">Employer</h4>
          <p class="text-muted mb-2">Lorem Ipsum Dolar Sit Amet</p>
          <div class="d-flex flex-wrap text-muted gap-3">
            <span><i class="bi bi-star-fill text-warning me-1"></i>5.0 | 1 Review</span>
            <span><i class="bi bi-geo-alt-fill me-1"></i>New York</span>
            <span><i class="bi bi-envelope-fill me-1"></i>employer@apus.com</span>
          </div>
        </div>
      </div>
      <!-- Message Button -->
      <div class="mt-3 mt-md-0">
        <button class="btn btn-success px-4"><i class="bi bi-chat-dots me-2"></i>Message</button>
      </div>
    </div>

    <div class="row">
      <!-- About Company -->
      <div class="col-lg-8 mb-4">
        <div class="bg-white shadow-sm rounded p-4">
          <h5 class="fw-semibold mb-3">About Company</h5>
          <p class="text-muted mb-3">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
          <p class="text-muted">
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.
          </p>
        </div>
      </div>

      <!-- About Me / Sidebar -->
      <div class="col-lg-4">
        <div class="bg-white shadow-sm rounded p-4">
          <h5 class="fw-semibold mb-3">About Me</h5>
          <ul class="list-unstyled text-muted">
            <li class="mb-3">
              <i class="bi bi-tags-fill text-primary me-2"></i>
              <strong>Categories:</strong> Digital Marketing
            </li>
            <li class="mb-3">
              <i class="bi bi-people-fill text-primary me-2"></i>
              <strong>Employees:</strong> 35
            </li>
            <li class="mb-3">
              <i class="bi bi-calendar-event-fill text-primary me-2"></i>
              <strong>Founded Date:</strong> 1986
            </li>
            <li class="mb-3">
              <i class="bi bi-envelope-fill text-primary me-2"></i>
              <strong>Email:</strong> employer@apus.com
            </li>
            <li class="mb-3">
              <i class="bi bi-telephone-fill text-primary me-2"></i>
              <strong>Phone:</strong> (+88)123–456–789
            </li>
            <li>
              <i class="bi bi-geo-alt-fill text-primary me-2"></i>
              <strong>Location:</strong> New York
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmployerProfile",
};
</script>

<style scoped>
body {
  background-color: #f8f9fa;
  font-family: "Segoe UI", sans-serif;
}
</style>