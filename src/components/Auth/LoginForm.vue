<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="auth-button">Login</button>
      </form>
      <div class="auth-links">
        <a href="#" @click.prevent="$emit('switch-view', 'register')">Register</a>
        <a href="#" @click.prevent="$emit('switch-view', 'forgot-password')">Forgot Password?</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()

defineEmits(['switch-view'])

const handleLogin = async () => {
  try {
    await auth.login({ email: email.value, password: password.value })
    router.push('/')
  } catch {
    alert('incorrect user or password ')
  }
}
</script>

<style scoped src="@/assets/auth.css"></style>
