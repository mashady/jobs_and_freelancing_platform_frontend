<template>
  <div class="bg-white rounded rounded-2 p-4 mb-4">
    <div class="row g-3">
      <p class="mb-0">Experience</p>
      <hr>
      <div class="accordion" id="experienceAccordion">
        <div class="accordion-item col-12"
          v-for="(exp, index) in modelValue"
          :key="exp.id"
        >
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              :data-bs-target="'#collapse-exp-' + exp.id"
              :aria-expanded="isEditing(exp) || hasErrorsForExperience(exp.id)"
              :aria-controls="'collapse-exp-' + exp.id"
              @click="toggleEdit(exp)"
              :class="{ 'border border-danger': hasErrorsForExperience(exp.id) }"
            >
              <button
                type="button"
                class="text-danger btn btn-sm me-3"
                @click.stop="removeExperience(index)"
              >
                x
              </button>
              {{ exp.company_name || 'New Experience' }} - {{ exp.position || 'No title specified' }}
            </button>
          </h2>
          <div
            :id="'collapse-exp-' + exp.id"
            class="accordion-collapse collapse"
            :class="{ show: isEditing(exp) || hasErrorsForExperience(exp.id) }"
            :data-bs-parent="'#experienceAccordion'"
          >
            <div class="accordion-body">
              <div class="mb-3">
                  <label :for="'position-' + exp.id" class="form-label">Position</label>
                  <input
                    type="text"
                    :id="'position-' + exp.id"
                    class="form-control"
                    :class="{ 'is-invalid': errors[exp.id]?.position }"
                    v-model="exp.position"
                    @input="validateField(exp.id, 'position')"
                    @blur="validateField(exp.id, 'position')"
                  >
                  <div v-if="errors[exp.id]?.position" class="invalid-feedback">
                    {{ errors[exp.id].position }}
                  </div>
                </div>
                <div class="mb-3">
                  <label :for="'company_name-' + exp.id" class="form-label">Company</label>
                  <input
                    type="text"
                    :id="'company_name-' + exp.id"
                    class="form-control"
                    :class="{ 'is-invalid': errors[exp.id]?.company_name }"
                    v-model="exp.company_name"
                    @input="validateField(exp.id, 'company_name')"
                    @blur="validateField(exp.id, 'company_name')"
                  >
                  <div v-if="errors[exp.id]?.company_name" class="invalid-feedback">
                    {{ errors[exp.id].company_name }}
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label :for="'start_date-exp-' + exp.id" class="form-label">Start Date</label>
                    <input
                      type="date"
                      :id="'start_date-exp-' + exp.id"
                      class="form-control"
                      :class="{ 'is-invalid': errors[exp.id]?.start_date }"
                      v-model="exp.start_date"
                      @input="validateField(exp.id, 'start_date')"
                      @blur="validateField(exp.id, 'start_date')"
                    >
                    <div v-if="errors[exp.id]?.start_date" class="invalid-feedback">
                      {{ errors[exp.id].start_date }}
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label :for="'end_date-exp-' + exp.id" class="form-label">End Date</label>
                    <input
                      type="date"
                      :id="'end_date-exp-' + exp.id"
                      class="form-control"
                      :class="{ 'is-invalid': errors[exp.id]?.end_date }"
                      v-model="exp.end_date"
                      @input="validateField(exp.id, 'end_date')"
                      @blur="validateField(exp.id, 'end_date')"
                    >
                    <div v-if="errors[exp.id]?.end_date" class="invalid-feedback">
                      {{ errors[exp.id].end_date }}
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label :for="'description-exp-' + exp.id" class="form-label">Description</label>
                  <textarea
                    :id="'description-exp-' + exp.id"
                    class="form-control"
                    :class="{ 'is-invalid': errors[exp.id]?.description }"
                    v-model="exp.description"
                    @input="validateField(exp.id, 'description')"
                    @blur="validateField(exp.id, 'description')"
                  ></textarea>
                  <div v-if="errors[exp.id]?.description" class="invalid-feedback">
                    {{ errors[exp.id].description }}
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
                  <button type="button" class="btn btn-success btn-sm greenbtn" @click="saveExperience(index, exp)">
                    Save
                  </button>
                </div>
            </div>
          </div>
        </div>
          <div v-if="modelValue.length === 0 && !noExperienceError" class="alert alert-info mt-3" role="alert">
            Please add at least one experience entry.
          </div>
        <div v-if="noExperienceError" class="text-danger mt-2">
            {{ noExperienceError }}
        </div>
      </div>
    </div>

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
import { ref, defineProps, defineEmits, nextTick, defineExpose } from 'vue'; 

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue', 'validation-change']);

