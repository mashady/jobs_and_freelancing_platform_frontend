<template>
    <div class="bg-white m-3 p-4">


        <div class="accordion" id="accordionExample">



</div>

        <!-- Education Sections Row -->
        <div class="row g-3">
            <div 
                v-for="(edu, index) in education" 
                :key="edu.id" 
                class="col-12"
            >
            <p class="d-inline-flex gap-1">
                <a class="btn btn-primary" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Toggle first element</a>
                
            </p>
            <div class="row">
            <div class="col">
                <div class="collapse multi-collapse" id="multiCollapseExample1">
                    <div class="card card-body">
                        Some placeholder content for the first collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>

        <!-- Add New Button -->
        <div class="row mt-3">
            <div class="col-12">
                <button 
                @click="addEducation" 
                class="btn btn-primary"
                >
                <i class="bi bi-plus-circle"></i> Add Education
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const education = ref([]);

    const addEducation = () => {
    education.value.push({
        id: Date.now(),
        degree: '',
        institution: '',
        start_date: new Date().toISOString().slice(0, 7), // Current YYYY-MM
        end_date: '',
        isEditing: true // New entries start in edit mode
    });
    };

    const toggleEdit = (index) => {
    education.value[index].isEditing = !education.value[index].isEditing;
    };

    const removeEducation = (index) => {
    education.value.splice(index, 1);
    };
</script>

<style scoped>


</style>