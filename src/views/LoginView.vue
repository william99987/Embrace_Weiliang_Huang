<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import store from '@/store/store'
import db from '@/firebase/init'

const router = useRouter()
const auth = getAuth()

const formData = ref({
  email: '',
  password: ''
})

const clearForm = () => {
  formData.value = {
    email: '',
    password: ''
  }
}

const errors = ref({
  email: null,
  password: null,
  login: null
})

const login = () => {
  signInWithEmailAndPassword(
    auth,
    formData.value.email,
    formData.value.password
  )
    .then((data) => {
      const user = auth.currentUser
      if (user) {
        const userDocRef = doc(db, 'users', user.uid)
        getDoc(userDocRef).then((userDoc) => {
          const userData = userDoc.data()
          console.log('Firebase Sign-In Successful!')
          if (userData.role === 'admin') {
            store.commit('setAdminAuthentication', true)
            console.log('User is an admin')
          } else if (userData.role === 'user') {
            console.log('User is a regular user')
          }
        })
      }
      store.commit('setAuthentication', true)
      router.push('/')
      console.log(auth.currentUser) // To check the current user signed in
    })
    .catch((error) => {
      console.log(error.code)
    })
}

const submitForm = (event) => {
  event.preventDefault() // Prevent default form submission behavior
  login() // Perform login
  clearForm() // Clear form fields
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="card p-4 shadow" style="max-width: 400px; width: 100%">
      <!-- Title -->
      <h1 class="text-center">Welcome to Embrace</h1>
      <p class="text-center">
        Contact management designed for teams and individuals
      </p>

      <!-- Google login button -->
      <div class="text-center mb-3">
        <button class="btn btn-light w-100 border">
          <img src="../assets/google.png" alt="Google" class="google-icon" />
          Continue with Google
        </button>
      </div>

      <!-- Horizontal divider -->
      <hr />

      <!-- Username input -->
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="username" class="form-label">Email</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="formData.email"
            placeholder="Type your email"
          />
          <div v-if="errors.username" class="text-danger mt-2">
            {{ errors.username }}
          </div>
        </div>

        <!-- Password input -->
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="formData.password"
            placeholder="Type your password"
          />
          <div v-if="errors.password" class="text-danger mt-2">
            {{ errors.password }}
          </div>
        </div>

        <!-- Continue with email button -->
        <div class="text-center">
          <button type="submit" class="btn btn-dark w-100">
            Continue with email
          </button>
        </div>

        <!-- Login error message -->
        <div v-if="errors.login" class="text-danger text-center mt-3">
          {{ errors.login }}
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.google-icon {
  width: 40px;
  height: 40px;
  object-fit: contain; /* Ensures the image keeps its aspect ratio */
  vertical-align: middle; /* Vertically aligns the image within the button */
}
</style>
