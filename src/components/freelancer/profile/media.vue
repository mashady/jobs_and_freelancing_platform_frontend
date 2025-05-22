<template>
  <div class="p-4 bg-white rounded rounded-2 mb-4">
    <p>Media</p>
    <hr>
    <div class="row">
      <div class="col-7">
        <p class="mb-4">Resume URL</p>
        <div class="mb-4">
          <label for="resumeUrl" class="form-label">Resume Link (PDF, DOCX, etc.)</label>
          <input
            type="url"
            name="resumeUrl"
            id="resumeUrl"
            class="form-control"
            :class="{ 'is-invalid': errors.resume }"
            :value="modelValue.resume"
            @input="updateResumeAndValidate($event.target.value)"
            @blur="validateField('resume')"
            placeholder="e.g., https://example.com/your-resume.pdf"
          >
          <div v-if="errors.resume" class="invalid-feedback">
            {{ errors.resume }}
          </div>
          <p class="text-muted text-sm my-2">Provide a direct link to your resume (PDF, DOC, DOCX).</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, defineExpose } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      resume: '',
    }),
  },
});

const emit = defineEmits(['update:modelValue', 'validation-change']);

const errors = ref({}); 

const updateResumeAndValidate = (value) => {
  emit('update:modelValue', { ...props.modelValue, resume: value });
  validateField('resume'); 
};

const validateField = (field) => {
  const value = props.modelValue[field];
  let errorMessage = '';

  errors.value[field] = '';

  if (field === 'resume') {
    if (value && !isValidUrl(value)) {
      errorMessage = 'The resume must be a valid URL.';
    } else if (value && value.length > 2048) { 
        errorMessage = 'The resume URL must not be greater than 2048 characters.';
    }
  }

  if (errorMessage) {
    errors.value[field] = errorMessage;
    return false;
  }
  return true;
};

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const validateAll = () => {
  let isValid = true;
  errors.value = {}; 

  if (!validateField('resume')) {
    isValid = false;
  }

  emit('validation-change', { component: 'media', isValid: isValid });
  return isValid;
};

defineExpose({
  validateAll,
});


watch(() => props.modelValue.resume, () => {
    validateAll();
});
</script>

<style scoped>
.form-control:focus {
  border-width: 2px;
  box-shadow: none;
}
</style>