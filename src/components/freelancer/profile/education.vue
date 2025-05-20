<template>
  <div class="bg-white rounded rounded-2 p-4 mb-4">
    <div class="row g-3">
      <p class="mb-0">Education</p>
      <hr>
      <div class="accordion" id="educationAccordion">
        <div class="accordion-item col-12"
          v-for="(edu, index) in modelValue"
          :key="edu.id"
        >
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              :data-bs-target="'#collapse-edu-' + edu.id"
              :aria-expanded="isEditing(edu) || hasErrorsForEducation(edu.id)"
              :aria-controls="'collapse-edu-' + edu.id"
              @click="toggleEdit(edu)"
              :class="{ 'border border-danger': hasErrorsForEducation(edu.id) }"
            >
              <button
                type="button"
                class="text-danger btn btn-sm me-3"
                @click.stop="removeEducation(index)"
              >
                x
              </button>
              {{ edu.institution || 'New Education' }} - {{ edu.degree || 'No degree specified' }}
            </button>
          </h2>
          <div
            :id="'collapse-edu-' + edu.id"
            class="accordion-collapse collapse"
            :class="{ show: isEditing(edu) || hasErrorsForEducation(edu.id) }"
            :data-bs-parent="'#educationAccordion'"
          >
            <div class="accordion-body">
              <div class="mb-3">
                  <label :for="'institution-' + edu.id" class="form-label">Institution</label>
                  <input
                    type="text"
                    :id="'institution-' + edu.id"
                    class="form-control"
                    :class="{ 'is-invalid': errors[edu.id]?.institution }"
                    v-model="edu.institution"
                    @input="validateField(edu.id, 'institution')"
                    @blur="validateField(edu.id, 'institution')"
                  >
                  <div v-if="errors[edu.id]?.institution" class="invalid-feedback">
                    {{ errors[edu.id].institution }}
                  </div>
                </div>
                <div class="mb-3">
                  <label :for="'degree-' + edu.id" class="form-label">Degree</label>
                  <input
                    type="text"
                    :id="'degree-' + edu.id"
                    class="form-control"
                    :class="{ 'is-invalid': errors[edu.id]?.degree }"
                    v-model="edu.degree"
                    @input="validateField(edu.id, 'degree')"
                    @blur="validateField(edu.id, 'degree')"
                  >
                  <div v-if="errors[edu.id]?.degree" class="invalid-feedback">
                    {{ errors[edu.id].degree }}
                  </div>
                </div>
                <div class="mb-3">
                  <label :for="'field_of_study-' + edu.id" class="form-label">Field of Study</label>
                  <input
                    type="text"
                    :id="'field_of_study-' + edu.id"
                    class="form-control"
                    :class="{ 'is-invalid': errors[edu.id]?.field_of_study }"
                    v-model="edu.field_of_study"
                    @input="validateField(edu.id, 'field_of_study')"
                    @blur="validateField(edu.id, 'field_of_study')"
                  >
                  <div v-if="errors[edu.id]?.field_of_study" class="invalid-feedback">
                    {{ errors[edu.id].field_of_study }}
                  </div>
                </div>

                <div class="mb-3">
                  <label :for="'description-' + edu.id" class="form-label">Description</label>
                  <input
                    type="text"
                    :id="'description-' + edu.id"
                    class="form-control"
                    :class="{ 'is-invalid': errors[edu.id]?.description }"
                    v-model="edu.description"
                    @input="validateField(edu.id, 'description')"
                    @blur="validateField(edu.id, 'description')"
                  >
                  <div v-if="errors[edu.id]?.description" class="invalid-feedback">
                    {{ errors[edu.id].description }}
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-6">
                    <label :for="'start_date-' + edu.id" class="form-label">Start Date</label>
                    <input
                      type="date"
                      :id="'start_date-' + edu.id"
                      class="form-control"
                      :class="{ 'is-invalid': errors[edu.id]?.start_date }"
                      v-model="edu.start_date"
                      @input="validateField(edu.id, 'start_date')"
                      @blur="validateField(edu.id, 'start_date')"
                    >
                    <div v-if="errors[edu.id]?.start_date" class="invalid-feedback">
                      {{ errors[edu.id].start_date }}
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label :for="'end_date-' + edu.id" class="form-label">End Date</label>
                    <input
                      type="date"
                      :id="'end_date-' + edu.id"
                      class="form-control"
                      :class="{ 'is-invalid': errors[edu.id]?.end_date }"
                      v-model="edu.end_date"
                      @input="validateField(edu.id, 'end_date')"
                      @blur="validateField(edu.id, 'end_date')"
                    >
                    <div v-if="errors[edu.id]?.end_date" class="invalid-feedback">
                      {{ errors[edu.id].end_date }}
                    </div>
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
                  <button type="button" class="btn btn-success btn-sm greenbtn" @click="saveEducation(index, edu)">
                    Save
                  </button>
                </div>
            </div>
          </div>
        </div>
        <div v-if="modelValue.length === 0 && !noEducationError" class="alert alert-info mt-3" role="alert">
          Please add at least one education entry.
        </div>
         <div v-if="noEducationError" class="text-danger mt-2">
            {{ noEducationError }}
        </div>
      </div>
    </div>

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
import { ref, defineProps, defineEmits, watch, nextTick, defineExpose } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue', 'validation-change']);

