<script setup>
import { useProfile } from '@/API/UseProfile'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const { profile, loading, error, fetchProfile, saveProfile } = useProfile(route.params.id)

onMounted(() => {
  fetchProfile()
})

const handleSave = async () => {
  const success = await saveProfile()
  if (success) {
    alert('Profile saved!')
    router.push('/')
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card profile-card">
      <h2 class="auth-title">Profile</h2>
      <form @submit.prevent="handleSave" class="profile-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="profile.name" required />
        </div>

        <div class="form-group">
          <label for="date_birth">Date of Birth</label>
          <input type="date" id="date_birth" v-model="profile.date_birth" required />
        </div>

        <div class="form-group">
          <label for="address">Address</label>
          <textarea id="address" v-model="profile.address" rows="3" required></textarea>
        </div>

        <div class="form-group gender-group">
          <label>Gender</label>
          <div class="radio-group">
            <label><input type="radio" value="male" v-model="profile.gender" /> Male</label>
            <label><input type="radio" value="female" v-model="profile.gender" /> Female</label>
          </div>
        </div>

        <div class="form-group">
          <label for="telp">Telephone</label>
          <input type="tel" id="telp" v-model="profile.telp" required />
        </div>

        <button type="submit" class="auth-button" :disabled="loading">
          {{ loading ? 'Saving...' : 'Save' }}
        </button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #0f172a;
}

.auth-card.profile-card {
  background-color: #1e293b;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.auth-title {
  text-align: center;
  color: #f1f5f9;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.profile-form .form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.profile-form label {
  margin-bottom: 0.5rem;
  color: #cbd5e1;
  font-weight: 500;
}

.profile-form input,
.profile-form textarea {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #334155;
  background-color: #0f172a;
  color: #f1f5f9;
  font-size: 0.95rem;
}

.profile-form textarea {
  resize: none;
}

.gender-group .radio-group {
  display: flex;
  gap: 1rem;
  margin-top: 0.25rem;
}

.gender-group input[type='radio'] {
  accent-color: #14b8a6;
}

.auth-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #14b8a6;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s;
}

.auth-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-button:hover:not(:disabled) {
  background-color: #0d9488;
}

.error {
  color: #f87171;
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}
</style>
