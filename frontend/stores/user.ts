import { defineStore } from 'pinia'
import type { CookieRef } from '#app'

interface TokenResponse {
  access_token: string
  username: string
}

export const useUserStore = defineStore('user', () => {
  const username: Ref<string | null> = ref(null)
  const token: CookieRef<undefined | null | string> = useCookie('token')
  const auth = async (email: string, password: string) => {
    const { $apiFetch } = useNuxtApp()
    await $apiFetch<TokenResponse>('/api/login', {
      body: {
        email,
        password,
      },
      method: 'POST',
      onResponse: async ({ response }) => {
        if (response.status != 200) return
        const localePath = useLocalePath()
        const data = response._data
        username.value = data.username
        token.value = data.access_token
        await navigateTo(localePath({ name: 'index' }))
      },
    })
  }
  const register = async (name: string, email: string, password: string) => {
    const { $apiFetch } = useNuxtApp()
    await $apiFetch<TokenResponse>('/api/register', {
      body: {
        name,
        email,
        password,
      },
      method: 'POST',
      onResponse: async ({ response }) => {
        if (response.status != 201) return
        await auth(email, password)
      },
    })
  }
  const logout = async () => {
    const { $apiFetch } = useNuxtApp()
    await $apiFetch<TokenResponse>('/api/logout', {
      method: 'POST',
      onResponse: async ({ response }) => {
        if (response.status != 200) return
        const localePath = useLocalePath()
        username.value = null
        token.value = null
        await navigateTo(localePath({ name: 'auth-login' }))
      },
    })
  }
  return { username, token, auth, register, logout }
})
