<template>
  <div class="container px-4 mb-3">
    <myProfile ref="myProfileRef" v-model="freelancerProfile" :categories="categories" />
    <media ref="mediaRef" v-model="freelancerProfile" @upload-resume="handleResumeUpload" />
    <education ref="educationRef" v-model="freelancerProfile.educations" />
    <experience ref="experienceRef" v-model="freelancerProfile.work_experiences" />
    <skills ref="skillsRef" v-model="freelancerProfile.skills" />

    <div v-if="overallFormInvalid" class="alert alert-danger mt-3">
      Please fix the errors in the highlighted sections before saving.
    </div>

    <div v-if="notification.message" :class="['alert', notification.type === 'success' ? 'alert-success' : 'alert-danger', 'mt-3']" role="alert">
      {{ notification.message }}
    </div>

    <button @click="postProfile" class="btn greenbtn mt-4" style="height: 50px; width:175px">Save Information</button>
  </div>
</template>

<script setup>
import myProfile from './my-profile.vue';
import media from './media.vue';
import education from './education.vue';
import experience from './experience.vue';
import skills from './skills.vue';
import { ref, onMounted, computed } from 'vue';

const user_id = JSON.parse(localStorage.getItem('user')).id;

const myProfileRef = ref(null);
const mediaRef = ref(null);
const educationRef = ref(null);
const experienceRef = ref(null);
const skillsRef = ref(null);

const freelancerProfile = ref({
  id: null, 
  user_id: user_id,
  category_id: null,
  city: '',
  address: '',
  email: '',
  bio: '',
  gender: '',
  birth_date: '',
  job_title: '',
  min_hourly_rate: null,
  max_hourly_rate: null,
  english_level: '',
  payment_method: '',
  resume: '',
  work_experiences: [],
  educations: [],
  skills: [],
  user: {
    name: '',
  },
});

const categories = ref([]);
const componentValidity = ref({
  myProfile: true,
  media: true,
  education: true,
  experience: true,
  skills: true,
});

const overallFormInvalid = computed(() => {
  return Object.values(componentValidity.value).some(isValid => !isValid);
});

const isEditMode = ref(false);

const notification = ref({
  message: '',
  type: ''
});
let notificationTimeoutId = null; 

const showNotification = (message, type, duration = 3000) => {
  notification.value.message = message;
  notification.value.type = type;


  if (notificationTimeoutId) {
    clearTimeout(notificationTimeoutId);
  }

  notificationTimeoutId = setTimeout(() => {
    notification.value.message = '';
    notification.value.type = '';
    notificationTimeoutId = null;
  }, duration);
};


const handleResumeUpload = (file) => {
  console.log("Uploading resume (placeholder):", file);
  freelancerProfile.value.resume = file.name;
};

const fetchCategories = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch('/api/categories', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await response.json();
    categories.value = data.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    showNotification("Error fetching categories.", "error");
  }
};

