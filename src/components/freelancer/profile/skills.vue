<template>
  <div class="bg-white rounded rounded-2 p-4">
    <div class="row g-3">
      <p class="mb-0">Skills</p>
      <hr>

      <div class="mb-3">
        <label for="skillInput" class="form-label">Add New Skill</label>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            :class="{ 'is-invalid': newSkillError }"
            id="skillInput"
            v-model="newSkillName"
            @keyup.enter="addSkill"
            @input="clearNewSkillError"
            @blur="validateNewSkillInput" placeholder="Type a skill and press Enter"
          >
          <button class="btn btn-success greenbtn" type="button" @click="addSkill">Add</button>
          <div v-if="newSkillError" class="invalid-feedback">
            {{ newSkillError }}
          </div>
        </div>
        <div v-if="skillsArrayError" class="text-danger mt-2">
            {{ skillsArrayError }}
        </div>
      </div>

      <div class="d-flex flex-wrap gap-2">
        <span v-for="(skill, index) in modelValue" :key="index" class="badge bg-primary d-flex align-items-center">
          {{ skill }}
          <button type="button" class="btn-close btn-close-white ms-2" @click="removeSkill(index)" aria-label="Remove skill"></button>
        </span>
        <p v-if="modelValue.length === 0 && !skillsArrayError" class="text-muted">No skills added yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, defineExpose } from 'vue'; // Removed 'watch'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [], 
  },
});

const emit = defineEmits(['update:modelValue', 'validation-change']);

const newSkillName = ref('');
const newSkillError = ref(''); 
const skillsArrayError = ref(''); 

const clearNewSkillError = () => {
  newSkillError.value = '';
};


const validateNewSkillInput = () => {
  newSkillError.value = '';
  const trimmedSkill = newSkillName.value.trim();

  if (!trimmedSkill) {
    newSkillError.value = 'Skill name cannot be empty.';
    return false;
  }
  if (trimmedSkill.length < 2 || trimmedSkill.length > 50) { 
      newSkillError.value = 'Skill must be between 2 and 50 characters.';
      return false;
  }
  if (props.modelValue.includes(trimmedSkill)) {
    newSkillError.value = 'This skill has already been added.';
    return false;
  }
  return true;
};


const addSkill = () => {
  if (!validateNewSkillInput()) { 
    return; 
  }

  const trimmedSkill = newSkillName.value.trim();

  
  emit('update:modelValue', [...props.modelValue, trimmedSkill]);
  newSkillName.value = ''; 
  validateAll(); 
};

const removeSkill = (index) => {
  const updatedSkills = props.modelValue.filter((_, i) => i !== index);
  emit('update:modelValue', updatedSkills);
  validateAll(); 
};

const validateAll = () => {
  let isValid = true;
  skillsArrayError.value = ''; 

  if (props.modelValue.length === 0) {
    skillsArrayError.value = 'At least one skill is required.';
    isValid = false;
  } else {
    for (const skill of props.modelValue) {
      if (!skill || skill.trim() === '') {
        skillsArrayError.value = 'Skills cannot be empty.';
        isValid = false;
        break;
      }
      if (skill.trim().length < 2 || skill.trim().length > 50) { 
        skillsArrayError.value = 'Each skill must be between 2 and 50 characters.';
        isValid = false;
        break;
      }
    }
  }

  emit('validation-change', { component: 'skills', isValid: isValid });
  return isValid;
};

defineExpose({
  validateAll,
  newSkillError,
  skillsArrayError,
});

</script>

<style scoped>
.badge {
  padding: 0.6em 0.8em;
  font-size: 0.9em;
  border-radius: 0.375rem;
  background-color: #0d6efd !important; 
}

.btn-close-white {
  filter: invert(1) grayscale(100%) brightness(200%); 
  font-size: 0.6em;
}

.greenbtn {
  border: 1px solid transparent;
  background-color: #5bbb7b;
  color: white;
}

.greenbtn:hover {
  border: 1px #5bbb7b solid;
  background-color: white;
  color: #5bbb7b;
}

.form-control:focus {
  border-width: 2px;
  box-shadow: none;
}

.input-group .invalid-feedback {
    display: block;
}
</style>