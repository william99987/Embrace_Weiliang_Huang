import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutusView from '@/views/AboutusView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import ReviewView from '@/views/ReviewView.vue'
import AddReviewView from '@/views/AddReviewView.vue'
import { isAuthenticatedAdmin, isAuthenticatedUser } from '@/composables/useAuth'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/aboutUs',
        name: 'About',
        component: AboutusView
    },
    {
        path: '/Login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/Signup',
        name: 'Signup',
        component: SignupView
    },
    {
        path: '/Review',
        name: 'Review',
        component: ReviewView
    },
    {
        path: '/AddReview',
        name: 'AddReview',
        component: AddReviewView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (!isAuthenticatedUser.value && (to.name !== 'Login' && to.name !== 'Signup' && to.name !== 'Home')) {
        alert("Please log in first");
        next({ name: 'Login' }); 
    } else {
        next();
    }
});


export default router
