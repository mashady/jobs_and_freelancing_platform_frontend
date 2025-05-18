<template>
  <div class="container px-4 mb-3">
    <MyProfile v-model="formData.profile" />
    <Media v-model="formData.media" />

    <button 
      @click="submitForm" 
      class="btn greenbtn mt-4" 
      style="height: 50px; width:175px"
    >
      Save Profile
    </button>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import MyProfile from './my-profile.vue';
import Media from './media.vue';

const formData = ref({
  profile: {
    name: '',
    address: '',
    phoneNumber: '',
    category_id: '',
    city: '',
    email: '',
    employees: '',
    foundedAt: '',
    description: '',
    whoWeAre: '',
    whatWeDo: '',
    images: []
  },
  media: {
    files: []
  }
});

const submitForm = () => {
  console.log('Submitting:', formData.value);

  
};
</script>

<style scoped>
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
</style>