<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">Forgot Password</h2>
      <form @submit.prevent="handleForgotPassword">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <button type="submit" class="auth-button">Reset Password</button>
      </form>
      <div class="auth-links">
        <a href="#" @click.prevent="$emit('switch-view', 'login')">Back to Login</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
defineEmits(['show-login'])

const handleForgotPassword = () => {
  console.log('Forgot password request for:', email.value)
}
</script>

<style scoped src="@/assets/auth.css"></style>
