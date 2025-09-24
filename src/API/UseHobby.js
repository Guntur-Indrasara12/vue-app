import { reactive, ref, onMounted } from 'vue'

const API_URL = 'https://68d3a6f1214be68f8c66a90a.mockapi.io/api/v1/Hobby'

export function useHobbies() {
  const hobbies = ref([])
  const loading = ref(false)
  const error = ref(null)

  const editingId = ref(null)
  const initialState = () => ({ name: '' })
  const formState = reactive(initialState())
  const errors = reactive({ name: '' })

  function validate() {
    let valid = true
    errors.name = ''

    if (!formState.name) {
      errors.name = 'Name is required'
      valid = false
    } else if (formState.name.length < 3) {
      errors.name = 'Name must be at least 3 characters'
      valid = false
    }

    return valid
  }

  async function fetchHobbies() {
    loading.value = true
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      hobbies.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function handleSubmit() {
    if (!validate()) return

    if (editingId.value) {
      await fetch(`${API_URL}/${editingId.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formState }),
      })
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formState }),
      })
    }

    await fetchHobbies()
    resetForm()
  }

  function startEdit(hobby) {
    editingId.value = hobby.id
    Object.assign(formState, { ...hobby })
  }

  function cancelEdit() {
    resetForm()
  }

  async function removeHobby(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    await fetchHobbies()
    if (editingId.value === id) resetForm()
  }

  function resetForm() {
    Object.assign(formState, initialState())
    editingId.value = null
    errors.name = ''
  }

  onMounted(fetchHobbies)

  return {
    hobbies,
    loading,
    error,
    errors,
    editingId,
    formState,
    handleSubmit,
    startEdit,
    cancelEdit,
    removeHobby,
  }
}
