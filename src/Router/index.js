import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import Home from '@/pages/LandingPage.vue'
import Hobby from '@/pages/HobbyPage.vue'
import AuthPage from '@/pages/AuthPage.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/auth', name: 'Auth', component: AuthPage },
  { path: '/hobby', name: 'Hobby', component: Hobby, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'Auth' })
  } else {
    next()
  }
})

export default router