const editingExperienceId = ref(null);
const errors = ref({}); 
const noExperienceError = ref(''); 

const isEditing = (experienceItem) => editingExperienceId.value === experienceItem.id;

const toggleEdit = (experienceItem) => {

  if (isEditing(experienceItem)) { 

  } else { 
    if (errors.value[experienceItem.id]) {

      errors.value[experienceItem.id] = {};
    }
  }
  editingExperienceId.value = isEditing(experienceItem) ? null : experienceItem.id;
};

const addExperience = () => {
  const newId = Date.now(); // Unique ID for new entries
  const newExp = { id: newId, company_name: '', position: '', start_date: '', end_date: '', description: '' };
  emit('update:modelValue', [
    ...props.modelValue,
    newExp,
  ]);
  editingExperienceId.value = newId;
  noExperienceError.value = ''; 

  errors.value[newId] = {};
  nextTick(() => {
    document.getElementById(`position-${newId}`).focus();
  });
};

const saveExperience = (index, experienceItem) => {
  const isValidItem = validateAllFieldsForExperienceItem(experienceItem.id);

  if (isValidItem) {
    const newValue = [...props.modelValue];
    newValue[index] = { ...experienceItem };
    editingExperienceId.value = null; 
    emit('update:modelValue', newValue);
    
  } else {
    editingExperienceId.value = experienceItem.id; 
  }
};

const removeExperience = (index) => {
  const idToRemove = props.modelValue[index].id;
  const newValue = props.modelValue.filter((_, i) => i !== index);
  emit('update:modelValue', newValue); 
  delete errors.value[idToRemove];
  if (editingExperienceId.value === idToRemove) {
    editingExperienceId.value = null;
  }
  validateAll();
};

const validateField = (itemId, field) => {
  const item = props.modelValue.find(exp => exp.id === itemId);
  if (!item) return;

  const value = item[field];
  let errorMessage = '';

  if (!errors.value[itemId]) {
    errors.value[itemId] = {};
  }

  errors.value[itemId][field] = '';

  switch (field) {
    case 'company_name':
    case 'position':
      if (!value) {
        errorMessage = `The ${field.replace('_', ' ')} is required.`;
      } else if (value.length > 255) {
        errorMessage = `The ${field.replace('_', ' ')} must not be greater than 255 characters.`;
      }
      break;
    case 'description':

    if (value && value.length > 1000) {
        errorMessage = `The ${field} must not be greater than 1000 characters.`;
      }
      break;
    case 'start_date':
      if (!value) {
        errorMessage = 'The start date is required.';
      } else {
        const startDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        if (startDate > today) {
          errorMessage = 'The start date must be a date before or equal to today.';
        }
      }
      break;
    case 'end_date':

    if (value) { 
        const endDate = new Date(value);
        const startDate = item.start_date ? new Date(item.start_date) : null;

        if (startDate && endDate < startDate) {
          errorMessage = 'The end date must be a date after or equal to the start date.';
        }
      }
      break;
  }

  if (errorMessage) {
    errors.value[itemId][field] = errorMessage;
    return false;
  }
  return true;
};


const validateAllFieldsForExperienceItem = (itemId) => {
  const item = props.modelValue.find(exp => exp.id === itemId);
  if (!item) return true;

  let isValid = true;
  const fields = ['company_name', 'position', 'description', 'start_date', 'end_date'];
  for (const field of fields) {
    if (!validateField(itemId, field)) {
      isValid = false;
    }
  }
  return isValid;
};


const validateAll = () => {
  let isValid = true;

  noExperienceError.value = '';


  if (props.modelValue.length === 0) {
    noExperienceError.value = 'At least one work experience entry is required.';
    isValid = false;
  } else {

    noExperienceError.value = '';

    for (const exp of props.modelValue) {
      if (!validateAllFieldsForExperienceItem(exp.id)) {
        isValid = false;
      }
    }
  }
  emit('validation-change', { component: 'experience', isValid: isValid });
  return isValid;
};

const hasErrorsForExperience = (itemId) => {
  return errors.value[itemId] && Object.values(errors.value[itemId]).some(error => error !== '');
};

defineExpose({
  validateAll,
  errors,
  noExperienceError
});

</script>

<style scoped>
/* Your component-specific styles */
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

.greenbtn {
  border: 1px solid transparent;
  background-color: #5bbb7b;
  color: white;
}
</style>