import { defineStore } from 'pinia'
import type { Note, NoteWithoutId } from '~/types/note'

interface NoteRemoved {
  note_id: number
}

export const useNotesStore = defineStore('notes', () => {
  const notes: Ref<Note[]> = ref([])
  const { pending: isLoading, refresh: getNotes } = useApi<Note[]>(
    '/api/notes',
    {
      retry: 0,
      immediate: true,
      onResponse: ({ response }) => {
        if (response.status != 200) return
        notes.value = response._data
      },
      onRequestError: ({ error }) => {
        if (import.meta.server) return
        if (error.name === 'AbortError') return
      },
    },
  )

  const createNote = async (note: NoteWithoutId) => {
    const { $apiFetch } = useNuxtApp()
    await $apiFetch<Note>(`/api/notes/`, {
      method: 'POST',
      body: note,
      onResponse: ({ response }) => {
        if (response.status != 200) return
        const data: Note = response._data
        notes.value.push(data)
      },
    })
  }

  const deleteNote = async (id: number) => {
    const { $apiFetch } = useNuxtApp()
    await $apiFetch<NoteRemoved>(`/api/notes/${id}`, {
      method: 'DELETE',
      onResponse: ({ response }) => {
        if (response.status != 200) return
        const data: NoteRemoved = response._data
        const noteIdx = notes.value.findIndex(note => note.id == data.note_id)
        if (noteIdx === -1) return
        notes.value.splice(noteIdx, 1)
      },
    })
  }

  const updateNote = async (note: Note) => {
    const { id: noteId, ...noteWithoutId } = { ...note }
    const { $apiFetch } = useNuxtApp()
    await $apiFetch<Note>(`/api/notes/${noteId}`, {
      body: noteWithoutId,
      method: 'PUT',
      onResponse: ({ response }) => {
        if (response.status != 200) return
        const data: Note = response._data
        const noteIdx = notes.value.findIndex(note => note.id == data.id)
        if (noteIdx === -1) return
        notes.value[noteIdx] = data
      },
    })
  }

  return { notes, isLoading, getNotes, createNote, updateNote, deleteNote }
})
