import type { NoteWithoutId } from '~/types/note'

export const useCreateNote = () => {
  const createDialog = ref(false)
  const createState = ref<NoteWithoutId>({
    title: '',
    content: '',
  })
  const notesStore = useNotesStore()

  const addNote = (note: NoteWithoutId) => {
    createDialog.value = true
    createState.value = { ...note }
  }

  const createNote = async (note: NoteWithoutId) => {
    await notesStore.createNote(note)
    createDialog.value = false
  }
  return { createDialog, createState, addNote, createNote }
}
