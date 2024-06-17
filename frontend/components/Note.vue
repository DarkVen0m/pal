<script setup lang="ts">
import type { Note } from '~/types/note'

const { t } = useI18n()

const props = defineProps<{ note: Note }>()

const emit = defineEmits<{
  (e: 'remove', id: number): void
}>()
</script>

<template>
  <v-card>
    <v-card-title>
      {{ props.note.title }}
    </v-card-title>
    <v-card-text>
      {{ props.note.content }}
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        variant="flat"
        @click.prevent="emit('remove', props.note.id)"
      >
        {{ t('notes.delete') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>
