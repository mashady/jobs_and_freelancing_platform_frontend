<template>
  <div class="p-4 bg-white rounded rounded-2 mb-4">
    <p>Media</p>
    <hr>
    <div class="row">
      <div class="col-7">
        <p class="mb-4">Additional Attachment</p>
        <div class="mb-4">
          <label for="resume" id="resume-label" class="btn">Upload</label>
          <input type="file" id="resume" class="d-none" multiple @change="handleResumeUpload">
          <p class="text-muted text-sm my-2">Upload file .pdf, .doc, .docx</p>
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div v-for="(file, index) in localFiles" :key="file.name" class="col">
            <div class="rounded rounded-3 bg-success-subtle p-3 h-100 d-flex flex-column">
              <p class="d-flex gap-5 justify-content-between align-items-center mb-3">
                {{ file.name }} <i class="bi bi-file-earmark-text fs-3"></i>
              </p>
              <div class="mt-auto">
                <button class="btn btn-danger btn-sm w-100" @click="removeFile(index)">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const localFiles = ref(props.modelValue.files || []);

const handleResumeUpload = (event) => {
  const newFiles = Array.from(event.target.files || []);
  localFiles.value = [...localFiles.value, ...newFiles];
  event.target.value = '';
};

const removeFile = (index) => {
  localFiles.value.splice(index, 1);
};

watch(localFiles, (newFiles) => {
  emit('update:modelValue', {
    ...props.modelValue,
    files: newFiles
  });
}, { deep: true });
</script>

<style scoped>
#resume-label {
  border: 1px black dashed;
  background-color: #ffede8;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: inline-block;
}

.bi-file-earmark-text {
  color: #d8efe0;
}
.bi-file-earmark-text:hover {
  color: #7dc996;
}
</style>