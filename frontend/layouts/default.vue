<template>
  <div>
    <v-app>
      <v-app-bar :elevation="2">
        <v-app-bar-title class="primary--text mr-3">
          Test App
        </v-app-bar-title>
        <v-spacer />
        <NuxtLink :to="localePath({ name: 'index' })">
          <v-btn>{{ t('notes.list') }}</v-btn>
        </NuxtLink>
        <NuxtLink
          v-if="!userStore.token"
          :to="localePath({ name: 'auth-login' })"
        >
          <v-btn>{{ t('auth.login') }}</v-btn>
        </NuxtLink>
        <NuxtLink v-else>
          <v-btn @click="userStore.logout">
            {{ t('auth.logout') }}
          </v-btn>
        </NuxtLink>
      </v-app-bar>
      <v-main>
        <v-container>
          <NuxtPage />
          <v-snackbar
            v-model="snackbar"
          >
            <template #default>
              <p
                v-for="(text, idx) in notificationsStore.notifications"
                :key="idx"
              >
                {{ text }}
              </p>
            </template>
            <template #actions>
              <v-btn
                color="blue"
                variant="text"
                @click="notificationsStore.notifications = []"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-container>
      </v-main>
      <NuxtRouteAnnouncer />
    </v-app>
  </div>
</template>

<script setup lang="ts">
import { useNotificationsStore } from '~/stores/notifications'

const localePath = useLocalePath()
const userStore = useUserStore()

const snackbar = computed(() => notificationsStore.notifications.length > 0)
const notificationsStore = useNotificationsStore()
const notification = computed(() => notificationsStore.notifications.join('\n'))

const { t } = useI18n()
</script>

<style lang="scss">
body {
  background: #eeeeee;
}
</style>
