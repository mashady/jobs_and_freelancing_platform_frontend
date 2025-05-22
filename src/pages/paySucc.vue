<template>
    <div class="text-center mt-5">
        <h3>Updating application status...</h3>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UpdateApplication',
    data() {
        return {
            applicationId: null,
            status: null,
        };
    },
    async mounted() {
        // Parse query params
        const query = this.$route.query;
        this.applicationId = query.application_id;
        this.status = query.status;

        if (!this.applicationId || !this.status) {
            console.error("Missing query parameters.");
            this.$router.push('/dashboard');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            console.log(this.applicationId)
            await axios.patch(
                `http://127.0.0.1:8000/api/application-status/${this.applicationId}`,
                { status: this.status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            this.$router.push('/employer/applications');
        } catch (error) {
            console.error("Failed to update application:", error);
            //this.$router.push('/a7a');
        }
    },
};
</script>

<style scoped>
h3 {
    font-weight: bold;
}
</style>
