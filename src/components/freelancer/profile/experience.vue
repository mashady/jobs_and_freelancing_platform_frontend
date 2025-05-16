<template>
    <div class="bg-white rounded rounded-2 p-4 mb-4">
        <!-- Experience Sections Row -->
        <div class="row g-3">
            <p class="mb-0">Experience</p>
            <hr>
            <div class="accordion" id="experienceAccordion">
                <div class="accordion-item col-12" 
                    v-for="(exp, index) in experience" 
                    :key="exp.id"
                >
                    <h2 class="accordion-header">
                        <button 
                            class="accordion-button" 
                            type="button" 
                            :data-bs-target="'#collapse-' + exp.id"
                            aria-expanded="true" 
                            :aria-controls="'collapse-' + exp.id"
                            @click="toggleAccordion(exp.id)"
                        >
                        <button 
                            type="button" 
                            class="text-danger btn btn-sm me-3"
                            
                            @click="removeExperience(index)"
                        >
                            x
                        </button>
                            {{ exp.company || 'New Experience' }} - {{ exp.title || 'No degree specified' }}
                        </button>
                    </h2>
                    <div 
                        :id="'collapse-' + exp.id" 
                        class="accordion-collapse collapse"
                        :class="{ show: exp.isEditing }"
                        :data-bs-parent="'#experienceAccordion'"
                    >
                        <div class="accordion-body">
                            <form @submit.prevent="saveExperience(index)">
                                <div class="mb-3">
                                    <label class="form-label">Title</label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        v-model="exp.title"
                                        required
                                    >
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Company</label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        v-model="exp.company"
                                        required
                                    >
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label class="form-label">Start Date</label>
                                        <input 
                                            type="month" 
                                            class="form-control" 
                                            v-model="exp.start_date"
                                        >
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">End Date</label>
                                        <input 
                                            type="month" 
                                            class="form-control" 
                                            v-model="exp.end_date"
                                        >
                                    </div>
                                    <div class="mb-3">
                                    <label class="form-label">Description</label>
                                        <input 
                                            type="text" 
                                            class="form-control" 
                                            v-model="exp.description"
                                            required
                                        >
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <button
                                         
                                        type="button" 
                                        class="btn btn-danger btn-sm redBtn"
                                        @click="removeExperience(index)"
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
                    @click="addExperience" 
                    class="btn btn-success btn-sm greenbtn"
                >
                    <i class="bi bi-plus-circle"></i> Add Experience
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const experience = ref([]);

const addExperience = () => {
    const newId = Date.now();
    experience.value.push({
        id: newId,
        title: '',
        company: '',
        start_date: new Date().toISOString().slice(0, 7),
        end_date: '',
        description:'',
        isEditing: true
    });
};

const toggleAccordion = (id) => {
    experience.value = experience.value.map(exp => {
        if (exp.id === id) {
            return { ...exp, isEditing: !exp.isEditing };
        }
        return { ...exp, isEditing: false };
    });
};

const saveExperience = (index) => {
    experience.value[index].isEditing = false;
};

const removeExperience = (index) => {
    experience.value.splice(index, 1);
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
    .greenbtn{
      border:1px solid transparent;
        background-color: #5bbb7b;
        color: white;
    }

</style>