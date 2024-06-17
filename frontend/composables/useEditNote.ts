import type { Note } from '~/types/note'

export const useEditNote = () => {
  const editDialog = ref(false)
  const editState = ref<Note>({
    id: -1,
    title: '',
    content: '',
  })
  const notesStore = useNotesStore()

  const editNote = (note: Note) => {
    editDialog.value = true
    editState.value = { ...note }
  }

  const updateNote = async (note: Note) => {
    await notesStore.updateNote(note)
    editDialog.value = false
  }
  return { editDialog, editState, editNote, updateNote }
}
