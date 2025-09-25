<template>
  <div class="auth-container">
    <div class="auth-card">
      <LoginForm v-if="currentView === 'login'" @switch-view="switchView" />
      <RegisterForm v-else-if="currentView === 'register'" @switch-view="switchView" />
      <ForgotPasswordForm v-else-if="currentView === 'forgot-password'" @switch-view="switchView" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginForm from '@/components/Auth/LoginForm.vue'
import RegisterForm from '@/components/Auth/RegisterForm.vue'
import ForgotPasswordForm from '@/components/Auth/ForgotForm.vue'

const currentView = ref('login')

function switchView(view) {
  currentView.value = view
}
</script>
