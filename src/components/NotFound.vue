<template>
    <div class="container text-center py-5">
        <h1 class="display-4 fw-bold rounded mx-auto" style="
            background-color: var(--theme-color);
    width: 600px;
        ">404 - Page Not Found</h1>
        <p class="lead mt-3">The page you're looking for doesn't exist.</p>
        <router-link to="/" class="btn mt-4" style="
            color: var(--theme-color);
            background-color: white ;
        ">Go to Home</router-link>
    </div>
</template>

<script>
export default {
    name: "NotFound",
};
</script>
