import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Router instance must be used within a function or setup
const router = useRouter();

const users = ref(JSON.parse(localStorage.getItem('users')) || []);
// Reactive state for authentication
const isAuthenticated = ref(false);
// Function to log out the user
const logout = () => {
  isAuthenticated.value = false; // Update state to unauthenticated
  router.push('/'); // Redirect to home or any other route after logout
};

// Export the state and function so they can be used in other components
export { isAuthenticated, users, logout };