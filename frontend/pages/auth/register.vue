<script setup lang="ts">
const form = ref(null)
const userStore = useUserStore()

const { t } = useI18n()

const onSubmit = () => {
  userStore.register(name.value, email.value, password.value)
}

const name = ref('')
const email = ref('')
const password = ref('')
const repeatPassword = ref('')

const required = (v: string) => {
  return !!v || t('fields.is_required')
}

const matchPassword = (v: string) => {
  return v === password.value || t('fields.must_match_with_password')
}
</script>

<template>
  <v-form
    v-model="form"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="name"
      :rules="[required]"
      class="mb-2"
      :label="$t('auth.name')"
    />
    <v-text-field
      v-model="email"
      :rules="[required]"
      class="mb-2"
      :label="$t('auth.email')"
    />

    <v-text-field
      v-model="password"
      type="password"
      :rules="[required]"
      :label="$t('auth.repeat_password')"
    />
    <v-text-field
      v-model="repeatPassword"
      type="password"
      :rules="[required, matchPassword]"
      :label="$t('auth.password')"
    />
    <v-btn
      :disabled="!form"
      color="primary"
      type="submit"
      block
    >
      {{ t('auth.register') }}
    </v-btn>
  </v-form>
</template>

<style scoped>

</style>
