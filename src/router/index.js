import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutusView from '@/views/AboutusView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import ReviewView from '@/views/ReviewView.vue'
import AddReviewView from '@/views/AddReviewView.vue'
import EventsView from '@/views/EventsView.vue'
import store from '@/store/store'
import EventTableView from '@/views/EventTableView.vue'
import EventsMapView from '@/views/EventsMapView.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'
import EventCountAPI from '@/views/EventCountAPI.vue'
import GetAllEventsAPI from '@/views/GetAllEventsAPI.vue'

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
  },
  {
    path: '/Events',
    name: 'Events',
    component: EventsView
  },
  {
    path: '/EventTable',
    name: 'EventTable',
    component: EventTableView
  },
  {
    path: '/EventsMap',
    name: 'EventstMap',
    component: EventsMapView
  },
  {
    path: '/AdminDashboard',
    name: 'AdminDashboard',
    component: AdminDashboardView
  },
  {
    path: '/EventCountAPI',
    name: 'EventCountAPI',
    component: EventCountAPI
  },
  {
    path: '/GetAllEventsAPI',
    name: 'GetAllEventsAPI',
    component: GetAllEventsAPI
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (
    !store.state.isAuthenticated &&
    to.name !== 'Login' &&
    to.name !== 'Signup' &&
    to.name !== 'Home'
  ) {
    alert('Please log in first')
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
