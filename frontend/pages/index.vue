<script setup lang="ts">
import type { Note } from '~/types/note'

const { t } = useI18n()

const notesStore = useNotesStore()
notesStore.getNotes()

const { editDialog, editState, editNote, updateNote } = useEditNote()
const { createDialog, createState, addNote, createNote } = useCreateNote()
</script>

<template>
  <div>
    <v-dialog
      v-model="createDialog"
      max-width="500"
    >
      <v-card :title="$t('note.create_dialog.header')">
        <v-card-text>
          <v-text-field v-model="createState.title" />
          <v-textarea v-model="createState.content" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            :text="t('actions.save')"
            @click="createNote(createState)"
          />
          <v-btn
            :text="t('actions.close')"
            @click="createDialog = false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="editDialog"
      max-width="500"
    >
      <v-card :title="$t('note.edit_dialog.header')">
        <v-card-text>
          <v-text-field v-model="editState.title" />
          <v-textarea v-model="editState.content" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            :text="t('actions.save')"
            @click="updateNote(editState)"
          />
          <v-btn
            :text="t('actions.close')"
            @click="editDialog = false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="create-note">
      <v-btn
        variant="outlined"
        @click="addNote"
      >
        {{ t('notes.create') }}
      </v-btn>
    </div>
    <v-row class="mt-4">
      <v-col
        v-for="note in notesStore.notes"
        :key="note.id"
        cols="12"
        sm="12"
        lg="6"
        xl="4"
      >
        <Note
          :note="note"
          @edit="editNote"
          @remove="notesStore.deleteNote"
        />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.create-note {
  display: flex;
  justify-content: center;
}
</style>
