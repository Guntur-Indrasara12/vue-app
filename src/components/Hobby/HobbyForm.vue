<script setup>
/* eslint-disable vue/no-mutating-props */
defineProps({
  formState: Object,
  handleSubmit: Function,
  cancelEdit: Function,
  editingId: [String, Number],
  errors: Object,
  error: String,
})
</script>

<template>
  <form class="editor" @submit.prevent="handleSubmit">
    <div class="field">
      <label for="name">Nama hobby</label>
      <input
        id="name"
        v-model.trim="formState.name"
        type="text"
        placeholder="Contoh: Fotografi jalanan"
      />
      <p v-if="errors?.name" class="error-msg">{{ errors.name }}</p>
    </div>

    <div class="actions">
      <button type="submit" class="btn btn-primary">
        {{ editingId ? 'Perbarui Hobby' : 'Tambah Hobby' }}
      </button>
      <button v-if="editingId" type="button" class="btn btn-secondary" @click="cancelEdit">
        Batalkan edit
      </button>
    </div>

    <p v-if="error" class="error-msg api-error">{{ error }}</p>
  </form>
</template>
