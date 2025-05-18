<template>
  <div class="p-4 bg-white mb-4 rounded rounded-2">
    <h2 class="fw-bold">Edit Profile</h2>

    <div class="row">
      <div class="col">
        <p>My Profile</p>
        <hr>
        <p>Featured Image</p>

        <div v-for="(image, index) in formData.images" :key="index" style="display: inline-block; margin: 10px; position: relative;">
          <img :src="image.url" alt="preview" style="width: 100px; height: 100px; object-fit: cover;" />
          <button @click="removeImage(index)" style="position: absolute; top: 0; right: 0;">✖</button>
        </div><br>

        <label for="profileImg" id="imageLabel" class="btn">Browse</label>
        <input name="profileImg" id="profileImg" class="mt-2 ms-2" type="file" multiple @change="handleFiles" />
      </div>        
    </div>

    <div class="row mt-4">
      <div class="col">
        <div class="mb-4">
          <label for="name" class="form-label">Full Name</label>
          <input v-model="formData.name" class="form-control" type="text" name="name" id="name">
        </div>
        
        <div class="mb-4">
          <label for="address" class="form-label">Address</label>
          <input v-model="formData.address" class="form-control" type="text" name="address" id="address">
        </div>

        <div class="mb-4">
          <label for="phoneNumber" class="form-label">Phone Number</label>
          <input v-model="formData.phoneNumber" class="form-control" type="text" name="phoneNumber" id="phoneNumber">
        </div>

        <div class="mb-4">
          <label for="category">Category</label>
          <select v-model="formData.categoryId" class="form-select" id="category">
            <option value="">Select a category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="col">
        <div class="mb-4">
          <label for="city" class="form-label">City</label>
          <input v-model="formData.city" class="form-control" type="text" name="city" id="city">
        </div>

        <div class="mb-4">
          <label for="email" class="form-label">Email</label>
          <input v-model="formData.email" class="form-control" type="text" name="email" id="email">
        </div>
        
        <div class="mb-4">
          <label for="employees" class="form-label">Employees</label>
          <input v-model="formData.employees" class="form-control" type="text" name="employees" id="employees">
        </div>
        
        <div class="mb-4">
          <label for="foundedAt" class="form-label">Founded At</label>
          <input v-model="formData.foundedAt" class="form-control" type="date" name="foundedAt" id="foundedAt">
        </div>
      </div>

      <div class="form-floating">
        <textarea 
          v-model="formData.description" 
          class="form-control" 
          placeholder="Leave a comment here" 
          id="description" 
          style="height: 200px"
        ></textarea>
        <label class="ms-2" for="description">Description</label>
      </div>

      <div class="form-floating my-4">
        <textarea 
          v-model="formData.whoWeAre" 
          class="form-control" 
          placeholder="Leave a comment here" 
          id="whoWeAre" 
          style="height: 200px"
        ></textarea>
        <label class="ms-2" for="whoWeAre">Who We Are</label>
      </div>

      <div class="form-floating">
        <textarea 
          v-model="formData.whatWeDo" 
          class="form-control" 
          placeholder="Leave a comment here" 
          id="whatWeDo" 
          style="height: 200px"
        ></textarea>
        <label class="ms-2" for="whatWeDo">What We Do</label>
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
  const categories = [
    { id: 1, name: "Web Development" },
    { id: 2, name: "Mobile Development" },
    { id: 3, name: "UI/UX Design" },
    { id: 4, name: "Writing & Content" },
    { id: 5, name: "Digital Marketing" },
    { id: 6, name: "Data Science & AI" }
  ]

  const formData = ref({
    ...props.modelValue,
    categoryId: props.modelValue.categoryId || '',
    images: props.modelValue.images || [],
    name: props.modelValue.name || '',
    address: props.modelValue.address || '',
    phoneNumber: props.modelValue.phoneNumber || '',
    category: props.modelValue.category || '',
    city: props.modelValue.city || '',
    email: props.modelValue.email || '',
    employees: props.modelValue.employees || '',
    foundedAt: props.modelValue.foundedAt || '',
    description: props.modelValue.description || '',
    whoWeAre: props.modelValue.whoWeAre || '',
    whatWeDo: props.modelValue.whatWeDo || ''
  });

  const handleFiles = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      formData.value.images.push({
        file,
        url: URL.createObjectURL(file)
      });
    });
    event.target.value = ''; 
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(formData.value.images[index].url);
    formData.value.images.splice(index, 1);
  };


  watch(formData, (newValue) => {
    emit('update:modelValue', newValue);
  }, { deep: true });
</script>

<style scoped>
* {
  font-family: sans-serif;
}
img {
  width: 150px;
  height: 150px;
}
.form-control:focus {
  border-width: 2px; 
  box-shadow: none;  
}
#imageLabel {
  border: 1px black dashed;
  background-color: #ffede8;
}
input[type=file] {
  display: none;
}
</style>