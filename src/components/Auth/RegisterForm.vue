<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">Register</h2>
      <form @submit.prevent="handleRegister">
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
        <a href="#" @click.prevent="router.push('/auth/login')">Back to Login</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/Router'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const auth = useAuthStore()

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }

  try {
    await auth.register({
      email: email.value,
      password: password.value,
    })

    const userId = auth.user?.id
    if (!userId) throw new Error('User ID tidak ditemukan')

    router.push({ name: 'Profile', params: { id: userId } })
  } catch (err) {
    console.error('Register gagal:', err.message)
  }
}
</script>

<style scoped src="@/assets/auth.css"></style>