const editingEducationId = ref(null);
const errors = ref({}); // Stores errors for each education item, keyed by its ID
const noEducationError = ref(''); // For the 'educations' => ['required'] rule

const isEditing = (educationItem) => editingEducationId.value === educationItem.id;

const toggleEdit = (educationItem) => {
  editingEducationId.value = isEditing(educationItem) ? null : educationItem.id;
  if (editingEducationId.value) {
    // When expanding, clear errors for this item if any were there
    if (errors.value[educationItem.id]) {
      errors.value[educationItem.id] = {};
    }
  }
};

const addEducation = () => {
  const newId = Date.now(); // Unique ID for new entries
  const newEdu = { id: newId, institution: '', degree: '', field_of_study: '', description:'', start_date: '', end_date: '' };
  emit('update:modelValue', [
    ...props.modelValue,
    newEdu,
  ]);
  editingEducationId.value = newId;
  noEducationError.value = ''; // Clear array required error when adding an item
  // After DOM updates, focus on the new input
  nextTick(() => {
    document.getElementById(`institution-${newId}`).focus();
  });
};

const saveEducation = (index, educationItem) => {
  // Validate all fields for the current item before saving
  const isValidItem = validateAllFieldsForEducationItem(educationItem.id);

  if (isValidItem) {
    const newValue = [...props.modelValue];
    newValue[index] = { ...educationItem };
    editingEducationId.value = null; // Collapse after saving
    emit('update:modelValue', newValue);
    // After saving, re-validate the entire list to update parent
    validateAll();
  } else {
    // If invalid, keep it open and visible
    editingEducationId.value = educationItem.id;
  }
};

const removeEducation = (index) => {
  const idToRemove = props.modelValue[index].id;
  const newValue = props.modelValue.filter((_, i) => i !== index);
  emit('update:modelValue', newValue);
  // Remove errors associated with the deleted item
  delete errors.value[idToRemove];
  if (editingEducationId.value === idToRemove) {
    editingEducationId.value = null;
  }
  // After removal, re-validate the entire list to update parent
  validateAll();
};

const validateField = (itemId, field) => {
  const item = props.modelValue.find(edu => edu.id === itemId);
  if (!item) return;

  const value = item[field];
  let errorMessage = '';

  // Clear previous error for this field
  if (!errors.value[itemId]) {
    errors.value[itemId] = {};
  }
  errors.value[itemId][field] = '';

  switch (field) {
    case 'institution':
    case 'degree':
      if (!value) {
        errorMessage = `The ${field} is required.`;
      } else if (value.length > 255) {
        errorMessage = `The ${field} must not be greater than 255 characters.`;
      }
      break;
    case 'description':
      if (!value) { // Based on Laravel's 'required' for description in store, though update is nullable
        errorMessage = `The ${field} is required.`;
      } else if (value.length > 255) { // Max 255 as per Laravel store rules
        errorMessage = `The ${field} must not be greater than 255 characters.`;
      }
      break;
    case 'field_of_study':
      if (value && value.length > 1000) { // Nullable, max 1000
        errorMessage = `The ${field} must not be greater than 1000 characters.`;
      }
      break;
    case 'start_date':
      if (!value) {
        errorMessage = 'The start date is required.';
      } else {
        const startDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today for comparison
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

// Validates all fields for a single education item
const validateAllFieldsForEducationItem = (itemId) => {
  const item = props.modelValue.find(edu => edu.id === itemId);
  if (!item) return true; // Should not happen

  let isValid = true;
  const fields = ['institution', 'degree', 'field_of_study', 'description', 'start_date', 'end_date'];
  for (const field of fields) {
    if (!validateField(itemId, field)) {
      isValid = false;
    }
  }
  return isValid;
};

// Validates the entire education array
const validateAll = () => {
  let isValid = true;
  errors.value = {}; // Clear all previous errors

  if (props.modelValue.length === 0) {
    noEducationError.value = 'At least one education entry is required.';
    isValid = false;
  } else {
    noEducationError.value = '';
    for (const edu of props.modelValue) {
      if (!validateAllFieldsForEducationItem(edu.id)) {
        isValid = false;
      }
    }
  }
  emit('validation-change', { component: 'education', isValid: isValid });
  return isValid;
};

// Helper to check if any errors exist for a specific education item
const hasErrorsForEducation = (itemId) => {
  return errors.value[itemId] && Object.values(errors.value[itemId]).some(error => error !== '');
};

// Expose validateAll to the parent component
defineExpose({
  validateAll,
  // You might also expose `errors` if the parent needs to directly access them for display purposes
  // errors: errors
});

// Watch modelValue changes to re-run validation if necessary (e.g., when an item is added or removed)
watch(() => props.modelValue, () => {
    validateAll(); // Re-validate the entire array when items are added/removed
}, { deep: true }); // Use deep watch to detect changes within array objects
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