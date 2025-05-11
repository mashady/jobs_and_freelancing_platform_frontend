<template>
    <div class="bg-white rounded rounded-2 p-4">
        <!-- Skills Sections Row -->
        <div class="row g-3">
            <p class="mb-0">Skills</p>
            <hr>
            <div class="accordion" id="skillAccordion">
                <div class="accordion-item col-12" 
                    v-for="(skill, index) in skills" 
                    :key="skill.id"
                >
                    <h2 class="accordion-header d-flex align-items-center">
                        <button 
                            class="accordion-button" 
                            type="button" 
                            :data-bs-target="'#collapse-' + skill.id"
                            aria-expanded="true" 
                            :aria-controls="'collapse-' + skill.id"
                            @click="toggleAccordion(skill.id)"
                        >
                        <button 
                            type="button" 
                            class="text-danger btn btn-sm me-3"
                            
                            @click="removeSkill(index)"
                        >
                            x
                        </button>
                            {{ skill.title || 'New Skill' }}
                        </button>
                    </h2>
                    <div 
                        :id="'collapse-' + skill.id" 
                        class="accordion-collapse collapse"
                        :class="{ show: skill.isEditing }"
                        :data-bs-parent="'#skillAccordion'"
                    >
                        <div class="accordion-body">
                            <form @submit.prevent="saveSkill(index)">
                                <div class="mb-3">
                                    <label class="form-label">Skill Name</label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        v-model="skill.title"
                                        placeholder="Enter skill name"
                                    >
                                </div>
                                <div class="d-flex justify-content-between">
                                    <button
                                        type="button" 
                                        class="btn btn-danger btn-sm redBtn"
                                        @click="removeSkill(index)"
                                    >
                                        Remove
                                    </button>
                                    <button type="submit" class="btn btn-success btn-sm greenbtn">
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
                    @click="addSkill" 
                    class="btn btn-success btn-sm greenbtn"
                >
                    <i class="bi bi-plus-circle"></i> Add Skill
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const skills = ref([]);

const addSkill = () => {
    const newId = Date.now();
    skills.value.push({
        id: newId,
        title: '',
        isEditing: true
    });
};

const toggleAccordion = (id) => {
    skills.value = skills.value.map(skill => {
        if (skill.id === id) {
            return { ...skill, isEditing: !skill.isEditing };
        }
        return { ...skill, isEditing: false };
    });
};

const saveSkill = (index) => {
    skills.value[index].isEditing = false;
};

const removeSkill = (index) => {
    skills.value.splice(index, 1);
};
</script>

<style scoped>
.accordion-button:not(.collapsed) {
    background-color: #f8f9fa;
}
.redBtn:hover {
    border: 1px red solid;
    background-color: white;
    color: red;
}
.greenbtn:hover {
    border: 1px #5bbb7b solid;
    background-color: white;
    color: #5bbb7b;
}
.greenbtn{
      border:1px solid transparent;
    background-color: #5bbb7b;
    color: white;
}
.accordion-button {
    padding-left: 0.5rem;
}
</style>