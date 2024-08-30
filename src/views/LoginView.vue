<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { admins, isAuthenticatedAdmin, isAuthenticatedUser, users } from '@/composables/useAuth';

const router = useRouter();

const formData = ref({
  username: '',
  password: ''
})

const clearForm = () => {
  formData.value = {
    username: '',
    password: ''
  }
}

const errors = ref({
  username: null,
  password: null,
  login: null
})


const login = () =>
{
    const user = users.value.some(user => user.username === formData.value.username && user.password === formData.value.password)
    const admin = admins.value.some(admin => admin.username === formData.value.username && admin.password === formData.value.password)
    if (user) {
        isAuthenticatedUser.value = true;
        errors.value.login = null;
        localStorage.setItem('isAuthenticatedUser', 'true')
        router.push('/');
    }
    else if (admin){
      isAuthenticatedAdmin.value = true;
      errors.value.login = null;
      localStorage.setItem('isAuthenticatedAdmin', 'true')
      router.push('/')
    }
    else{
      errors.value.login = "Your password or username is incorrect"
    }
}

const submitForm = (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  login(); // Perform login
  clearForm(); // Clear form fields
};

</script>

<template>
  <!-- 🗄️ W3. Library Registration Form -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Log in to Embrace</h1>
        <p class="text-center">
          Let's build some more advanced feature into our form.
        </p>
        <form @submit.prevent="submitForm">
          <div class="row mb-3 justify-content-center">
            <div class="col-md-8 col-sm-8">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
          </div>
          <div class="row mb-3 justify-content-center">
            <div class="col-md-8 col-sm-8">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Login</button>
            <div v-if="errors.login" class="text-danger">{{ errors.login }}</div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #e0bfbf; */
  /* border-radius: 10px;
} */ 

/* Class selectors */
.form {
  text-align: center;
  margin-top: 50px;
}

/* ID selectors */
#username:focus,
#password:focus,
#isAustralian:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}

.success-message {
  color: green;
}
</style>
