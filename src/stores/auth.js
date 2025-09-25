import { defineStore } from "pinia"
import axios from "axios"
import bcrypt from "bcryptjs"

const API_URL = "https://68d3a6f1214be68f8c66a90a.mockapi.io/api/v1"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
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

        const res = await axios.post(`${API_URL}/users`, {
          email,
          password: hashedPassword,
          name,
        })

        this.user = res.data
        this.token = res.data.id
        localStorage.setItem("token", this.token)
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
        const res = await axios.get(`${API_URL}/users?email=${email}`)
        const user = res.data[0]

        if (!user) throw new Error("Email not found")

        const match = await bcrypt.compare(password, user.password)
        if (!match) throw new Error("Invalid password")

        this.user = user
        this.token = user.id
        localStorage.setItem("token", this.token)
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
        const res = await axios.get(`${API_URL}/users/${this.token}`)
        this.user = res.data
      } catch {
        this.logout()
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem("token")
    },
  },
})
