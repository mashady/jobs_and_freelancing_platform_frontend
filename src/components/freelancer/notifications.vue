<template>
    <div class="p-3 bg-white border-border-rounded">
        <h3>Notifications</h3>
        <div class="notifications-wrapper border border-1 p-2" style="max-height: 400px; overflow-y: auto;">
            <div v-for="notification in notifications" :key="notification.id" class="mb-2">
                <div>{{ notification.message }}</div>
                <div v-if="notification.jobTitle">
                <strong>{{ notification.jobTitle }}</strong> by <strong>{{ notification.employer }}</strong>
                </div>
                <small class="text-muted">{{ notification.time }}</small>
            </div>
        </div>
    </div>
</template>
  
<script setup>
  const notifications = [
  {
    id: 1,
    message: "Narrator",
    action: null,
    jobTitle: null,
    employer: "Employer",
    time: "2 days ago",
    status: null,
    isRead: false
  },
  {
    id: 2,
    message: "The application is undo approved on your job",
    action: "undo_approved",
    jobTitle: "Audiobook Narrator",
    employer: "Employer",
    time: "2 days ago",
    status: "warning",
    isRead: false
  },
  {
    id: 3,
    message: "The application is approved on your job",
    action: "approved",
    jobTitle: "Audiobook Narrator",
    employer: "Employer",
    time: "2 days ago",
    status: "success",
    isRead: true
  },
  {
    id: 4,
    message: "The application is undo rejected on your job",
    action: "undo_rejected",
    jobTitle: "Audiobook Narrator",
    employer: "Employer",
    time: "1 hour ago",
    status: "danger",
    isRead: false
  }
];

</script>
  
<style scoped>
  .notifications-wrapper {
    scrollbar-width: thin; /* For Firefox */
    padding-right: 8px; /* Prevents content from touching scrollbar */
  }
  
  .notifications-wrapper::-webkit-scrollbar {
    width: 6px; /* For Chrome/Safari */
  }
  
  .notifications-wrapper::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 3px;
  }
  
  /* Keep your existing styles */
  div div {
    overflow: hidden;
    scroll-behavior: smooth;
  }
</style>