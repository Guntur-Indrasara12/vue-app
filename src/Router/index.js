import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import ProfileView from '@/components/profile/ProfileForm.vue'
import LoginForm from '@/components/Auth/LoginForm.vue'
import RegisterForm from '@/components/Auth/RegisterForm.vue'
import ForgotPasswordForm from '@/components/Auth/ForgotForm.vue'
import HobbyForm from '@/components/Hobby/HobbyForm.vue'
import LandingPage from '@/pages/LandingPage.vue'

const routes = [
  { path: '/', name: 'Home', component: LandingPage },
  { path: '/auth/login', name: 'Login', component: LoginForm },
  { path: '/auth/register', name: 'Register', component: RegisterForm },
  { path: '/auth/forgot-password', name: 'ForgotPassword', component: ForgotPasswordForm },
  {
    path: '/auth/profile/:id',
    name: 'Profile',
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  { path: '/hobby', name: 'Hobby', component: HobbyForm, meta: { requiresAuth: true } },
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
