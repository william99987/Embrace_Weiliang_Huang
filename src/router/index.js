import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutusView from '@/views/AboutusView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'

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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
