<script setup>
defineProps({
  hobbies: {
    type: Array,
    default: () => [],
  },
  editingId: [String, Number],
})
</script>

<template>
  <div class="stats">
    <div class="stat-card">
      <span class="stat-label">Total hobbies</span>
      <span class="stat-value">{{ hobbies.length }}</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">Active edits</span>
      <span class="stat-value">{{ editingId ? 1 : 0 }}</span>
    </div>
  </div>
</template>
