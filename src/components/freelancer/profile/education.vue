<template>
    <div class="bg-white rounded rounded-2 p-4">
        <!-- Education Sections Row -->
        <div class="row g-3">
            <p class="mb-0">Education</p>
            <hr>
            <div class="accordion" id="educationAccordion">
                <div class="accordion-item col-12" 
                    v-for="(edu, index) in education" 
                    :key="edu.id"
                >
                    <h2 class="accordion-header">
                        <button 
                            class="accordion-button" 
                            type="button" 
                            :data-bs-target="'#collapse-' + edu.id"
                            aria-expanded="true" 
                            :aria-controls="'collapse-' + edu.id"
                            @click="toggleAccordion(edu.id)"
                        >
                        <button 
                            type="button" 
                            class="text-danger btn btn-sm me-3"
                            
                            @click="removeEducation(index)"
                        >
                            x
                        </button>
                            {{ edu.institution || 'New Education' }} - {{ edu.degree || 'No degree specified' }}
                        </button>
                    </h2>
                    <div 
                        :id="'collapse-' + edu.id" 
                        class="accordion-collapse collapse"
                        :class="{ show: edu.isEditing }"
                        :data-bs-parent="'#educationAccordion'"
                    >
                        <div class="accordion-body">
                            <form @submit.prevent="saveEducation(index)">
                                <div class="mb-3">
                                    <label class="form-label">Degree</label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        v-model="edu.degree"
                                        required
                                    >
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Institution</label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        v-model="edu.institution"
                                        required
                                    >
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label class="form-label">Start Date</label>
                                        <input 
                                            type="month" 
                                            class="form-control" 
                                            v-model="edu.start_date"
                                        >
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">End Date</label>
                                        <input 
                                            type="month" 
                                            class="form-control" 
                                            v-model="edu.end_date"
                                        >
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <button
                                         
                                        type="button" 
                                        class="btn btn-danger btn-sm redBtn"
                                        @click="removeEducation(index)"
                                    >
                                        Remove
                                    </button>
                                    <button id="eduSaveBtn" type="submit" class="btn btn-success btn-sm greenbtn">
                                        Save
                                    </button>
                                </div>
                            </form>
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
                    class="btn btn-success btn-sm greenbtn"
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
    const newId = Date.now();
    education.value.push({
        id: newId,
        degree: '',
        institution: '',
        start_date: new Date().toISOString().slice(0, 7),
        end_date: '',
        isEditing: true
    });
};

const toggleAccordion = (id) => {
    education.value = education.value.map(edu => {
        if (edu.id === id) {
            return { ...edu, isEditing: !edu.isEditing };
        }
        return { ...edu, isEditing: false };
    });
};

const saveEducation = (index) => {
    education.value[index].isEditing = false;
};

const removeEducation = (index) => {
    education.value.splice(index, 1);
};
</script>

<style scoped>
    .accordion-button:not(.collapsed) {
        background-color: #f8f9fa;
    }
    .redBtn:hover{
        border: 1px red solid;
        background-color: white;
        color:red;
    }
    .greenbtn:hover{
        border: 1px #5bbb7b solid;
        background-color: white;
        color: #5bbb7b;
    }

</style>