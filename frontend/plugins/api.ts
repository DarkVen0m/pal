import { useNotificationsStore } from '~/stores/notifications'

function addHeader(headers: HeadersInit, name: string, value: string) {
  if (Array.isArray(headers)) {
    headers.push([name, value])
  }
  else if (headers instanceof Headers) {
    headers.set(name, value)
  }
  else {
    headers[name] = value
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const userStore = useUserStore()
  const localePath = useLocalePath()
  const notificationsStore = useNotificationsStore()
  const apiFetch = $fetch.create({
    baseURL: config.public.apiUrl,
    headers: {
      Accept: 'application/json',
    },
    onRequest: async ({ options }) => {
      const headers = options.headers ||= {}
      if (userStore.token)
        addHeader(headers, 'Authorization', `Bearer ${userStore.token}`)
    },
    onResponseError: async ({ response }) => {
      if (response.status === 401) {
        await navigateTo(localePath({ name: 'auth-login' }))
      }
      if (response._data.errors) {
        const errors: Record<string, string[]> = response._data.errors
        Object.keys(errors).forEach((key) => {
          const errorsByType = errors[key]
          errorsByType.forEach((error) => {
            notificationsStore.notifications.push(error)
          })
        })
      }
    },
  })

  return {
    provide: {
      apiFetch,
    },
  }
})
