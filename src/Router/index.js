import { createRouter, createWebHistory } from 'vue-router'
import Hobby from '@/pages/HobbyPage.vue'
import Home from '@/pages/LandingPage.vue'

// import Profile from '@/pages/Profile.vue'

const routes = [
  { path: '/hobby', name: 'Hobby', component: Hobby },
  { path: '/', name: 'Home', component: Home },

  //   { path: '/profile', name: 'Profile', component: Profile },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
