import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Router instance must be used within a function or setup
const router = useRouter();

const users = ref(JSON.parse(localStorage.getItem('users')) || []);

// Hard-coded admin data
const admins = ref([
  {
    id: 1,
    username: 'admin1',
    email: 'admin1@example.com',
    password: 'password123', // Remember to handle sensitive data securely
  },
  {
    id: 2,
    username: 'admin2',
    email: 'admin2@example.com',
    password: 'password456', // Secure handling of sensitive data
  }
]);
// Reactive state for authentication
const isAuthenticatedUser = ref(false);
const isAuthenticatedAdmin = ref(false);
// Function to log out the user
const logout = () => {
  isAuthenticatedUser.value = false; // Update state to unauthenticated
  router.push('/'); // Redirect to home or any other route after logout
};

// Export the state and function so they can be used in other components
export { isAuthenticatedUser, isAuthenticatedAdmin,users, admins, logout };