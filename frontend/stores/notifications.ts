import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications: Ref<string[]> = ref([])
  return { notifications }
})
