import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'

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
      const { data } = await axios.get(API_URL)
      hobbies.value = data
    } catch (err) {
      error.value = err.response?.data?.message || err.message
    } finally {
      loading.value = false
    }
  }

  async function handleSubmit() {
    if (!validate()) return

    try {
      if (editingId.value) {
        await axios.put(`${API_URL}/${editingId.value}`, { ...formState })
      } else {
        await axios.post(API_URL, { ...formState })
      }
      await fetchHobbies()
      resetForm()
    } catch (err) {
      error.value = err.response?.data?.message || err.message
    }
  }

  function startEdit(hobby) {
    editingId.value = hobby.id
    Object.assign(formState, { ...hobby })
  }

  function cancelEdit() {
    resetForm()
  }

  async function removeHobby(id) {
    try {
      await axios.delete(`${API_URL}/${id}`)
      await fetchHobbies()
      if (editingId.value === id) resetForm()
    } catch (err) {
      error.value = err.response?.data?.message || err.message
    }
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
