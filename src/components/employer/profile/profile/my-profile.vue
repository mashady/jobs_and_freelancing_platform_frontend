<template>
  <div class="p-4 bg-white mb-4 rounded rounded-2">
    <h2 class="fw-bold">Edit Profile</h2>

      <div class="row">
        <div class="col">
          <p>My Profile</p>
          <hr>
          <p>Featured Image</p>
          <!-- Previews -->
          <div v-for="(image, index) in images" :key="index" style="display: inline-block; margin: 10px; position: relative;">
            <img :src="image.url" alt="preview" style="width: 100px; height: 100px; object-fit: cover;" />
            <button @click="removeImage(index)" style="position: absolute; top: 0; right: 0;">✖</button>
          </div><br>
          <!-- File Input -->
          <label for="profileImg" id="imageLabel" class="btn">Browse</label>
          <input name="profileImg" id="profileImg" class="mt-2 ms-2" type="file" multiple @change="handleFiles" />
        </div>        
      </div>


      <div class="row mt-4">
        <div class="col">
          <div class="mb-4">
            <label for="name" class="form-label">Full Name</label>
            <input class="form-control" type="text" name="name" id="name">
          </div>
          
          <div class="mb-4">
            <label for="address" class="form-label">Address</label>
            <input class="form-control" type="text" name="address" id="address">
          </div>

          <div class="mb-4">
            <label for="phoneNumber" class="form-label">Phone Number</label>
            <input class="form-control" type="text" name="phoneNumber" id="phoneNumber">
          </div>

          <div class="mb-4">
            <label for="category">Category</label>
            <select class="form-select" id="category" name="category" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="{{ category.id }}" v-for="category in categories" :key="category.id" >{{category.name}}</option>
            </select>

          </div>
        </div>


        <div class="col">
          <div class="mb-4">
            <label for="city" class="form-label">City</label>
            <input class="form-control" type="text" name="city" id="city">
          </div>

          <div class="mb-4">
            <label for="email" class="form-label">Email</label>
            <input class="form-control" type="text" name="email" id="email">
          </div>
          
          <div class="mb-4">
            <label for="email" class="form-label">Employees</label>
            <input class="form-control" type="text" name="employees" id="employees">
          </div>
          
          <div class="mb-4">
            <label for="foundedAt" class="form-label">Founded At</label>
            <input class="form-control" type="date" name="foundedAt" id="foundedAt">
          </div>

        </div>
        <div class="form-floating">
          <textarea class="form-control" name="description" placeholder="Leave a comment here" id="description" style="height: 200px"></textarea>
          <label class="ms-2" for="description">Description</label>
        </div>
        <div class="form-floating my-4">
          <textarea class="form-control" name="description" placeholder="Leave a comment here" id="description" style="height: 200px"></textarea>
          <label class="ms-2" for="description">Who We Are</label>
        </div>
        <div class="form-floating">
          <textarea class="form-control" name="description" placeholder="Leave a comment here" id="description" style="height: 200px"></textarea>
          <label class="ms-2" for="description">What We Do</label>
        </div>
      </div>
    </div>
</template>

<script setup>
  import { ref,reactive } from 'vue';

  const images = ref([]); 
  const categories = [
    { id: 1, name: "Web Development" },
    { id: 2, name: "Mobile Development" },
    { id: 3, name: "UI/UX Design" },
    { id: 4, name: "Writing & Content" },
    { id: 5, name: "Digital Marketing" },
    { id: 6, name: "Data Science & AI" }
  ];

  const englishLevels = [
    {id:1, name:'basic'},
    {id:2, name:'conversational'},
    {id:2, name:'fluent'},
    {id:2, name:'biLingual'},
    {id:2, name:'professioinal'},
  ]

  const freelancerTypes = [
    'Agency Freelancer',
    'Independent Freelancer',
    'New Rising Talent'
  ]



  const handleFiles = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      images.value.push({
        file,
        url: URL.createObjectURL(file)
      });
    });
    event.target.value = ''; 
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(images.value[index].url);
    images.value.splice(index, 1);
  };

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
  #imageLabel{
    border: 1px black dashed;
    background-color: #ffede8;
  }
  input[type = file]{
    display: none;
  }
</style>