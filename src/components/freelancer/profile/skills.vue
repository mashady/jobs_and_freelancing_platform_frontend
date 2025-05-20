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
    default: () => [], // Expects an array of strings
  },
});

const emit = defineEmits(['update:modelValue', 'validation-change']);

const newSkillName = ref('');
const newSkillError = ref(''); // Error for the input field itself (e.g., empty, duplicate)
const skillsArrayError = ref(''); // Error for the overall skills array (e.g., required, invalid individual skill)

const clearNewSkillError = () => {
  newSkillError.value = '';
};

// Added a function to validate the individual input field
const validateNewSkillInput = () => {
  newSkillError.value = '';
  const trimmedSkill = newSkillName.value.trim();

  if (!trimmedSkill) {
    newSkillError.value = 'Skill name cannot be empty.';
    return false;
  }
  if (trimmedSkill.length < 2 || trimmedSkill.length > 50) { // Example client-side length validation
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
  if (!validateNewSkillInput()) { // Use the new validation function
    return; // Don't add if input is invalid
  }

  const trimmedSkill = newSkillName.value.trim();

  // Emit an updated array including the new skill
  emit('update:modelValue', [...props.modelValue, trimmedSkill]);
  newSkillName.value = ''; // Clear the input
  validateAll(); // Re-validate the array after adding to update parent's validity
};

const removeSkill = (index) => {
  // Emit an updated array excluding the skill at the given index
  const updatedSkills = props.modelValue.filter((_, i) => i !== index);
  emit('update:modelValue', updatedSkills);
  validateAll(); // Re-validate the array after removing
};

const validateAll = () => {
  let isValid = true;
  skillsArrayError.value = ''; // Clear previous array error

  if (props.modelValue.length === 0) {
    skillsArrayError.value = 'At least one skill is required.';
    isValid = false;
  } else {
    // Crucial: Validate each individual skill in the array
    for (const skill of props.modelValue) {
      if (!skill || skill.trim() === '') {
        skillsArrayError.value = 'Skills cannot be empty.';
        isValid = false;
        break;
      }
      if (skill.trim().length < 2 || skill.trim().length > 50) { // Example: Match backend length rules
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
/* Your component-specific styles */
.badge {
  padding: 0.6em 0.8em;
  font-size: 0.9em;
  border-radius: 0.375rem;
  background-color: #0d6efd !important; /* Bootstrap primary color, matches default badge */
}

.btn-close-white {
  filter: invert(1) grayscale(100%) brightness(200%); /* Makes it visible on dark background */
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

/* For invalid-feedback to always show when needed, particularly outside input-group */
.input-group .invalid-feedback {
    display: block; /* Overrides default .invalid-feedback for input-group */
}
</style>