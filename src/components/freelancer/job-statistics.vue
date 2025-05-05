<template>
    <div class="row gap-5">
        <!-- Posted Services Card -->
        <div class="card p-2" style="width: 16rem;">
          <div class="card-body text-start">
            <div class="service-card">
              <div class="card-content">
                <div class="card-title">Posted Services</div>
                <div class="card-value">2</div>
              </div>
              <div class="card-icon">
                <i class="bi bi-1-square"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="card p-2" style="width: 16rem;">
          <div class="card-body text-start">
            <div class="service-card">
              <div class="card-content">
                <div class="card-title">Completed Services</div>
                <div class="card-value">2</div>
              </div>
              <div class="card-icon">
                <i class="bi bi-check-circle-fill"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="card p-2" style="width: 16rem;">
          <div class="card-body text-start">
            <div class="service-card">
              <div class="card-content">
                <div class="card-title">In Queue Services</div>
                <div class="card-value">5</div>
              </div>
              <div class="card-icon">
                <i class="bi bi-hourglass"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="card col-lg-2 p-2" style="width: 16rem;">
          <div class="card-body text-start">
            <div class="service-card">
              <div class="card-content">
                <div class="card-title">Reviews</div>
                <div class="card-value">1</div>
              </div>
              <div class="card-icon">
                <i class="bi bi-chat-left-dots"></i>
              </div>
            </div>
          </div>
        </div>

        
        
        <!-- Add more cards as needed -->
      </div>
</template>

<script setup>

</script>

<style>

  .service-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.card-icon {
  margin-left: 16px;
  padding: 5px 10px;
  background-color: #E8F5E9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4CAF50; /* Icon color */
  font-size: 1.2rem; /* Icon size */
}

/* For SVG icons (npm package) */
.card-icon svg {
  width: 1em;
  height: 1em;
}

.card-content {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 14px;
  margin-bottom: 4px;
}

.card-value {
  font-size: 24px;
  font-weight: bolder;
  color: #2E7D32;
}
  
</style>