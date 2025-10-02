<template>
  <nav class="navbar">
    <div class="brand">
      <span class="brand-mark" aria-hidden="true"></span>
      <span class="brand-name">Hobby Control Center</span>
    </div>

    <div class="nav-links">
      <RouterLink to="/" class="nav-link" :class="{ 'is-active': $route.path === '/' }">
        Beranda
      </RouterLink>

      <RouterLink
        v-if="auth.isAuthenticated"
        to="/hobby"
        class="nav-link"
        :class="{ 'is-active': $route.path === '/hobby' }"
      >
        Hobby
      </RouterLink>

      <RouterLink
        v-if="auth.isAuthenticated"
        :to="`/profile/${auth.user?.id}`"
        class="nav-link"
        :class="{ 'is-active': $route.path.startsWith('/profile') }"
      >
        Profile
      </RouterLink>

      <RouterLink
        v-if="!auth.isAuthenticated"
        to="/auth/login"
        class="nav-link"
        :class="{ 'is-active': $route.path === '/auth/login' }"
      >
        Login
      </RouterLink>

      <RouterLink v-else to="/auth/login" class="nav-link" @click="handleLogout">
        Logout
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/auth/login')
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-primary);
  font-weight: 600;
  letter-spacing: 0.02em;
}

.brand-mark {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(145deg, rgba(56, 189, 248, 0.85), rgba(56, 189, 248, 0.35));
  box-shadow: 0 10px 22px rgba(56, 189, 248, 0.3);
}

.brand-name {
  font-size: 1.125rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
}

.nav-link {
  color: rgba(226, 232, 240, 0.7);
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;
}

.nav-link:hover {
  color: var(--color-text);
  background-color: rgba(56, 189, 248, 0.12);
}

.nav-link.is-active {
  color: var(--color-text);
  background-color: rgba(56, 189, 248, 0.18);
}

@media (max-width: 720px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
