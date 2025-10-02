import { reactive, ref } from 'vue'
import axios from 'axios'

const API_URL = 'https://wtdjubqncxawktbspfqx.supabase.co/rest/v1/profile'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0ZGp1YnFuY3hhd2t0YnNwZnF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3ODI4MjQsImV4cCI6MjA3NDM1ODgyNH0.4dsMYqlK4L1liWv0HGbh5_Bo7qJNX_fACelQ4ONZASA'

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
}

export function useProfile(userId) {
  const profile = reactive({
    name: '',
    date_birth: '',
    address: '',
    gender: 'male',
    telp: '',
    users: userId,
  })

  const loading = ref(false)
  const error = ref('')

  async function fetchProfile() {
    if (!userId) return
    loading.value = true
    error.value = ''
    try {
      const { data } = await axios.get(`${API_URL}?users=eq.${userId}`, { headers })
      if (data && data.length > 0) {
        Object.assign(profile, data[0])
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message
    } finally {
      loading.value = false
    }
  }

  async function saveProfile() {
    if (!userId) return
    profile.users = userId
    loading.value = true
    error.value = ''
    try {
      await axios.post(API_URL, [profile], {
        headers: {
          ...headers,
          Prefer: 'resolution=merge-duplicates',
        },
      })
      return true
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      return false
    } finally {
      loading.value = false
    }
  }

  return { profile, loading, error, fetchProfile, saveProfile }
}
