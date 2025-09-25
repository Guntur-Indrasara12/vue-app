<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">
        {{ step === 1 ? 'Forgot Password' : 'Set New Password' }}
      </h2>

      <form @submit.prevent="step === 1 ? handleCheckEmail() : handleSetNewPassword()">
        <div class="form-group" v-if="step === 1">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>

        <div v-if="step === 2">
          <div class="form-group">
            <label for="newPassword">New Password</label>
            <input type="password" id="newPassword" v-model="newPassword" required />
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" required />
          </div>
        </div>

        <button type="submit" class="auth-button">
          {{ step === 1 ? 'Next' : 'Reset Password' }}
        </button>
      </form>

      <div class="auth-links">
        <a href="#" @click.prevent="$emit('switch-view', 'login')">Back to Login</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const step = ref(1)
const email = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const authStore = useAuthStore()

const emit = defineEmits(['switch-view'])

const handleCheckEmail = async () => {
  try {
    const exists = await authStore.checkEmail(email.value)
    if (exists) {
      step.value = 2
    }
  } catch {
    alert("user with this email doesn't exist")
  }
}

const handleSetNewPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }

  try {
    await authStore.updatePassword(email.value, newPassword.value)
    alert('Password berhasil diubah!')
    step.value = 1
    email.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
    emit('switch-view', 'login')
  } catch {
    alert(authStore.error)
  }
}
</script>

<style scoped src="@/assets/auth.css"></style>
