import { useFetch } from '#app'

type useFetchType = typeof useFetch

export const useApi: useFetchType = (path, options = {}) => {
  const config = useRuntimeConfig()
  options.baseURL = config.public.apiUrl
  options.$fetch = useNuxtApp().$apiFetch
  return useFetch(path, options)
}
