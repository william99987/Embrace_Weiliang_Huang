<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <!-- Logo and Brand Name -->
      <router-link to="/" class="navbar-brand">
        <img
          src="../assets/embrace.jpg"
          alt="Charity Logo"
          width="40"
          height="40"
          class="me-2"
        />
        Embrace
      </router-link>

      <!-- Toggler for Small Screens -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar Content: Links, Dropdowns, Authentication Buttons -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Left side (Navigation Links) -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- Conditional Dropdown based on Authentication -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Events
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link to="/Review" class="dropdown-item"
                  >Event reviews</router-link
                >
              </li>
              <li>
                <router-link to="/EventTable" class="dropdown-item"
                  >Event Table</router-link
                >
              </li>
              <li>
                <router-link to="/Events" class="dropdown-item"
                  >Events</router-link
                >
              </li>
              <li>
                <router-link to="/EventsMap" class="dropdown-item"
                  >Events Map</router-link
                >
              </li>
              <li>
                <router-link to="/GetAllEventsAPI" class="dropdown-item"
                  >Get all events API</router-link
                >
              </li>
              <li>
                <router-link to="/EventCountAPI" class="dropdown-item"
                  >Events count API</router-link
                >
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Get involves
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link to="/Donate" class="dropdown-item"
                  >Donate</router-link
                >
              </li>
              <li>
                <router-link to="/Signup" class="dropdown-item"
                  >Fundraise</router-link
                >
              </li>
              <li>
                <router-link to="/aboutUs" class="dropdown-item"
                  >Events</router-link
                >
              </li>
            </ul>
          </li>

          <li v-if="store.state.isAuthenticatedAdmin" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Admin
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link to="/AdminDashboard" class="dropdown-item"
                  >Dashboard</router-link
                >
              </li>
              <li>
                <router-link to="/Signup" class="dropdown-item"
                  >Fundraise</router-link
                >
              </li>
              <li>
                <router-link to="/aboutUs" class="dropdown-item"
                  >Events</router-link
                >
              </li>
            </ul>
          </li>

          <!-- Additional Static Navigation Links (optional) -->

          <li class="nav-item">
            <router-link to="/contact" class="nav-link">Contact</router-link>
          </li>
        </ul>

        <!-- Right side (Search and Authentication Buttons) -->
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>

        <!-- Authentication Buttons (Login, Sign Up, or Sign Out) -->
        <div class="d-flex ms-2">
          <!-- Log in -->
          <router-link
            to="/Login"
            v-if="!store.state.isAuthenticated"
            class="btn btn-outline-primary me-2"
            active-class="active"
          >
            Log in
          </router-link>

          <!-- Sign Up -->
          <router-link
            to="/Signup"
            v-if="!store.state.isAuthenticated"
            class="btn btn-primary"
            active-class="active"
          >
            Sign up
          </router-link>

          <!-- Sign Out -->
          <button v-else class="btn btn-primary" @click="logout">
            Sign out
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isReviewed } from '@/composables/review'
import Button from 'primevue/button'
import store from '@/store/store'

const router = useRouter()

const logout = () => {
  store.commit('setAuthentication', false)
  router.push('/') // Redirect to home or any other route after logout
}
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
  border-color: #2d00f7; /* Custom border color */
  color: #fff; /* Custom text color */
  border-radius: 5px; /* Rounded corners */
  padding: 8px 16px; /* Padding for a comfortable clickable area */
  font-weight: 500; /* Bold text */
  transition:
    background-color 0.3s ease,
    color 0.3s ease; /* Smooth hover transition */
}

.btn-secondary.dropdown-toggle:hover {
  background-color: #1f00b7; /* Hover background color */
  border-color: #1f00b7; /* Hover border color */
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
