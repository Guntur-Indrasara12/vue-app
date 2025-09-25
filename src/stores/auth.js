import { defineStore } from 'pinia'
import axios from 'axios'
import bcrypt from 'bcryptjs'

const API_URL = 'https://wtdjubqncxawktbspfqx.supabase.co/rest/v1/'

const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0ZGp1YnFuY3hhd2t0YnNwZnF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3ODI4MjQsImV4cCI6MjA3NDM1ODgyNH0.4dsMYqlK4L1liWv0HGbh5_Bo7qJNX_fACelQ4ONZASA'

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    error: null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async register({ email, password, name }) {
      this.loading = true
      this.error = null
      try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const res = await axios.post(
          `${API_URL}/users`,
          {
            email,
            password: hashedPassword,
            name,
          },
          { headers },
        )

        this.user = res.data
        this.token = res.data.id
        localStorage.setItem('token', this.token)
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async login({ email, password }) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get(`${API_URL}/users?email=${email}`, { headers })

        const user = res.data[0]

        if (!user) throw new Error('Email not found')

        const match = await bcrypt.compare(password, user.password)
        if (!match) throw new Error('Invalid password')

        this.user = user
        this.token = user.id
        localStorage.setItem('token', this.token)
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchUser() {
      if (!this.token) return
      try {
        const res = await axios.get(`${API_URL}/users/${this.token}`, { headers })
        this.user = res.data
      } catch {
        this.logout()
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },

    async checkEmail(email) {
      this.error = null
      try {
        const res = await axios.get(`${API_URL}/users?email=${email}`, { headers })
        const user = res.data[0]
        if (!user) throw new Error('Email not found')
        return true
      } catch (err) {
        this.error = err.message
        throw err
      }
    },

    async updatePassword(email, password) {
      this.error = null
      try {
        const res = await axios.get(`${API_URL}/users?email=${email}`, { headers })
        const user = res.data[0]
        if (!user) throw new Error('Email not found')

        const hashedPassword = await bcrypt.hash(password, 10)
        await axios.put(`${API_URL}/users/${user.id}`, { password: hashedPassword }, { headers })
      } catch (err) {
        this.error = err.message
        throw err
      }
    },
  },
})
