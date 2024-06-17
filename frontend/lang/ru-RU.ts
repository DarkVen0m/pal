import lang from './ru-RU.json'

export default defineI18nLocale(async () => {
  return {
    ...lang,
    $vuetify: {
      input: {
        clear: 'Очистить',
      },
    },
  }
})
