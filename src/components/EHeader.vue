<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <!-- Logo -->
      <router-link to="/" class="d-flex align-items-center text-dark text-decoration-none mb-2 mb-lg-0">
        <img src="../icons/logo.png" alt="Charity Logo" width="40" height="40" class="me-2" />
        <span class="fs-4">Embrace</span>
      </router-link>
      <!-- Navigation Links -->
      <!-- Simplified Dropdown -->
      <div class="dropdown">
        <button class="btn btn-link dropdown-toggle text-dark fw-normal" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Events
        </button>
        <ul class="dropdown-menu">
          <li>
            <router-link to="/Review" class="dropdown-item" >Event reviews</router-link>
          </li>
          <li>
            <router-link to="/Signup" class="dropdown-item">Fundraise</router-link>
          </li>
          <li>
            <router-link to="/aboutUs" class="dropdown-item">Events</router-link>
          </li>
        </ul>
      </div>

      <!-- Authentication Buttons -->
      <div class="d-flex">
        <!-- Login Button -->
        <router-link
          to="/Login"
          v-if="!isAuthenticatedUser && !isAuthenticatedAdmin"
          class="button-outline-primary nav-link me-2"
          active-class="active"
        >
          Log in
        </router-link>

        <!-- Sign Up Button -->
        <router-link
          to="/Signup"
          v-if="!isAuthenticatedUser && !isAuthenticatedAdmin"
          class="button-primary nav-link"
          active-class="active"
        >
          Sign up
        </router-link>

        <!-- Sign Out Button -->
        <button v-else class="button-primary" @click="logout">Sign out</button>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isAuthenticatedUser, isAuthenticatedAdmin} from '@/composables/useAuth'
import { useRouter } from 'vue-router';
const router = useRouter();

const logout = () => {
  isAuthenticatedUser.value = false;
  isAuthenticatedAdmin.value = false;
  router.push('/'); // Redirect to home or any other route after logout
};
</script>

<style scoped>
.container-fluid {
  max-width: 100%;
  padding-left: 15px;
  padding-right: 15px;
}

header {
  border-bottom: 1px solid #e5e5e5;
}

.nav-link {
  color: #000;
}

.nav-link.active {
  color: #007bff;
}

.button-primary {
  color: #fff;
  background-color: #2d00f7;
  border: 2px solid #2d00f7;
  border-radius: 15px;
  padding: 8px 20px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;
  display: inline-block;
}

.button-outline-primary {
  color: #2d00f7;
  border: 2px solid #2d00f7;
  background-color: transparent;
  border-radius: 15px;
  padding: 8px 20px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;
  display: inline-block;
}

.button-primary:hover {
  background-color: #1f00b7;
  border-color: #1f00b7;
}

.button-outline-primary:hover {
  background-color: #2d00f7;
  color: #fff;
}
/* Dropdown button styling */
.btn-secondary.dropdown-toggle {
  background-color: #2d00f7; /* Custom background color */
  border-color: #2d00f7;     /* Custom border color */
  color: #fff;               /* Custom text color */
  border-radius: 5px;        /* Rounded corners */
  padding: 8px 16px;         /* Padding for a comfortable clickable area */
  font-weight: 500;          /* Bold text */
  transition: background-color 0.3s ease, color 0.3s ease; /* Smooth hover transition */
}

.btn-secondary.dropdown-toggle:hover {
  background-color: #1f00b7; /* Hover background color */
  border-color: #1f00b7;     /* Hover border color */
}

/* Dropdown button styling */
.btn-link.dropdown-toggle {
  color: #333;
  text-decoration: none;
  padding: 8px 15px;
  font-weight: 400;
}

.btn-link.dropdown-toggle::after {
  margin-left: 0.25em;
  vertical-align: 0.1em;
}

.dropdown-menu {
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  color: #333;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}
</style>
