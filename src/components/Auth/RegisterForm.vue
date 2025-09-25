<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required />
        </div>
        <button type="submit" class="auth-button" :disabled="auth.loading">
          {{ auth.loading ? 'Loading...' : 'Register' }}
        </button>
      </form>

      <p v-if="auth.error" class="error">{{ auth.error }}</p>

      <div class="auth-links">
        <a href="#" @click.prevent="$emit('switch-view', 'login')">Back to Login</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const router = useRouter()
const auth = useAuthStore()

defineEmits(['switch-view'])

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }

  try {
    await auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
    })

    router.push('/')
  } catch (err) {
    console.error('Register gagal:', err.message)
  }
}
</script>

<style scoped src="@/assets/auth.css"></style>
