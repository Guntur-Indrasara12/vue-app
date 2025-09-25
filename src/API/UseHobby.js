import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'

const API_URL = 'https://wtdjubqncxawktbspfqx.supabase.co/rest/v1/hobby'

const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0ZGp1YnFuY3hhd2t0YnNwZnF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3ODI4MjQsImV4cCI6MjA3NDM1ODgyNH0.4dsMYqlK4L1liWv0HGbh5_Bo7qJNX_fACelQ4ONZASA'

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
}

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
      const { data } = await axios.get(API_URL, { headers })
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
        await axios.patch(`${API_URL}?id=eq.${editingId.value}`, { ...formState }, { headers })
      } else {
        await axios.post(API_URL, { ...formState }, { headers })
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
      await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
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
