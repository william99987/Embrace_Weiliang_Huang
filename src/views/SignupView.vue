<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const db = getFirestore()
const router = useRouter()
const auth = getAuth()

const signup = async () => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.value.email,
      formData.value.password
    )
    const user = userCredential.user

    console.log('Firebase Register successful!')

    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: 'user' // Assign a default role to new users
    })

    router.push('/')
  } catch (error) {
    console.log(error.code)
  }
}

const formData = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const clearForm = () => {
  formData.value = {
    email: '',
    password: '',
    confirmPassword: ''
  }
}

const errors = ref({
  email: null,
  password: null,
  confirmPassword: null,
  signupUsername: null
})

const successMessages = ref({
  email: null,
  password: null,
  confirmPassword: null
})

const validateEmail = (blur) => {
  const email = formData.value.email

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

  if (!emailPattern.test(email)) {
    if (blur) errors.value.email = 'Please enter a valid email address'
  } else {
    errors.value.email = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="card p-4 shadow" style="max-width: 400px; width: 100%">
      <!-- Title -->
      <h1 class="text-center">Sign up to Embrace</h1>
      <p class="text-center">Let's embrace each other.</p>

      <!-- Signup form -->
      <form @submit.prevent="Signup">
        <!-- Username input -->
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="text"
            class="form-control"
            id="email"
            v-model="formData.email"
            @blur="() => validateEmail(true)"
            @input="() => validateEmail(false)"
            placeholder="Type in your emaill"
          />
          <div v-if="errors.email" class="text-danger mt-2">{{ errors.email }}</div>
        </div>

        <!-- Password input -->
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="formData.password"
            @blur="() => validatePassword(true)"
            @input="() => validatePassword(false)"
            placeholder="Create a password"
          />
          <div v-if="errors.password" class="text-danger mt-2">{{ errors.password }}</div>
        </div>

        <!-- Confirm Password input -->
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Confirm password</label>
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            v-model="formData.confirmPassword"
            @blur="() => validateConfirmPassword(true)"
            @input="() => validateConfirmPassword(false)"
            placeholder="Confirm your password"
          />
          <div v-if="errors.confirmPassword" class="text-danger mt-2">
            {{ errors.confirmPassword }}
          </div>
        </div>

        <!-- Buttons -->
        <div class="text-center">
          <button @click="signup" class="btn btn-dark w-100 mb-2">Sign up</button>
          <button type="button" class="btn btn-secondary w-100" @click="clearForm">Clear</button>
        </div>

        <!-- Username already exists error -->
        <div v-if="errors.signupUsername" class="text-danger text-center mt-3">
          {{ errors.signupUsername }}
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
