<script setup>
import { useHobbies } from '@/API/UseHobby.js'
import HobbyForm from '@/components/Hobby/HobbyForm.vue'
import HobbyTable from '@/components/Hobby/HobbyTable.vue'
import HobbyStats from '@/components/Hobby/HobbyStats.vue'

const {
  hobbies,
  editingId,
  formState,
  handleSubmit,
  startEdit,
  cancelEdit,
  removeHobby,
  error,
  errors,
} = useHobbies()
</script>

<template>
  <main class="crud-app">
    <section class="panel">
      <header class="panel-header">
        <div>
          <p class="subtitle">Personal tracker</p>
          <h1 class="title">Hobby Control Center</h1>
        </div>
        <HobbyStats :hobbies="hobbies" :editingId="editingId" />
      </header>

      <HobbyForm
        :formState="formState"
        :handleSubmit="handleSubmit"
        :cancelEdit="cancelEdit"
        :editingId="editingId"
        :errors="errors"
        :error="error"
      />

      <HobbyTable :hobbies="hobbies" :startEdit="startEdit" :removeHobby="removeHobby" />
    </section>
  </main>
</template>
