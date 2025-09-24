<script setup>
defineProps({
  hobbies: {
    type: Array,
    default: () => [],
  },
  startEdit: Function,
  removeHobby: Function,
})
</script>

<template>
  <section class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th class="actions-column">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!hobbies.length">
          <td colspan="3" class="empty-state">
            Belum ada hobby tercatat. Tambahkan di atas untuk mulai.
          </td>
        </tr>
        <tr v-for="hobby in hobbies" :key="hobby.id">
          <td>{{ hobby.id }}</td>
          <td>{{ hobby.name }}</td>
          <td class="actions-column">
            <button class="icon-btn" @click="startEdit(hobby)">✏️</button>
            <button class="icon-btn icon-danger" @click="removeHobby(hobby.id)">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
