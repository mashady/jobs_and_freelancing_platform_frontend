<template>
  <div class="p-4 bg-white rounded rounded-2 mb-4">
        <p>Media</p>
        <hr>
        <div class="row">
            <div class="col-7">
                <p class="mb-4">Additional Attachment</p>
                <div class="mb-4">
                    <label for="resume" id="resume-label" class="btn">Upload</label>
                    <input type="file" name="resume" id="resume" class="form-control d-none" multiple @change="handleResumeUpload">
                    <p class="text-muted text-sm my-2">Upload file .pdf, .doc, .docx</p>
                </div>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <div v-for="(file, index) in files" :key="file.name" class="col">
                        <div class="rounded rounded-3 bg-success-subtle p-3 h-100 d-flex flex-column">
                            <!-- Your existing file name display -->
                            <p v-if="index>0" class="d-flex gap-5 justify-content-between align-items-center mb-3">
                                {{file.name}} <i class="bi bi-file-earmark-text fs-3"></i>
                            </p>
                            <p v-else class="d-flex gap-5 justify-content-between align-items-center mb-3">
                                {{file.name}} <i class="bi bi-file-earmark-text fs-3"></i>
                            </p>
                            
                            <!-- Fixed position button at card bottom -->
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
import { ref } from 'vue';
const files = ref([]);

    function handleResumeUpload(event){
        const input = event.target;
        const filesAsArray = Array.from(input?.files || []);
        files.value = files.value.concat(filesAsArray);

        console.log(files.value);
    }

    function removeFile(index) {
        files.value.splice(index, 1);
    }
</script>

<style scoped>
  * {
    font-family: sans-serif;
  }
  img{
    width: 150px;
    height: 150px;
    
  }
  .form-control:focus {
    border-width: 2px; 
    box-shadow: none;  
  }
  #resume-label{
    border: 1px black dashed; 
    background-color: #ffede8;
  }
  .bi-file-earmark-text{
    color:#d8efe0
  }
  .bi-file-earmark-text:hover{
    color:#7dc996;
  }
</style>