<script setup lang="ts">
const form = ref(null)
const localePath = useLocalePath()
const userStore = useUserStore()

const { t } = useI18n()

const onSubmit = () => {
  userStore.auth(email.value, password.value)
}

const email = ref('')
const password = ref('')

const required = (v: string) => {
  return !!v || 'Field is required'
}
</script>

<template>
  <v-form
    v-model="form"
    @submit.prevent="onSubmit"
  >
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
      :label="$t('auth.password')"
    />
    <NuxtLink
      :to="localePath({ name: 'auth-register' })"
      class="register-link"
    >
      {{ t('auth.register') }}
    </NuxtLink>
    <v-btn
      :disabled="!form"
      color="primary"
      type="submit"
      block
    >
      {{ t('auth.login') }}
    </v-btn>
  </v-form>
</template>

<style scoped>
.register-link {
  margin-bottom: 16px;
}
</style>
