export interface NoteWithoutId {
  title: string
  content: string
}

export interface Note extends NoteWithoutId {
  id: number
}