const fetchFreelancerProfile = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`http://127.0.0.1:8000/api/freelancer-profiles/${user_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn("Freelancer profile not found for user_id:", user_id, ", initializing empty form.");
        isEditMode.value = false; 
        return;
      }
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    const data = await response.json();
    const profileData = data.data;

    if (profileData) {
      freelancerProfile.value = {
        ...freelancerProfile.value,
        ...profileData,

        user: profileData.user ? { name: profileData.user.name } : { name: '' },

        work_experiences: (profileData.work_experiences || []).map(exp => ({...exp, id: exp.id || Date.now() + Math.random()})),
        educations: (profileData.educations || []).map(edu => ({...edu, id: edu.id || Date.now() + Math.random()})),

        skills: profileData.skills ? profileData.skills.map(s => s.name) : [],
      };
      isEditMode.value = true;
    }
    console.log('Fetched Profile:', freelancerProfile.value);
  } catch (error) {
    console.error("Error fetching freelancer profile:", error);
    showNotification("Error fetching profile data.", "error");
  }
};

onMounted(async () => {
  await fetchCategories();
  await fetchFreelancerProfile();
});

const postProfile = async () => {
  let allComponentsValid = true;

  if (!allComponentsValid) {
    console.log("Form has validation errors. Preventing submission.");
    showNotification("Please fix the errors in the form.", "error");
    return;
  }

  try {
    const token = localStorage.getItem('authToken');
    const payload = {
      ...freelancerProfile.value,
      name: freelancerProfile.value.user.name,
      work_experiences: freelancerProfile.value.work_experiences, 
      educations: freelancerProfile.value.educations,             
    };

    delete payload.user;

    let url = 'http://127.0.0.1:8000/api/freelancer-profiles';
    let method = 'POST';
    let successMessage = 'Profile created successfully!';


    if (isEditMode.value && freelancerProfile.value.id) {
      url = `http://127.0.0.1:8000/api/freelancer-profiles/${user_id}`;
      method = 'PUT';
      successMessage = 'Profile updated successfully!';
    } else {
      delete payload.id;
    }

    console.log("Payload to send:", JSON.stringify(payload, null, 2));
    console.log("Method:", method, "URL:", url);

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 422) {
        console.error("Backend Validation Errors:", data.errors);
        showNotification('Validation failed. Please check your inputs.', 'error');
        displayBackendErrors(data.errors);
      } else {
        throw new Error(data.message || `Failed to ${isEditMode.value ? 'update' : 'create'} profile`);
      }
      return;
    }

    console.log("Response:", data);
    showNotification(successMessage, 'success');
    await fetchFreelancerProfile(); 
  } catch (error) {
    console.error("Error saving information:", error);
    showNotification('An error occurred while saving information: ' + error.message, 'error');
  }
};
const displayBackendErrors = (backendErrors) => {

  if (myProfileRef.value) myProfileRef.value.errors = {};
  if (mediaRef.value) mediaRef.value.errors = {};
  if (educationRef.value) {
    educationRef.value.errors = {};
    educationRef.value.noEducationError = '';
  }
  if (experienceRef.value) {
    experienceRef.value.errors = {};
    experienceRef.value.noExperienceError = '';
  }
  if (skillsRef.value) {
    skillsRef.value.newSkillError = '';
    skillsRef.value.skillsArrayError = '';
  }

  for (const key in backendErrors) {
    const errorMessage = backendErrors[key][0]; 

    
    if (key === 'name' && myProfileRef.value) {
        myProfileRef.value.errors['user.name'] = errorMessage;
    } else if (myProfileRef.value && myProfileRef.value.errors.hasOwnProperty(key)) {
        myProfileRef.value.errors[key] = errorMessage;
    }

    else if (key === 'resume' && mediaRef.value) {
        mediaRef.value.errors.resume = errorMessage;
    }

    else if (key.startsWith('educations.') && educationRef.value) {
        const parts = key.split('.');
        const index = parseInt(parts[1]);
        const field = parts[2];

        const educationItem = freelancerProfile.value.educations[index];
        if (educationItem) {
            if (!educationRef.value.errors[educationItem.id]) {
                educationRef.value.errors[educationItem.id] = {};
            }
            educationRef.value.errors[educationItem.id][field] = errorMessage;
            educationRef.value.editingEducationId = educationItem.id;
        } else if (key === 'educations' && educationRef.value) {
            educationRef.value.noEducationError = errorMessage;
        }
    }

    else if (key.startsWith('work_experiences.') && experienceRef.value) {
        const parts = key.split('.');
        const index = parseInt(parts[1]);
        const field = parts[2];

        const experienceItem = freelancerProfile.value.work_experiences[index];
        if (experienceItem) {
            if (!experienceRef.value.errors[experienceItem.id]) {
                experienceRef.value.errors[experienceItem.id] = {};
            }
            experienceRef.value.errors[experienceItem.id][field] = errorMessage;
            experienceRef.value.editingExperienceId = experienceItem.id;
        } else if (key === 'work_experiences' && experienceRef.value) { 
            experienceRef.value.noExperienceError = errorMessage;
        }
    }

    else if (key === 'skills' && skillsRef.value) {
        skillsRef.value.skillsArrayError = errorMessage;
    } else if (key.startsWith('skills.') && skillsRef.value) {
        skillsRef.value.newSkillError = errorMessage;
    }
  }
};
</script>

<style scoped>

  * {
    font-family: sans-serif;
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


  .alert {
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }

  .alert-success {
    color: #0f5132;
    background-color: #d1e7dd;
    border-color: #badbcc;
  }

  .alert-danger {
    color: #842029;
    background-color: #f8d7da;
    border-color: #f5c2c7;
  }
</style>